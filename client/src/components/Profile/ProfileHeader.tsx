import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Divider, Modal } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ProfileBanner from "../../img/profile-banner.jpg";
import DexterBackground1 from "../../img/dexter-background.jpg";
import DexterBackground2 from "../../img/dexter-background2.jpeg";
import { useGetCurrentUserQuery } from "../../generated/graphql";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { EditProfile } from "./EditProfile";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import moment from "moment";

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
      backgroundImage: `url(${ProfileHeader})`,
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
  })
);

interface Props {}

export const ProfileHeader: React.FC<Props> = () => {
  const classes = useStyles();
  const { data } = useGetCurrentUserQuery({ fetchPolicy: "cache-first" });
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <Box display="flex" pl={2} bgcolor="background.paper">
        <Box mt={1}>
          <IconButton
            onClick={() => history.goBack()}
            style={{ color: "#14ffec", paddingTop: "15px" }}
            aria-label="delete"
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box>
          <h2>{`${data.getCurrentUser?.firstName} ${data.getCurrentUser?.lastName}`}</h2>
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
              src={ProfileBanner}
            ></img>
          </Box>
        </Box>
        <Box display="flex" pl={2} pr={2} bgcolor="background.paper">
          <Box flexGrow={1}>
            <Avatar
              style={{ position: "absolute", display: "block", top: "22.5%" }}
              className={classes.avatar}
              alt="Remy Sharp"
              src={data.getCurrentUser?.profile.avatar as string}
            />
          </Box>
          <Box style={{ marginTop: "20px", paddingBottom: "25px" }}>
            <Button
              onClick={handleOpen}
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
        </Box>
        <Box pl={2} bgcolor="background.paper">
          <Box pb={0.2} flexGrow={1}>
            <span
              style={{ fontWeight: "bolder" }}
            >{`${data.getCurrentUser?.firstName}  ${data.getCurrentUser?.lastName}`}</span>
          </Box>

          <Box pb={1} flexGrow={1}>
            <span style={{ opacity: 0.5 }}>
              @{data.getCurrentUser?.username}
            </span>
          </Box>

          <Box pb={3} flexGrow={1}>
            <span>{data.getCurrentUser?.profile.bio}</span>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          pl={2}
          bgcolor="background.paper"
        >
          <Box flexGrow={1}>
            <span style={{ paddingRight: "15px", opacity: 0.5 }}>
              {" "}
              {`Joined ${moment(data.getCurrentUser?.dateRegistered).format(
                "DD/MM/YYYY"
              )}`}
            </span>

            <span
              style={{
                paddingRight: "15px",
                textDecoration: "none",
                opacity: 0.5,
              }}
            >
              {data.getCurrentUser?.profile.location}{" "}
            </span>

            <Link
              to={data.getCurrentUser?.profile.website as string}
              style={{
                paddingRight: "15px",

                color: "white",
              }}
            >
              <span style={{ color: "#1DA1F2" }}>
                {data.getCurrentUser?.profile.website}
              </span>
            </Link>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          pl={2}
          pt={2}
          pb={1}
          bgcolor="background.paper"
        >
          <Box flexGrow={1}>
            <span style={{ fontWeight: "bold" }}>
              {data.getCurrentUser?.followingCount}{" "}
            </span>
            <span style={{ paddingRight: "15px", opacity: 0.5}}> Following </span>
            <span style={{ fontWeight: "bold" }}>
              {data.getCurrentUser?.followersCount}
            </span>
            <span style={{opacity: 0.5}}> Followers</span>
          </Box>
        </Box>
        <Box flexGrow={1}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Tweets" />
            <Tab label="Media" />
            <Tab label="Likes" />
          </Tabs>
        </Box>
        <br></br>
      </Box>
      <EditProfile open={open} setOpen={setOpen} />
    </div>
  );
};
