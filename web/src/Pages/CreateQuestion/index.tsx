import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CheckItens from '../../Components/CheckItens';
import TagItem from '../../Components/TagItem';
import Field from './Components/Field';

import './styles.css';

import api from '../../Services/api';
import OptionBar from '../../Components/OptionBar';
import { Context, Ctx } from '../../Context/AuthContext';
import PageStyle from '../../Components/PageStyle';
import {Question} from '../../Interfaces/interfaces';
import QuestionDetail from '../QuestionDetail';

interface Alternative {
    text: string;
    correct: number;
}

interface QuestionParams {
    idQuestionParam: string
}

const CreateQuestion = () => {
    const history = useHistory();
    const { idQuestionParam } = useParams<QuestionParams>();

    const [option, setOption] = useState([true, false, false]);
    const [alternatives, setAlternatives] = useState<Alternative[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [questionTitle, setQuestionTitle] = useState<string>();
    const [questionDetail, setQuestionDetail] = useState<string>();
    const [questionJustificative, setQuestionJustificative] = useState<string>();

    const { id } = useContext<Ctx>(Context);

    const maxTags = 4;;
    const maxAlternatives = 6;

    function handlePageTitle() {
        let title;
        if (idQuestionParam) {
            title = "Editar questão";
        } else {
            title = "Nova questão";
        }

        return title;
    }

    function handleGetQuestion() {
        api.get(`questions/${idQuestionParam}`).then(response => {
            const data:Question = response.data;
            setQuestionTitle(data.title);
            setQuestionDetail(data.description);
            setQuestionJustificative(data.long_answer);
            setAlternatives(data.alternatives);
            setTags(data.tags);
            let option = [false, false, false];
            option[data.question_type] = true;
            setOption(option);
            if (id !== data.author) {
                history.push("/Home")
            }
        });
    }

    function handleAlternatives(text:string) {
        if (text !== "") {
            if (alternatives.length < maxAlternatives) {
                setAlternatives([...alternatives, { text, correct: 0 }]);
            } else {
                alert(`Você só pode adicionar até ${maxAlternatives} alternativas.`);
            }
        } else {
            alert("Insira um texto válido.");
        }
    }

    function handleSelectAlternatives(i:number) {
        setAlternatives(alternatives.map((alternative, index) => {
            if (index === i) {
                return { text: alternative.text, correct: 1 };
            }
            else {
                return { text: alternative.text, correct: 0 };
            }
        }));
    }

    function handleDeleteAlternatives(i:number) {
        setAlternatives(alternatives.filter((_, index) => index !== i));
    }
   
    function handleTags(label:string) {
        if (label !== "") {
            if (tags.length < maxTags) {
                setTags([...tags, label.replaceAll(" ", "")]);
            } else {
                alert(`Você só pode adicionar até ${maxTags} tags.`);
            }
        } else {
            alert("Insira um texto válido.");
        }
    }

    function handleDeleteTags(i:number) {
        setTags(tags.filter((_, index) => index !== i));
    }

    function hasAlternativeCheck() {
        let status:boolean = false;
        alternatives.forEach((alternative:Alternative) => {
            if (alternative.correct) {
                status = true;
            }
        });

        return status;
    }

    function selectedOption() {
        return option.indexOf(true);
    }

    function makeData() {
        let data = {
            title: questionTitle,
            description: questionDetail,
            author: id,
            tags,
            alternatives: [] as any,
            long_answer: "" as any,
            question_type: selectedOption()
        }

        if (handleIsAlternative()) {
            data = {
                ...data,
                alternatives: alternatives
            }
            if (option[1]) {
                data = {
                    ...data,
                    long_answer: questionJustificative
                }
            }
        }

        if (handleIsJustificative()) {
            data = {
                ...data,
                long_answer: questionJustificative
            }
        }

        return data;
    }

    function handleCreateQuestion(e: FormEvent) {
        e.preventDefault();

        if (alternatives.length < 2 && (option[0] || option[1])) {
            alert("Você deve ter pelo menos 2 alternativas!");
        } else if (!hasAlternativeCheck() && (option[0] || option[1])) {
            alert("Você deve marcar uma alternativa como correta!");
        } else if (tags.length < 1) {
            alert("Você deve ter pelo menos uma tag!");
        } else {
            const data = makeData();

            if (idQuestionParam) {
                api.put(`questions/${idQuestionParam}`, data).then(() => {
                    alert("Questão atualizada com sucesso!");
    
                    history.push('/Home');
                }).catch((e) => {
                    alert(`Erro ao atualizar questão, tente novamente. ${e}`)
                });
            } else {
                api.post('questions', data).then(() => {
                    alert("Questão cadastrada com sucesso!");
    
                    history.push('/Home');
                }).catch(() => {
                    alert("Erro ao cadastrar questão, tente novamente.")
                });
            }

        }
    }

    function handleIsAlternative() {
        if ((option[0] || option[1])) {
            return true;
        }
        return false;
    }
    
    function handleIsJustificative() {
        if ((option[1] || option[2])) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (idQuestionParam) {
            handleGetQuestion();
        }
    }, []);

    return (
        <>
            <PageStyle title={handlePageTitle()}>
                <div className="containerQuestion">
                    <form onSubmit={handleCreateQuestion}>
                        <div className="optionBar">
                            <OptionBar
                                option={option}
                                setOption={setOption}
                                options={[
                                    "Objetiva",
                                    "Objetiva Justificada",
                                    "Discursiva"
                                ]}
                            />
                        </div>
                        <Field
                            id="inputQuestionTitle"
                            label="Questão"
                            type="text"
                            value={questionTitle}
                            func={setQuestionTitle}
                        />
                        
                        <Field
                            label="Imagem"
                            type="image"
                            func={() => {}}
                        />

                        <Field
                            id="textAreaQuestionDetail"
                            label="Detalhamento"
                            type="textarea"
                            value={questionDetail}
                            func={setQuestionDetail}
                        />

                        {handleIsAlternative() && 
                            <Field
                                id="inputAlternatives"
                                label="Alternativas"
                                labelAlt="Selecione a correta"
                                limit={maxAlternatives}
                                type="alternatives"
                                func={handleAlternatives}
                            >
                                {alternatives.map((alternative:Alternative, i) => (
                                    <CheckItens 
                                        id="checkAlternative"
                                        key={i} 
                                        name="alternatives" 
                                        label={alternative.text} 
                                        deleteFunction={handleDeleteAlternatives} 
                                        selectFunction={handleSelectAlternatives} 
                                        i={i}
                                        selected={alternative.correct === 1}
                                    />
                                ))}
                            </Field>
                        }

                        {handleIsJustificative() &&
                            <Field
                                id="textAreaJustificative"
                                label="Resposta"
                                type="textarea"
                                func={setQuestionJustificative}
                            />
                        }

                        <Field 
                            label="Disciplina"
                            type="subject"
                            func={() => {}}
                            hidden
                        />

                        <Field
                            id="inputTags"
                            label="Tags"
                            type="tags"
                            limit={maxTags}
                            func={handleTags}
                        >
                            {tags.map((tag:string, i) => (
                                <TagItem id="tagItem" key={i} label={tag} i={i} deleteFunction={handleDeleteTags} />
                            ))}
                        </Field>

                        <button id="saveQuestionBt" type="submit" className="saveBt">Salvar questão</button>
                    </form>
                </div>
            </PageStyle>
        </>
    );
}

export default CreateQuestion;
