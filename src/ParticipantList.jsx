import { useCall, useCallStateHooks, } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

const ParticipantList = ()=>{
    const [open, toggleOpen] = useState(false)
    const {useParticipants}= useCallStateHooks()
    const call = useCall()
    const participants = useParticipants()

    const muteParticipant = async (p)=>{
        const res = await call.muteUser(p.userId, "audio")
        console.log(res)
    }

    return (
        <div>
            <strong onClick={()=>toggleOpen(!open)}>Participants</strong>
            {open ? 
                <div style={{display:"flex", justifyContent: 'space-evenly'}}>
                                {participants.map((p)=><p style={{color:"skyblue"}} onClick={()=>{muteParticipant(p)}}>{p.name === ''? p.userId : p.name}</p>)}
                </div>
             : ''}
            

        </div>
    )
}

export default ParticipantList