import { Box, Button, Divider } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
    },
    textBox: {
      // marginLeft: 10,
      width: "100%",
    },
    link: {
      textDecoration: "none",
      color: "#fff",
    },
    button: {
        color: '#fff',
        '&:hover': {
          color: '#14ffec',
      },
    }
  })
);

const defaultProps = {
    
  borderColor: "text.primary",
};

export const LeftNav: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box ml={5} justifyContent="center" {...defaultProps}>
        <Box ml={3}  flexGrow={1}>
          <Link className={classes.link} to="/">
            <Button className={classes.button} size="large" startIcon={<HomeIcon />}  color="inherit">
              Home
            </Button>
          </Link>
        </Box>
        <Box ml={3} flexGrow={1}>
          <Link className={classes.link} to="explore">
            <Button className={classes.button} size="large" startIcon={<ExploreIcon />} style={{ marginTop: "1rem" }} color="inherit">
              Explore
            </Button>
          </Link>
        </Box>
        <Box ml={3} flexGrow={1}>
          <Link className={classes.link} to="notifacations">
            <Button className={classes.button} size="large" startIcon={<NotificationsIcon />} style={{ marginTop: "1rem" }} color="inherit">
              Notifacations
            </Button>
          </Link>
        </Box>
        <Box ml={3} flexGrow={1}>
          <Link className={classes.link} to="messages">
            <Button className={classes.button} size="large" startIcon={<EmailIcon />} style={{ marginTop: "1rem" }} color="inherit">
              Messages
            </Button>
          </Link>
        </Box>
        <Box ml={3} flexGrow={1}>
          <Link className={classes.link} to="lists">
            <Button className={classes.button} size="large" startIcon={<FormatListBulletedIcon />} style={{ marginTop: "1rem" }} color="inherit">
              Lists
            </Button>
          </Link>
        </Box>
        <Box ml={3} flexGrow={1}>
          <Link className={classes.link} to="profile">
            <Button className={classes.button} size="large" startIcon={<PersonIcon />} style={{ marginTop: "1rem" }} color="inherit">
              Profile
            </Button>
          </Link>
        </Box>
        <Box ml={3} pb={3} flexGrow={1}>
          <Link className={classes.link} to="msettings">
            <Button className={classes.button} size="large" startIcon={<MoreHorizIcon />} style={{ marginTop: "1rem" }} color="inherit">
              More
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
};
