import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Context, Ctx } from '../../../../Context/AuthContext';
import { Banks } from '../../../../Interfaces/interfaces';
import api from '../../../../Services/api';
import Button from '../../../Button';
import PopupDialog from '../../../PopupDialog';

import './styles.css';

interface OptionBt {
    idBank: number
}

interface BankStatusProps {
    questionIdParam: number;
    questionTitleParam: string;
    popupAddToBankStatus: boolean;
    setPopupAddToBankStatus(status: boolean): any
}

const BankStatus:React.FC<BankStatusProps> = ({ questionIdParam, questionTitleParam, popupAddToBankStatus, setPopupAddToBankStatus }) => {
    const [banks, setBanks] = useState<Banks[]>([]);
    const [banksAdded, setBanksAdded] = useState<Banks[]>([]);

    const { id: userID } = useContext<Ctx>(Context);
    
    const handleGetBanks = useCallback(() => {
        api.get(`banks?author=${userID}`).then(response => {
            setBanks(response.data);
        });

        handleCheckQuestionBanks(questionIdParam); // eslint-disable-next-line
    }, [userID]);
    
    function handleAddQuestionToBank(questionId: number, questionBankId:number) {
        api.put(`banks/${questionBankId}/questions/${questionId}`).then(() => {
            handleCheckQuestionBanks(questionIdParam);
            alert('Questão Adicionada com Sucesso ao banco!');
        }).catch(() => {
            alert('Erro ao adcionar questão ao banco!');
        });
    }
    
    function handleCheckQuestionBanks(id: number) {
        api.get(`questions/${id}/banks?author=${userID}`).then((response) => {
            setBanksAdded(response.data);
        }).catch(() => {
            alert('Erro!');
        });
    }
    
    function handleRemoveQuestionFromBank(questionId: number, questionBankId:number) {
        api.delete(`banks/${questionBankId}/question/${questionId}`).then(() => {
            handleCheckQuestionBanks(questionIdParam);
            alert('Questão removida do banco!');
        }).catch(() => {
            alert("Erro ao remover questão do banco, tente novamente.")
        });
    }

    const HandleOptionBt: React.FC<OptionBt> = ({ idBank }) => {
        const filtered = banksAdded.filter((bank) => {
            return bank.id === idBank;
        });

        if (filtered.length > 0) {
            return (<Button onClick={() => handleRemoveQuestionFromBank(questionIdParam, idBank)} className="removeBank"><FiMinus color="#FFF" size={22} />Remover</Button>);
        }
        return (<Button onClick={() => handleAddQuestionToBank(questionIdParam, idBank)}><FiPlus color="#FFF" size={22} />Adicionar</Button>)
    }

    useEffect(() => {
        if (popupAddToBankStatus) {
            handleGetBanks();
        } else {
            setBanks([]);
        }
    }, [popupAddToBankStatus, handleGetBanks])
    
    return (
        <PopupDialog
            popupDialogStatus={popupAddToBankStatus}
            setPopupDialogStatus={setPopupAddToBankStatus}
            title="Adicionar/Remover do banco"
        >
            <p className="questionName">{questionTitleParam}</p>
            <div className="listBanks">
                {banks.length === 0 &&
                    <p className="noBanks">Você ainda não possui nenhum banco de questões.</p>
                }
                {banks.map((bank, index) => (
                    <div key={index} className="bankItem">
                        <p className="bankName glass-l2">{bank.title}</p>
                        <HandleOptionBt idBank={bank.id} />
                    </div>
                ))}
            </div>
        </PopupDialog>
    );
}

export default BankStatus;