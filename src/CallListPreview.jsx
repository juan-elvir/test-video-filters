import { useMemo } from "react"
import { useActiveCallContext } from "./ActiveCallContext"
export const CallListPreview = ({call})=>{
    const {participants, } = call.state?.session || call.session
    const {setActiveCall} = useActiveCallContext()

    const renderCurrentParticipants = useMemo(()=>{
        let str = '';
        for(let p of participants){
            str+= `${p.user.name}, `
        }
        return str
    },[participants])

    const handleSelect = async()=>{
        await call.join()
        setActiveCall(call)
    }
    return(
        <div className="call-list-preview" onClick={handleSelect}>
            <strong>{renderCurrentParticipants} in this call</strong>
            <strong>{call.cid}</strong>
        </div>
    )
}