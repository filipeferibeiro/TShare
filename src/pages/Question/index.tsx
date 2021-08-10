import React, { FormEvent, useContext } from 'react';
import { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Checkbox from '../../components/Checkbox';
import Dropzone from '../../components/Dropzone';
import IconButton from '../../components/IconButton';
import Input from '../../components/Input';
import OptionBar from '../../components/OptionBar';
import PageName from '../../components/PageName';
import Tag from '../../components/Tag';
import Textarea from '../../components/Textarea';
import { iconColor } from '../../constants/constants';
import { Context, Ctx } from '../../context/AuthContext';
import { Alternative, OptionProps, QuestionCreateProps } from '../../interfaces/interfaces';
import { postQuestion } from '../../services/questions';
import { button, redContainerHover, RemoveButton, transition } from '../../styles/styles';
import Section from '../../components/Section';
import { postImage } from '../../services/images';
import { AppNotificationContext, AppNotificationCtx } from '../../context/AppNotificationContext';

const Question = () => {
    const { id: userID } = useContext<Ctx>(Context);
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    const history = useHistory();

    const Options = [
        {
            text: 'Objetiva',
            state: true
        },
        {
            text: 'Objetiva justificada',
            state: false
        },
        {
            text: 'Discursiva',
            state: false
        }
    ]

    const [options, setOptions] = useState<OptionProps[]>(Options);
    const [alternatives, setAlternatives] = useState<Alternative[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>();
    
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [longAnswer, setLongAnswer] = useState<string>("");
    const [alternativeInput, setAlternativeInput] = useState<string>("");
    const [tagInput, setTagInput] = useState<string>("");


    function addAlternative(e:FormEvent) {
        e.preventDefault();

        setAlternatives([ ...alternatives, { text: alternativeInput, correct: 0 } ]);
        setAlternativeInput("");
    }

    function setAlternativeCorrect(i: number) {
        const newAlternatives = alternatives.map((a, index) => {
            if (i === index) {
                return {
                    text: a.text,
                    correct: 1
                }
            }

            return {
                text: a.text,
                correct: 0
            }
        });

        setAlternatives(newAlternatives);
    }

    function removeAlternative(i: number) {
        const newAlternatives = alternatives.filter((a, index) => i !== index);

        setAlternatives(newAlternatives);
    }
    
    function addTag(e:FormEvent) {
        e.preventDefault();
        
        setTags([ ...tags, tagInput ]);
        setTagInput("");
    }
    
    function removeTag(i: number) {
        const newTags = tags.filter((t, index) => i !== index);

        setTags(newTags);
    }

    function selectedOption() {
        const booleans = options.map(option => {
            return option.state;
        });

        return booleans.indexOf(true);
    }

    function makeData() {
        let data: QuestionCreateProps = {
            title: title,
            description: description,
            author: userID,
            tags,
            alternatives: [] as any,
            long_answer: "" as any,
            question_type: selectedOption()
        }

        if (options[0].state || options[1].state) {
            data = {
                ...data,
                alternatives: alternatives
            }
            if (options[1].state) {
                data = {
                    ...data,
                    long_answer: longAnswer
                }
            }
        }

        if (options[1].state || options[2].state) {
            data = {
                ...data,
                long_answer: longAnswer
            }
        }

        return data;
    }

    function createQuestion() {        
        postQuestion(makeData()).then(res => {
            if (res >= 0) {
                const image = new FormData();
                if (selectedFile) {
                    postImage(res, selectedFile).then(resImage => {
                        if (resImage) {
                            showNotification("Questão criada com sucesso!", 2);
                            history.push('/home');
                        } else {
                            showNotification("Erro ao criar questão! Image", 1);
                        }
                    })
                } else {
                    showNotification("Questão criada com sucesso!", 2);
                    history.push('/home');
                }
            } else {
                showNotification("Erro ao criar questão!", 1);
            }
        });
    }

    const removeButton = (size: number, onClick:any) => {
        if (size > 0) {
            return (
                <button onClick={() => onClick([])} className={`${RemoveButton}`}>Remover todas</button>
            );
        }

        return (
            <>
            </>
        );
    } 

    return (
        <div className="flex flex-col gap-5 overflow-y-auto">
            <PageName name="Nova questão" />
            <OptionBar options={options} setOptions={setOptions} />
            <Section title="Titulo da questão">
                <Input value={title} onChange={setTitle} />
            </Section>
            <Section title="Imagem">
                <Dropzone onFileUploaded={setSelectedFile} />
            </Section>
            <Section title="Detalhamento">
                <Textarea value={description} onChange={setDescription} />
            </Section>
            {(options[0].state || options[1].state) &&
                <Section 
                    title="Alternativas"
                    Component={() => removeButton(alternatives.length, setAlternatives)}
                >
                    {alternatives.length > 0 && 
                        <div className="flex flex-col gap-2 my-3">
                            {alternatives.map((alternative, index) => (
                                <div className={`flex items-center gap-3}`}>
                                    <button className={`p-2 ${transition} ${redContainerHover} rounded-full mr-2`} onClick={() => removeAlternative(index)}>
                                        <FiX color={iconColor} />
                                    </button>
                                    <Checkbox onClick={() => setAlternativeCorrect(index)} key={index} text={alternative.text} correct={alternative.correct === 1} />
                                </div>
                            ))}
                        </div>
                    }
                    <form className={`flex flex-1 gap-3 w-full`} onSubmit={addAlternative}>
                        <Input value={alternativeInput} onChange={setAlternativeInput} required />
                        <IconButton white Icon={FiPlus} type="submit" />
                    </form>
                </Section>
            }
            {(options[1].state || options[2].state) &&
                <Section title="Justificativa">
                    <Textarea value={longAnswer} onChange={setLongAnswer} />
                </Section>
            }
            <Section
                title="Tags"
                Component={() => removeButton(tags.length, setTags)}
            >
                {tags.length > 0 &&
                    <div className="flex gap-3 my-3 flex-wrap">
                        {tags.map((tag, index) => (
                            <div className={`flex items-center gap-1}`}>
                                <button className={`p-2 ${transition} ${redContainerHover} rounded-full mr-2`} onClick={() => removeTag(index)}>
                                    <FiX color={iconColor} />
                                </button>
                                <Tag key={index} title={tag} createQuestion />
                            </div>
                        ))}
                    </div>
                }
                <form className={`flex flex-1 gap-3 w-full`} onSubmit={addTag}>
                    <Input value={tagInput} onChange={setTagInput} required />
                    <IconButton white Icon={FiPlus} type="submit" />
                </form>
            </Section>

            <button onClick={createQuestion} className={`bg-tshare ${button} mb-3`}>Salvar questão</button>
        </div>
    );
}

export default Question;