import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '../../styles/Button';
import CoverPhoto from '../../styles/CoverPhoto';
import Form from '../../styles/Form';
import Input from '../Input';
import { TextareaAutosize } from "@mui/material";
import useInput from '../../hooks/useInput';
import { PROFILE, EDIT_PROFILE } from '../../queries/profile';
import { SIGN_FILE } from '../../queries/files';
import { displayError } from '../../utils';
import { uploadImage } from '../../utils';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export const EditProfileForm = ({ profile, setUser }) => {
  const navigate = useNavigate();
  const [avatarState, setAvatar] = useState('');
  const [coverPhotoState, setCoverPhoto] = useState('');

  const handle = useInput(profile && profile.handle);
  const consumerName = useInput(profile && profile.consumerName);
  const location = useInput(profile && profile.location);
  const website = useInput(profile && profile.website);
  const dob = useInput(profile && profile.dob);
  const avatar = useInput(profile && profile.avatar);
  const bio = useInput(profile && profile.bio);
  const coverPhoto = useInput(profile && profile.coverPhoto);

  const [editProfileMutation, { loading }] = useMutation(EDIT_PROFILE, {
    refetchQueries: [{ query: PROFILE, variables: { handle: handle.value } }],
  });
  const [signFileMutation] = useMutation(SIGN_FILE);

  const { enqueueSnackbar } = useSnackbar();

  const handleEditProfile = async (e) => {
    e.preventDefault();

    if (!consumerName.value) {
      return enqueueSnackbar('You cannot leave name empty', {
        variant: 'error',
      });
    }

    try {
      const { data } = await editProfileMutation({
        variables: {
          handle: handle.value,
          consumerName: consumerName.value,
          dob: dob.value,
          bio: bio.value,
          location: location.value,
          website: website.value,
          avatar: avatarState ? avatarState : avatar.value,
          coverPhoto: coverPhotoState ? coverPhotoState : coverPhoto.value,
        },
      });

      setUser({
        handle: data.editProfile.handle,
        publicAddress: data.editProfile.publicAddress,
        id: data.editProfile.id,
      });

      navigate(`/${data.editProfile.handle}`);

      enqueueSnackbar('Your profile has been updated 🥳.', {
        variant: 'success',
      });
    } catch (err) {
      return displayError(err, enqueueSnackbar);
    }
  };

  const handleCoverPhoto = async (e) => {
    try {
      const file = e.target.files[0];
      const { data } = await signFileMutation({
        variables: {
          file: file.name,
          type: file.type,
        },
      });
      const signedUrl = data.signFileUrl;
      const imageData = await uploadImage(file, signedUrl, enqueueSnackbar);
      const imageUrl = imageData.config.url.split('?')[0];
      setCoverPhoto(imageUrl);
    } catch (error) {
      console.log(error);
    }
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
      const imageData = await uploadImage(file, signedUrl, enqueueSnackbar);
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
        text="Name"
        value={consumerName.value}
        onChange={consumerName.onChange}
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
        {loading ? 'Saving' : 'Save'}
      </Button>
    </Form>
  );
};
