import React from 'react';
import { useContext } from 'react';
import { AppNotificationContext, AppNotificationCtx } from '../../../../context/AppNotificationContext';
import { PopupContext, PopupCtx } from '../../../../context/PopupContext';
import { deleteQuestion } from '../../../../services/questions';
import { blackContainerHover, button } from '../../../../styles/styles';

interface DeleteQuestionPopupProps {
    updateFunction(): any;
    questionId: number;
    questionTitle: string;
}

const DeleteQuestionPopup:React.FC<DeleteQuestionPopupProps> = ({ updateFunction, questionId, questionTitle }) => {
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    const { setPopupActive } = useContext<PopupCtx>(PopupContext);


    function handleDeleteBank() {
        deleteQuestion(questionId).then(res => {
            if (res) {
                showNotification("Questão deletada com sucesso", 2);
                updateFunction();
                setPopupActive(false);
            } else {
                showNotification("Falha ao deletar questão", 1);
            }
        });
    }

    return (
        <div className={`flex flex-col`}>
            <p className={`text-white text-center font-medium text-2xl`}>Deseja realmente remover a questão: {questionTitle}</p>
            <div className={`flex justify-end mt-4 gap-2`}>
                <button className={`${button} ${blackContainerHover}`} onClick={() => setPopupActive(false)}>Não</button>
                <button className={`bg-tshareRed ${button} px-12`} onClick={handleDeleteBank}>Sim</button>
            </div>
        </div>
    );
}

export default DeleteQuestionPopup;