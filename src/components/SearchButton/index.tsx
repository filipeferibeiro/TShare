import React, { useContext, useRef } from 'react';
import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { iconColor, iconSize } from '../../constants/constants';
import { Context, Ctx } from '../../context/AuthContext';
import { IconProps } from '../../interfaces/interfaces';
import { blackContainer, blackContainerHover, rounded, transition } from '../../styles/styles';

interface SearchButtonProps {
    Icon: React.FC<IconProps>;
    onClick?(): any;
    value: string;
    setValue(value: string): any 
}

const SearchButton:React.FC<SearchButtonProps> = ({ Icon, onClick, value, setValue }) => {
    const { searchActive, setSearchActive } = useContext<Ctx>(Context);
    const searchInput = useRef<HTMLInputElement>(null);
    const history = useHistory();

    function handleOpenSearch() {
        setSearchActive(true);
        history.push('/search')
    }
    
    function handleCloseSearch() {
        setSearchActive(false);
        setValue("")
    }
    function handleOpenButton() {
        setValue("");
        handleOpenSearch();
    }
    
    useEffect(()=> {
        if (searchInput.current) {
            searchInput.current.focus();
        }
    },[searchActive])

    return (
        <div
            className={`
                p-4
                ${searchActive ? "search-size" : "w-14"}
                ${searchActive ? "gap-4" : ""}
                h-14
                flex
                items-center
                justify-center
                ${rounded}
                ${searchActive ? blackContainer : blackContainerHover}
                ${transition}
                search-transition
                cursor-pointer
            `}
            onClick={() => {!searchActive && handleOpenButton()}}
        >
            <Icon size={iconSize} color={iconColor} />
            {searchActive &&
                <>
                <input ref={searchInput} value={value} onChange={(e) => setValue(e.target.value)} onFocus={handleOpenSearch} placeholder="Digite sua pesquisa..." className="flex-1 bg-transparent text-white border-none font-light p-0 focus:ring-0" type="text" />
                <button className="hover:opacity-75" onClick={handleCloseSearch}><FiX size={iconSize} color={iconColor} /></button>
                </>
            }
        </div>
    )
}

export default SearchButton;