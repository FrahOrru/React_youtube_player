import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useVideoContext } from "../context/video";
import { useEffect, useState } from "react";
import { VideoImage } from "../components/vdeo_card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { VideoPlayer } from "../components/video_player";

const PlaylistContainer = styled.div`
  margin: 0 2rem;
`;

const PlaylistHeader = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: start;
  -webkit-box-align: center;
  align-items: center;
  gap: 20px;
  height: 100%;
  width: 100%;
  padding: 0px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const PlaylistTitle = styled.div`
  line-height: initial;
  font-size: 24px;
  font-weight: bold;
  height: fit-content;
  max-width: 100%;
  max-height: 100%;
  text-align: start;
  width: fit-content;
  text-transform: none;
`;

const PlaylistVideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  gap: 0px;
  height: 100%;
  width: 100%;
  padding: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
`;
const PlaylistVideoElement = styled.div`
  width: 100%;
  padding: 8px;
  border-bottom: 1px solid rgb(217, 217, 217);
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  height: 100%;
  width: 100%;
`;
const VideoImageContainerSmall = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 6px;
  cursor: pointer;
`;
const VideoDetailTitleSmall = styled.p`
  width: fit-content;
  color: black;
  font-size: 12px !important;
  cursor: pointer;
`;
const IconContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 20px;
`;
export default function PlaylistDetail() {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playVideo, setPlayVideo] = useState();
  const [currentVideoPlaying, setCurrentVideoPlaying] = useState();
  const {
    getPlaylistById,
    currentPlaylist,
    removeVideoFromPlaylist,
    removePlaylist,
  } = useVideoContext();

  const copyUrl = () => {};

  useEffect(() => {
    getPlaylistById(playlistId);
  }, []);

  const copyToClipboard = () => {
    const tempInput = document.createElement("input");
    tempInput.value = window.location.href;

    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(tempInput);
  };

  const handleVideoEnd = () => {
    const currentIndex = currentPlaylist.videos.findIndex(
      (video) => video.id === currentVideoPlaying.id
    );

    if (
      currentIndex !== -1 &&
      currentIndex + 1 < currentPlaylist.videos.length
    ) {
      const nextVideo = currentPlaylist.videos[currentIndex + 1];
      setCurrentVideoPlaying(nextVideo);
    } else {
      setPlayVideo(false);
    }
  };

  return (
    <PlaylistContainer>
      {playVideo && (
        <div>
          <VideoPlayer
            videoIdOutside={currentVideoPlaying.id}
            onEnd={handleVideoEnd}
          ></VideoPlayer>
        </div>
      )}
      <PlaylistHeader>
        <PlaylistTitle>{currentPlaylist?.name}</PlaylistTitle>
        <IconContainer>
          <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard()} />

          <FontAwesomeIcon
            icon={faTrash}
            color="#CD201F"
            onClick={() => {
              removePlaylist(playlistId);
              navigate("/playlists");
            }}
          />
        </IconContainer>
      </PlaylistHeader>
      <PlaylistVideoContainer>
        {currentPlaylist?.videos?.map((video) => {
          return (
            <PlaylistVideoElement>
              <IconContainer>
                <FontAwesomeIcon
                  icon={faClose}
                  onClick={() => removeVideoFromPlaylist(playlistId, video.id)}
                />
              </IconContainer>
              <VideoImageContainerSmall
                onClick={() => {
                  setCurrentVideoPlaying(video);
                  setPlayVideo(true);
                }}
              >
                <VideoImage
                  src={video?.snippet?.thumbnails?.url}
                  alt="video thumbnails"
                />
              </VideoImageContainerSmall>
              <VideoDetailTitleSmall
                onClick={() => {
                  setCurrentVideoPlaying(video);
                  setPlayVideo(true);
                }}
              >
                {video.title}
              </VideoDetailTitleSmall>
            </PlaylistVideoElement>
          );
        })}
      </PlaylistVideoContainer>
    </PlaylistContainer>
  );
}
