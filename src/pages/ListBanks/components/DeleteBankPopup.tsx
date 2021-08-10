import React from 'react';
import { useContext } from 'react';
import { AppNotificationContext, AppNotificationCtx } from '../../../context/AppNotificationContext';
import { PopupContext, PopupCtx } from '../../../context/PopupContext';
import { deleteBank } from '../../../services/banks';
import { blackContainerHover, button } from '../../../styles/styles';

interface DeleteBankPopupProps {
    updateFunction(): any;
    bankId: number;
    bankTitle: string;
}

const DeleteBankPopup:React.FC<DeleteBankPopupProps> = ({ updateFunction, bankId, bankTitle }) => {
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    const { setPopupActive } = useContext<PopupCtx>(PopupContext);


    function handleDeleteBank() {
        deleteBank(bankId).then(res => {
            if (res) {
                showNotification("Banco removido com sucesso", 2);
                updateFunction();
                setPopupActive(false);
            } else {
                showNotification("Falha ao remover banco", 1);
            }
        });
    }

    return (
        <div className={`flex flex-col`}>
            <p className={`text-white text-center font-medium text-2xl`}>Deseja realmente remover o banco: {bankTitle}</p>
            <div className={`flex justify-end mt-4 gap-2`}>
                <button className={`${button} ${blackContainerHover}`} onClick={() => setPopupActive(false)}>Não</button>
                <button className={`bg-tshareRed ${button} px-12`} onClick={handleDeleteBank}>Sim</button>
            </div>
        </div>
    );
}

export default DeleteBankPopup;