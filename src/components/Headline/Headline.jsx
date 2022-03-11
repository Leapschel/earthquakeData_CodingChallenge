import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

let useStyles = makeStyles({
    headline: {
        fontSize: "34px",
        marginTop: "40px",
        marginBottom: "30px"
    }
  });

export default function Headline({ children}) {
    const classes = useStyles();

  return (
    <Typography variant="h6" className={classes.headline} component="div">
      {children}
    </Typography>
  );
}
