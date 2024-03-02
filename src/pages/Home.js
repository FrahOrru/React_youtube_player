import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { useVideoContext } from "../context/video";
import { VideoCard } from "../components/vdeo_card";
import styled from "styled-components";

const VideosContainer = styled.div`
  width: 100%;
  padding-top: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

export function Home() {
  const { searchVideos, getVideosResults, error, searchVideoWithoutText } =
    useVideoContext();
  const [videoList, setVideoList] = useState();

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
  }, [handleSearch, handleSearchWithoutText]);

  useEffect(() => {
    handleSearchWithoutText();
  }, []);

  if (error) return <p>Error</p>;

  return (
    <div>
      <Header onSearch={handleSearch} />
      <VideosContainer>
        {videoList &&
          videoList?.map((video) => {
            return <VideoCard key={video.id.videoId} video={video}></VideoCard>;
          })}
      </VideosContainer>
    </div>
  );
}
