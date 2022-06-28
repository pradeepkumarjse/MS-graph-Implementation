import React ,{useState} from 'react'
import {Button,  Col, Form, Row } from "react-bootstrap";
import { Link, NavLink as RouterNavLink, RouteComponentProps } from 'react-router-dom';



export default function UpdateEvent(props) {
    console.log("KKKKKKKKKKKKKK"+JSON.stringify(props.graphData))
    const [subject, setSubject] = useState("");
  const [attendees, setAttendees] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [body, setBody] = useState("");
  const [formDisabled, setFormDisabled] = useState(true);

  
 const test =() =>{
     setSubject(props.graphData);
  }
  test
  console.log("{}{}{}{}{{}"+subject)
  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
        <h6 className="mt-4">Update Meeting</h6>
          <div className="card-body">
          
          <form>
              
              Subject : <input
                type="text"
                name="subject"
                id="subject"
                className="mb-2"
                value={subject}
                onChange={(ev) => setSubject(ev.target.value)}
              />
            <br/>
              Attendees : 
              <input
                type="text"
                name="attendees"
                id="attendees"
                className="mb-2"
                placeholder="Enter a list of email addresses, seperated by a semi-colon"
                value={attendees}
                onChange={(ev) => setAttendees(ev.target.value)}
              />
            <br/>
            
                  Start :
                  <input
                    type="datetime-local"
                    name="start"
                    id="start"
                    //value={props.graphData.start.dateTime}
                    onChange={(ev) => setStart(ev.target.value)}
                  />
                <br/>
              <br/>
                 End :
                  <input
                    type="datetime-local"
                    name="end"
                    id="at"
                  // value={props.graphData.end.dateTime}
                    onChange={(ev) => setEnd(ev.target.value)}
                    
                  />
              <br/> <br/>
              Description :
              <input
                as="textarea"
                name="body"
                id="body"
                className="mb-3"
                style={{ height: "10em" }}
                value={body}
                onChange={(ev) => setBody(ev.target.value)}
              />
            <br/>
            <div className="text-center">
            <Button
              color="primary"
              className="me-2"
              // disabled={formDisabled}
              onClick={() => console.log("clicked")}
            >
              Create
            </Button>
            &nbsp;&nbsp;
            <RouterNavLink to="/" className="btn btn-danger" exact>
              Cancel
            </RouterNavLink>
            </div>
            </form>
          </div>
           


        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
