import React, { useContext } from 'react';
import PageName from '../../components/PageName';
import { Context, Ctx } from '../../context/AuthContext';

const Search = () => {
    const { searchField } = useContext<Ctx>(Context);
    return (
        <div className="flex flex-col gap-5 overflow-y-auto">
            <PageName name="Pesquisa" />
            <p>{searchField}</p>
        </div>
    );
}

export default Search;