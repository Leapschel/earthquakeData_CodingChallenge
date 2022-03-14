import React, { useEffect, useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import CircularProgress from "@mui/material/CircularProgress";
import DateFnsUtils from "@date-io/date-fns";
import Map from "../components/Map/Map";
import Marker from "../components/Marker/Marker";
import Button from "@mui/material/Button";
import Headline from "../components/Headline/Headline";
import { makeStyles } from "@material-ui/styles";
import Grid from "@mui/material/Grid";
import InfoCard from "../components/InfoCard/InfoCard";
import textForInfoCard from "../assets/textInfoCard.json";
import { Typography } from "@material-ui/core";
import {
  getEarthQuakesForDate,
  getGreatestEarthQuake,
} from "../handler/mapHandler";
import getMedian from "../utils/calculateMedian";
import convertMagnitudeToRadius from "../utils/calculateRadiusFromMagnitude";
import getFirstAndLastDayOfMonth from "../utils/getFirstAndLastDayOfMonth";
import getLocalStorageData from "../utils/getSessionStorageData";
import isValidDate from "../utils/isValidDate";

let useStyles = makeStyles({
  selectYear: {
    overflow: "hidden",
    marginLeft: "10px",
    marginRight: "20px",
    height: "100%",
  },
  selectBirthdayDate: {
    marginBottom: "10px",
    float: "left",
    marginLeft: "30px",
    height: "100%",
  },
  headline: {
    marginLeft: "30px",
  },
  giftRecommendation: {
    marginLeft: "30px",
  },
  buttonColor: {
    "&.MuiButton-contained": {
      color: "#fffdf5",
      backgroundColor: "#a00b6e",
    },
  },
  button: {
    marginTop: "10px",
  },
  loadingAnimation: {
    marginLeft: "50px",
  },
});

export default function EarthQuakeMapping() {
  const classes = useStyles();

  const [birthday, setBirthday] = useState(() =>
    getLocalStorageData("birthday")
  );
  const [month, setMonth] = useState(() => getLocalStorageData("month"));
  const [dataLoaded, setDataLoaded] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [initialZoom] = useState(3);
  const [zoom, setZoom] = useState(initialZoom);

  const [infoCardContent, setInfoCardContent] = useState("");
  const [earthQuakeDetails, setEarthQuakeDetails] = useState("");
  const [showEarthQuakeDetails, setShowEarthQuakeDetails] = useState(false);

  const [centerOfMap] = useState({
    lat: 11.0168,
    lng: 76.9558,
  });

  useEffect(() => {
    const getRelevantData = async () => {
      const data = await getData();
      setFilteredData(data);
    };
    getRelevantData();
    //earthquake data gets updated every 5 minutes
    // setInterval(getRelevantData, 500000);
  }, []);

  //on reload of page input data should not be deleted; sessionStorage is used to store the data
  useEffect(() => {
    window.sessionStorage.setItem("birthday", birthday);
  }, [birthday]);

  useEffect(() => {
    window.sessionStorage.setItem("month", month);
  }, [month]);

  const getData = async () => {
    if (birthday) {
      return await getEarthQuakesForDate(new Date(birthday));
    } else if (month) {
      const firstAndLastDayOfMonth = getFirstAndLastDayOfMonth(new Date(month));
      return await getEarthQuakesForDate(
        firstAndLastDayOfMonth[0],
        firstAndLastDayOfMonth[1]
      );
    } else {
      const today = new Date();
      setMonth(today);
      const firstAndLastDayOfMonth = await getFirstAndLastDayOfMonth(today);
      return await getEarthQuakesForDate(
        firstAndLastDayOfMonth[0],
        firstAndLastDayOfMonth[1]
      );
    }
  };

  useEffect(() => {
    if (!filteredData) {
      return;
    }

    const numberOfEarthquakes = filteredData.length;
    const medianMagnitude = getMedian([...filteredData]) ?? "-";
    const greatestMagnitude =
      getGreatestEarthQuake([...filteredData])?.magnitude ?? "-";

    if (birthday) {
      setInfoCardContent({
        header: "Your birthday earthquake tectonicscope",
        content:
          getTextRelatedToMagnitudeOnBirthday(greatestMagnitude) +
          `<p><b>Total number of earthquakes:</b> ${numberOfEarthquakes}</p> <p><b>Median magnitude:</b> ${medianMagnitude}</p> <b>Greatest magnitude:</b> ${greatestMagnitude}`,
      });
    } else if (month) {
      setInfoCardContent({
        header: "Info",
        content: `<p><b>Total number of earthquakes:</b> ${numberOfEarthquakes}</p> <p><b>Median magnitude:</b> ${medianMagnitude}</p> <b>Greatest magnitude:</b> ${greatestMagnitude}`,
      });
    }
  }, [filteredData]);

  const changeMonth = async (newMonth) => {
    setDataLoaded(false);
    setBirthday(null);
    setShowEarthQuakeDetails(false);
    setMonth(newMonth);

    let filteredData = [];
    if (isValidDate(newMonth)) {
      const firstAndLastDayOfMonth = getFirstAndLastDayOfMonth(newMonth);
      filteredData = await getEarthQuakesForDate(
        firstAndLastDayOfMonth[0],
        firstAndLastDayOfMonth[1]
      );
    }
    setFilteredData(filteredData);
    setDataLoaded(true);
  };

  const changeBirthday = async (newBirthDay) => {
    setDataLoaded(false);
    setMonth(null);
    setShowEarthQuakeDetails(false);
    setBirthday(newBirthDay);
    let filteredData = [];
    if (isValidDate(newBirthDay)) {
      filteredData = await getEarthQuakesForDate(newBirthDay);
    }
    setFilteredData(filteredData);
    setDataLoaded(true);
  };

  const onChange = (change) => {
    setZoom(change.zoom);
  };

  const onClickMarker = (value) => {
    setShowEarthQuakeDetails(true);
    setEarthQuakeDetails({
      header: "Earthquake details",
      content: `<p><b>Magnitude: </b>${
        value.magnitude
      }</p><p><b>Location:</b> ${value.place}</p><p><b>Time: </b>${new Date(
        value.time
      )}</p>`,
    });
  };

  const getTextRelatedToMagnitudeOnBirthday = (magnitude) => {
    if (magnitude < 3) return textForInfoCard.birthday.micro;
    else if (magnitude < 4.0 && magnitude >= 3.0)
      return textForInfoCard.birthday.minor;
    else if (magnitude < 5.0 && magnitude >= 4.0)
      return textForInfoCard.birthday.light;
    else if (magnitude < 6.0 && magnitude >= 5.0)
      return textForInfoCard.birthday.moderate;
    else if (magnitude < 7.0 && magnitude >= 6.0)
      return textForInfoCard.birthday.strong;
    else if (magnitude < 8.0 && magnitude >= 7.0)
      return textForInfoCard.birthday.major;
    else if (magnitude >= 8.0) return textForInfoCard.birthday.highest;
    else return textForInfoCard.birthday.micro;
  };

  return (
    <>
      <Grid container item>
        <div className={classes.headline}>
          <Headline>{"Your personal earthquake tectonicscope"}</Headline>
        </div>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={2} md={4}></Grid>
        <Grid item xs={5} md={2}>
          <div className={classes.selectBirthdayDate}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                value={birthday}
                openTo="year"
                onChange={(birthDate) => {
                  changeBirthday(birthDate);
                }}
                variant="dialog"
                disableToolbar
                id="date"
                animateYearScrolling
                label={"Enter your birthday"}
                disableFuture={true}
              />
            </MuiPickersUtilsProvider>
          </div>
        </Grid>
        <Grid item xs={5} md={6}>
          <div className={classes.selectYear}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                value={month}
                onChange={(month) => {
                  changeMonth(month);
                }}
                variant="dialog"
                id="date"
                label={"Select a month"}
                views={["year", "month"]}
                disableFuture={true}
              />
            </MuiPickersUtilsProvider>
          </div>
        </Grid>

        <Grid item md={8} xs={8}>
          <Map
            center={centerOfMap}
            initialZoom={initialZoom}
            onChange={(change) => onChange(change)}
            markers={
              filteredData
                ? filteredData.map((earthQuake) => (
                    <Marker
                      key={earthQuake.id}
                      diameter={convertMagnitudeToRadius(
                        earthQuake.magnitude,
                        zoom
                      )}
                      lat={earthQuake.latitude}
                      lng={earthQuake.longitude}
                      onClick={() => onClickMarker(earthQuake)}
                    />
                  ))
                : []
            }
          />
        </Grid>
        <Grid item md={4} xs={4}>
          {!dataLoaded ? (
            <CircularProgress className={classes.loadingAnimation} />
          ) : (
            infoCardContent && (
              <InfoCard
                infoCardHeader={infoCardContent.header}
                infoCardContent={infoCardContent.content}
              />
            )
          )}
          {showEarthQuakeDetails && earthQuakeDetails && (
            <InfoCard
              infoCardHeader={earthQuakeDetails.header}
              infoCardContent={earthQuakeDetails.content}
            />
          )}
          {birthday && dataLoaded && (
            <div className={classes.giftRecommendation}>
              <Typography>Birthday gift idea </Typography>
              <div className={classes.button}>
                <Button
                  className={classes.buttonColor}
                  variant={"contained"}
                  onClick={() =>
                    window.open("https://www.instagram.com/moonribas/?hl=en")
                  }
                >
                  get a seismic sense implant
                </Button>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}
