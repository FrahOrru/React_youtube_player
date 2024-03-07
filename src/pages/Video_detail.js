import { useEffect, useState } from "react";
import { VideoPlayer } from "../components/video_player";
import { useVideoContext } from "../context/video";
import styled from "styled-components";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { UserProfileCircle } from "../components/user_profile_circle";
import { VideoChannelDetails } from "../components/vdeo_card";
import { Link } from "react-router-dom";
import { Header } from "../components/header";

const DetailContainer = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem;
  border-right: 0.5px solid #eee;
`;
const VideoDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 740px;
`;
const VideoTextContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;
const VideoTitle = styled(VideoChannelDetails)`
  font-weight: bold;
  font-size: 16px;
`;

const VideoCardSmall = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 1rem;
`;

const SmallVideoImage = styled.img`
  width: 100%;
  height: 100%;
`;

const VideoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export function VideoDetail() {
  const { videoId } = useParams();

  const {
    searchVideos,
    error,
    getVideoDetails,
    currentVideo,
    searchVideoWithoutText,
    getVideosResults,
  } = useVideoContext();

  const [videoList, setVideoList] = useState();

  useEffect(() => {
    getVideoDetails(videoId);
    handleSearchWithoutText();
  }, [videoId]);

  const handleSearch = (searchText) => {
    if (searchText !== "") {
      searchVideos(searchText);
    } else {
      handleSearchWithoutText();
    }
  };

  const handleSearchWithoutText = () => {
    searchVideoWithoutText();
  };

  useEffect(() => {
    setVideoList(getVideosResults());
    console.log(videoList);
  }, [handleSearch]);

  if (error) return <p>ERROOOORE</p>;

  return (
    <div>
      <Header onSearch={handleSearch} />
      <DetailContainer>
        <VideoContainer>
          <VideoPlayer />
          <VideoDetailsContainer>
            <h2>{currentVideo?.title}</h2>
            <VideoTextContainer>
              <UserProfileCircle />
              <div>
                <VideoTitle>{currentVideo?.owner}</VideoTitle>
                <VideoChannelDetails>
                  {currentVideo?.views} visualizzazioni
                </VideoChannelDetails>
              </div>
            </VideoTextContainer>
          </VideoDetailsContainer>
        </VideoContainer>
        <VideoListContainer>
          {videoList?.map((video) => {
            return (
              <div key={video.id.videoId}>
                <Link to={"../../video/" + video.id.videoId}>
                  <VideoCardSmall>
                    <SmallVideoImage
                      src={video?.snippet?.thumbnails?.url}
                      alt="video thumbnail"
                    ></SmallVideoImage>
                    <VideoTextContainer>
                      <div>
                        <VideoTitle>{video?.title}</VideoTitle>
                        <VideoChannelDetails>
                          {video?.channelName}
                        </VideoChannelDetails>
                      </div>
                    </VideoTextContainer>
                  </VideoCardSmall>
                </Link>
              </div>
            );
          })}
        </VideoListContainer>
      </DetailContainer>
    </div>
  );
}
