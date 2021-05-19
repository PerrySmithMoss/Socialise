import { Box, Button, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  useSendMessageMutation,
  GetSpecificUserInfoDocument,
  SpecifcUserSnippetFragment,
  GetAllMessagesFromUserDocument,
  GetAllUserMessagesDocument,
} from "../../generated/graphql";
import gql from "graphql-tag";
import EmailIcon from "@material-ui/icons/Email";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  specificUser: SpecifcUserSnippetFragment;
}

export const MessageUser: React.FC<Props> = ({ specificUser }) => {
  //   const { data, loading } = useGetCurrentUserQuery();
  const [sendMessage] = useSendMessageMutation();
  const [message, setMessage] = useState("");
  const [dateSent, setdateSent] = useState(
    moment().format("YYYY-MM-DD hh:mm:ss").toString()
  );
  const [open, setOpen] = useState(false);

  const GET_CURRENT_USER = gql`
    query GetCurrentUser {
      getCurrentUser {
        id
        firstName
        lastName
        email
        username
      }
    }
  `;

  const handleSendMessage = async (toId: number) => {
    if (message.length === 0 || !message.trim()) {
      // setMessage(true);
    } else {
      await sendMessage({
        variables: {
          toId: toId,
          content: message,
          dateSent: dateSent,
        },
        refetchQueries: [
          {
            query: GetAllMessagesFromUserDocument,
            variables: { fromId: specificUser.id },
          },
          { query: GetAllUserMessagesDocument },
        ],
      });
      setMessage("");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box style={{ marginTop: "15px", paddingBottom: "25px" }}>
        <IconButton
          style={{ fontSize: "24px" }}
          onClick={handleOpen}
          aria-label="settings"
        >
          <EmailIcon />
        </IconButton>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your message to send to @{specificUser.username}
          </DialogContentText>
          <TextField
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "#14ffec" }}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            style={{ color: "#14ffec" }}
            onClick={() => handleSendMessage(specificUser.id)}
            color="primary"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
