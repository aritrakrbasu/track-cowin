import React from 'react'
import { useEffect } from 'react'
import { db } from './firebase'
function CheckVaccine() {

    

    function checkavalability () {
        console.log("yo")
        const today = `${new Date().getDate()}-0${
            new Date().getMonth() + 1
          }-${new Date().getFullYear()}`;

        db.collection("userData").doc("userData").get().then((docs)=>{
            if(docs.exists)
            {   
                var list=docs.data().list

                list.forEach((user)=>{
                    const district_id = user.district
                    var processed =0
                    const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${today}`
                    var availableCenters =[]
                    
                    fetch(url , {
                        "method":"GET",
                    })
                        .then(res =>res.json())
                        .then (list =>{
                            var sessions = list.sessions
                            
                            if(sessions.length > 0)
                            {
                                sessions.forEach(session => {
                                    processed++;
                                    if(session.available_capacity > 0)
                                        availableCenters.push(session)
                                        SendMail(availableCenters,user.name,user.email)
                                });
                            }
                        })
                })

            }
        })
    }
    // setInterval(checkavalability(), 60000);

    function SendMail(availableCenters,name,email)
    {

        var centerslist = "<table border=2>";
            centerslist += `<tr> 
                <th> Center Name </th> 
                <th> Center Address</th> 
                <th>Available Capacity</th> 
                <th>Fee</th> 
                <th>Details</th> 
                <th>slots</th>
                </tr>`
        for(var i=0; i<availableCenters.length; i++) {
                var slots=availableCenters[i].slots
                centerslist += "<tr>";
                centerslist += "<td>"+availableCenters[i].name+"</td>";
                centerslist += "<td>"+availableCenters[i].address+"<br> <strong>Pincode:</strong> "+availableCenters[i].pincode+"<br> <strong>State:</strong> "+availableCenters[i].state_name+"<br> <strong>District: </strong> "+availableCenters[i].district_name+"</td>";
                centerslist += "<td>"+availableCenters[i].available_capacity+"</td>";
                centerslist += "<td>"+availableCenters[i].fee_type+"<br> Rs "+availableCenters[i].fee+"/-</td>";
                centerslist += "<td> <Strong>Minimum Age : </strong>"+availableCenters[i].min_age_limit+"<br> <strong>Vaccine Type: </strong> "+availableCenters[i].vaccine+"</td>";
                centerslist += "<td>";
                    for(var j=0; j<slots.length; j++) {
                        centerslist += `${availableCenters[i].slots[j]}<br>`;
                    }
                centerslist+="</td>";
                centerslist += "</tr>";
            }

        centerslist += `</table> 
        <br><br>
        <p><strong><span style="color: #e03e2d;">Note: This websites sends you an automated email whenever their is a availability of vaccine in your area . We use COWIN Api and is not atall an official website for covid vaccine registration . You can book your appointment for covid vaccine by registering at </span> <a href="https://www.cowin.gov.in/home" target="_blank" rel="noopener">COWIN</a></strong></p>
        <br>
        <p><strong>If you want to stop getting notifications <a href="https://track-cowin.firebaseapp.com/unsubscribe/${email}" target="_blank" rel="noopener">click here</a> . </strong></p>
        `;
        window.Email.send({
            SecureToken  : "8d75da15-c063-43cb-be1a-dc1759e6bf49",
            To : email,
            From : "aritrabasu71@gmail.com",
            Subject : `Vaccine available ${name} !!! - ${availableCenters[0].date}`,
            Body : centerslist
        }).then(
          message => console.log(message)
        );
    }


    return (
        <div>
            <h1>Checking for vaccines ...........</h1>
        </div>
    )
}

export default CheckVaccine
