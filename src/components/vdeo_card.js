import styled from "styled-components";
import { ImageWrapper, ProfileImage, UserProfileCircle } from "./header";
const CardContainer = styled.div`
  max-width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
const VideoChannelDetails = styled(VideoTitle)`
  color: #606060;
  font-family: "Roboto", "Arial", sans-serif;
  font-size: 14px;
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

export function VideoCard({ video, onClick }) {
  return (
    <CardContainer>
      <VideoImageContainer>
        <VideoImage
          src={video?.snippet?.thumbnails?.url}
          alt="video thumbnails"
        />
      </VideoImageContainer>
      <VideoDetailContainer>
        <UserProfileCircle>
          <ImageWrapper>
            <ProfileImage
              src="./user_placeholder.jpg"
              alt="user pic placeholder"
            />
          </ImageWrapper>
        </UserProfileCircle>
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
    </CardContainer>
  );
}
