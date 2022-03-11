import React from "react";
import { CardHeader, CardContent, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardTitle from "../CardTitle/CardTitle";

const useStyles = makeStyles({
  infoCard: {
    backgroundColor: "#f9ecec",
    marginBottom: 27,
    marginLeft: 30,
    marginRight: 30,
  },
  infoCardHeader: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  infoCardContent: {
    marginTop: -25,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: -14,
  },
});

export default function InfoCard({ infoCardHeader, infoCardContent }) {
  const classes = useStyles();
  return (
    <Card className={classes.infoCard}>
      <CardHeader
        className={classes.infoCardHeader}
        title={<CardTitle>{infoCardHeader}</CardTitle>}
      />

      <CardContent className={classes.infoCardContent}>
        <Typography
          dangerouslySetInnerHTML={{ __html: infoCardContent }}
        ></Typography>
      </CardContent>
    </Card>
  );
}
