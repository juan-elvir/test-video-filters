import { ParticipantView } from '@stream-io/video-react-sdk';


export const MyParticipantList = ({ participants }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      {participants.map((participant) => (
        <ParticipantView participant={participant} key={participant.sessionId} />
      ))}
    </div>
  );
};