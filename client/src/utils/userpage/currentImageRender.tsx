const currentImageRender = (
  croppedImage: string | null,
  currentImgSrc: string | null,
  profileImgPath: string | null
) => {
  switch (true) {
    case !!croppedImage:
      return <img src={croppedImage || undefined} alt={`프로필 사진`} />;
    case !!currentImgSrc:
      return <img src={currentImgSrc || undefined} alt={`프로필 사진`} />;
    case !!profileImgPath:
      return <img src={profileImgPath || undefined} alt={`프로필 사진`} />;
    default:
      return null;
  }
};

export default currentImageRender;
