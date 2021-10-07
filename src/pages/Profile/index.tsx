import React, { useContext, useEffect, useState } from 'react';
import { FiBook, FiBriefcase, FiEdit, FiMail, FiShare2 } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import OptionBar from '../../components/OptionBar';
import PageName from '../../components/PageName';
import ProfilePicture from '../../components/ProfilePicture';
import QuestionCardDefault from '../../components/QuestionCardDefault';
import Section from '../../components/Section';
import { AppNotificationContext, AppNotificationCtx } from '../../context/AppNotificationContext';
import { Context, Ctx } from '../../context/AuthContext';
import { PopupContext, PopupCtx } from '../../context/PopupContext';
import { copyToClipboard } from '../../functions';
import { OptionProps, QuestionProps, UserProps } from '../../interfaces/interfaces';
import { getAllQuestions } from '../../services/questions';
import { getUser } from '../../services/users';
import EditProfilePopup from './components/EditProfilePopup';
import ProfileItem from './components/ProfileItem';

interface ProfileParams {
    userId?: string
}

const Profile = () => {
    const { userId } = useParams<ProfileParams>();
    const { id: userLoggedID } = useContext<Ctx>(Context);
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    const { createPopup } = useContext<PopupCtx>(PopupContext);
    
    const Options = [
        {
            text: 'Criação',
            state: true
        },
        {
            text: 'Estrelas',
            state: false
        },
        {
            text: 'Comentários',
            state: false
        }
    ];

    const isUserLoggedProfile = userId === `${userLoggedID}`;

    const [options, setOptions] = useState<OptionProps[]>(Options);
    const [user, setUser] = useState<UserProps>();
    const [questions, setQuestions] = useState<QuestionProps[]>([]);

    const [questionOption, setQuestionOption] = useState<QuestionProps[]>(questions);

    useEffect(() => {
        switch (selectedOption()) {
            case 1: {
                setQuestionOption(JSON.parse(JSON.stringify(questions)).sort((a: { score: number; }, b: { score: number; }) => {
                    return compare(a.score, b.score)
                }));
                break;
            }
            case 2: {
                setQuestionOption(JSON.parse(JSON.stringify(questions)).sort((a: { comments: string | any[]; }, b: { comments: string | any[]; }) => {
                    if (a.comments && b.comments) {
                        return compare(a.comments.length, b.comments.length)
                    }
                    else {
                        return 0
                    }
                }));
                break;
            }
            default: setQuestionOption(questions); break;
        }
    }, [options, selectedOption()])

    /**
     * Recupera dados do usuario da base pelo ID
     */
    async function getUserAsync() {
        const userRes:UserProps[] = await getUser(userId || "-1");
        setUser(userRes[0]);
    }

    /**
     * Copia o e-mail do usuario para o clipboard
     */
    function handleCopyEmailToClipboard() {
        copyToClipboard(user?.email || "");
        showNotification("E-mail copiado para área de transferência!", 0);
    }

    function handlePopupEditPerfil() {
        if (user) {
            createPopup("Editar Perfil", () => <EditProfilePopup user={user} updateFunction={getUserAsync} />)
        }
    }

    function compare(a:number, b:number) {
        if (b < a) {
            return -1;
        }
        if(b > a) {
            return 1;
        }
        return 0;
    }
    
    async function getQuestions() {
        const questions: QuestionProps[] = await getAllQuestions().then((res: QuestionProps[]) => {
            return res.filter(question => question.author === parseInt(userId || "-1"));
        });
        setQuestions(questions);
        setQuestionOption(questions);
    }

    function selectedOption() {
        const booleans = options.map(option => {
            return option.state;
        });

        return booleans.indexOf(true);
    }
    
    /**
     * Sempre que o userId muda, ele faz a chamada a API para pegar os dados do novo usuário
     */
    useEffect(() => {
        getQuestions();
        getUserAsync();
    }, [userId])
    
    return (
        <div className="flex flex-col gap-5 overflow-y-auto">
            <PageName name="Perfil">
                {isUserLoggedProfile && 
                    <IconButton yellow Icon={FiEdit} onClick={handlePopupEditPerfil} />
                }
            </PageName>
            <div className={`flex gap-3`}>
                <div className={`flex flex-1 flex-col justify-center items-center gap-5`}>
                    <ProfilePicture profile userId={parseInt(userId || "-1")} />
                    <p className={`text-white text-lg font-medium`}>{user?.name}</p>
                </div>
                <div className={`flex flex-1 flex-col gap-3`}>
                    <ProfileItem copy copyFunc={handleCopyEmailToClipboard} text={user?.email || ""} Icon={FiMail} />
                    <ProfileItem text="Instituto Federal de Algum Lugar" Icon={FiBriefcase} />
                    <ProfileItem text="34 Questões compartilhadas" Icon={FiShare2} />
                    <ProfileItem text="Professor de Matemática" Icon={FiBook} />
                </div>
            </div>
            <Section title="Ordernar questões por:">
                <div className="flex flex-col gap-5 overflow-y-auto pb-14">
                    <OptionBar options={options} setOptions={setOptions} />
                    {questionOption.map(question => (
                        <QuestionCardDefault key={question.id} question={question} func={getQuestions} />
                    ))}
                </div>
            </Section>

        </div>
    );
}

export default Profile;