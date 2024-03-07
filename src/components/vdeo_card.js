import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserProfileCircle } from "./user_profile_circle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const CardContainer = styled.div`
  max-width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const VideoImageContainer = styled.div`
  width: 100%;
`;
const VideoTitle = styled.p`
  color: #000;
  font-family: "Roboto", "Arial", sans-serif;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  display: block;
  max-height: 4.4rem;
  -webkit-line-clamp: 2;
  display: box;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
  margin: 0;
`;
export const VideoChannelDetails = styled(VideoTitle)`
  color: #606060;
  font-family: "Roboto", "Arial", sans-serif;
  font-size: 12px;
  margin: 0;
`;
const VideoChannelDetailsWithDot = styled(VideoChannelDetails)`
  &:before {
    content: "•";
    margin: 0 4px;
  }
`;

const VideoImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;
const VideoDetailContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
const FlexAlignedCenterStart = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ;
`;
const DetailsTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ButtonPlaylist = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #000;
  color: #fff;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 1rem;

  &:hover {
    background: #373434;
  }
`;
const ButtonPlaylistText = styled.p`
  margin: 0;
`;

export function VideoCard({ video }) {
  const [modalState, setModalState] = useState(false);
  const handleAddToPlaylist = () => {};

  return (
    <CardContainer>
      <Link to={"/video/" + video.id.videoId}>
        <VideoImageContainer>
          <VideoImage
            src={video?.snippet?.thumbnails?.url}
            alt="video thumbnails"
          />
        </VideoImageContainer>
        <VideoDetailContainer>
          <UserProfileCircle></UserProfileCircle>
          <DetailsTextContainer>
            <VideoTitle>{video.title}</VideoTitle>
            <VideoChannelDetails>{video.channelName}</VideoChannelDetails>
            <FlexAlignedCenterStart>
              <VideoChannelDetails>
                {video.snippet.views} visualizzazioni
              </VideoChannelDetails>
              <VideoChannelDetailsWithDot>
                {video.snippet.publishedAt}
              </VideoChannelDetailsWithDot>
            </FlexAlignedCenterStart>
          </DetailsTextContainer>
        </VideoDetailContainer>
      </Link>
      <ButtonPlaylist onClick={handleAddToPlaylist}>
        <ButtonPlaylistText>Add to playlist</ButtonPlaylistText>
        <FontAwesomeIcon icon={faSquarePlus}></FontAwesomeIcon>
      </ButtonPlaylist>
    </CardContainer>
  );
}
