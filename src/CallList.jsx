import { useEffect, useState } from "react"
import { useActiveCallContext } from "./ActiveCallContext"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { CallListPreview } from "./CallListPreview"
export const CallList = ()=>{
    const [calls, setCalls] = useState([])
    const client = useStreamVideoClient()
    
    useEffect(()=>{
        const unsubscribe = client.on("call.session_started", async(event) => {
            console.log(event)
            setCalls([event.call, ...calls])
      });
        const getCalls = async()=>{
            const c = await client.queryCalls({filter_conditions:{ongoing:true}})
            console.log(c.calls)
            setCalls(c.calls)
        }

        getCalls()
        return()=>{
            unsubscribe()
        }
    },[])

    return(
        <div>
            hey

            {calls.map(c=><CallListPreview call={c} key={c.cid}/>)}
        </div>
    )
}