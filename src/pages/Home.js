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
  const { searchResults, error } = useVideoContext();

  if (error) return <p>Error</p>;

  return (
    <div>
      <VideosContainer>
        {searchResults &&
          searchResults?.map((video) => {
            return <VideoCard key={video.id.videoId} video={video}></VideoCard>;
          })}
      </VideosContainer>
    </div>
  );
}
