import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db } from './firebase'
import github_icon from './img/github.png'
function Unsubscribe() {
    const {email} = useParams()
    const [success, setSuccess]=useState()

    useEffect(()=>{
        db.collection("userData").doc("userData").get().then((docs)=>{
            if(docs.exists)
            {
                var list = docs.data().list
                var newlist = list.filter(listitem=>listitem.email!==email)
                db.collection("userData").doc("userData").update({
                    list:newlist
                }).then(()=>setSuccess(true))
            }else
            {
                setSuccess(true)
            }
        })
    },[email])

    return (
        <div>
            {
            success && 
                <div className="unsubscribe">
                    <h1>Thank you for using our service . If we have helped you do consider giving a link in github .</h1>
                    <span>You will not get any further notifications to reset <a href="https://track-cowin.firebaseapp.com/"><u>Click here</u></a></span>
                    <a href="https://github.com/aritrakrbasu/track-cowin" target="_blank" rel="noreferrer"><img src={github_icon} alt="github-icon" /></a>
                </div>
            }
        </div>
    )
}

export default Unsubscribe
