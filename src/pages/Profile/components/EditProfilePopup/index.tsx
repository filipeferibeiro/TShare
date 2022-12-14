import React, { FormEvent, useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import DropzoneProfile from '../../../../components/DropzoneProfile';
import Input from '../../../../components/Input';
import Section from '../../../../components/Section';
import { AppNotificationContext, AppNotificationCtx } from '../../../../context/AppNotificationContext';
import { Context, Ctx } from '../../../../context/AuthContext';
import { PopupContext, PopupCtx } from '../../../../context/PopupContext';
import { UserProps } from '../../../../interfaces/interfaces';
import { getImageProfile, postImageProfile } from '../../../../services/images';
import { putUser } from '../../../../services/users';
import { button, RemoveButton } from '../../../../styles/styles';

interface EditProfilePopupProps {
    updateFunction(): any;
    user: UserProps;
}

const EditProfilePopup:React.FC<EditProfilePopupProps> = ({ user, updateFunction }) => {
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    const { setPopupActive } = useContext<PopupCtx>(PopupContext);
    const { changePic, setChangePic } = useContext<Ctx>(Context);

    const [userName, setUserName] = useState<string>(user.name);
    const [userSchool, setUserSchool] = useState<string>(user.school);
    const [userSubject, setUserSubject] = useState<string>(user.subject);
    const [userEmail, setUserEmail] = useState<string>(user.email);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [imageLoaded, setImageLoaded] = useState<string>();

    const [deleteImage, setDeleteImage] = useState<boolean>(false);


    function handleEditBank(e: FormEvent) {
        e.preventDefault();

        let userChange = new FormData();

        const data = {
            name: userName,
            email: userEmail,
            subject: userSubject,
            school: userSchool
        }

        userChange.append('user', JSON.stringify(data));

        if (selectedFile) {
            userChange.append('image', selectedFile);
        }

        putUser(user.id, userChange, deleteImage).then(res => {
            if (res) {
                showNotification("Perfil alterado com sucesso!", 2);
                updateFunction();
                setChangePic(!changePic);
                setPopupActive(false);
            } else {
                showNotification("Erro ao alterar perfil!", 1);
            }
        });
    }

    function removePicture() {
        setSelectedFile(undefined);
        setImageLoaded(undefined);
        setDeleteImage(true);
    }

    useEffect(() => {
        getImageProfile(`${user.id}` || "-1", setImageLoaded);
    }, []);

    useEffect(() => {
        if (selectedFile && imageLoaded) {
            setImageLoaded(undefined);
        }
    }, [selectedFile]);

    const removePictureButton = () => {
        if (selectedFile || imageLoaded) {
            return (
                <button onClick={removePicture} className={`${RemoveButton}`} type="button">Remover imagem</button>
            );
        }

        return (
            <>
            </>
        );
    }

    return (
        <div className={`flex`}>
            <form onSubmit={handleEditBank} className={`flex flex-col flex-1 gap-3 w-full`}>
                <Section title="Imagem de Perfil" Component={() => removePictureButton()}>
                    <div className={`flex justify-center `}>
                        <DropzoneProfile onFileUploaded={setSelectedFile} selectedFile={selectedFile} imageLoaded={imageLoaded} />
                    </div>
                </Section>
                <div className="flex flex-1 w-full gap-3">
                    <Section title="Nome do usu??rio">
                        <Input id="name" type="text" className={`flex-1`} placeholder="Informe o novo nome do usu??rio" value={userName} onChange={setUserName} required />
                    </Section>
                    <Section title="E-mail">
                        <Input id="email" type="email" className={`flex-1`} placeholder="Informe o novo e-mail" value={userEmail} onChange={setUserEmail} required />
                    </Section>
                </div>
                <div className="flex flex-1 w-full gap-3">
                    <Section title="Escola">
                        <Input id="school" type="text" className={`flex-1`} placeholder="Informe o novo nome da escola" value={userSchool} onChange={setUserSchool} required />
                    </Section>
                    <Section title="Disciplina">
                        <Input id="subject" type="text" className={`flex-1`} placeholder="Informe o novo nome da disciplina" value={userSubject} onChange={setUserSubject} required />
                    </Section>
                </div>
                <button type="submit" className={`bg-tshare ${button}`}>Salvar informa????es</button>
            </form>
        </div>
    );
}

export default EditProfilePopup;