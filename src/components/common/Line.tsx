import styled, { css } from 'styled-components';
import theme from '../../styles/theme';

interface LineProps {
    color?: keyof typeof theme.color | string;
}

const Line = styled.div<LineProps>`
    width: 100%;
    background-color: none;
    /* border-bottom: 0.7px solid #656565; */
    border-bottom: 0.7px solid ${({ color }) => (color ? theme.color[color as keyof typeof theme.color] : theme.color.black)};
`;

export default Line;