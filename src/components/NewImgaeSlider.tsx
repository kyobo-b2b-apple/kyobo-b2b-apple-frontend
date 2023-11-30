import { useState } from 'react';
import styled, { css } from 'styled-components';
// import RightBtn from '../../../assets/Icons/RightBtn.svg';
// import LeftBtn from '../../../assets/Icons/LeftBtn.svg';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface NewImageSliderProps {
    images: string[];
}

const NewImageSlider: React.FC<NewImageSliderProps> = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            setCurrentImageIndex(0);
        }
    };

    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        } else {
            setCurrentImageIndex(images.length - 1);
        }
    };

    return (
        <ImgContainer>
            <StyledAiOutlineLeft onClick={handlePrevImage} />
            <ImgPreview imgUrl={images[currentImageIndex]} />
            <StyledAiOutlineRight onClick={handleNextImage} />
        </ImgContainer>
    );
};

const ImgContainer = styled.div`
 position: relative;
 display: flex;
 align-items: center;
 justify-content: center;
 width: calc(100vw - (100vw -100%)); /* viewport width minus scrollbar width */
 height: 530px;
 background-color: #fff;
 border-radius:8px; 

 @media screen and (min-width: 1200px) {
   height :70vh; /* change this line */
 }

 @media screen and (max-width :800px){
   height :40vh; /* change this line */
 }

 @media screen and (max-width :600px){
   height :30vh; /*change this line*/
 }
`;

const ImgPreview = styled.div<{ imgUrl: string }>`
 width:100%;
 height :100%;
 background-image:url(${props => props.imgUrl});
 background-repeat:no-repeat; 
 background-size :cover;
 background-position:center center;
`;

const StyledAiOutlineLeft = styled(AiOutlineLeft)`
 position:absolute; 
 font-size :40px; 
 left :20px; 
 top :50%;  
 transform :translateY(-50%);
 cursor:pointer;
 color: ${props => props.theme.color.grey40};
`;

const StyledAiOutlineRight = styled(AiOutlineRight)`
 position:absolute;
 font-size :40px;
 right :20px;
 top :50%;
 transform :translateY(-50%);
 cursor:pointer;
 color: ${props => props.theme.color.grey40};
`;

export default NewImageSlider;

