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

export default function (props) {
  let allViews = Object.keys(Views).map((k) => Views[k]);
  const [show, setShow] = useState(false);
    const [modelEvent, setModelEvent] = useState([]);

  console.log(props.availability);

  let event = [];

  useEffect(() => {
    handleClose()
}, [])

  props.availability.value.map((val) => {
    event = val.scheduleItems.map((data) => {
      return {
        title: data.status,
        start: new Date(formatDateTime(data.start.dateTime)),
        end: new Date(formatDateTime(data.end.dateTime)),
        subject: data.subject
      };
    });
  });
  const handleShow = (event) => {
    setShow(true);

}

const handleClose = () => setShow(false);

  const handleSelectedEvent = (event) => {
    setModelEvent(event);            
    handleShow();        
  };

  return (
    <>
      <h2> Availability</h2>

      <Calendar
        dayLayoutAlgorithm="no-overlap"
        defaultView={Views.DAY}
        events={event}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        showMultiDayTimes
        step={15}
        views={allViews}
        onSelectEvent={(event) => handleSelectedEvent(event)}
        style={{ height: 500, margin: "50px" }}
      />

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
              Availability: {modelEvent.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body><div>
        <p>Start Time : {formatDateTime(modelEvent.start)} </p>
        <p>End Time &nbsp;&nbsp;: {formatDateTime(modelEvent.end)}</p>
        </div>   
        {/* <h6>Subject : {modelEvent.subject}</h6> */}
               
        </Modal.Body>
        <Modal.Footer>
        
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
        </Modal.Footer>
    </Modal>
    </>
  );
}
