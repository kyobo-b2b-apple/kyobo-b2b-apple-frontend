import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import HeaderNav from './HeaderNav';
import HeaderMenu from './HeaderMenu';
import HeaderDropdown from './HeaderDropdown';
import HeaderSideBar from './HeaderSideBar';
import { OS, useIsOS } from '../../hooks/useIsOS';

import { CATEGORIES } from '../../constants/categoriesHeader';

interface Category {
    name: string;
    items: string[];
}

const Header = () => {
    const categories = CATEGORIES;
    const isDesktop = useIsOS(OS.DESKTOP);
    const isTablet = useIsOS(OS.TABLET);
    const isMobile = useIsOS(OS.MOBILE);

    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [headerSideBarVisible, setHeaderSideBarVisible] = useState<boolean>(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);

    const headerDropdownRef = useRef<HTMLDivElement | null>(null);

    const onCategoryHover = (category: string | null) => {
        const foundCategory = category ? categories.find((c) => c.name === category) : null;
        setHoveredCategory(foundCategory || null);
        setActiveCategory(category);
        if (category !== null) {
            setDropdownVisible(true);
        }
    };

    const handleMouseEnterDropdown = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeaveDropdown = () => {
        setDropdownVisible(false);
        setActiveCategory(null);
    };

    const toggleSidebar = () => {
        setHeaderSideBarVisible(prevState => !prevState);
    };

    const closeSidebar = () => {
        setHeaderSideBarVisible(false);
    };

    return (
        <>
            <HeaderContainer>
                <GnbContainer>
                    <HeaderMenu />
                    <Line />
                    <HeaderNav
                        categories={categories}
                        onCategoryHover={onCategoryHover}
                        toggleSidebar={toggleSidebar}
                        onMouseLeave={handleMouseLeaveDropdown}
                    />
                    <Line />
                </GnbContainer>
                {!isMobile &&
                    (
                        <HeaderDropdown
                            ref={headerDropdownRef}
                            visibility={dropdownVisible}
                            category={activeCategory}
                            items={hoveredCategory?.items || []}
                            onMouseLeave={handleMouseLeaveDropdown}
                            onMouseEnter={handleMouseEnterDropdown}
                        />
                    )
                }
                {isMobile && headerSideBarVisible &&
                    (
                        <HeaderSideBar
                            categories={categories}
                            onClose={closeSidebar}
                        />
                    )
                }
            </HeaderContainer>
        </>
    );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  min-width: 360px;
  position: relative;
`;

const Line = styled.div`
  width: 100%;
  background-color: none;
  border-bottom: 0.7px solid #656565;
`;

const GnbContainer = styled.div`
  width: 100%;
  position: relative;
`;
