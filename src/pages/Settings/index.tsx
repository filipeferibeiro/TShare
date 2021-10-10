import React, { FormEvent, useContext, useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import IconButton from '../../components/IconButton';
import Input from '../../components/Input';
import PageName from '../../components/PageName';
import Section from '../../components/Section';
import Tag from '../../components/Tag';
import { iconColor } from '../../constants/constants';
import { AppNotificationCtx, AppNotificationContext } from '../../context/AppNotificationContext';
import { button, redContainerHover, RemoveButton, transition } from '../../styles/styles';

const Settings = () => {
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);

    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>("");
    const [oldPasswordInput, setOldPasswordInput] = useState<string>("");
    const [newPasswordInput, setNewPasswordInput] = useState<string>("");
    const [newPasswordRepeatInput, setNewPasswordRepeatInput] = useState<string>("");

    function addTag() {
        const duplicated = tags.filter(tag => tag === tagInput.trim());
        if (tagInput.trim().length > 0 && duplicated.length === 0) {
            setTags([ ...tags, tagInput ]);
            setTagInput("");
        } else {
            showNotification("Não é possível adicionar tags com o mesmo nome.", 1);
        }
    }
    
    function removeTag(i: number) {
        const newTags = tags.filter((t, index) => i !== index);

        setTags(newTags);
    }

    function changePassword(e: FormEvent) {
        e.preventDefault();

        showNotification("Ainda não implementado", 0);
    }

    const removeButton = (size: number, onClick:any) => {
        if (size > 0) {
            return (
                <button onClick={() => onClick([])} className={`${RemoveButton}`} type="button">Remover todas</button>
            );
        }

        return (
            <>
            </>
        );
    }

    function clearPasswordFields() {
        setOldPasswordInput('');
        setNewPasswordInput('');
        setNewPasswordRepeatInput('');
    }
    
    const clearButton = () => {
        if (oldPasswordInput.length > 0 || newPasswordInput.length > 0 || newPasswordRepeatInput.length > 0) {
            return (
                <button onClick={clearPasswordFields} className={`${RemoveButton}`} type="button">Limpar</button>
            );
        }

        return (
            <>
            </>
        );
    }

    return (
        <div className="flex flex-col gap-5 overflow-y-auto">
            <PageName name="Configurações" />
            <div className={`flex flex-col gap-3`}>
                <Section
                    title="Personalize sua experiência no feed"
                    Component={() => removeButton(tags.length, setTags)}
                >
                    {tags.length > 0 ?
                        <div className="flex gap-3 my-3 flex-wrap">
                            {tags.map((tag, index) => (
                                <div className={`flex items-center gap-1}`} key={index}>
                                    <button className={`p-2 ${transition} ${redContainerHover} rounded-full mr-2`} onClick={() => {}}>
                                        <FiX color={iconColor} />
                                    </button>
                                    <Tag title={tag} createQuestion />
                                </div>
                            ))}
                        </div>
                        :
                        <div className="my-3 flex justify-center content-center">
                            <p className="text-white">Você ainda não possui tags, tente adicionar uma!</p>
                        </div>
                    }
                    <div className={`flex flex-1 gap-3 w-full`}>
                        <Input placeholder="Nome da tag" value={tagInput} onChange={setTagInput} onKeyPress={e => e.key === 'Enter' && addTag()} />
                        <IconButton white Icon={FiPlus} onClick={addTag} type="button" tooltip="Adicionar Tag" />
                    </div>
                    <button className={`bg-tshare ${button} mt-3`}>Salvar tags</button>
                </Section>
                <Section 
                    title="Trocar senha"
                    Component={() => clearButton()}
                >
                    <form className="flex flex-col gap-3" onSubmit={changePassword}>
                        <Input type="password" placeholder="Senha atual" value={oldPasswordInput} onChange={setOldPasswordInput} required />
                        <Input type="password" placeholder="Nova senha" value={newPasswordInput} onChange={setNewPasswordInput} required />
                        <Input type="password" placeholder="Repetir nova senha" value={newPasswordRepeatInput} onChange={setNewPasswordRepeatInput} required />

                        <button type="submit" className={`bg-tshare ${button}`}>Trocar senha</button>
                    </form>
                </Section>
            </div>
        </div>
    );
}

export default Settings;