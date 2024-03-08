import { useVideoContext } from "../context/video";
import styled from "styled-components";

const randomBackgrounds = [
  "https://i.ytimg.com/vi/LPSFjYh7TTw/maxresdefault.jpg",
  "https://i.pinimg.com/564x/75/e3/ef/75e3ef44521e43dce0f0ded760b4f8c8.jpg",
  "https://i.pinimg.com/564x/80/b8/7a/80b87af47fe079dbf9b8b1a93867094c.jpg",
  "https://i.pinimg.com/564x/62/8f/14/628f144b3f6c98ffdc061f1d349f8ae8.jpg",
  "https://i.pinimg.com/564x/71/42/f4/7142f47ad1998cce9ad5caf19cdcf8e7.jpg",
  "https://i.pinimg.com/564x/b2/b4/98/b2b498f6c864e4b87b16073828d96393.jpg",
  "https://i.pinimg.com/564x/35/61/65/35616565ff8b3b2ea0d583b382021ae0.jpg",
  "https://i.pinimg.com/564x/42/0a/e3/420ae3cfac7020b65a1b55a94ae4956d.jpg",
  "https://i.pinimg.com/564x/99/03/d4/9903d40cdd348484e3ac5803dce5048c.jpg",
  "https://i.pinimg.com/564x/5b/88/0a/5b880af8c83f743ca3eab90af8093a7a.jpg",
  "https://i.pinimg.com/564x/ae/84/40/ae8440a84a5868fcc3c1e762d553fd9d.jpg",
  "https://i.pinimg.com/564x/3d/db/65/3ddb65ed454750b946da8938df173eec.jpg",
];

const getRandomBackground = () => {
  const randomIndex = Math.floor(Math.random() * randomBackgrounds.length);
  return randomBackgrounds[randomIndex];
};

const PlaylistsPage = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: start;
  -webkit-box-align: start;
  align-items: start;
  gap: 24px;
  height: fit-content;
  padding: 0px;
  margin: 0px 2rem;
`;
const PlaylistsContainer = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: center;
  -webkit-box-align: start;
  align-items: center;
  gap: 32px;
  height: 100%;
  width: 100%;
  padding: 0px;
  margin-bottom: 0px;
  flex-wrap: wrap;
  margin-top: 3rem;
`;

const PlaylistsElement = styled.div`
  min-width: 200px;
  min-height: 200px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  background-position: initial;
  background-size: initial;
  background-repeat: initial;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: rgb(217, 217, 217);
  background-image: url(${(props) => props.backgroundImage}) !important;
`;

const PlaylistText = styled.p`
  font-size: 18px;
  text-align: center;
  backdrop-filter: blur(10px);
  width: 100%;
  height: 100px;
  margin: 20px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  font-weight: bold;
  color: white;
`;

const PlaylistTitle = styled.p`
  line-height: initial;
  font-size: 30px;
  font-weight: bold;
  height: fit-content;
  max-width: 100%;
  max-height: 100%;
  text-align: start;
  width: fit-content;
  text-transform: none;
`;
export default function Playlist() {
  const { playlists } = useVideoContext();

  return (
    <PlaylistsPage>
      <PlaylistTitle>Your Playlists</PlaylistTitle>
      <PlaylistsContainer>
        {playlists &&
          playlists.map((playlist) => {
            return (
              <PlaylistsElement
                key={playlist.id}
                backgroundImage={getRandomBackground()}
              >
                <PlaylistText>{playlist.name}</PlaylistText>
              </PlaylistsElement>
            );
          })}
      </PlaylistsContainer>
    </PlaylistsPage>
  );
}
