import {
  useCall,
  useCallStateHooks,
  StreamTheme,
  CallControls,
  SpeakerLayout,
  CallState,
  PaginatedGridLayout, 
  useCalls
} from "@stream-io/video-react-sdk";
import { MyFloatingLocalParticipant } from "./MyFloatingLocalParticipant";
import { MyParticipantList } from "./MyParticipantList";
import { CustomParticipantDetails } from "./CustomParticipantViewUI";
import { CustomCallControls } from "./CustomCallControls";
import { useEffect, useState } from "react";
import ParticipantList from "./ParticipantList";
import AddMember from "./AddMember";
import { useChatContext } from "stream-chat-react";
import { Channel, MessageList, MessageInput } from "stream-chat-react";

export const CallUILayout = ({ setActiveChannel }) => {
  const { client: chatClient } = useChatContext();
  const [layoutPref, setLayoutPref] = useState("grid");
  const [chatChannel, setChatChannel] = useState();
  const call = useCall();
  const calls = useCalls();

  useEffect(() => {
    console.log(calls);
  }, [calls]);

  // const incomingCalls = calls.filter(
  //   (call) =>
  //     call.isCreatedByMe === false &&
  //     call.state.callingState === callingState.RINGING
  // );

  useEffect(() => {
    call.on("custom", (evt) => {
      console.log(evt);
    });

    const createChannel = async () => {
      const chan = chatClient.channel("livestream", call.id);
      setChatChannel(chan);
    };

    createChannel();
  }, []);
  // console.log(useCallStateHooks)

  const {
    useCallCallingState,
    useLocalParticipant,
    useRemoteParticipants,
    useScreenShareState,
    useCallIngress,
    useCallSession
  } = useCallStateHooks();

  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  const screenshare = useCallSession();
  const sendCustomEvent = () => {
    call.sendCustomEvent({
      type: "participant_name_updated"
    });
  };

  const logState = async () => {
    const res = await call.get({ members_limit: 100 });
    console.log(res);
  };

  const toggleLayout = () => {
    if (layoutPref === "grid") {
      setLayoutPref("speaker");
    } else {
      setLayoutPref("grid");
    }
  };

  if (callingState !== "joined") {
    return (
      <>
        <div>Loading...</div>
        <button onClick={logState}>Log State</button>
      </>
    );
  }

  return (
    <StreamTheme>
      {/* <MyParticipantList participants={remoteParticipants} /> */}
      {/* <MyFloatingLocalParticipant participant={localParticipant} /> */}
      <div style={{ width: "100vw", height: "90vh", display: "flex" }}>
        <div style={{ width: "60vw" }}>
          {layoutPref === "speaker" ? (
            <SpeakerLayout
              participantsBarPosition="bottom"
              ParticipantViewUIBar={CustomParticipantDetails}
              ParticipantViewUISpotlight={CustomParticipantDetails}
            />
          ) : (
            ""
          )}
          {layoutPref === "grid" ? (
            <PaginatedGridLayout ParticipantViewUI={CustomParticipantDetails} />
          ) : (
            ""
          )}
        </div>
        <div style={{ width: "20vw" }}>
          <Channel channel={chatChannel}>
            <div style={{ display: "block" }}>
              <div style={{ height: "90%" }}>
                <MessageList />
              </div>
              <div style={{ height: "10%" }}>
                <MessageInput />
              </div>
            </div>
          </Channel>
        </div>
      </div>

      <CustomCallControls layoutPref={layoutPref} toggleLayout={toggleLayout} />
      <AddMember />
      <ParticipantList />
      <button onClick={logState}>Log State</button>
      <button onClick={toggleLayout}>Toggle Layout</button>
      <button onClick={sendCustomEvent}>Send Event</button>
      <button onClick={() => console.log(screenshare)}>LogScreenShare</button>
    </StreamTheme>
  );
};
