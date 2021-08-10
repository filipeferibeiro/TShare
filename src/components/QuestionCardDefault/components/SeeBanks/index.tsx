import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { FiCheck, FiFolder, FiX } from 'react-icons/fi';
import { iconColor } from '../../../../constants/constants';
import { AppNotificationContext, AppNotificationCtx } from '../../../../context/AppNotificationContext';
import { Context, Ctx } from '../../../../context/AuthContext';
import { BankProps } from '../../../../interfaces/interfaces';
import { deleteFromBank, getAllBanks, getCheckQuestionFromBanks, putAddToBank } from '../../../../services/banks';
import { blackContainer, rounded, transition } from '../../../../styles/styles';
import IconButton from '../../../IconButton';

interface SeeBanksProps {
    questionId: number;
}

const SeeBanks:React.FC<SeeBanksProps> = ({ questionId }) => {
    const { id: userId } = useContext<Ctx>(Context);
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);

    const [banks, setBanks] = useState<BankProps[]>([]);
    const [questionBanks, setQuestionBanks] = useState<BankProps[]>([]);

    async function handleGetBanks() {
        getAllBanks(userId).then(res => {
            setBanks(res);
        });
    }
    
    async function handleGetQuestionBanks() {
        getCheckQuestionFromBanks(questionId, userId).then(res => {
            setQuestionBanks(res);
        });
    }

    async function handleAddToBank(bankId:number) {
        putAddToBank(bankId, questionId).then(res => {
            if (res) {
                showNotification("Questão adicionada com sucesso ao banco.", 2);
                handleGetQuestionBanks();
            } else {
                showNotification("Erro ao adicionar questão ao banco.", 1);
            }
        });
    }
    
    async function handleDeleteFromBank(bankId:number) {
        deleteFromBank(bankId, questionId).then(res => {
            if (res) {
                showNotification("Questão removida com sucesso do banco.", 2);
                handleGetQuestionBanks();
            } else {
                showNotification("Erro ao remover questão do banco.", 1);
            }
        });
    }

    function checkQuestionOnBank(bankId:number) {
        const filtered = questionBanks.filter((bank) => {
            return bank.id === bankId;
        });

        if (filtered.length > 0) {
            return true;
        }

        return false;
    }

    useEffect(() => {
        handleGetBanks();
        handleGetQuestionBanks();
    }, []);

    return (
        <div className={`flex flex-col gap-3`}>
                {banks.map((bank) => (
                    <div key={bank.id} className={`flex justify-between py-2 px-4 ${blackContainer} ${rounded} hover:bg-opacity-20 ${transition}`}>
                        <div className={`flex gap-4 items-center flex-1`}>
                            <FiFolder color={iconColor} size={25} />
                            <p className={`text-white`}>{bank.title}</p>
                        </div>
                        <div className={`flex gap-2`}>
                            {checkQuestionOnBank(bank.id)
                                ?
                                <IconButton red Icon={FiX} onClick={() => handleDeleteFromBank(bank.id)} />
                                :
                                <IconButton green Icon={FiCheck} onClick={() => handleAddToBank(bank.id)} />
                            }
                        </div>
                    </div>
                ))}
            </div>
    );
}

export default SeeBanks;