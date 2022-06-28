import React from "react";

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ProfileData = (props) => {
    console.log(props.graphData);

    return (
        <div id="profile-div">
            {/* <p><strong>Id: </strong> {props.graphData.id}</p> */}
            
            <p><strong>Name: </strong> {props.graphData.displayName}</p>
            
            <p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
            <p><strong>Job Title: </strong> {props.graphData.jobTitle}</p>
            <p><strong>Id: </strong> {props.graphData.id}</p>
            <p><strong>Office Location : </strong> {props.graphData.officeLocation}</p>
        </div>
    );
};