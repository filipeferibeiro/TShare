import React, { FormEvent } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import Input from '../../../../components/Input';
import Section from '../../../../components/Section';
import { AppNotificationContext, AppNotificationCtx } from '../../../../context/AppNotificationContext';
import { PopupContext, PopupCtx } from '../../../../context/PopupContext';
import { UserProps } from '../../../../interfaces/interfaces';
import { button } from '../../../../styles/styles';

interface EditProfilePopupProps {
    updateFunction(): any;
    user: UserProps;
}

const EditProfilePopup:React.FC<EditProfilePopupProps> = ({ user, updateFunction }) => {
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    const { setPopupActive } = useContext<PopupCtx>(PopupContext);

    const [userName, setUserName] = useState(user.name);
    const [userEmail, setUserEmail] = useState(user.email);


    function handleEditBank(e: FormEvent) {
        e.preventDefault();
    }

    return (
        <div className={`flex`}>
            <form onSubmit={handleEditBank} className={`flex flex-col flex-1 gap-3 w-full`}>
                <Section title="Nome do usuário">
                    <Input id="name" type="text" className={`flex-1`} placeholder="Informe o novo nome do usuário" value={userName} onChange={setUserEmail} />
                </Section>
                <Section title="E-mail">
                    <Input id="email" type="email" className={`flex-1`} placeholder="Informe o novo e-mail" value={userEmail} onChange={setUserEmail} />
                </Section>
                    <button type="submit" className={`bg-tshare ${button}`}>Salvar informações</button>
            </form>
        </div>
    );
}

export default EditProfilePopup;