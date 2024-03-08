// VideoContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const VideoContext = createContext();

export const useVideoContext = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
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

  const getPlaylistById = async (playlistId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://youtube.thorsteinsson.is/api/playlists/${playlistId}`
      );
      setCurrentPlaylist(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error getting video details");
    }
  };

  const createPlaylistCall = async (playlist) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://youtube.thorsteinsson.is/api/playlists`,
        { name: playlist }
      );
      createPlaylist(playlist, response.data.id);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error getting video details");
    }
  };

  const addVideoToPlaylist = async (playlistId, video) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://youtube.thorsteinsson.is/api/playlists/${playlistId}/videos`,
        { ...video, id: video.id.videoId }
      );
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error getting video details");
    }
  };

  const addToPlaylist = (id, video) => {
    const playlistVdeos = playlists?.find((x) => x.id === id).videos;
    if (playlists?.find((x) => x.id === id)) {
      setPlaylists([
        ...playlists?.filter((x) => x.id !== id),
        {
          ...playlists.find((x) => x.id === id),
          videos: [...playlistVdeos, { ...video, id: video.id.videoId }],
        },
      ]);
    }
    addVideoToPlaylist(id, video);
  };

  const removeVideoFromPlaylist = async (playlistId, videoId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        ` https://youtube.thorsteinsson.is/api/playlists/${playlistId}/videos/${videoId}`
      );
      removeFromPlaylist(playlistId, videoId);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error getting video details");
    }
  };

  const removePlaylist = async (playlistId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://youtube.thorsteinsson.is/api/playlists/${playlistId}`
      );
      setPlaylists([...playlists.filter((x) => x.id !== playlistId)]);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error getting video details");
    }
  };

  const updatePlaylist = async (playlist) => {
    try {
      setLoading(true);
      const response = await axios.put(
        ` https://youtube.thorsteinsson.is/api/playlists/${playlist.id}`,
        playlist
      );
      getPlaylistById(playlist.id);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error getting video details");
    }
  };

  const createPlaylist = (name, id) => {
    setPlaylists([...playlists, { id: id, name: name, videos: [] }]);
  };

  const removeFromPlaylist = (playlistId, videoId) => {
    setPlaylists([
      ...playlists.filter((x) => x.id !== playlistId),
      {
        ...playlists.find((x) => x.id === playlistId),
        videos: playlists
          .find((x) => x.id === playlistId)
          .videos.filter((y) => y.id !== videoId),
      },
    ]);
    updatePlaylist({
      ...playlists.find((x) => x.id === playlistId),
      videos: playlists
        .find((x) => x.id === playlistId)
        .videos.filter((y) => y.id !== videoId),
    });
  };

  return (
    <VideoContext.Provider
      value={{
        currentVideo,
        searchResults,
        playlists,
        loading,
        error,
        currentPlaylist,
        searchVideos,
        getVideoDetails,
        searchVideoWithoutText,

        createPlaylistCall,
        removePlaylist,
        getPlaylistById,
        removeVideoFromPlaylist,

        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContext;
