import format from "date-fns/format";

import { Routes, Switch, Route, Navigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import moment from "moment";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/App.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { PageLayout } from "./components/PageLayout";
import { ProfileData } from "./components/ProfileData";
import { CalenderData } from "./components/CalenderData";
import {
  callMsGraph,
  callCalenderData,
  checkAvailability,
  freeBusySchedule,
} from "./graph";

import "react-datepicker/dist/react-datepicker.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import AddMeeting from "./AddMeeting";
import GmeetInterview from "./GmeetInterview";
import UpdateEvent from "./UpdateEvent";



import AntdMeeting from "./AntdMeeting";

import { MeetingAvailability } from "./MeetingAvailability";
import Availability from "./Availability";

import "bootstrap/dist/css/bootstrap.css";

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

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [calenderData, setCalenderData] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [freeBusy, setFreeBusy] = useState(null);
  const [email, setEmail] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }

  function RequestCalenderData() {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callCalenderData(response.accessToken).then((response) =>
          setCalenderData(response)
        );
      });
  }
  const attenInfo = {
    attendees: [
      {
        emailAddress: {
          address: "Ravi.singh@realcoderz.in",
          name: "Ravi Singh",
        },
        type: "Required",
      },
    ],
    timeConstraint: {
      timeslots: [
        {
          start: {
            dateTime: "2022-06-09T11:46:31.231Z",
            timeZone: "Pacific Standard Time",
          },
          end: {
            dateTime: "2022-06-16T11:46:31.231Z",
            timeZone: "Pacific Standard Time",
          },
        },
      ],
    },
    locationConstraint: {
      isRequired: "false",
      suggestLocation: "true",
      locations: [
        {
          displayName: "Conf Room 32/1368",
          locationEmailAddress: "conf32room1368@imgeek.onmicrosoft.com",
        },
      ],
    },
    meetingDuration: "PT1H",
  };

  function RequestAvailability() {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        checkAvailability(response.accessToken, attenInfo).then((response) =>
          setAvailability(response)
        );
      });
  }
 


  const avai = {
    schedules: [email],
    startTime: {
      dateTime: moment.utc(start),
      timeZone: "UTC",
    },
    endTime: {
      dateTime: moment.utc(end),
      timeZone: "UTC",
    },
    availabilityViewInterval: 30,
  };

  function checkAvailability() { 
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        freeBusySchedule(response.accessToken, avai).then((response) =>
          setFreeBusy(response),
        );
      });
  }

  return (
    <>
      <Router>
        <Switch>
          <Route path="/addmeeting" component={AddMeeting} />
          <Route path="/add" component={AntdMeeting} />
          {/* <Route path="/gmeet" component={GmeetInterview} /> */}
          <Route path="/update" component={UpdateEvent} />
          

          
        </Switch>
        <h5 className="card-title">Welcome {accounts[0].name}</h5>
        {graphData ? (
          <ProfileData graphData={graphData} />
        ) : (
          <Button variant="secondary" onClick={RequestProfileData}>
            Request Profile Information
          </Button>
        )}
        &nbsp;&nbsp; &nbsp; &nbsp;
        {calenderData ? (
          <CalenderData calenderData={calenderData} />
        ) : (
          <Button variant="secondary" onClick={RequestCalenderData}>
            Request Calender Information
          </Button>
        )}
        &nbsp;&nbsp; &nbsp; &nbsp;
        <br />
        <br />
        
        <Form className="card col-md-6 offset-md-3 offset-md-3 text-left">
          {/* <Form.Group>
            <Form.Control
              type="email"
              name="email"
              id="email"
              className="mb-2"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </Form.Group> */}
          <label className="mt-2">Enter Email </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mb-2"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
         
         <label> Select Start Date </label>
          <input
            type="datetime-local"
            name="start"
            id="start"
            value={start}
            onChange={(ev) => setStart(ev.target.value)}
          />
          <br />
         <label> Select End Date </label>
          <input
            type="datetime-local"
            name="end"
            id="end"
            value={end}
            onChange={(ev) => setEnd(ev.target.value)}
          />
          <br />
          </Form>
          &nbsp; &nbsp;
          {freeBusy ? (
            <Availability availability={freeBusy} />
          ) : (
            <Button variant="secondary" onClick={checkAvailability}>
              Check Availability
            </Button>
          )}
        
      </Router>
    </>
  );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5 className="card-title">
          Please sign-in to see your profile information.
        </h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App() {
  return (
    <PageLayout>
      <MainContent />
      <div className="App"></div>
    </PageLayout>
  );
}
