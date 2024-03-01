// VideoContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const VideoContext = createContext();

export const useVideoContext = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchVideos = async (searchText) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://youtube.thorsteinsson.is/api/search?q=${searchText}`
      );
      setLoading(false);
      setError(null);
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      setError("Error searching videos");
    }
  };

  const getVideoDetails = async (videoId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://youtube.thorsteinsson.is/api/videos/${videoId}`
      );
      setCurrentVideo(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error getting video details");
    }
  };

  const getVideosResults = () => {
    console.log();
    return searchResults;
  };

  return (
    <VideoContext.Provider
      value={{
        currentVideo,
        loading,
        error,
        searchVideos,
        getVideoDetails,
        getVideosResults,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContext;
