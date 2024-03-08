import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useVideoContext } from "../context/video";
import { useEffect } from "react";
import { VideoImage } from "../components/vdeo_card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";

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
const IconContainer = styled.a`
  cursor: pointer;
`;
export default function PlaylistDetail() {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const {
    getPlaylistById,
    currentPlaylist,
    removeVideoFromPlaylist,
    removePlaylist,
  } = useVideoContext();

  useEffect(() => {
    getPlaylistById(playlistId);
  }, []);

  return (
    <PlaylistContainer>
      <PlaylistHeader>
        <PlaylistTitle>{currentPlaylist?.name}</PlaylistTitle>
        <IconContainer>
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
                onClick={() => navigate("/video/" + video.id)}
              >
                <VideoImage
                  src={video?.snippet?.thumbnails?.url}
                  alt="video thumbnails"
                />
              </VideoImageContainerSmall>
              <VideoDetailTitleSmall
                onClick={() => navigate("/video/" + video.id)}
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
