import { Box, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetCurrentUserQuery } from "../../graphql/generated/graphql";

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
      color: "#fff",
      "&:hover": {
        color: "#14ffec",
      },
    },
    activeLink: {
      // backgroundColor: "#14ffec",
      color: "#14ffec",
    },
  })
);

const defaultProps = {
  borderColor: "text.primary",
};

export const LeftNav: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const splitLocation = router.pathname.split("/");
  const { data: currentUser } = useGetCurrentUserQuery({
    fetchPolicy: "cache-first",
  });
  return (
    <div className={classes.root}>
      <Box ml={5} justifyContent="center" {...defaultProps}>
        <Box ml={3} flexGrow={1}>
          <div className={classes.link}>
            <Link href={`/`}>
              <Button
                style={{ color: splitLocation[1] === "" ? "#14ffec" : "white" }}
                className={classes.button}
                size="large"
                startIcon={<HomeIcon />}
                color="inherit"
              >
                Home
              </Button>
            </Link>
          </div>
        </Box>
        {currentUser?.getCurrentUser ? (
          <>
            <Box ml={3} flexGrow={1}>
              <div className={classes.link}>
                <Link href={`/messages`}>
                  <Button
                    style={{
                      color:
                        splitLocation[1] === "messages" ? "#14ffec" : "white",
                      marginTop: "1rem",
                    }}
                    className={classes.button}
                    size="large"
                    startIcon={<EmailIcon />}
                    color="inherit"
                  >
                    Messages
                  </Button>
                </Link>
              </div>
            </Box>
            <Box ml={3} flexGrow={1}>
              <div className={classes.link}>
                <Link href={`/user/${currentUser.getCurrentUser.id}`}>
                  <Button
                    style={{
                      color:
                        splitLocation[1] === "profile" ? "#14ffec" : "white",
                      marginTop: "1rem",
                    }}
                    className={classes.button}
                    size="large"
                    startIcon={<PersonIcon />}
                    color="inherit"
                  >
                    Profile
                  </Button>
                </Link>
              </div>
            </Box>
          </>
        ) : null}
      </Box>
    </div>
  );
};
