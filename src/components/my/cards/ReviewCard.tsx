import { useState, useEffect } from 'react';
import { useIsOS, OS } from '../../../hooks/useIsOS';
import ProductNameText from '../inCard/ProductNameText';
import Card from '../inCard/Card';
import CardButton from '../inCard/CardButton';
import LineClampText from '../inCard/LineClampText';
import CardTitle from '../inCard/CardTitle';
import CardContent from '../inCard/CardContent';
import LeftContentImage from '../inCard/LeftContentImage';
import RightContent from '../inCard/RightContent';
import { OrderItemProps, ReviewProps } from '../../../interfaces/reviewItemProps';
import ReviewModal from '../../productDetail/ReviewModal';
import { postReview, editReview, PostReviewProps, EditReviewProps } from '../../../api/myReviewApi';

interface ReviewCardProps {
  orderId: number;
  item: OrderItemProps;
  review: null | ReviewProps;
  date: string;
}

const ReviewCard = ({ orderId, item, review, date }: ReviewCardProps) => {
  const isMobile = useIsOS(OS.MOBILE);
  const [editMode, setEditMode] = useState(false);
  const [reviewButtonText, setReviewButtonText] = useState('후기작성');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedReview, setSelectedReview] = useState('');
  const [reviewId, setReviewId] = useState(0);

  useEffect(() => {
    if (review) {
      setEditMode(true);
      setSelectedRating(review.score);
      setSelectedReview(review.content);
      setReviewButtonText('후기수정');
      setReviewId(review.id);
    }
  }, [review]);

  const openReviewModal = () => {
    setIsModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (content: string, score: number, images: File[]) => {
    if (editMode) {
      const editData: EditReviewProps = {
        score: score,
        content: content,
        images: images,
        reviewId: reviewId,
      };
      editReview(editData)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log('후기 PUT 실패', error);
        });
    } else {
      const postData: PostReviewProps = {
        score: score,
        content: content,
        images: images,
        orderId: orderId,
      };
      postReview(postData)
        .then((response) => {
          console.log('post', response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.log('후기 POST 실패', error);
        });
    }
    closeReviewModal();
  };

  return (
    <Card>
      <CardTitle label={date} />
      <CardContent>
        <LeftContentImage src={item.thumbnails[0]} />
        <RightContent>
          <ProductNameText productName={item.description} />
          {review && <LineClampText text={review?.content} />}
          {!isMobile && <CardButton onClick={openReviewModal}>{reviewButtonText}</CardButton>}
        </RightContent>
      </CardContent>
      {isMobile && <CardButton onClick={openReviewModal}>{reviewButtonText}</CardButton>}

      {isModalOpen && (
        <ReviewModal
          editMode={editMode}
          initialRating={editMode ? selectedRating : 0}
          initialReview={editMode ? selectedReview : ''}
          onSubmitReview={handleSubmit}
          onClose={() => {
            closeReviewModal();
          }}
        />
      )}
    </Card>
  );
};
export default ReviewCard;
