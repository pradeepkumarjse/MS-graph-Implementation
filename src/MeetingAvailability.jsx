import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
//import parse from 'html-react-parser'
import { Button, Modal } from "react-bootstrap";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import {
  Link,
  NavLink as RouterNavLink,
  RouteComponentProps,
} from "react-router-dom";
import { checkAvailability } from "./graph";
// import mdx from "./onSelectEvent.mdx";
import { loginRequest } from "./authConfig";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";



function formatDateTime(dateTime) {
  return moment.utc(dateTime).local().format("dddd, MMMM DD, YYYY hh:mm a");
}
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

  export default {
    title: "props",
    component: Calendar,
    parameters: {
      docs: {
       // page: mdx,
      },
    },
  };

export const  MeetingAvailability = (props) => {
  const [calenderData, setCalenderData] = useState();
  const { instance, accounts } = useMsal();
  const [attendees, setAttendees] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");


  useEffect(() => {
   // RequestAvailability();
  }, []);

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  const newEvent = {"attendees": [
    {
        "emailAddress": {
            "address": "ravi.singh@realcoderz.in"
        }
    }
],
"timeConstraint": {
    "timeslots": [
        {
            "start": {
                "dateTime": "2022-06-08T14:23:26.584Z",
                "timeZone": "Pacific Standard Time"
            },
            "end": {
                "dateTime": "2022-06-15T14:23:26.584Z",
                "timeZone": "Pacific Standard Time"
            }
        }
    ]
},
"locationConstraint": {
    "isRequired": "false",
    "suggestLocation": "true",
    "locations": [
        {
            "displayName": "Conf Room 32/1368",
            "locationEmailAddress": "conf32room1368@imgeek.onmicrosoft.com"
        }
    ]
},
"meetingDuration": "PT1H"
  };

  function RequestAvailability() {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
        
      })
      .then((response) => {        
          checkAvailability(response.accessToken,newEvent).then((response) =>
          setCalenderData(response)
        );       
      });
  }

 
  let allViews = Object.keys(Views).map((k) => Views[k]);

const eve=props.availability.meetingTimeSuggestions.map((data)=>{
    return {
            title: data.attendeeAvailability.map((data) =>{return  " "+data.availability+" "}),                     
            start: new Date(formatDateTime(data.meetingTimeSlot.start.dateTime)),
            end: new Date(formatDateTime(data.meetingTimeSlot.end.dateTime))           
          }  
   })

  return (
    <>   
    <h1>Meeting Availability</h1>
    <Calendar
        dayLayoutAlgorithm="no-overlap"
        defaultView={Views.DAY}
        events={eve}
        localizer={localizer}        
        startAccessor="start"
        endAccessor="end"
        showMultiDayTimes
        step={15}
        views={allViews}
        onSelectEvent={(event) => handleSelectedEvent(event)}
        style={{ height: 500, margin: "50px" }}
      />  
    </>
  );
}
