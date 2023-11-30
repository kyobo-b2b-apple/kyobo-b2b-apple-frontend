import { styled } from 'styled-components';
import { Spacer, Text } from '../common';
import CommonButton, { ButtonType } from '../common/Button';
import ExitBtn from '../../assets/Icons/ExitBtn.svg';
import StarRating from './postReview/StarPoint';
import { useEffect, useRef, useState } from 'react';
import Modal, { ModalType } from '../modal/Modal';
import { Body05Style } from '../../styles/typographyStyles';
import useMediaPX from '../../hooks/useMediaPX';

type SubmitReviewFunc = (review: string, rating: number, uploadImg: File[]) => void;

interface ReviewProps {
  editMode: boolean;
  initialReview: string;
  initialRating: number;
  initialImages?: Array<string | undefined>;
  reviewId?: number;
  onSubmitReview: SubmitReviewFunc;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewProps> = ({
  initialImages,
  initialReview,
  initialRating,
  onClose,
  onSubmitReview,
}) => {
  const [review, setReview] = useState(initialReview);
  const [rating, setRating] = useState(initialRating);
  const [uploadImg, setUploadImg] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const btnSpace = useMediaPX({ desktop: '18px', tablet: '18px', mobile: '11px' });

  useEffect(() => {
    setReview(initialReview);
    setRating(initialRating);
  }, [initialReview, initialRating]);

  const urlToImageFile = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText || '서버에러');
      }
      const data = await response.blob();
      return new File([data], url.split('/').pop() || '', { type: data.type });
    } catch (error) {
      console.error('Failed to fetch image:', error);
    }
  };
  useEffect(() => {
    if (!initialImages) {
      return;
    }
    Promise.all(initialImages.map((url) => urlToImageFile(url))).then((files) =>
      setUploadImg(files.filter(Boolean) as File[]),
    );
  }, [initialImages]);

  const handleSubmit = () => {
    onSubmitReview(review, rating, uploadImg);
    onClose();
  };
  const handleClickImageUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImages = Array.from(event.target.files);
      if (uploadImg.length + newImages.length > 4) {
        alert('최대 4장까지만 업로드 가능합니다.');
        return;
      }
      setUploadImg((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setUploadImg((prevImages) => prevImages.filter((_, i) => i !== index));
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Modal title="후기작성" isModalOpen type={ModalType.POPUP} onClose={onClose}>
      <Content>
        <StarScoreWrap>
          <Text $fontType="H3" color="white">
            별점 입력
          </Text>
          <StarRating rating={rating} onRatingChange={(newRating: number) => setRating(newRating)} />
        </StarScoreWrap>
        <InputReviewWrap>
          <Text $fontType="H3" color="white">
            텍스트 후기
          </Text>
          <InputReview
            value={review}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)}
            placeholder="후기를 입력해주세요. (최대 300자)"
            maxLength={300}
          />
        </InputReviewWrap>
        <ImgUploadWrap>
          <Title>
            <Text $fontType="H3" color="white">
              사진 등록
            </Text>
            <Text $fontType="Body04" color="grey30">
              (최대 4장)
            </Text>
          </Title>
          <UploadedImgWrap>
            {uploadImg.map((image, index) => (
              <ImgWrap key={index}>
                <UploadedImg key={index} src={URL.createObjectURL(image)} alt="upload" />
                <DeleteBtnWrap onClick={() => handleDeleteImage(index)}>
                  <img src={ExitBtn} />
                </DeleteBtnWrap>
              </ImgWrap>
            ))}
          </UploadedImgWrap>
          <input
            ref={inputRef}
            type="file"
            id="image-upload"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            style={{ display: 'none' }}
          />
          <ImgBtnWrap as="div" onClick={handleClickImageUpload}>
            <CommonButton type={ButtonType.Ghost} width={'100%'} as="div">
              <Text $fontType="Body04" color="blue10">
                + 사진추가
              </Text>
            </CommonButton>
          </ImgBtnWrap>
          <Spacer height={btnSpace} />
          <ReviewInfo>
            -후기와 관련된 안내사항이 들어갑니다.
            <br />
            -후기와 관련된 안내사항이 들어갑니다.
            <br />
            -후기와 관련된 안내사항이 들어갑니다.
          </ReviewInfo>
        </ImgUploadWrap>
      </Content>
      <CommonButton width={'100%'} type={ButtonType.Primary} onClick={handleSubmit}>
        <Text $fontType="Body04" color="white">
          등록하기
        </Text>
      </CommonButton>
    </Modal>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;

  @media screen and (min-width: 480px)  {
    padding: 38px 0px 50px 0px;
  }
  @media screen and (max-width: 479px) {
    padding: 24px 0px 36px 0px;
  }
`;

const StarScoreWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputReview = styled.textarea`
  background-color: ${(props) => props.theme.color.grey80};
  height: 162px;
  color: ${(props) => props.theme.color.white};
  padding: 15px 17px;
  border: 0;
  border-radius: 8px;
  resize: none;
  outline: none;
  &:focus {
    border: none;
  }
  ${Body05Style}
`;

const ImgUploadWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const ReviewInfo = styled.div`
  background-color: ${(props) => props.theme.color.grey80};
  white-space: pre-line;
  color: ${(props) => props.theme.color.grey30};
  padding: 16px 21px;
  border-radius: 8px;
`;

const ImgBtnWrap = styled.label`
  width: 100%;
`;

const UploadedImgWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6.6px;
`;

const UploadedImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  opacity: 0.5;
`;

const ImgWrap = styled.div`
  flex: 1;
  aspect-ratio: 1 / 1;
  max-width: 111px;
  height: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 11px;
`;

const DeleteBtnWrap = styled.button`
  position: absolute;
  top: 3px;
  right: 0px;
  cursor: pointer;
  background: none;
  border: 0;
  img {
    width: 15px;
    height: 15px;
  }
`;

export default ReviewModal;
