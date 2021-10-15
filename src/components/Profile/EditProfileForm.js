import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "../../styles/Button";
import CoverPhoto from "../../styles/CoverPhoto";
import Form from "../../styles/Form";
import Input from "../Input";
import TextareaAutosize from "react-textarea-autosize";
import useInput from "../../hooks/useInput";
import { PROFILE, EDIT_PROFILE } from "../../queries/profile";
import { displayError } from "../../utils";
import { toast } from "react-toastify";
import { uploadImage } from "../../utils";
import { useMutation } from "@apollo/client";
import { useWallet } from '@solana/wallet-adapter-react';
import { withRouter } from "react-router-dom";
import { SIGN_FILE } from "../../queries/files";

const EditProfileForm = ({ profile, history }) => {
  const [avatarState, setAvatar] = useState("");
  const [coverPhotoState, setCoverPhoto] = useState("");

  const handle = useInput(profile && profile.handle);
  const firstname = useInput(profile && profile.firstname);
  const lastname = useInput(profile && profile.lastname);
  const location = useInput(profile && profile.location);
  const website = useInput(profile && profile.website);
  const dob = useInput(profile && profile.dob);
  const avatar = useInput(profile && profile.avatar);
  const bio = useInput(profile && profile.bio);
  const coverPhoto = useInput(profile && profile.coverPhoto);

  const [editProfileMutation, { loading }] = useMutation(EDIT_PROFILE, {
    refetchQueries: [{ query: PROFILE, variables: { handle } }],
  });
  const [signFileMutation] = useMutation(SIGN_FILE);

  const { disconnect } = useWallet();

  const handleEditProfile = async (e) => {
    e.preventDefault();

    if (!firstname.value || !lastname.value) {
      return toast.error("You cannot leaveout firstname/lastname empty");
    }

    try {
      await editProfileMutation({
        variables: {
          handle: handle.value,
          firstname: firstname.value,
          lastname: lastname.value,
          dob: dob.value,
          bio: bio.value,
          location: location.value,
          website: website.value,
          avatar: avatarState ? avatarState : avatar.value,
          coverPhoto: coverPhotoState ? coverPhotoState : coverPhoto.value,
        },
      });

      localStorage.clear();
      disconnect().catch(() => {
        // Silently catch because any errors are caught by the context `onError` handler
      });
      history.push("/");
      window.location.reload();

      toast.success("Your profile has been updated 🥳. Please login again to refresh your session.");
    } catch (err) {
      return displayError(err);
    }

    [handle, firstname, lastname, dob, location, website, avatar, coverPhoto].map(
      (field) => field.setValue("")
    );

    history.push(`/${handle}`);
  };

  const handleCoverPhoto = async (e) => {
    setCoverPhoto(await uploadImage(e.target.files[0]));
  };

  const handleAvatar = async (e) => {
    try {
      const file = e.target.files[0];
      const { data } = await signFileMutation({
        variables: {
          file: file.name,
          type: file.type,
        },
      });
      const signedUrl = data.signFileUrl;
      const imageData = await uploadImage(file, signedUrl);
      const imageUrl = imageData.config.url.split('?')[0];
      setAvatar(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form lg onSubmit={handleEditProfile}>
      <div className="cover-photo">
        <label htmlFor="cover-photo-input">
          <CoverPhoto
            src={coverPhotoState ? coverPhotoState : coverPhoto.value}
            alt="cover"
          />
        </label>
        <input
          type="file"
          id="cover-photo-input"
          accept="image/*"
          onChange={handleCoverPhoto}
        />
      </div>

      <div className="avatar-input">
        <label htmlFor="avatar-input-file">
          <Avatar src={avatarState ? avatarState : avatar.value} />
        </label>
        <input
          type="file"
          accept="image/*"
          id="avatar-input-file"
          onChange={handleAvatar}
        />
      </div>

      <Input
        lg={true}
        text="Handle"
        value={handle.value}
        onChange={handle.onChange}
      />

      <Input
        lg={true}
        text="First Name"
        value={firstname.value}
        onChange={firstname.onChange}
      />
      <Input
        lg={true}
        text="Last Name"
        value={lastname.value}
        onChange={lastname.onChange}
      />
      <div className="bio-wrapper">
        <label className="bio" htmlFor="bio">
          Bio
        </label>
        <TextareaAutosize
          id="bio"
          placeholder="Bio"
          value={bio.value}
          onChange={bio.onChange}
        />
      </div>
      <Input
        lg={true}
        text="Website"
        value={website.value}
        onChange={website.onChange}
      />
      <Input
        lg={true}
        text="Date of Birth"
        value={dob.value}
        onChange={dob.onChange}
      />
      <Input
        lg={true}
        text="Location"
        value={location.value}
        onChange={location.onChange}
      />
      <Button outline disabled={loading} type="submit">
        {loading ? "Saving" : "Save"}
      </Button>
    </Form>
  );
};

export default withRouter(EditProfileForm);
