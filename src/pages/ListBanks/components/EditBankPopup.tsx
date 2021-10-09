import React, { FormEvent } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import Input from '../../../components/Input';
import Section from '../../../components/Section';
import { AppNotificationContext, AppNotificationCtx } from '../../../context/AppNotificationContext';
import { PopupContext, PopupCtx } from '../../../context/PopupContext';
import { BankEditProps } from '../../../interfaces/interfaces';
import { putBank } from '../../../services/banks';
import { button } from '../../../styles/styles';

interface EditBankPopupProps {
    updateFunction(): any;
    bankId: number;
    oldName: string;
}

const EditBankPopup:React.FC<EditBankPopupProps> = ({ updateFunction, bankId, oldName }) => {
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    const { setPopupActive } = useContext<PopupCtx>(PopupContext);

    const [bankName, setBankName] = useState(oldName);

    function handleEditBank(e: FormEvent) {
        e.preventDefault();

        const data:BankEditProps = {
            title: bankName,
        }

        putBank(bankId, data).then(res => {
            if (res) {
                showNotification("Nome do banco editado com sucesso", 2);
                updateFunction();
                setPopupActive(false);
            } else {
                showNotification("Falha ao editar nome do banco", 1);
            }
        });
    }

    return (
        <div className={`flex`}>
            <Section title="Nome do banco">
                <form onSubmit={handleEditBank} className={`flex flex-1 gap-3 w-full`}>
                    <Input className={`flex-1`} placeholder="Informe o nome do banco" value={bankName} onChange={setBankName} />
                    <button type="submit" className={`bg-tshareYellow ${button}`}>Editar</button>
                </form>
            </Section>
        </div>
    );
}

export default EditBankPopup;