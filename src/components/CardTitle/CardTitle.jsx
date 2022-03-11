import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

let useStyles = makeStyles({
  title: {
    fontSize: "24px",
    marginTop: "20px",
    marginBottom: "15px",
    fontWeight: "bold",
  },
});

export default function Headline({ children }) {
  const classes = useStyles();

  return (
    <Typography variant="h4" className={classes.title} component="div">
      {children}
    </Typography>
  );
}
