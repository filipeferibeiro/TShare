import React, { useContext, useEffect, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { FiEdit, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi';
import { useHistory } from 'react-router';
import IconButton from '../../../../components/IconButton';
import ProfilePicture from '../../../../components/ProfilePicture';
import { iconColor } from '../../../../constants/constants';
import { Context, Ctx } from '../../../../context/AuthContext';
import { PopupContext, PopupCtx } from '../../../../context/PopupContext';
import { toDate } from '../../../../functions';
import { CommentProps } from '../../../../interfaces/interfaces';
import { blackContainer, buttonIconName, rounded } from '../../../../styles/styles';
import DeleteCommentPopup from '../DeleteCommentPopup';
import EditCommentPopup from '../EditCommentPopup';

interface CommentCardProps {
    questionId: number;
    comment: CommentProps;
    updateFunc(): any
}

const CommentCard:React.FC<CommentCardProps> = ({ questionId, comment, updateFunc }) => {
    const { id: userID } = useContext<Ctx>(Context);
    const { createPopup } = useContext<PopupCtx>(PopupContext);
    const history = useHistory();
    
    const [dropMenu, setDropMenu] = useState(false);
    const [isCommentLoggedUser, setIsCommentLoggedUser] = useState(false);

    function handleUserProfile(id:number) {
        history.push(`/profile/${id}`)
    }

    function handleEditComment() {
        createPopup("Editar comentário", () => <EditCommentPopup questionId={questionId} authorId={comment.author_id} commentId={comment.id} oldComment={comment.text} updateFunction={updateFunc} />);
    }
    
    function handleDeleteComment() {
        createPopup("Remover comentário", () => <DeleteCommentPopup questionId={questionId} commentId={comment.id} updateFunction={updateFunc} comment={comment.text} />);
    }

    useEffect(() => {
        setIsCommentLoggedUser((comment.author_id === userID));
    }, [])
    
    return (
        <div className="relative">
            <div className={`flex gap-3 items-center`}>
                {dropMenu && isCommentLoggedUser && 
                    <ClickAwayListener onClickAway={() => setDropMenu(false)}>
                        <div className={`absolute top-3 mt-1 gap-1 p-2 right-14 ${blackContainer} ${rounded} backdrop-filter backdrop-blur-md z-20 flex flex-col`}>
                            <button className={`${buttonIconName}`} onClick={handleEditComment}><FiEdit color={iconColor} />Editar</button>
                            <button className={`${buttonIconName}`} onClick={handleDeleteComment}><FiTrash2 color={iconColor} />Deletar</button>
                        </div>
                    </ClickAwayListener>
                }
                <button onClick={() => handleUserProfile(comment.author_id)}>
                    <ProfilePicture white userId={comment.author_id} />
                </button>
                <div className={`${blackContainer} ${rounded} p-3 text-white w-full`}>
                    <button onClick={() => handleUserProfile(comment.author_id)} className={`text-base font-semibold`}>{comment.name} - {toDate(comment.creation_date)}</button>
                    <p className={`font-light text-sm break-all`}>{comment.text}</p>
                </div>
                {isCommentLoggedUser
                    ?
                    <IconButton white Icon={FiMoreHorizontal} onClick={() => setDropMenu(true)} />
                    :
                    <div className="w-14 h-14" />
                }
            </div>
        </div>
    );
}

export default CommentCard;