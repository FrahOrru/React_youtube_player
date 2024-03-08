// VideoContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const VideoContext = createContext();

export const useVideoContext = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
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
    } catch (error) {
      setLoading(false);
      setError("Error searching videos");
    }
  };

  const searchVideoWithoutText = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://youtube.thorsteinsson.is/api/search`
      );
      setLoading(false);
      setError(null);
      setSearchResults(response.data);
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

  const createPlaylist = (name) => {
    setPlaylists([
      ...playlists,
      { id: playlists.length, name: name, video: [] },
    ]);
  };

  const getPlaylists = () => {
    return playlists;
  };

  const addToPlaylist = (id, video) => {
    console.log(playlists.find((x) => x.id === id));
    const playlistVdeos = playlists.find((x) => x.id === id).video;
    if (playlists.find((x) => x.id === id)) {
      setPlaylists([
        ...playlists.filter((x) => x.id !== id),
        {
          ...playlists.find((x) => x.id === id),
          video: [...playlistVdeos, video],
        },
      ]);
    }
  };

  const removeFromPlaylist = (playlistId, videoId) => {
    setPlaylists([
      ...playlists.filter((x) => x.id !== playlistId),
      {
        ...playlists.find((x) => x.id === playlistId),
        video: playlists
          .find((x) => x.id === playlistId)
          .video.filter((y) => y.id !== videoId),
      },
    ]);
  };
  return (
    <VideoContext.Provider
      value={{
        currentVideo,
        searchResults,
        playlists,
        loading,
        error,
        searchVideos,
        getVideoDetails,
        searchVideoWithoutText,

        createPlaylist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContext;
