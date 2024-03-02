import { ImageWrapper, ProfileImage, UserProfileCircleS } from "./header";

export function UserProfileCircle() {
  return (
    <UserProfileCircleS>
      <ImageWrapper>
        <ProfileImage src="./user_placeholder.jpg" alt="user pic placeholder" />
      </ImageWrapper>
    </UserProfileCircleS>
  );
}
