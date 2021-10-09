import React from 'react';
import { useContext } from 'react';
import { AppNotificationContext, AppNotificationCtx } from '../../../../context/AppNotificationContext';
import { PopupContext, PopupCtx } from '../../../../context/PopupContext';
import { deleteComment } from '../../../../services/questions';
import { blackContainerHover, button } from '../../../../styles/styles';

interface DeleteCommentPopupProps {
    updateFunction(): any;
    commentId: number;
    questionId: number;
    comment: string;
}

const DeleteCommentPopup:React.FC<DeleteCommentPopupProps> = ({ updateFunction, questionId, commentId, comment }) => {
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    const { setPopupActive } = useContext<PopupCtx>(PopupContext);


    function handleDeleteBank() {
        deleteComment(questionId, commentId).then(res => {
            if (res) {
                showNotification("Comentário removido com sucesso", 2);
                updateFunction();
                setPopupActive(false);
            } else {
                showNotification("Falha ao remover comentário", 1);
            }
        });
    }

    return (
        <div className={`flex flex-col break-words`}>
            <p className={`text-white text-center font-medium text-2xl`}>Deseja realmente remover o comentário: <br /><br /> {comment}</p>
            <div className={`flex justify-end mt-4 gap-2`}>
                <button className={`${button} ${blackContainerHover}`} onClick={() => setPopupActive(false)}>Não</button>
                <button className={`bg-tshareRed ${button} px-12`} onClick={handleDeleteBank}>Sim</button>
            </div>
        </div>
    );
}

export default DeleteCommentPopup;