import React, { useContext, useState, useEffect } from 'react';
import { FiChevronRight, FiEdit, FiFolder, FiLink, FiMessageCircle, FiMoreHorizontal, FiStar, FiTrash2 } from 'react-icons/fi';
import { iconColor } from '../../constants/constants';
import { blackContainer, blackContainerHover, buttonIconName, rounded, starCommentCard, starCommentCardP, transition, whiteContainer } from '../../styles/styles';
import IconButton from '../IconButton';
import ProfilePicture from '../ProfilePicture';
import ClickAwayListener from 'react-click-away-listener';
import { QuestionProps } from '../../interfaces/interfaces';
import { Context, Ctx } from '../../context/AuthContext';
import Tag from '../Tag';
import { useHistory } from 'react-router-dom';
import { PopupContext, PopupCtx } from '../../context/PopupContext';
import SeeBanks from './components/SeeBanks';
import { deleteFromBank } from '../../services/banks';
import { AppNotificationContext, AppNotificationCtx } from '../../context/AppNotificationContext';
import DeleteQuestionPopup from './components/DeleteQuestionPopup';
import { copyToClipboard, linkBase } from '../../functions';
import { getVote, postVoteDown, postVoteUp } from '../../services/questions';

interface QuestionCardDefaultProps {
    isDetail?: boolean;
    question: QuestionProps;
    isBank?: boolean;
    func?(): any;
    bankId?: number;
    qntComments?: number;
}

const QuestionCardDefault:React.FC<QuestionCardDefaultProps> = ({ question, isDetail, isBank, func, bankId, qntComments }) => {
    const MAX_TITLE = 95;
    const MAX_DESCR = 700;
    const { id: userId, setSearchField, setSearchActive } = useContext<Ctx>(Context);
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    const { createPopup } = useContext<PopupCtx>(PopupContext);
    const history = useHistory();

    const isUserLoggedQuestion = question.author === userId;
    const countComments = question.comments?.length;

    const [dropMenu, setDropMenu] = useState(false);
    const [questionVoted, setQuestionVoted] = useState(false);
    const [score, setScore] = useState(question.score);

    function handleSeeMore() {
        history.push(`/questionDetail/${question.id}`)
    }

    function handleUserProfile() {
        history.push(`/profile/${question.author}`);
    }
    
    function handleEditQuestion() {
        history.push(`/question/${question.id}`);
    }

    function handleTagSearch(text: string) {
        setSearchField(text);
        setSearchActive(true);
        history.push("/search");
    }

    function handleSeeBanks() {
        createPopup("Gerenciar nos Bancos", () => <SeeBanks questionId={question.id} />)
    }

    async function handleDeleteFromBank(bankId:number) {
        deleteFromBank(bankId, question.id).then(res => {
            if (res) {
                showNotification("Questão removida com sucesso do banco.", 2);
                if(func) {
                    func();
                }
            } else {
                showNotification("Erro ao remover questão do banco.", 1);
            }
        });
    }

    function handleDeleteQuestion() {
        if (func) {
            createPopup("Deletar questão", () => <DeleteQuestionPopup questionId={question.id} questionTitle={question.title} updateFunction={func} />)
        }
    }

    function handlePostVoteUp() {
        postVoteUp(question.id, userId).then(res => {
            if (res) {
                setScore(score + 1);
                setQuestionVoted(true);
                showNotification("Voto adicionado!", 0)
            }
            else {
                showNotification("Erro ao registrar voto", 1)
            }
        })
    }
    
    function handlePostVoteDown() {
        postVoteDown(question.id, userId).then(res => {
            if (res) {
                setScore(score - 1);
                setQuestionVoted(false);
                showNotification("Voto removido!", 0)
            }
            else {
                showNotification("Erro ao remover voto", 1)
            }
        })
    }

    function handleCopyLinkToClipboard() {
        copyToClipboard(`${linkBase()}/questionDetail/${question.id}`);
        showNotification("Link copiado para área de transferência!", 0);
    }

    function handleMaxWords(text:string, maxWords: number): string {
        if ((text.length <= maxWords) || isDetail) {
            return text;
        }
        return `${text.substring(0, maxWords)}...`;
    }

    function getQuestionDate() {
        const date = new Date(question.createdAt);

        const formattedNumber = (myNumber: number) => { return myNumber.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })
        }

        let dataFormatada = (formattedNumber(date.getDate() )) + "/" + (formattedNumber(date.getMonth() + 1)) + "/" + date.getFullYear();

        return dataFormatada;
    }

    useEffect(() => {
        getVote(question.id, userId).then(res => {
            if (res && res === 1) {
                setQuestionVoted(true);
            } else {
                setQuestionVoted(false);
            }
        })
    }, [question]);

    return (
        <div className="relative">
            <div className={`${whiteContainer} p-6 ${rounded} flex flex-col gap-3`}>
                {dropMenu && 
                    <ClickAwayListener onClickAway={() => setDropMenu(false)}>
                        <div className={`absolute top-20 mt-1 gap-1 p-2 right-6 ${blackContainer} ${rounded} backdrop-filter backdrop-blur-md z-20 flex flex-col`}>
                            {isBank
                                ?
                                <button className={`${buttonIconName}`} onClick={() => handleDeleteFromBank(bankId || -1)}><FiTrash2 color={iconColor} />Remover do banco</button>
                                :
                                <button onClick={handleSeeBanks} className={`${buttonIconName}`}><FiFolder color={iconColor} />Gerenciar no banco</button>
                            }
                            <button className={`${buttonIconName}`} onClick={handleCopyLinkToClipboard}><FiLink color={iconColor} />Copiar link</button>
                            {(isUserLoggedQuestion && !isBank) && 
                                <>
                                <button className={`${buttonIconName}`} onClick={handleEditQuestion}><FiEdit color={iconColor} />Editar</button>
                                <button className={`${buttonIconName}`} onClick={handleDeleteQuestion}><FiTrash2 color={iconColor} />Deletar</button>
                                </>
                            }
                        </div>
                    </ClickAwayListener>
                }
                <header className={`flex justify-between`} >
                    <div className={`flex gap-2 py-1 pl-1 pr-6 rounded-full ${blackContainer} cursor-pointer`} onClick={handleUserProfile}>
                        <ProfilePicture userId={question.author} />
                        <div
                            className="flex flex-col justify-center"
                        >
                            <p className="text-white text-base">{question.authorName}</p>
                            <p className="text-gray-300 text-sm">{getQuestionDate()}</p>
                        </div>
                    </div>
                    <IconButton onClick={() => setDropMenu(true)} Icon={FiMoreHorizontal} tooltip="Opções" />
                </header>
                    
                <div className="break-words">
                    <h1 className="text-white text-3xl mb-2 whitespace-pre-wrap">{handleMaxWords(question.title, MAX_TITLE)}</h1>
                    <p className="text-gray-200 text-1xl">{handleMaxWords(question.description, MAX_DESCR)}</p>
                </div>

                <div className={`flex gap-3 flex-wrap`}>
                    {question.tags && question.tags.map((tag, index) => (
                        <Tag key={index} title={tag} onClick={() => handleTagSearch(tag)} />
                    ))}
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        {questionVoted
                            ?
                            <button className={`${starCommentCard}`} onClick={handlePostVoteDown}>
                                <FiStar color="#FFD666" />
                                <p className={`font-light text-tshareYellow`}>{score}</p>
                            </button>
                            :
                            <button className={`${starCommentCard}`} onClick={handlePostVoteUp}>
                                <FiStar color={iconColor} />
                                <p className={`text-white font-light`}>{score}</p>
                            </button>
                        }
                        <div className={`flex gap-1 items-center cursor-default`}>
                            <FiMessageCircle color={iconColor} />
                            <p className={`${starCommentCardP}`}>{qntComments ? qntComments : countComments}</p>
                        </div>
                    </div>
                    {!isDetail &&
                        <button 
                            className={`flex items-center py-2 px-6 gap-4 text-white text-sm rounded-full ${blackContainerHover} ${transition}`}
                            onClick={handleSeeMore}
                        >
                            <p>Ver mais</p><FiChevronRight color={iconColor} />
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default QuestionCardDefault;