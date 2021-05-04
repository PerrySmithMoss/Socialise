import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
    },
    textBox: {
        // marginLeft: 10,
        width: "100%",
      },
  })
);

export const SearchBar: React.FC = () => {
    const classes = useStyles();
    return (
    <div className={classes.root}>
        <Box display="flex"  bgcolor="background.paper">
        <TextField
        //   value={content}
        //   onChange={(event) => {
        //     setContent(event.target.value);
        //   }}
          className={classes.textBox}
          id="outlined-size-small"
          variant="outlined"
          size="small"
          label="Search Socialise"
        //   InputProps={{
        //     startAdornment: (
        //       <InputAdornment position="start">
        //         <SearchIcon />
        //       </InputAdornment>
        //     ),
        //   }}
        />
      </Box>
      </div>
    )
}
