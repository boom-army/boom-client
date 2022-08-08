import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Avatar,
  Button,
  Box,
  Container,
  TextField,
  Grid,
  Badge,
  Input,
} from "@mui/material";
import { SIGN_FILE } from "../../queries/files";
import { useTheme } from '@mui/material/styles';
import { cleanTypeName, displayError, uploadFile } from "../../utils";
import {
  ProfileDocument,
  ProfileQuery,
  useEditProfileMutation,
} from "../../generated/graphql";
import { User } from "../../contexts/user";
import { useInput } from "../../hooks/useInput";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../contexts/snackbar";
import { useState, useContext } from "react";
import { UserAvatar } from "../UserAvatar";

interface Profile {
  profile: ProfileQuery["profile"]
  setUser: (user: User | null) => void | User 
}

export const EditProfileForm = ({ profile, setUser }: Profile) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handle = useInput(profile.handle);
  const consumerName = useInput(profile.consumerName as string);
  const location = useInput(profile.location as string);
  const website = useInput(profile.website as string);
  const dob = useInput(profile.dob as string);
  const avatar = useInput(profile.avatar);
  const bio = useInput(profile.bio as string);
  const coverPhoto = useInput(profile.coverPhoto as string);

  const [avatarState, setAvatar] = useState(avatar?.value ?? "");
  const [dataState, setData] = useState(cleanTypeName(profile.data) ?? {});
  const [coverPhotoState, setCoverPhoto] = useState(
    coverPhoto?.value ?? "/assets/default-cover.png"
  );

  const [editProfileMutation, { loading }] = useEditProfileMutation({
    refetchQueries: [
      { query: ProfileDocument, variables: { handle: handle.value } },
    ],
  });
  const [signFileMutation] = useMutation(SIGN_FILE);

  const { enqueueSnackbar } = useSnackbar();

  const handleEditProfile = async (e: any) => {
    e.preventDefault();

    if (!consumerName.value) {
      return enqueueSnackbar("You cannot leave name empty", {
        variant: "error",
      });
    }

    try {
      const { data }: any = await editProfileMutation({
        variables: {
          handle: handle.value,
          consumerName: consumerName.value,
          dob: dob.value,
          bio: bio.value,
          location: location.value,
          website: website.value,
          avatar: avatarState,
          data: dataState,
          coverPhoto: coverPhotoState,
        },
      });

      setUser({
        handle: data.editProfile.handle,
        publicAddress: data.editProfile.publicAddress,
        id: data.editProfile.id,
      });

      navigate(`/${data.editProfile.handle}`);

      enqueueSnackbar("Your profile has been updated 🥳.", {
        variant: "success",
      });
    } catch (err) {
      return displayError(err, enqueueSnackbar);
    }
  };

  const handleCoverPhoto = async (e: any) => {
    try {
      const file = e.target.files[0];
      const { data } = await signFileMutation({
        variables: {
          file: file.name,
          type: file.type,
        },
      });
      const signedUrl = data.signFileUrl;
      const imageData = await uploadFile(file, signedUrl, enqueueSnackbar);
      const imageUrl: string | undefined | any =
        imageData?.config?.url?.split("?")[0];
      setCoverPhoto(imageUrl);
    } catch (error) {
      console.log(error);
      displayError(error, enqueueSnackbar);
    }
  };

  const handleAvatar = async (e: any) => {
    console.log('boom');
    
    try {
      const file = e.target.files[0];
      const { data } = await signFileMutation({
        variables: {
          file: file.name,
          type: file.type,
        },
      });
      const signedUrl = data.signFileUrl;
      const imageData = await uploadFile(file, signedUrl, enqueueSnackbar);
      const imageUrl: string | undefined | any =
        imageData?.config?.url?.split("?")[0];
      // set avatar state to NOT NFT
      const userData = cleanTypeName(profile.data);
      delete userData.avatarMint;
      delete userData.avatarUpdateAuthority;
      setData(userData);
      // set avatar
      setAvatar(imageUrl);
    } catch (error) {
      console.log(error);
      displayError(error, enqueueSnackbar);
    }
  };

  return (
    <>
      <Container>
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={handleEditProfile}
        >
          <Grid container spacing={2}>
            <Box
              position="relative"
              mb={2}
              sx={{
                width: "100%",
                height: "200px",
                backgroundImage: `url("${coverPhotoState}")`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                "&:hover": {
                  opacity: "80%",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: "45%",
                }}
              >
                <label htmlFor="cover-photo-input">
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: theme.palette.primary.main,
                      cursor: "pointer",
                    }}
                  >
                    <AddPhotoAlternateIcon sx={{ width: 22, height: 22 }} />
                  </Avatar>
                  <Input
                    id="cover-photo-input"
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    sx={{ display: "none" }}
                    onChange={handleCoverPhoto}
                  />
                </label>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "1em",
                  left: "1em",
                }}
              >
                <label htmlFor="avatar-input-file">
                  <Input
                    id="avatar-input-file"
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    sx={{ display: "none" }}
                    onChange={handleAvatar}
                  />
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <Avatar
                        sx={{
                          width: 22,
                          height: 22,
                          border: `2px solid ${theme.palette.background.default}`,
                          backgroundColor: theme.palette.primary.main,
                        }}
                      >
                        <AddPhotoAlternateIcon sx={{ width: 14, height: 14 }} />
                      </Avatar>
                    }
                  >
                    <UserAvatar
                      avatar={avatarState}
                      isNFT={dataState.avatarMint}
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                  </Badge>
                </label>
              </Box>
            </Box>
            <Grid item xs={12}>
              <TextField
                name="handle"
                required
                fullWidth
                autoFocus
                id="handle"
                label="Handle"
                InputLabelProps={{
                  shrink: true,
                  style: { color: theme.palette.secondary.main },
                }}
                InputProps={{
                  style: { color: theme.palette.secondary.main },
                }}
                value={handle.value}
                onChange={handle.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                autoFocus
                id="name"
                label="Name"
                InputLabelProps={{
                  shrink: true,
                  style: { color: theme.palette.secondary.main },
                }}
                InputProps={{
                  style: { color: theme.palette.secondary.main },
                }}
                value={consumerName.value}
                onChange={consumerName.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="bio"
                required
                fullWidth
                autoFocus
                rows={4}
                id="bio"
                label="Bio"
                InputLabelProps={{
                  shrink: true,
                  style: { color: theme.palette.secondary.main },
                }}
                InputProps={{
                  style: { color: theme.palette.secondary.main },
                }}
                value={bio.value}
                onChange={bio.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="website"
                required
                fullWidth
                autoFocus
                id="website"
                label="Website"
                InputLabelProps={{
                  shrink: true,
                  style: { color: theme.palette.secondary.main },
                }}
                InputProps={{
                  style: { color: theme.palette.secondary.main },
                }}
                value={website.value}
                onChange={website.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="dob"
                required
                fullWidth
                autoFocus
                id="dob"
                label="Date of Birth"
                InputLabelProps={{
                  shrink: true,
                  style: { color: theme.palette.secondary.main },
                }}
                InputProps={{
                  style: { color: theme.palette.secondary.main },
                }}
                value={dob.value}
                onChange={dob.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="location"
                required
                fullWidth
                autoFocus
                id="location"
                label="Location"
                InputLabelProps={{
                  shrink: true,
                  style: { color: theme.palette.secondary.main },
                }}
                InputProps={{
                  style: { color: theme.palette.secondary.main },
                }}
                value={location.value}
                onChange={location.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                variant="contained"
                type="submit"
                size="large"
                disabled={loading}
              >
                {loading ? "Saving" : "Save profile"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
