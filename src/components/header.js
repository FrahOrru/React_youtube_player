import React, { useEffect } from "react";
import styled from "styled-components";
import { SearchBar } from "./search_bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faList } from "@fortawesome/free-solid-svg-icons";
import { UserProfileCircle } from "./user_profile_circle";
import { Link } from "react-router-dom";
import { useVideoContext } from "../context/video";

const HeaderContainer = styled.div`
  height: 56px;
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  height: 40px;
  width: 130px;
  padding: 18px 14px 18px 16px;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoImage = styled.img`
  height: 100%;
  width: 100%;
`;

export const UserProfileCircleS = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageWrapper = styled.div`
  width: 32px;
  height: 32px;
  cursor: pointer;
  margin: 0 8px;
  border-radius: 50%;
  background-color: transparent;
  overflow: hidden;
`;

export const ProfileImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-height: none;
  max-width: 100%;
  border-radius: none;
  width: 100%;
  height: 100%;
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export function Header() {
  const { searchVideos, searchVideoWithoutText } = useVideoContext();

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
    handleSearchWithoutText();
  }, []);

  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to={"/playlists"}>
          <FontAwesomeIcon color="#000" icon={faList} />
        </Link>
        <Link to={"/"}>
          <LogoImage src="./youtube.png" alt="icon" />
        </Link>
      </LogoContainer>
      <SearchBar onChangeSearchText={handleSearch} />
      <IconsWrapper>
        <FontAwesomeIcon icon={faBell} />
        <UserProfileCircle />
      </IconsWrapper>
    </HeaderContainer>
  );
}
