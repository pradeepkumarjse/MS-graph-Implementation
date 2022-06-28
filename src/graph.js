import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken 
 */

export async function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };
    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export async function callCalenderData(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };
    
    //Generate startDateTime and endDateTime query params
    // to display a 7-day window
    // const now = new Date();
    // const startDateTime = zonedTimeToUtc(startOfWeek(now), timeZone).toISOString();
    // const endDateTime = zonedTimeToUtc(endOfWeek(now), timeZone).toISOString();

    return fetch(graphConfig.calenderEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}



export async function addMeeting(accessToken,newEvent) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append('Content-Type', 'application/json')

    const options = {
        method: "POST",
        headers: headers
    };   


    return fetch(graphConfig.addMeeting, {
        method: "POST",
        body:JSON.stringify(newEvent),
        headers:headers
    
    }).then(response => response.json())
        .catch(error => console.log(error));   

}

export async function cancelMeeting(accessToken,id) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append('Content-Type', 'application/json')

    const options = {
        method: "POST",
        headers: headers
    };   

    const cancellationMessage={
        Comment: 'Cancelling for this week due to all hands',
    }

    return fetch(`https://graph.microsoft.com/v1.0/me/events/${id}/cancel`, {
        method: "POST",
        body:JSON.stringify(cancellationMessage),
        headers:headers
    
    }).then(response => response.json())
        .catch(error => console.log("CALCELLATION ERROR",error));   

}

export async function getEventById(accessToken,id) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append('Content-Type', 'application/json')

    const options = {
        method: "POST",
        headers: headers
    };   

  
    return fetch(`https://graph.microsoft.com/v1.0/me/events/${id}?$select=subject,organizer,attendees,start,end,body`, {
        method: "GET",
       // body:JSON.stringify(cancellationMessage),
        headers:headers
    
    }).then(response => response.json())
        .catch(error => console.log("Get event by id ERROR",error));   

}


export async function checkAvailability(accessToken,newEvent) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append('Content-Type', 'application/json')

    const options = {
        method: "POST",
        headers: headers
    };
    return fetch(graphConfig.availabilityCheck, {
        method: "POST",
        body:JSON.stringify(newEvent),
        headers:headers
    
    }).then(response => response.json())
        .catch(error => console.log(error));    
}

export async function freeBusySchedule(accessToken,data) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append('Content-Type', 'application/json')

    const options = {
        method: "POST",
        headers: headers
    };
    return fetch(graphConfig.freeBusySchedule, {
        method: "POST",
        body:JSON.stringify(data),
        headers:headers
    
    }).then(response => response.json())
        .catch(error => console.log(error));    
}