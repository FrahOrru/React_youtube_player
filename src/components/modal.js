import { useVideoContext } from "../context/video";

export function Modal({ video }) {
  const { playlists, createPlaylist, addToPlaylist, removeFromPlaylist } =
    useVideoContext();

  return <div></div>;
}
