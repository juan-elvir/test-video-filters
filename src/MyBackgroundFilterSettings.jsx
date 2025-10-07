import { useBackgroundFilters } from "@stream-io/video-react-sdk";

export const MyBackgroundFilterSettings = () => {
  const {
    isSupported, // checks if these filters can run on this device
    isReady, // checks if the filters are ready to be enabled
    disableBackgroundFilter, // disables the filter
    applyBackgroundBlurFilter, // applies the blur filter
    applyBackgroundImageFilter, // applies the image filter
    backgroundImages, // list of available images
  } = useBackgroundFilters();
  if (!isSupported) {
    return <div>Background filters are not supported on this device</div>;
  }
  if (!isReady) {
    return <div className="my-loading-indicator" />;
  }
  return (
    <div className="my-video-filters">
      <button onClick={disableBackgroundFilter}>Disable</button>
      <button onClick={() => applyBackgroundBlurFilter("high")}>Blur</button>
      <button onClick={() => applyBackgroundBlurFilter("medium")}>Blur</button>
      <button onClick={() => applyBackgroundBlurFilter("low")}>Blur</button>
      <ul>
        {backgroundImages.map((image) => (
          <li key={image}>
            <img src={image} alt="background" />
            <button onClick={() => applyBackgroundImageFilter(image)}>
              Apply background
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
