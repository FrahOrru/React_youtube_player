import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const SearchBarInput = styled.input`
  border-radius: 16px 0 0 16px;
  border: 1px solid #ccc;

  position: relative;
  align-items: center;
  background-color: hsl(0, 0%, 100%);
  border: 1px solid #ccc;
  border-right: none;
  border-radius: 40px 0 0 40px;
  box-shadow: inset 0 1px 2px #eee;
  caret-color: #0f0f0f;
  color: hsl(0, 0%, 6.7%);
  padding: 0 4px 0 16px;
  width: 100%;
`;
const SearchBarButton = styled.button`
  border: 1px solid #d3d3d3;
  background-color: #f8f8f8;
  border-radius: 0 40px 40px 0;
  cursor: pointer;
  height: 40px;
  width: 64px;
  margin: 0;
`;
const SearchBarForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 100%;
  margin: 1rem 0;
  width: 100%;
`;

const SearchBarContainer = styled.div`
  width: 40%;
`;

export function SearchBar({ onChangeSearchText }) {
  const [searchValue, setSearchValue] = useState();

  return (
    <SearchBarContainer>
      <SearchBarForm>
        <SearchBarInput
          type="text"
          placeholder="Search.."
          name="search"
          value={searchValue}
          onChange={(e) => onChangeSearchText(e.target.value)}
        />
        <SearchBarButton type="submit">
          <FontAwesomeIcon
            fill="currentcolor"
            icon={faSearch}
          ></FontAwesomeIcon>
        </SearchBarButton>
      </SearchBarForm>
    </SearchBarContainer>
  );
}
