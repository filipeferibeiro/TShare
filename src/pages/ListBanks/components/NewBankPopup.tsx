import React, { FormEvent } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import Input from '../../../components/Input';
import Section from '../../../components/Section';
import { AppNotificationContext, AppNotificationCtx } from '../../../context/AppNotificationContext';
import { Context, Ctx } from '../../../context/AuthContext';
import { PopupContext, PopupCtx } from '../../../context/PopupContext';
import { BankCreateProps } from '../../../interfaces/interfaces';
import { postBank } from '../../../services/banks';
import { button } from '../../../styles/styles';

interface NewBankPopupProps {
    updateFunction(): any
}

const NewBankPopup:React.FC<NewBankPopupProps> = ({ updateFunction }) => {
    const { id: userId } = useContext<Ctx>(Context);
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    const { setPopupActive } = useContext<PopupCtx>(PopupContext);

    const [bankName, setBankName] = useState("");

    function handleCreateBank(e: FormEvent) {
        e.preventDefault();

        const data:BankCreateProps = {
            title: bankName,
            author: userId
        }

        postBank(data).then(res => {
            if (res) {
                showNotification("Banco criado com sucesso", 2);
                updateFunction();
                setPopupActive(false);
            } else {
                showNotification("Falha ao criar banco", 1);
            }
        });
    }

    return (
        <div className={`flex`}>
            <Section title="Nome do banco">
                <form onSubmit={handleCreateBank} className={`flex flex-1 gap-3 w-full`}>
                    <Input className={`flex-1`} placeholder="Informe o nome do banco" value={bankName} onChange={setBankName} />
                    <button type="submit" className={`bg-tshare ${button}`}>Criar</button>
                </form>
            </Section>
        </div>
    );
}

export default NewBankPopup;