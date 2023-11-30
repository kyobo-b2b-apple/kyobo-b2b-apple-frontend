import { styled } from 'styled-components';
import { Text } from '../../common';
import StarRating from './StarPoint';

interface PostedReviewDetailProps {
  content: string;
  rating: number;
  images: string[];
  author: string;
}

const PostedReviewDetail: React.FC<PostedReviewDetailProps> = ({ author, content, rating, images }) => {
  return (
    <PostedReviewDetailContainer>
      <StarRating rating={rating} showControls={false} />
      <Text $fontType="Body03" color="white">
        {author}
      </Text>
      <Text $fontType="Body03" color="white">
        {content}
      </Text>
      <ImageWrap>
        {images.map((img, index) => (
          <ReviewImage key={index} src={img} alt={`review-image-${index}`} />
        ))}
      </ImageWrap>
    </PostedReviewDetailContainer>
  );
};
const PostedReviewDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 473px;
  width: 100%;
  background-color: ${(props) => props.theme.color.grey80};
  padding: 31px 26px;
  gap: 8px;
`;
const ImageWrap = styled.div``;
const ReviewImage = styled.img`
  background-color: ${(props) => props.theme.color.white};
  padding: 56px 12px;
  width: 287px;
  height: 287px;
  object-fit: cover;
`;

export default PostedReviewDetail;
