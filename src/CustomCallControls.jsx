import {
  SpeakingWhileMutedNotification,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  CancelCallButton,
  ScreenShareButton,
  StreamTheme,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

const  CustomLayoutButton = ({layoutPref, toggleLayout})=>{
    return <button onClick={toggleLayout}><img src={"src/assets/speaker.svg"} style={{height:"20px", borderRadius:"200px"}} className="str-video__composite-button__button str-video__composite-button--menu str-video__composite-button str-video__composite-button--caption"/></button>
}

const CustomScreenShareButton = ()=>{
      const { useScreenShareState } = useCallStateHooks();
    const { screenShare, status } = useScreenShareState();

    return (
      <>

        <button onClick={()=>screenShare.toggle()} style={{borderRadius:"200px", backgroundColor:(status?"red":"green")}} className="str-video__composite-button__button">
            Share Screen
        </button>
        <button onClick={()=>console.log(status)} style={{borderRadius:"200px", backgroundColor:(status?"red":"green")}} className="str-video__composite-button__button">
            Share Screen log
        </button>
        </>
    )
}

const CustomAudioPublishingButton = ()=>{
    const { useMicrophoneState, } = useCallStateHooks();
    const { microphone, isMute } = useMicrophoneState();

    return (
      <>
        <button onClick={()=>microphone.toggle()} style={{borderRadius:"200px", backgroundColor:(isMute?"red":"green")}} className="str-video__composite-button__button">
            <img src="src/assets/mic.svg" style={{height:"20px", }}/>
        </button>
        <button onClick={()=>console.log(isMute)} style={{borderRadius:"200px", backgroundColor:(status?"red":"green")}} className="str-video__composite-button__button">
            MuteState log
        </button>
        </>
        
    )
}

const CustomVideoPublishingButton = ()=>{
    const { useCameraState } = useCallStateHooks();
    const { camera, isMute } = useCameraState();

    return (
        <button onClick={()=>camera.toggle()} style={{borderRadius:"200px", backgroundColor:(isMute?"red":"green")}} className="str-video__composite-button__button">
            <img src="src/assets/camera.svg" style={{height:"20px", }}/>
        </button>
    )
}

export const CustomCallControls = ({layourPref, toggleLayout}) => {
  const call = useCall();
  return (
    <div className="str-video__call-controls">
      <ScreenShareButton />
      <CustomLayoutButton toggleLayout={toggleLayout}/>
      <SpeakingWhileMutedNotification>
        <CustomAudioPublishingButton />
      </SpeakingWhileMutedNotification>
      <CustomVideoPublishingButton />
      <CustomScreenShareButton />
      <CancelCallButton
        onLeave={() => {
          console.log("onLeave callback called");
        }}
      />
    </div>
  );
};