import React from "react";
import { HeadsetTwoTone } from "@material-ui/icons";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar color="primary" position="fixed">
      <Toolbar>
        <HeadsetTwoTone />
        <Typography className={classes.title} variant="h6" component="h1">
          Music Share Well
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
