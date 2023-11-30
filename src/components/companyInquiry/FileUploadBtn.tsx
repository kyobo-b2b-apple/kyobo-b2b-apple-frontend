import { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import Text from '../common/Text';
import XBtn from '../../assets/Icons/ExitMark.svg';

interface FileUploadProps {
  isSubmitted: boolean;
  onChange?: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ isSubmitted, onChange }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onChange) {
      onChange(selectedFiles);
    }
  }, [onChange, selectedFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files!);

    const newFiles = files.length + selectedFiles.length;
    const limit = 5;
    let filesToAdd = files;
    if (newFiles > limit) {
      filesToAdd = files.slice(0, limit - selectedFiles.length);
      alert(`파일 추가는 최대 ${limit}개까지 가능합니다.`);
    }
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...filesToAdd]);
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles((prevSelectedFiles) => prevSelectedFiles.filter((_, i) => i !== index));
  };
  return (
    <UploadContainer>
      <SelectedFiles>
        {selectedFiles.map((file, index) => (
          <FileItem key={`${file.name}-${file.lastModified}`}>
            <Text $fontType="Body04" color="grey40">
              {file.name}
            </Text>
            <RemoveButton onClick={() => handleFileRemove(index)} />
          </FileItem>
        ))}
      </SelectedFiles>
      <Upload multiple type="file" onChange={handleFileSelect} ref={fileInput} />

      <UploadBtn onClick={() => fileInput.current!.click()}>
        <Text $fontType="Body04" color="white">
          + 파일 추가
        </Text>{' '}
        <Text $fontType="Body04" color="grey30">
          (jpg/PDF 파일 최대 5장)
        </Text>
      </UploadBtn>
      {isSubmitted && selectedFiles.length === 0 && (
        <ErrorMessage $fontType="Caption02" color="red30">
          파일을 첨부해주세요.
        </ErrorMessage>
      )}
    </UploadContainer>
  );
};
const ErrorMessage = styled(Text)`
  line-height: normal;
  padding: 1px;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Upload = styled.input`
  display: none;
`;
const UploadBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 46px;
  padding: 7.5px 11.25px;
  background-color: #434343;
  border-radius: 6px;
  border: 0.625px solid #949494;
  gap: 2px;
`;
const SelectedFiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 11px;
  margin-bottom: 12px;
  margin-top: 17px;
`;
const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const RemoveButton = styled.button`
  background: url(${XBtn});
  background-size: cover;
  border: 0;
  width: 15px;
  height: 15px;
  padding: 0;
`;

export default FileUpload;
