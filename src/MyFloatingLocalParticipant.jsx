import { ParticipantView } from "@stream-io/video-react-sdk";
import { CustomParticipantDetails } from "./CustomParticipantViewUI";

export const MyFloatingLocalParticipant = ({participant}) => {
  if (!participant) {
    return <p>Error: No local participant</p>;
  }

  return (
    <div
      style={{
        display:"flex",
        alignContent:"center",
        // position: 'absolute',
        // top: '15px',
        // left: '15px',
        width: '240px',
        height: '135px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
        borderRadius: '12px',
      }}
    >
      <ParticipantView participant={participant} ParticipantViewUI={CustomParticipantDetails}/>
    </div>
  );
};
