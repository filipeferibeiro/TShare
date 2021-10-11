import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FiEdit, FiFileText, FiTrash2 } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import PageName from '../../components/PageName';
import QuestionCardDefault from '../../components/QuestionCardDefault';
import { PopupContext, PopupCtx } from '../../context/PopupContext';
import { BankProps, PdfCreationProps, QuestionProps } from '../../interfaces/interfaces';
import { getBank, getQuestionsFromBank } from '../../services/banks';
import { postExam } from '../../services/exam';
import DeleteBankPopup from '../ListBanks/components/DeleteBankPopup';
import EditBankPopup from '../ListBanks/components/EditBankPopup';
import GeneratePdfPopup from './components/GeneratePdfPopup';

interface BankDetailParams {
    bankId?: string
}

const BankDetail = () => {
    const { createPopup } = useContext<PopupCtx>(PopupContext);
    const history = useHistory();
    
    const { bankId } = useParams<BankDetailParams>();
    const [banks, setBanks] = useState<BankProps>();
    const [questions, setQuestions] = useState<QuestionProps[]>([]);

    async function getAllQuestions() {
        getQuestionsFromBank(bankId || "-1").then(res => {
            setQuestions(res);
        })
    }

    async function handleGetBanks() {
        getBank(bankId || "-1").then(res => {
            setBanks(res[0]);
        });
    }

    function deleteBank() {
        history.push("/banks")
    }

    function handleEditBank(bankId:number, oldName:string) {
        createPopup("Editar banco de questões", () => <EditBankPopup bankId={bankId} oldName={oldName} updateFunction={handleGetBanks} />);
    }
    
    function handleDeleteBank(bankId:number, bankTitle:string) {
        createPopup("Remover banco de questões", () => <DeleteBankPopup bankId={bankId} bankTitle={bankTitle} updateFunction={deleteBank} />);
    }

    function handleGeneratePdf() {
        createPopup("Gerar PDF", () => <GeneratePdfPopup bankId={bankId || "-1"} />)
    }

    useEffect(() => {
        handleGetBanks();
        getAllQuestions();
    }, []);

    return (
        <div className="flex flex-col gap-5 overflow-y-auto">
            <PageName name={banks?.title || ""} back to="/banks">
                <div className={`flex gap-2`}>
                    {questions.length > 0 &&
                        <IconButton white Icon={FiFileText} onClick={handleGeneratePdf} tooltip="Gerar PDF" />
                    }
                    <IconButton yellow Icon={FiEdit} onClick={() => handleEditBank(banks?.id || -1, banks?.title || "")} tooltip="Editar banco" />
                    <IconButton red Icon={FiTrash2} onClick={() => handleDeleteBank(banks?.id || -1, banks?.title || "")} tooltip="Deletar banco" />
                </div>
            </PageName>
            <div className={`flex flex-col gap-5`}>
                {questions.map(question => (
                    <QuestionCardDefault isBank key={question.id} question={question} bankId={banks?.id} func={getAllQuestions} />
                ))}
            </div>
        </div>
    );
}

export default BankDetail;