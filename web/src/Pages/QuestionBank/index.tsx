import React, { FormEvent, useCallback, useContext, useEffect } from 'react';
import { useState } from 'react';
import { FiEdit, FiFolder, FiPlus, FiTrash } from 'react-icons/fi';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import QuestionBankCard from '../../Components/QuestionBankCard';
import PageStyle from '../../Components/PageStyle';
import { Banks, Question } from '../../Interfaces/interfaces';
import PopupDialog from '../../Components/PopupDialog';

import './styles.css';
import api from '../../Services/api';
import { Context, Ctx } from '../../Context/AuthContext';

const QuestionBank = () => {
    const [banks, setBanks] = useState<Banks[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [bankSelected, setBankSelected] = useState<number>(-1);
    const [bankSelectedTitle, setBankSelectedTitle] = useState<string>("");
    
    const [popupNewBankStatus, setPopupNewBankStatus] = useState(false);
    const [newBankName, setNewBankName] = useState("");

    const [popupEditBankStatus, setPopupEditBankStatus] = useState(false);
    const [editBankName, setEditBankName] = useState("");
    
    const [popupDeleteBankStatus, setPopupDeleteBankStatus] = useState(false);

    const { id } = useContext<Ctx>(Context);

    const handleGetBanks = useCallback(() => {
        api.get(`questionBanks?author=${id}`).then(response => {
            setBanks(response.data);
        })
    }, [id]);

    function handleGetQuestionsBank() {
        api.get(`/getBankQuestions?questionBankId=${banks[bankSelected]?.id}`).then(response => {
            setQuestions(response.data);
        });
    } 

    useEffect(() => {
        handleGetBanks();
    }, [handleGetBanks]);

    useEffect(() => {
        if (banks) {
            setBankSelectedTitle(banks[bankSelected]?.title)
            if (bankSelected >= 0) {
                handleGetQuestionsBank();
            }

        } else {
            setBankSelectedTitle("")
        }
    }, [banks, bankSelected])

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
        console.log(banks)
        if (banks === undefined || banks.length <= 10) {
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

        const data = {
            title: newBankName,
            author: id
        }

        api.post('questionBanks', data).then(() => {
            alert('Banco Criado!');
            handleGetBanks();
        }).catch(() => {
            alert("Erro ao criar banco, tente novamente.")
        });
        
        setPopupNewBankStatus(false);
    }
    
    function handleEditBank(e: FormEvent) {
        e.preventDefault();

        const data = {
            title: editBankName
        }

        api.post(`updateBank?questionBankId=${banks[bankSelected].id}`, data).then(() => {
            alert('Nome do banco alterado!');
            handleGetBanks();
        }).catch(() => {
            alert("Erro ao editar nome do banco, tente novamente.")
        });
        
        setPopupEditBankStatus(false);
    }
    
    function handleDeleteBank(e: FormEvent) {
        e.preventDefault();

        api.delete(`removeBank?questionBankId=${banks[bankSelected].id}`).then(() => {
            alert('Banco removido!');
            setBankSelected(-1);
            handleGetBanks();
        }).catch(() => {
            alert("Erro ao remover banco, tente novamente.")
        });
        
        setPopupDeleteBankStatus(false);
    }

    return (
        <>
        <PageStyle title="Banco de questões">
            <div className="containerQuestionBank">
                <div className="banks">
                    <div className="contentTop">
                        <p className="banksTitle">Bancos</p>
                        <button className="contentBt" onClick={handleOpenNewBankPopup}><FiPlus color="#FFF" size={25} /></button>
                    </div>
                    <div className="banksList">
                        {banks &&
                            banks.map((bank, index) => (
                                <Button key={index} className={`bankItem ${handleGetIsSelected(index)}`} onClick={() => {handleSetSelected(index)}}><FiFolder color="#FFF" size={20} />{bank.title}</Button>
                            ))
                        }
                    </div>
                </div>
                    <div className="contentQB">
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
                                {questions.map((question, index) => (
                                    <QuestionBankCard key={index} question={question} idBank={banks[bankSelected].id} updateFunc={handleGetQuestionsBank} />
                                ))}
                            </div>
                            </>
                            :
                            <p className="noBankSelected">
                                Selecione um banco para visualizar
                            </p>
                        }
                    </div>
            </div>
        </PageStyle>
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
            <form className="formPopup" onSubmit={handleEditBank}>
                <Input placeholder="Nome do banco" value={editBankName} onChange={setEditBankName} required />
                <Button type="submit" className="editBt">Editar</Button>
            </form>
        </PopupDialog>
        {banks && 
            <PopupDialog
                popupDialogStatus={popupDeleteBankStatus}
                setPopupDialogStatus={setPopupDeleteBankStatus}
                title="Deseja remover este banco?"
            >
                <form className="formPopup" onSubmit={handleDeleteBank}>
                    <p className="bankName">{banks[bankSelected]?.title}</p>
                    <Button type="submit" className="DeleteBt">Deletar</Button>
                </form>
            </PopupDialog>
        }
        </>
    )
}

export default QuestionBank;
