import styled from "styled-components";
import { VideoProvider, useVideoContext } from "../context/video";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { ButtonPlaylist, ButtonPlaylistText } from "./vdeo_card";
import { useEffect, useState } from "react";

const ModalS = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContainer = styled.div`
  height: 60vh;
  width: 50vw;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: end;
  padding: 1rem 1rem;
  width: 92%;
`;

const AddButton = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #000;
  color: #fff;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;
  position: relative;
  &:hover {
    background: #373434;
  }
`;

const PlaylistListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const PlaylistListElement = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const PlaylistInput = styled.input`
  font: inherit;
  letter-spacing: inherit;
  color: currentcolor;
  padding: 4px 0px 5px;
  border: 0px;
  box-sizing: content-box;
  background: none;
  height: 1.4375em;
  margin: 0px;
  -webkit-tap-highlight-color: transparent;
  display: block;
  min-width: 0px;
  width: 100%;
  animation-name: mui-auto-fill-cancel;
  animation-duration: 10ms;
  &:focus {
    border: 0px;
    outline: 0px;
  }
`;
export function Modal({ video, handleClose, show }) {
  const { playlists, createPlaylistCall, addToPlaylist } = useVideoContext();

  const [createAPlaylist, setCreateAPlaylist] = useState(false);
  const [inputValue, setInputValue] = useState();

  const changeToCreatePlaylist = () => {
    setCreateAPlaylist(true);
  };

  const handleCreatePlaylist = () => {
    createPlaylistCall(inputValue);
    setCreateAPlaylist(false);
    setInputValue("");
  };

  const handleAddToPlaylist = (playlist) => {
    addToPlaylist(playlist.id, video);
    handleClose();
  };

  return (
    <>
      <ModalS style={{ display: show ? "flex" : "none" }}>
        <ModalContainer className="modal-main">
          <ModalHeader>
            <FontAwesomeIcon
              icon={faClose}
              onClick={handleClose}
            ></FontAwesomeIcon>
          </ModalHeader>
          <PlaylistListContainer>
            {createAPlaylist && (
              <div>
                <PlaylistInput
                  name="search"
                  placeholder="Enter a name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <AddButton onClick={handleCreatePlaylist}>
                  <ButtonPlaylistText>Create playlist</ButtonPlaylistText>
                  <FontAwesomeIcon icon={faSquarePlus}></FontAwesomeIcon>
                </AddButton>
              </div>
            )}
            {!createAPlaylist &&
              playlists.length > 0 &&
              playlists?.map((playlist) => {
                return (
                  <PlaylistListElement
                    onClick={() => handleAddToPlaylist(playlist)}
                  >
                    {playlist.name}
                  </PlaylistListElement>
                );
              })}
          </PlaylistListContainer>
          {!createAPlaylist && (
            <AddButton onClick={changeToCreatePlaylist}>
              <ButtonPlaylistText>Create a new playlist</ButtonPlaylistText>
              <FontAwesomeIcon icon={faSquarePlus}></FontAwesomeIcon>
            </AddButton>
          )}
        </ModalContainer>
      </ModalS>
    </>
  );
}
