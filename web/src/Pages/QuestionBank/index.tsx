import React, { FormEvent, useEffect } from 'react';
import { useState } from 'react';
import { FiEdit, FiFolder, FiPlus, FiTrash } from 'react-icons/fi';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import QuestionBankCard from '../../Components/QuestionBankCard';
import { Banks } from '../../Interfaces/interfaces';
import PopupDialog from '../../Components/PopupDialog';

import './styles.css';

const QuestionBank = () => {
    const [banks, setBanks] = useState<Banks[]>([]);
    const [bankSelected, setBankSelected] = useState<number>(-1);
    const [bankSelectedTitle, setBankSelectedTitle] = useState<string>("");
    
    const [popupNewBankStatus, setPopupNewBankStatus] = useState(false);
    const [newBankName, setNewBankName] = useState("");

    const [popupEditBankStatus, setPopupEditBankStatus] = useState(false);
    const [editBankName, setEditBankName] = useState("");
    
    const [popupDeleteBankStatus, setPopupDeleteBankStatus] = useState(false);

    useEffect(() => {
        /* Mock Begin */
        setBanks([
            {
                id: 1,
                title: 'Matemática'
            },
            {
                id: 2,
                title: 'História'
            },
            {
                id: 3,
                title: 'Ciências'
            },
            {
                id: 4,
                title: 'Geografia'
            },
            {
                id: 5,
                title: 'Geometria'
            },
            {
                id: 6,
                title: 'Filosofia'
            }
        ]);
        /* Mock End */
    }, []);

    useEffect(() => {
        setBankSelectedTitle(banks[bankSelected]?.title)
    }, [bankSelected])

    function handleGetIsSelected(index: number) {
        if (bankSelected === index) {
            return "selected";
        }

        return "";
    }

    function handleSetSelected(index: number) {
        setBankSelected(index);
    }

    function handleOpenNewBankPopup() {
        setNewBankName("");

        if (banks.length <= 10) {
            setPopupNewBankStatus(true);
        } else {
            alert("Você não pode ter mais de 10 bancos!")
        }
    }
    
    function handleOpenEditBankPopup() {
        const bankName = banks[bankSelected].title;
        setEditBankName(bankName);

        setPopupEditBankStatus(true);
    }
    
    function handleOpenDeleteBankPopup() {
        setPopupDeleteBankStatus(true);
    }

    function handleNewBank(e: FormEvent) {
        e.preventDefault();

        const nextId = banks[banks.length - 1].id + 1
        setBanks([
            ...banks,
            {
                id: nextId,
                title: newBankName
            }
        ]);
        
        setPopupNewBankStatus(false);
    }

    return (
        <>
        <div className="glass-l1 containerQuestionBank">
            <div className="banks">
                <div className="contentTop">
                    <p className="banksTitle">Bancos</p>
                    <button className="contentBt" onClick={handleOpenNewBankPopup}><FiPlus color="#FFF" size={25} /></button>
                </div>
                <div className="banksList">
                    {banks.map((bank, index) => (
                        <Button key={index} className={`bankItem ${handleGetIsSelected(index)}`} onClick={() => {handleSetSelected(index)}}><FiFolder color="#FFF" size={20} />{bank.title}</Button>
                    ))}
                </div>
            </div>
            <div className="content">
                {bankSelected >= 0 ?
                    <>
                    <div className="contentTop">
                        <p className="contentTitle">{bankSelectedTitle}</p>
                        <div className="left">
                            <Button className="contentBt trash" onClick={handleOpenDeleteBankPopup}><FiTrash color="#FFF" size={25} /></Button>
                            <Button className="contentBt" onClick={handleOpenEditBankPopup}><FiEdit color="#FFF" size={25} /></Button>
                        </div>
                    </div>
                    <div className="contentCards">
                        <QuestionBankCard />
                        <QuestionBankCard />
                        <QuestionBankCard />
                        <QuestionBankCard />
                        <QuestionBankCard />
                    </div>
                    </>
                    :
                    <p className="noBankSelected">
                        Selecione um banco para visualizar
                    </p>
                }
            </div>
        </div>
        <PopupDialog
            popupDialogStatus={popupNewBankStatus}
            setPopupDialogStatus={setPopupNewBankStatus}
            title="Novo banco de questões"
        >
            <form className="formPopup" onSubmit={handleNewBank}>
                <Input placeholder="Nome do banco" value={newBankName} onChange={setNewBankName} required />
                <Button type="submit">Adicionar</Button>
            </form>
        </PopupDialog>
        <PopupDialog
            popupDialogStatus={popupEditBankStatus}
            setPopupDialogStatus={setPopupEditBankStatus}
            title="Editar nome do banco"
        >
            <form className="formPopup" onSubmit={handleNewBank}>
                <Input placeholder="Nome do banco" value={editBankName} onChange={setEditBankName} required />
                <Button type="submit" className="editBt">Editar</Button>
            </form>
        </PopupDialog>
        <PopupDialog
            popupDialogStatus={popupDeleteBankStatus}
            setPopupDialogStatus={setPopupDeleteBankStatus}
            title="Deseja remover este banco?"
        >
            <form className="formPopup" onSubmit={handleNewBank}>
                <p className="bankName">{banks[bankSelected]?.title}</p>
                <Button type="submit" className="DeleteBt">Deletar</Button>
            </form>
        </PopupDialog>
        </>
    )
}

export default QuestionBank;