import React, { useState } from 'react';
import HeaderBar from '../../Components/HeaderBar';
import CheckItens from '../../Components/CheckItens';
import TagItem from '../../Components/TagItem';
import Field from './Components/Field';

import './styles.css';

interface Alternative {
    text: string;
    isSelect: boolean;
}

const CreateQuestion = () => {
    const [alternatives, setAlternatives] = useState<Alternative[]>([]);
    const [questionTitle, setQuestionTitle] = useState<string>();
    const [questionDetail, setQuestionDetail] = useState<string>();

    function handleAlternatives(text:string) {
        if (alternatives.length < 6) {
            setAlternatives([...alternatives, { text, isSelect: false }])
        } else {
            alert("Você só pode adicionar até 6 alternativas.")
        }
    }

    function handleDeleteAlternatives(i:number) {
        setAlternatives(alternatives.filter((_, index) => index !== i))
    }

    function handleSend() {
        console.log(alternatives);
        console.log(questionTitle);
        console.log(questionDetail);
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
                    />

                    <Field
                        label="Detalhamento"
                        type="textarea"
                        func={setQuestionDetail}
                    />

                    <Field
                        label="Alternativas"
                        labelAlt="Selecione a correta"
                        limit={6}
                        type="alternatives"
                        func={handleAlternatives}
                    >
                        {alternatives.map((alternative:Alternative, i) => (
                            <CheckItens key={i} name="alternatives" label={alternative.text} deleteFunction={handleDeleteAlternatives} i={i} />
                        ))}
                    </Field>

                    <Field 
                        label="Disciplina"
                        type="subject"
                        func={() => {}}
                    />

                    <Field
                        label="Tags"
                        type="tags"
                        func={() => {}}
                    >
                        <TagItem />
                        <TagItem />
                        <TagItem />
                        <TagItem />
                    </Field>

                    <p className="saveBt" onClick={handleSend}>Salvar questão</p>
                </form>
            </div>
        </>
    );
}

export default CreateQuestion;