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
  RingingCall,
  useStreamVideoClient,
  BackgroundFiltersProvider
} from "@stream-io/video-react-sdk";

import { Chat } from "stream-chat-react";
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
import { MyBackgroundFilterSettings } from "./MyBackgroundFilterSettings";


const VideoUI = () => {
  const [activeCall, setActiveCall] = useState();

  const client = useStreamVideoClient();

  useEffect(() => {
    client.on("call.ring", (evt) => {
      console.log(evt, evt.call);
      setActiveCall(evt.call);
    });
  }, []);

  return (
    <ActiveCallContext activeCall={activeCall} setActiveCall={setActiveCall}>
      <div className="video-container">
        <div className="side-panel">
          <CreateCall setActiveCall={setActiveCall} />
          <CallList />
        </div>
        <div className="call-container">
          {activeCall && (
            <StreamCall call={activeCall}>
              <BackgroundFiltersProvider
                backgroundFilter="blur" // initial filter
                backgroundImages={[
                  "/Users/juanelvir/Desktop/video/react-video-tutorial/src/assets/stream-1.jpg"
                ]}
              >
                {/* <RingingCall /> */}
                <CallUILayout />
                <MyBackgroundFilterSettings />
              </BackgroundFiltersProvider>
            </StreamCall>
          )}
        </div>
        {/* <button onClick={()=>console.log(callingState)}>log call</button> */}
      </div>
    </ActiveCallContext>
  );
};
export default VideoUI;
