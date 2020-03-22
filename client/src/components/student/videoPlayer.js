import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ activeVideo, autoplay, video }) => {
  return (
    <ReactPlayer
      // Disable download button
      config={{ file: { attributes: { controlsList: "nodownload" } } }}
      url={video}
      playing={true}
      pip
      controls
      light
      width="100%"
      height="28vw"
      style={{ backgroundColor: "#142634" }}
    />
  );
};
export default VideoPlayer;
