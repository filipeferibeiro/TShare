import React, { FormEvent } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import Input from '../../../../components/Input';
import Section from '../../../../components/Section';
import { AppNotificationContext, AppNotificationCtx } from '../../../../context/AppNotificationContext';
import { PopupContext, PopupCtx } from '../../../../context/PopupContext';
import { CommentCreateProps } from '../../../../interfaces/interfaces';
import { putQuestionComments } from '../../../../services/questions';
import { button } from '../../../../styles/styles';

interface EditCommentPopupProps {
    updateFunction(): any;
    questionId: number;
    commentId: number;
    authorId:number;
    oldComment: string;
}

const EditCommentPopup:React.FC<EditCommentPopupProps> = ({ updateFunction, authorId, questionId, commentId, oldComment }) => {
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    const { setPopupActive } = useContext<PopupCtx>(PopupContext);

    const [newComment, setNewComment] = useState(oldComment);

    function handleEditComment(e: FormEvent) {
        e.preventDefault();

        const data: CommentCreateProps = {
            text: newComment,
            author_id: authorId
        }

        putQuestionComments(questionId, commentId, data).then(res => {
            if (res) {
                showNotification("Comentário editado com sucesso", 2);
                updateFunction();
                setPopupActive(false);
            } else {
                showNotification("Falha ao editar comentário", 1);
            }
        });
    }

    return (
        <div className={`flex`}>
            <Section title="Comentário">
                <form onSubmit={handleEditComment} className={`flex flex-1 gap-3 w-full`}>
                    <Input className={`flex-1`} placeholder="Informe o nome do banco" value={newComment} onChange={setNewComment} />
                    <button type="submit" className={`bg-tshareYellow ${button}`}>Editar</button>
                </form>
            </Section>
        </div>
    );
}

export default EditCommentPopup;