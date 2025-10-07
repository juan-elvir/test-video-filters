import { useParticipantViewContext } from "@stream-io/video-react-sdk";

export const CustomParticipantDetails = ()=>{
    
    const { participant } = useParticipantViewContext();
    // console.log(participant)
    return (
        
            <span
            style={{
                position:"absolute",
                bottom:"0px",
                left:"0px",
                padding:"3px",
                backgroundColor:"black"
            }}
            >
                {participant.name} loves {participant.custom?.fields?.animal?.kind?.stringValue ||"nothing"}
                </span>
        
    )
}