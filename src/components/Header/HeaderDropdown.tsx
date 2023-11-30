import React, { useState, forwardRef } from 'react';

import ContentsLayout from '../../layout/contentsWidthLayout';
import Layout from '../../layout/Layout';
import { styled } from 'styled-components';

import { Link } from 'react-router-dom';
import { Spacer, Text } from '../common';

interface DropDownProps {
  visibility: boolean;
  category: any;
  items: string[];
  onMouseLeave: () => void;
  onMouseEnter: () => void;
}

const HeaderDropdown = React.forwardRef<HTMLDivElement, DropDownProps>(
  ({ visibility, category, items, onMouseLeave, onMouseEnter }, ref) => {
    if (category === 'Solutions') { return null; }
    return (
      <DropDownContainer $type="full" visibility={visibility} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
        <DropDownContents>
          <Spacer height={24} />
          <Text $fontType="Body01" color="grey30">
            {category}
          </Text>
          <Spacer height={15} />
          {items.map((specificItems) => (
            <Link
              key={specificItems}
              to={`/category?large_category=${category}&small_category=${specificItems}`}
              onClick={onMouseLeave}
            >
              <Text $fontType="Body01" color="white">
                {specificItems}
              </Text>
              <Spacer height={10} />
            </Link>
          ))}
        </DropDownContents>
      </DropDownContainer>
    );
  },
);

export default HeaderDropdown;

const DropDownContainer = styled(ContentsLayout).attrs<{ onMouseLeave: () => void; onMouseEnter: () => void }>(
  (props) => ({
    as: 'div',
    onMouseLeave: props.onMouseLeave,
    onMouseEnter: props.onMouseEnter,
  }),
) <{ visibility: boolean }>`
  position: absolute;
  z-index: 999;
  height: 272px;
  width: 100%;
  opacity: ${(props) => (props.visibility ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  pointer-events: ${(props) => (props.visibility ? 'auto' : 'none')};
  visibility: ${(props) => (props.visibility ? 'visible' : 'hidden')};
  background-color: #252525;
`;

const DropDownContents = styled(ContentsLayout)`
  padding-left: 20px;
  width: 100vw;
`;
