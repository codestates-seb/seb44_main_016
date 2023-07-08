export function readFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        }
      },
      false
    );
    reader.readAsDataURL(file);
  });
}

interface HandleFileChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  setCropModal: (value: boolean) => void;
  setImgSrc: (value: string | null) => void;
}

export const handleFileChange = async ({
  e,
  setCropModal,
  setImgSrc,
}: HandleFileChangeProps): Promise<void> => {
  if (e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0];
    const imageDataUrl = await readFile(file);
    setCropModal(true);
    setImgSrc(imageDataUrl);
  }
};
