import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text, Spacer } from '../../components/common';
import { FiChevronDown } from 'react-icons/fi';

interface Category {
    name: string;
    items: string[];
}

interface NavProps {
    categories: Category[];
}

const HeaderSideBar: React.FC<{ categories: Category[]; onClose: () => void }> = ({ categories, onClose }) => {
    const [openCategory, setOpenCategory] = useState<string | null>(null);

    const handleToggle = (categoryName: string) => {
        setOpenCategory(prevState => prevState === categoryName ? null : categoryName);
    };

    return (
        <HeaderSideBarContainer>
            <SideBarButtonContainer>
                <SideBarNavButton to='/inquiry'>
                    <Text $fontType="Body04" color="white">
                        기업문의
                    </Text>
                </SideBarNavButton>
                <SideBarNavButton to='/reward'>
                    <Text $fontType="Body04" color="white">
                        보상판매
                    </Text>
                </SideBarNavButton>
            </SideBarButtonContainer>
            <Spacer height={21} />
            <SideBarMenuContainer>
                {categories.map((categoryItem) => (
                    <div key={categoryItem.name}>
                        <SideBarMenuName onClick={() => handleToggle(categoryItem.name)}>
                            <Text $fontType="H3" color="grey20">
                                {categoryItem.name}
                            </Text>
                            <FiChevronDown color='#fff' />
                        </SideBarMenuName>
                        <Spacer height={15} />

                        {openCategory === categoryItem.name && categoryItem.items.map(item => (
                            <>
                                <Link
                                    key={item}
                                    to={`/category?large_category=${categoryItem.name}&small_category=${item}`}
                                    onClick={onClose}
                                >
                                    <Text $fontType="Body03" color="grey20">
                                        - {item}
                                    </Text>
                                    <Spacer height={10} />
                                </Link>
                            </>
                        ))}
                        <Spacer height={10} />
                    </div>
                ))}
            </SideBarMenuContainer>
        </HeaderSideBarContainer>
    );
};

export default HeaderSideBar;

const HeaderSideBarContainer = styled.div`
    width: 350px;
    height: 100vh;
    z-index: 999;
    background-color: ${props => props.theme.color.grey90};
    position: absolute;

`;

const SideBarButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 17px 20px;
`;

const SideBarNavButton = styled(Link)`
    background-color: ${props => props.theme.color.grey70};
    width: 100%;
    height: 42px;
    margin: 0 auto;
    display: grid;
    place-items: center;
    border-radius: 8px;
    
`;

const SideBarMenuContainer = styled.div`
    padding-left: 20px;
`;

const SideBarMenuName = styled.div`
    display: flex;
`;