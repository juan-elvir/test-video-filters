import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useState, useEffect } from "react"
const CallRing = ()=>{
    const [ringing, setRinging] = useState(false)
    const client = useStreamVideoClient()

    useEffect(()=>{
        client.on("call.ring", ()=>{
            setRinging(true)
            set
        })
    },[])
    return(
        <div>
            { ringing && <span>Someone is calling you...</span>}
        </div>
    )
}

export default CallRing