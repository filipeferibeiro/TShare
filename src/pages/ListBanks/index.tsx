import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { FiEdit, FiFolder, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import PageName from '../../components/PageName';
import { iconColor } from '../../constants/constants';
import { Context, Ctx } from '../../context/AuthContext';
import { PopupContext, PopupCtx } from '../../context/PopupContext';
import { BankProps } from '../../interfaces/interfaces';
import { getAllBanks } from '../../services/banks';
import { rounded, transition, whiteContainer } from '../../styles/styles';
import DeleteBankPopup from './components/DeleteBankPopup';
import EditBankPopup from './components/EditBankPopup';
import NewBankPopup from './components/NewBankPopup';

const ListBanks:React.FC = () => {
    const { id: userId } = useContext<Ctx>(Context);
    const { createPopup } = useContext<PopupCtx>(PopupContext);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (location.search.includes('new=1')) {
            handleNewBank();
        }
    }, [])


    const [banks, setBanks] = useState<BankProps[]>([]);

    async function handleGetBanks() {
        getAllBanks(userId).then(res => {
            setBanks(res);
        });
    }

    function handleNewBank() {
        createPopup("Novo banco de questões", () => <NewBankPopup updateFunction={handleGetBanks} />);
    }
    
    function handleEditBank(bankId:number, oldName:string) {
        createPopup("Editar banco de questões", () => <EditBankPopup bankId={bankId} oldName={oldName} updateFunction={handleGetBanks} />);
    }
    
    function handleDeleteBank(bankId:number, bankTitle:string) {
        createPopup("Remover banco de questões", () => <DeleteBankPopup bankId={bankId} bankTitle={bankTitle} updateFunction={handleGetBanks} />);
    }

    function handleBankDetail(bankId:number) {
        history.push(`/banks/${bankId}`);
    }

    useEffect(() => {
        handleGetBanks();
    }, []);

    return (
        <div className="flex flex-col gap-5 overflow-y-auto">
            <PageName name="Banco de Questões">
                <IconButton white Icon={FiPlus} onClick={handleNewBank} />
            </PageName>
            <div className={`flex flex-col gap-3`}>
                {banks.map((bank) => (
                    <div key={bank.id} className={`flex justify-between py-2 px-4 ${whiteContainer} ${rounded} cursor-pointer hover:bg-opacity-20 ${transition}`}>
                        <div className={`flex gap-4 items-center flex-1`} onClick={() => handleBankDetail(bank.id)}>
                            <FiFolder color={iconColor} size={25} />
                            <p className={`text-white`}>{bank.title}</p>
                        </div>
                        <div className={`flex gap-2`}>
                            <IconButton yellow Icon={FiEdit} onClick={() => handleEditBank(bank.id, bank.title)} />
                            <IconButton red Icon={FiTrash2} onClick={() => handleDeleteBank(bank.id, bank.title)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListBanks;