import React, { FormEvent } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import DropzoneProfile from '../../../../components/DropzoneProfile';
import Input from '../../../../components/Input';
import Section from '../../../../components/Section';
import { AppNotificationContext, AppNotificationCtx } from '../../../../context/AppNotificationContext';
import { Context, Ctx } from '../../../../context/AuthContext';
import { PopupContext, PopupCtx } from '../../../../context/PopupContext';
import { UserProps } from '../../../../interfaces/interfaces';
import { postImageProfile } from '../../../../services/images';
import { button } from '../../../../styles/styles';

interface EditProfilePopupProps {
    updateFunction(): any;
    user: UserProps;
}

const EditProfilePopup:React.FC<EditProfilePopupProps> = ({ user, updateFunction }) => {
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    const { setPopupActive } = useContext<PopupCtx>(PopupContext);
    const { changePic, setChangePic } = useContext<Ctx>(Context);

    const [userName, setUserName] = useState(user.name);
    const [userEmail, setUserEmail] = useState(user.email);
    const [selectedFile, setSelectedFile] = useState<File>();


    function handleEditBank(e: FormEvent) {
        e.preventDefault();

        if(selectedFile) {
            let image = new FormData();
            image.append("image", selectedFile);
            postImageProfile(user.id, image).then(resImage => {
                if (resImage) {
                    showNotification("Imagem alterada com sucesso!", 2);
                    setChangePic(!changePic);
                    setPopupActive(false);
                } else {
                    showNotification("Erro ao alterar imagem!", 1);
                }
            })
        }

    }

    return (
        <div className={`flex`}>
            <form onSubmit={handleEditBank} className={`flex flex-col flex-1 gap-3 w-full`}>
                <Section title="Imagem de Perfil">
                    <div className={`flex justify-center `}>
                        <DropzoneProfile onFileUploaded={setSelectedFile} />
                    </div>
                </Section>
                <Section title="Nome do usuário">
                    <Input id="name" type="text" className={`flex-1`} placeholder="Informe o novo nome do usuário" value={userName} onChange={setUserName} />
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