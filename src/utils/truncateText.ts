interface TruncateProps {
  text: string;
  maxLength: number;
}

const truncateText = ({ text, maxLength }: TruncateProps) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};
export default truncateText;
