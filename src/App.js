import "./App.css";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { VideoDetail } from "./pages/Video_detail";
import { createGlobalStyle } from "styled-components";
import { Routes } from "react-router-dom/dist/umd/react-router-dom.development";
import { useEffect, useState } from "react";
import Loading from "./pages/Loading";
import { VideoProvider } from "./context/video";
import Playlist from "./pages/Playlists";
import PlaylistDetail from "./pages/Playlist_detail";

function App() {
  const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
  }
`;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VideoProvider>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<Playlist />} />
          <Route path="/playlists/:id" element={<PlaylistDetail />} />
          <Route path="/video/:videoId" element={<VideoDetail />} />
        </Routes>
      </Router>
    </VideoProvider>
  );
}

export default App;
