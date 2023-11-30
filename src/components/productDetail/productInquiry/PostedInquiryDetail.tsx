import { styled } from 'styled-components';
import { Text } from '../../common';
import { PropsWithChildren } from 'react';

interface PostedInquiryDetailProps {
  children: string;
  authorId: string;
}

const PostedInquiryDetail: React.FC<PropsWithChildren<PostedInquiryDetailProps>> = ({ children, authorId }) => {
  const displayedAuthorId = authorId.slice(0, 3) + '*'.repeat(authorId.length - 3);
  return (
    <PostedInquiryReply>
      <Text $fontType="Body03" color="white">
        {displayedAuthorId}
      </Text>
      <Text $fontType="Body03" color="white">
        {children}
      </Text>
    </PostedInquiryReply>
  );
};
const PostedInquiryReply = styled.div`
  display: flex;
  flex-direction: column;
  height: 473px;
  width: 100%;
  background-color: ${(props) => props.theme.color.grey80};
`;

export default PostedInquiryDetail;
