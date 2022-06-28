// import React, { useEffect, useState } from "react";
// import { Button, Col, Form, Row } from "react-bootstrap";
// //import { Attendee, Event } from 'microsoft-graph';


// import { Alert } from 'react-bootstrap';

// import 'react-toastify/dist/ReactToastify.css'

// import {
//   NavLink as RouterNavLink,
//   Redirect,
//   RouteComponentProps,
     
// } from "react-router-dom";
// import { addMeeting } from "./graph";
// import { loginRequest } from "./authConfig";
// import {
//   AuthenticatedTemplate,
//   UnauthenticatedTemplate,
//   useMsal,
// } from "@azure/msal-react";

// export default function GmeetInterview() {
//   const [subject, setSubject] = useState("");
//   const [attendees, setAttendees] = useState("");
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [body, setBody] = useState("");
//   const [formDisabled, setFormDisabled] = useState(true);
//   const [redirect, setRedirect] = useState(false);

//   const { instance, accounts } = useMsal();

//   const [userEmail, setUserEmail] = useState([]);

//   useEffect(() => {
//     setFormDisabled(
//       subject.length === 0 || start.length === 0 || end.length === 0
//     );
//   }, [subject, start, end]);

  


  

//   const doCreate = async () => {
//     const attendeeEmails = attendees.split(";");
//     const attendeeArray = [];

//     attendeeEmails.forEach((email) => {
//       if (email.length > 0) {
//         attendeeArray.push({
//           emailAddress: {
//             address: email,
//           },
//         });
//       }
//     });

//     const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

//     const newEvent = {
//       subject: subject,
//       isOnlineMeeting: true,
//       // Only add if there are attendees
//       attendees: attendeeArray.length > 0 ? attendeeArray : undefined,
//       // Specify the user's time zone so
//       // the start and end are set correctly
//       start: {
//         dateTime: start,
//         timeZone: timeZone,
//       },
//       end: {
//         dateTime: end,
//         timeZone: timeZone,
//       },
//       // Only add if a body was given
//       body:
//         body.length > 0
//           ? {
//               contentType: "text",
//               content: body,
//             }
//           : undefined,
//     };

    
   
    
//     try {
//       createNewMeeting();
//       window.location.href = window.location.origin
    
//     } catch (err) {
//       // app.displayError!('Error creating event', JSON.stringify(err));
//     }

//     function createNewMeeting() {
//       instance
//         .acquireTokenSilent({
//           ...loginRequest,
//           account: accounts[0],
//         })
//         .then((response) => {
//           //callCalenderData(response.accessToken).then(response => setCalenderData(response));
//           addMeeting(response.accessToken, newEvent).then((response) =>
          
//           console.log("added"),
          
          
//           );
//         });
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="card col-md-6 offset-md-3 offset-md-3">
//         <h6 className="mt-4">New meeting</h6>
//           <div className="card-body">
          
//             <Form className="text-left">
//               <Form.Group>
//                 <Form.Label className="form-group">Subject</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="subject"
//                   id="subject"
//                   className="mb-2"
//                   value={subject}
//                   onChange={(ev) => setSubject(ev.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label className="form-group">Attendees</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="attendees"
//                   id="attendees"
//                   className="mb-2"
//                   placeholder="Enter a list of email addresses, seperated by a semi-colon"
//                   value={attendees}
//                   onChange={(ev) => setAttendees(ev.target.value)}
//                 />
//               </Form.Group>
//               <Row className="mb-2">
//                 <Col>
//                   <Form.Group>
//                     <Form.Label className="form-group">Start</Form.Label>
//                     <Form.Control
//                       type="datetime-local"
//                       name="start"
//                       id="start"
//                       value={start}
//                       onChange={(ev) => setStart(ev.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label className="form-group">End</Form.Label>
//                     <Form.Control
//                       type="datetime-local"
//                       name="end"
//                       id="end"
//                       value={end}
//                       onChange={(ev) => setEnd(ev.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label className="form-group">Attendees</Form.Label>
//                     <Form.Select
//                       type="datetime-local"
//                       name="end"
//                       id="at"
//                       value={end}
//                       onChange={(ev) => setEnd(ev.target.value)}
                      
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Form.Group>
//                 <Form.Label className="form-group">Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   name="body"
//                   id="body"
//                   className="mb-3"
//                   style={{ height: "10em" }}
//                   value={body}
//                   onChange={(ev) => setBody(ev.target.value)}
//                 />
//               </Form.Group>
//               <div className="text-center">
//               <Button
//                 color="primary"
//                 className="me-2"
//                 disabled={formDisabled}
//                 onClick={() => doCreate()}
//               >
//                 Create
//               </Button>
//               &nbsp;&nbsp;
//               <RouterNavLink to="/" className="btn btn-danger" exact>
//                 Cancel
//               </RouterNavLink>
//               </div>
//             </Form>
         
//           </div>
           


//         </div>
//       </div>
//       <br />
//       <br />
//       <br />
//       <br />
//     </div>
//   );
// }
