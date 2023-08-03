import styled from '@emotion/styled';
import FilePlusLabel from '../../components/FilePlusLabel';

interface ImgBoxProps {
  croppedImage: string | null;
  initialImage: string | undefined;
  faRecName: string | null;
  initialFaRecName: string | undefined;
  initialImg: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function ImgBox({
  croppedImage,
  initialImage,
  faRecName,
  initialFaRecName,
  initialImg,
  onFileChange,
}: ImgBoxProps) {
  return (
    <S.ImgBox>
      {croppedImage ? (
        <img src={croppedImage} alt={faRecName ? `${faRecName} 프로필 사진` : '프로필 사진'} />
      ) : initialImage ? (
        <img src={initialImage} alt={`${initialFaRecName} 프로필 사진`} />
      ) : (
        <img src={initialImg} alt={`${faRecName} 프로필 사진`} />
      )}

      <S.FileInput type='file' id='addFaRecImg' accept='image/*' onChange={onFileChange} />
      <FilePlusLabel htmlFor='addFaRecImg' />
    </S.ImgBox>
  );
}

const S = {
  ImgBox: styled.div`
    position: relative;
    width: 12.7rem;
    height: 12.7rem;
    border-radius: 100%;
    overflow: hidden;
    margin-bottom: 3.125rem;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition-duration: 0.7s;
    }

    &:hover > img {
      transform: scale(1.1);
    }
  `,
  FileInput: styled.input`
    display: none;
  `,
};
