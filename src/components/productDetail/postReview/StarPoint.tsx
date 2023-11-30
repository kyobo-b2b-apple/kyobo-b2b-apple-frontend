import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Text } from '../../common';

type StarValue = 1 | 2 | 3 | 4 | 5;
const RATING_VALUES: StarValue[] = [1, 2, 3, 4, 5];

interface StarSelect {
  selectedProp?: boolean;
}

interface ShowControlsProps {
  onRatingChange?: (newRating: number) => void;
  rating?: number;
  showControls?: boolean;
}

const StarRating: React.FC<ShowControlsProps> = ({ onRatingChange, rating = 5, showControls = true }) => {
  const [starSelected, setStarSelected] = useState(rating);
  useEffect(() => {
    if (onRatingChange) {
      onRatingChange(starSelected);
    }
  }, [onRatingChange, starSelected]);

  const setRating = (newRating: number) => {
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleStarClick = (ratingValue: number) => {
    if (showControls) {
      setStarSelected(ratingValue);
      setRating(ratingValue);
    }
  };

  return (
    <StarContainer>
      <ReviewScore $fontType="Body01" color="white">
        {starSelected}점
      </ReviewScore>
      {RATING_VALUES.map((ratingValue) => {
        return (
          <div key={ratingValue}>
            <label>
              <input
                type="radio"
                name="rating"
                checked={ratingValue === starSelected}
                value={ratingValue}
                style={{ display: 'none' }}
                onClick={() => handleStarClick(ratingValue)}
              />
              <StarClick
                selectedProp={ratingValue <= starSelected}
                showControls={showControls}
                onClick={() => handleStarClick(ratingValue)}
              />
            </label>
          </div>
        );
      })}
    </StarContainer>
  );
};

const StarContainer = styled.div`
  width: 120px;
  height: 19px;
  display: flex;
`;
const Star = styled(FaStar)<StarSelect & { showControls: boolean; onClick: () => void }>`
  color: ${({ theme, selectedProp }) => (selectedProp ? theme.color.blue : theme.color.grey40)};
`;

const ReviewScore = styled(Text)`
  white-space: nowrap;
  margin-right: 10px;
`;

const StarClick = styled(Star)`
  cursor: pointer;
`;

export default StarRating;
