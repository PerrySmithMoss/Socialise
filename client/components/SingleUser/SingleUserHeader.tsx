import React, { useEffect } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {
  useFollowUserMutation,
  useGetCurrentUserQuery,
  useGetSpecificUserInfoQuery,
} from "../../graphql/generated/graphql";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "next/link";
import { FollowUser } from "./FollowUser";
import moment from "moment";
import { MessageUser } from "./MessageUser";
import { useRouter } from "next/router";
import { EditProfile } from "../Profile/EditProfile";

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
      //   backgroundImage: `url(${ProfileHeader})`,
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
  })
);

interface Props {
  userId: number;
}

export const SingleUserHeader: React.FC<Props> = ({ userId }) => {
  const classes = useStyles();
  const { data: currentUser } = useGetCurrentUserQuery({
    fetchPolicy: "cache-first",
  });
  const { data } = useGetSpecificUserInfoQuery({
    fetchPolicy: "cache-first",
    variables: { userId },
  });
  const [followUser] = useFollowUserMutation();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  console.log(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <Box alignItems="center" display="flex" pl={2} bgcolor="background.paper">
        <Box>
          <IconButton
            onClick={() => router.back()}
            style={{ color: "#14ffec", paddingTop: "15px" }}
            aria-label="delete"
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box>
          <h2 className="text-xl">{`${data.getSpecificUserInfo?.firstName} ${data.getSpecificUserInfo?.lastName}`}</h2>
        </Box>
      </Box>
      <Box bgcolor="background.paper">
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
                height: "100%",
                objectFit: "cover",
                overflow: "hidden",
              }}
              src="/images/wallpaper.jpg"
            ></img>
            <Avatar
              style={{
                position: "absolute",
                display: "block",
                top: "15%",
                left: "3%",
              }}
              className={classes.avatar}
              alt="Remy Sharp"
              src={data.getSpecificUserInfo?.profile.avatar as string}
            />
          </Box>
        </Box>
        <Box className="flex justify-between px-3" bgcolor="background.paper">
          <Box mt={2.5}>
            <Box pb={0.2} flexGrow={1}>
              <span
                style={{ fontWeight: "bolder" }}
              >{`${data.getSpecificUserInfo?.firstName}  ${data.getSpecificUserInfo?.lastName}`}</span>
            </Box>

            <Box pb={1} flexGrow={1}>
              <span style={{ opacity: 0.5 }}>
                @{data.getSpecificUserInfo?.username}
              </span>
            </Box>
          </Box>
          <Box display="flex">
            {currentUser?.getCurrentUser?.id === data.getSpecificUserInfo.id ? (
              <Box style={{ marginTop: "20px", paddingBottom: "25px" }}>
                <Button
                  onClick={() => setIsEditProfileOpen(true)}
                  variant="contained"
                  size="medium"
                  color="primary"
                  style={{
                    backgroundColor: "0d7377",
                    borderRadius: 50,
                    color: "white",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            ) : (
              <>
                <MessageUser specificUser={data.getSpecificUserInfo} />
                <FollowUser specificUser={data.getSpecificUserInfo} />
              </>
            )}
          </Box>
        </Box>
        <EditProfile
          open={isEditProfileOpen}
          setOpen={handleCloseEditProfile}
        />
        <Box className="px-3" pb={2} flexGrow={1}>
          <p>{data.getSpecificUserInfo?.profile.bio}</p>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          className="px-3"
          bgcolor="background.paper"
        >
          <Box flexGrow={1}>
            <span style={{ paddingRight: "15px", opacity: 0.5 }}>
              {" "}
              {`Joined ${moment(
                data.getSpecificUserInfo?.dateRegistered
              ).format("DD/MM/YYYY")}`}
            </span>

            <span
              style={{
                paddingRight: "15px",
                textDecoration: "none",
                opacity: 0.5,
              }}
            >
              {data.getSpecificUserInfo?.profile.location}{" "}
            </span>

            {data.getSpecificUserInfo?.profile.website ? (
              <a
                href={`https://${data.getSpecificUserInfo?.profile.website}`}
                target="_blank"
                style={{
                  paddingRight: "15px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <span style={{ color: "#1DA1F2" }}>
                  {data.getSpecificUserInfo?.profile.website}
                </span>
              </a>
            ) : (
              <span style={{ color: "#1DA1F2" }}>
                {data.getSpecificUserInfo?.profile.website}
              </span>
            )}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          className="px-3"
          pt={2}
          pb={1}
          bgcolor="background.paper"
        >
          <Box flexGrow={1}>
            <span style={{ fontWeight: "bold" }}>
              {data.getSpecificUserInfo?.followingCount}{" "}
            </span>
            <span style={{ paddingRight: "15px", opacity: 0.5 }}>
              {" "}
              Following{" "}
            </span>
            <span style={{ fontWeight: "bold" }}>
              {data.getSpecificUserInfo?.followersCount}{" "}
            </span>
            <span style={{ opacity: 0.5 }}> Followers</span>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
          >
            <Tab label="Tweets" />
            {/* <Tab label="Likes" /> */}
          </Tabs>
        </Box>
        <br></br>
      </Box>
      {/* <FollowUser open={open} setOpen={setOpen} /> */}
    </div>
  );
};
