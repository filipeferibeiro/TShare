import React, { FormEvent, useContext, useState } from 'react';
import { useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import Input from '../../components/Input';
import PageName from '../../components/PageName';
import QuestionAnswerCard from '../../components/QuestionAnswerCard';
import QuestionCardDefault from '../../components/QuestionCardDefault';
import Section from '../../components/Section';
import { Context, Ctx } from '../../context/AuthContext';
import { CommentProps, QuestionProps } from '../../interfaces/interfaces';
import { getImage } from '../../services/images';
import { getQuestion, getQuestionComments, postQuestionComments } from '../../services/questions';
import { rounded } from '../../styles/styles';
import CommentCard from './components/CommentCard';

interface DetailParams {
    idQuestion?: string
}

const QuestionDetail:React.FC = () => {
    const { id: userID } = useContext<Ctx>(Context);
    const { idQuestion } = useParams<DetailParams>();

    const history = useHistory();

    const [question, setQuestion] = useState<QuestionProps>();
    const [comments, setComments] = useState<CommentProps[]>([]);
    const [comment, setComment] = useState<string>("");
    const [imageSrc, setImageSrc] = useState<string>("");

    async function getQuestionAsync() {
        setQuestion(await getQuestion(idQuestion || "-1"));
    }

    async function getQuestionCommentsAsync() {
        setComments(await getQuestionComments(idQuestion || "-1"));
    }

    async function handleAddComment(e: FormEvent) {
        e.preventDefault();

        const data = {
            text: comment,
            author_id: userID
        }

        await postQuestionComments((idQuestion || "-1"), data).then(res => {
            if (res) {
                setComment("");
                getQuestionCommentsAsync();
                getQuestionAsync();
            }
        })
    }

    async function getImageAsync() {
        getImage(idQuestion || "-1", setImageSrc);
    }

    function handleDeleteQuestion() {
        history.push('/home')
    }

    useEffect(() => {
        getQuestionAsync();
        getQuestionCommentsAsync();
        getImageAsync();
    }, [])
    
    const isAlternative = question?.question_type === 0 || question?.question_type === 1;
    const isJustificative = question?.question_type === 1 || question?.question_type === 2;

    return (
        <div className="flex flex-col gap-5 overflow-y-auto pb-14">
            <PageName name="Detalhes da questão" />
            {question &&
                <div className={`flex flex-col gap-4`}>
                    <QuestionCardDefault isDetail question={question} func={handleDeleteQuestion} qntComments={comments.length} />
                    {imageSrc &&
                        <img className={`${rounded}`} src={imageSrc} alt="Question Image" />
                    }
                    <QuestionAnswerCard alternative={isAlternative} justificative={isJustificative} question={question} />
                    <Section title="Comentários">
                        <div>
                            <form className={`flex flex-1 gap-3 w-full`} onSubmit={handleAddComment}>
                                <Input placeholder="Digite seu comentário" value={comment} onChange={setComment} />
                                <IconButton white Icon={FiPlus} tooltip="Adicionar comentário" />
                            </form>
                            {comments.length > 0
                                ?
                                <div className={`flex flex-col mt-5 gap-4`}>
                                    {comments.map(comment => (
                                        <CommentCard key={comment.id} questionId={question.id} comment={comment} updateFunc={getQuestionCommentsAsync} />
                                    ))}
                                </div>
                                :
                                <p className="text-white text-center my-8">Esta questão ainda não possui comentários. Seja o primeiro!</p>
                            }
                        </div>
                    </Section>
                </div>
            }
        </div>
    );
}

export default QuestionDetail;