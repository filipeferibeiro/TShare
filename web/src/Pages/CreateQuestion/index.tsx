import React, { useState } from 'react';
import HeaderBar from '../../Components/HeaderBar';
import CheckItens from '../../Components/CheckItens';
import TagItem from '../../Components/TagItem';
import Field from './Components/Field';

import './styles.css';

interface Alternative {
    text: string;
    correct: boolean;
}

const CreateQuestion = () => {
    const [alternatives, setAlternatives] = useState<Alternative[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [questionTitle, setQuestionTitle] = useState<string>();
    const [questionDetail, setQuestionDetail] = useState<string>();

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

    function handleSend() {
        const data = {
            stem: questionTitle,
            author: 1,
            detail: questionDetail,
            alternatives,
            tags
        };

        console.log(JSON.stringify(data));
    }

    return (
        <>
            <HeaderBar />
            <div className="containerQuestion">
                <form action="">
                    <Field
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
                        label="Detalhamento"
                        type="textarea"
                        func={setQuestionDetail}
                    />

                    <Field
                        label="Alternativas"
                        labelAlt="Selecione a correta"
                        limit={maxAlternatives}
                        type="alternatives"
                        func={handleAlternatives}
                    >
                        {alternatives.map((alternative:Alternative, i) => (
                            <CheckItens 
                                key={i} 
                                name="alternatives" 
                                label={alternative.text} 
                                deleteFunction={handleDeleteAlternatives} 
                                selectFunction={handleSelectAlternatives} 
                                i={i} 
                            />
                        ))}
                    </Field>

                    <Field 
                        label="Disciplina"
                        type="subject"
                        func={() => {}}
                        hidden
                    />

                    <Field
                        label="Tags"
                        type="tags"
                        limit={maxTags}
                        func={handleTags}
                    >
                        {tags.map((tag:string, i) => (
                            <TagItem key={i} label={tag} i={i} deleteFunction={handleDeleteTags} />
                        ))}
                    </Field>

                    <p className="saveBt" onClick={handleSend}>Salvar questão</p>
                </form>
            </div>
        </>
    );
}

export default CreateQuestion;
