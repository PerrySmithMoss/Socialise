import React, { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Modal } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {
  GetCurrentUserDocument,
  useGetCurrentUserQuery,
  useUpdateUserProfileMutation,
  useUploadUserImageMutation,
} from "../../graphql/generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    textBox: {
      marginLeft: 10,
      width: "90%",
    },
    avatar: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
    icon: {
      marginTop: 5,
      marginLeft: 60,
    },
    content: {
      position: "relative",
      // margin-top: auto;
      //   backgroundImage: `url(${ProfileHeader})`,
      /* padding-top:200px; */
      height: 150,
      width: "100%",
      display: "block",
      marginTop: 100,
    },
    profileInfo: {
      position: "absolute",
      top: "-95px",
      width: "100%",
      zIndex: 2,
      textAlign: "center",
    },
    profileImage: {
      display: "block",
      borderRadius: "120px",
      border: "1px solid #fff",
      width: "128px",
      height: "128px",
      margin: "30px auto 0",
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.7)",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
    },

    // inputImage: {
    //   alignSelf: "center",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   display: "flex",
    //   "& > *": {
    //     margin: theme.spacing(1),
    //   },
    // },
    input: {
      display: "none",
    },
    // large: {
    //   width: theme.spacing(7),
    //   height: theme.spacing(7),
    // },
  })
);

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const EditProfile: React.FC<Props> = ({ open, setOpen }) => {
  const classes = useStyles();
  const { data } = useGetCurrentUserQuery({ fetchPolicy: "cache-first" });
  // const [uploadUserImage] = useUploadUserImageMutation({
  //   onCompleted: (data) => console.log(data),
  // });
  const [updateProfile] = useUpdateUserProfileMutation();

  const [location, setLocation] = useState(
    data?.getCurrentUser?.profile.location
  );
  const [website, setWebsite] = useState(data?.getCurrentUser?.profile.website);
  const [bio, setBio] = useState(data?.getCurrentUser?.profile.bio);

  const handleClose = () => {
    setOpen(false);
  };

  // const handleUploadImageClick = (e: any) => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   if (!file) return;
  //   uploadUserImage({
  //     variables: { userId: data?.getCurrentUser?.id as number, file: file },
  //     refetchQueries: [{ query: GetCurrentUserDocument }],
  //   });
  // };

  useEffect(() => {
    if (data?.getCurrentUser) {
      setLocation(data?.getCurrentUser?.profile.location);
      setWebsite(data?.getCurrentUser?.profile.website);
      setBio(data?.getCurrentUser?.profile.bio);
    }
  }, [data?.getCurrentUser]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Box display="flex" alignItems="center" bgcolor="background.paper">
            <Box>
              <IconButton
                onClick={handleClose}
                style={{ color: "#14ffec" }}
                aria-label="delete"
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </Box>
            <Box flexGrow={1}>
              <h3 className="text-xl">Edit Profile</h3>
            </Box>
            <Box mr={1.5}>
              <Button
                size="medium"
                onClick={async () =>
                  updateProfile({
                    variables: {
                      userId: data.getCurrentUser?.id as number,
                      bio: bio || "",
                      location: location || "",
                      website: website || "",
                    },
                    refetchQueries: [{ query: GetCurrentUserDocument }],
                  })
                }
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#009d91",
                  color: "white",
                  borderRadius: 50,
                }}
              >
                Save
              </Button>
            </Box>
          </Box>

          <Box display="flex">
            <Box
              style={{
                maxWidth: "500px",
                position: "relative",
                maxHeight: "200px",
              }}
              flexGrow={1}
            >
              <img
                style={{
                  width: "100%",
                  position: "relative",
                  height: "100%",
                  objectFit: "cover",
                  overflow: "hidden",
                }}
                src="/images/wallpaper.jpg"
              ></img>
            </Box>
          </Box>
          <Box display="flex" pl={2} pr={2} bgcolor="background.paper">
            <Box ml={1} flexGrow={1}>
              <div>
                {/* <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={handleUploadImageClick}
                /> */}
                {/* <label htmlFor="icon-button-file"> */}
                <IconButton aria-label="upload picture" component="span">
                  <Avatar
                    style={{
                      position: "absolute",
                      display: "block",
                      bottom: "1%",
                      left: "40%",
                    }}
                    className={classes.avatar}
                    src={`${data?.getCurrentUser?.profile?.avatar}`}
                  />
                </IconButton>
                {/* </label> */}
              </div>
            </Box>
          </Box>
          <Box display="flex" pl={2} bgcolor="background.paper">
            <Box ml={2} mt={5} flexGrow={1}>
              <TextField
                id="outlined-helperText"
                label="Location"
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
                value={location}
                defaultValue={data.getCurrentUser?.profile.location}
                variant="outlined"
              />
            </Box>
            <Box pt={5} flexGrow={1}>
              <TextField
                id="outlined-helperText"
                onChange={(event) => {
                  setWebsite(event.target.value);
                }}
                label="Website"
                value={website}
                defaultValue={data.getCurrentUser?.profile.website}
                variant="outlined"
              />
            </Box>
          </Box>
          <Box display="flex" pl={2} bgcolor="background.paper">
            <Box mt={3} pl={2} pr={4.5} flexGrow={1}>
              <TextField
                id="outlined-helperText"
                label="Bio"
                onChange={(event) => {
                  setBio(event.target.value);
                }}
                multiline
                rows={2}
                fullWidth
                rowsMax={4}
                value={bio}
                defaultValue={data.getCurrentUser?.profile.bio}
                variant="outlined"
              />
            </Box>
          </Box>
          <br></br>
        </div>
      </Fade>
    </Modal>
  );
};
