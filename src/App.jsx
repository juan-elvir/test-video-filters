import { useState, useEffect } from "react";
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCalls,
  useCallStateHooks,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  RingingCall
} from "@stream-io/video-react-sdk";

import {Chat} from "stream-chat-react"
import { StreamChat } from "stream-chat";
import { MyParticipantList } from "./MyParticipantList";
import { MyFloatingLocalParticipant } from "./MyFloatingLocalParticipant";
import { CreateCall } from "./CreateCall";
import { CallUILayout } from "./CallUILayout";
import { ActiveCallContext } from "./ActiveCallContext";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import LoginForm from "./LoginForm";
import axios from "axios";
import { CallList } from "./CallList";
import "stream-chat-react/dist/css/v2/index.css";
// import CallRing from "./CallRing";

import VideoUI from "./VideoUI";

const apiKey = "mtvqmr3ucpd3";

// set up the user object
// const user = {
//   id: userId,
//   name: '',
// };

// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call('default', callId);
// await call.join({ create: true });

export default function App() {
  const [user, setUser] = useState();
  const [StreamClient, setStreamClient] = useState();
  const [chatClient, setChatClient] = useState();
  
  
  // const { useCallCallingState } = useCallStateHooks();

  // const callingState = useCallCallingState();
  const login = async (u) => {
    try {
      // const { data } = await axios.post("http://localhost:8080" + "/connect", {
      //   user_id: u.id
      // });
      const token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibWFuZ28ifQ.5AwO04h1mBLkRKaYE3yUL5hVx1JFSj_C29ayHBvt4g0"
      console.log(token, u);
      setUser(u);
      const client = new StreamVideoClient({ apiKey, u, token });
      const client2 = new StreamChat(apiKey)
      await client.connectUser(u, token);
      await client2.connectUser(u, token)
      setStreamClient(client);
      setChatClient(client2)
      // client.on('all',(evt)=>{
      //   console.log(evt)
      // })
      
    } catch (err) {
      console.log(err);
    }
  };
// useEffect(()=>{
//   console.log(calls)
// },[calls])
//     const incomingCalls = calls.filter(
//     (call) =>
//       call.isCreatedByMe === false &&
//       call.state.callingState === CallingState.RINGING,
//   );

  return (
    <>
      {StreamClient ? (
        <StreamVideo client={StreamClient}>
          <Chat client={chatClient}>
            <VideoUI />
          </Chat>
        </StreamVideo>
      ) : (
        <LoginForm login={login} />
      )}
    </>
  );
}
