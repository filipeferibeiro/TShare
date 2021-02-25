import React, { FormEvent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderBar from '../../Components/HeaderBar';
import CheckItens from '../../Components/CheckItens';
import TagItem from '../../Components/TagItem';
import Field from './Components/Field';

import './styles.css';

import api from '../../Services/api';
import OptionBar from '../../Components/OptionBar';
import { Context, Ctx } from '../../Context/AuthContext';

interface Alternative {
    text: string;
    correct: boolean;
}

const CreateQuestion = () => {
    const history = useHistory();

    const [option, setOption] = useState([true, false, false]);
    const [alternatives, setAlternatives] = useState<Alternative[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [questionTitle, setQuestionTitle] = useState<string>();
    const [questionDetail, setQuestionDetail] = useState<string>();
    const [questionJustificative, setQuestionJustificative] = useState<string>();

    const { id } = useContext<Ctx>(Context);

    const maxTags = 4;;
    const maxAlternatives = 6;

    function handleAlternatives(text:string) {
        if (text !== "") {
            if (alternatives.length < maxAlternatives) {
                setAlternatives([...alternatives, { text, correct: false }]);
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
                return { text: alternative.text, correct: true };
            }
            else {
                return { text: alternative.text, correct: false };
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

            api.post('questions', data).then(() => {
                alert("Questão cadastrada com sucesso!");

                history.push('/Home');
            }).catch(() => {
                alert("Erro ao cadastrar questão, tente novamente.")
            });
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

    return (
        <>
            <HeaderBar />
            <div className="containerQuestion">
                <form className="glass-l1" onSubmit={handleCreateQuestion}>
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
                        func={setQuestionTitle}
                    />
                    
                    <Field
                        label="Imagem"
                        type="image"
                        func={() => {}}
                        hidden
                    />

                    <Field
                        id="textAreaQuestionDetail"
                        label="Detalhamento"
                        type="textarea"
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
        </>
    );
}

export default CreateQuestion;
