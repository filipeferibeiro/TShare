import React, { FormEvent, useContext } from 'react';
import { useState } from 'react';
import { FiFile, FiPlus, FiX } from 'react-icons/fi';
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

    function clearAll() {
        setOptions(Options);
        setAlternatives([]);
        setTags([]);
        setSelectedFile(undefined);

        setTitle("");
        setDescription("");
        setLongAnswer("");
        setAlternativeInput("");
        setTagInput("");
    }


    function addAlternative() {
        if (alternativeInput.trim().length > 0) {
            setAlternatives([ ...alternatives, { text: alternativeInput, correct: 0 } ]);
            setAlternativeInput("");
        }
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
    
    function addTag() {
        const duplicated = tags.filter(tag => tag === tagInput.toLowerCase().trim());
        if (tagInput.trim().length > 0 && duplicated.length === 0) {
            setTags([ ...tags, tagInput.toLowerCase() ]);
            setTagInput("");
        } else {
            showNotification("N??o ?? poss??vel adicionar tags com o mesmo nome.", 1);
        }
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

    function handleErrorsWhileCreate() {
        if (alternatives.length < 2 && selectedOption() < 2) {
            showNotification("Tenha ao menos duas alternativas!", 1);
            return false;
        }
        
        if (alternatives.filter(alternative => alternative.correct === 1).length === 0 && selectedOption() < 2) {
            showNotification("Escolha a alternativa correta!", 1);
            return false;    
        }
        
        if (tags.length < 1) {
            showNotification("Tenha ao menos uma tag!", 1);
            return false;
        }

        return true;
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

    function createQuestion(e:FormEvent) {    
        e.preventDefault();

        if (handleErrorsWhileCreate()) {
            const data = makeData();
    
            let formData = new FormData();
    
            formData.append('question', JSON.stringify(data));
    
            if (selectedFile) {
                formData.append('image', selectedFile);
            }
    
            postQuestion(formData).then(res => {
                if (res) {
                    showNotification("Quest??o criada com sucesso!", 2);
                    history.push('/home');
                } else {
                    showNotification("Erro ao criar quest??o!", 1);
                }
            });
        }

    }

    const removeButton = (size: number, onClick:any) => {
        if (size > 0) {
            return (
                <button onClick={() => onClick([])} className={`${RemoveButton}`} type="button">Remover todas</button>
            );
        }

        return (
            <>
            </>
        );
    }
    
    const removePictureButton = () => {
        if (selectedFile) {
            return (
                <button onClick={() => setSelectedFile(undefined)} className={`${RemoveButton}`} type="button">Remover imagem</button>
            );
        }

        return (
            <>
            </>
        );
    }

    return (
        <div className="flex flex-col gap-5 overflow-y-auto">
            <PageName name="Nova quest??o">
                <IconButton Icon={FiFile} white onClick={clearAll} tooltip="Limpar" />
            </PageName>
            <form
                className={`flex flex-col gap-5 overflow-y-auto`}
                onSubmit={createQuestion}
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            >
                <OptionBar options={options} setOptions={setOptions} />
                <Section title="Titulo da quest??o">
                    <Input value={title} onChange={setTitle} required />
                </Section>
                <Section title="Imagem" Component={() => removePictureButton()}>
                    <Dropzone onFileUploaded={setSelectedFile} selectedFile={selectedFile} />
                </Section>
                <Section title="Detalhamento">
                    <Textarea value={description} onChange={setDescription} required onKeyPress={e => e.key === 'Enter' && setDescription(description + '\n')}/>
                </Section>
                {(options[0].state || options[1].state) &&
                    <Section 
                        title="Alternativas (selecione a correta)"
                        Component={() => removeButton(alternatives.length, setAlternatives)}
                    >
                        {alternatives.length > 0 && 
                            <div className="flex flex-col gap-2 my-3">
                                {alternatives.map((alternative, index) => (
                                    <div className={`flex items-center gap-3}`} key={index}>
                                        <button className={`p-2 ${transition} ${redContainerHover} rounded-full mr-2`} onClick={() => removeAlternative(index)} type="button">
                                            <FiX color={iconColor} />
                                        </button>
                                        <Checkbox onClick={() => setAlternativeCorrect(index)} key={index} text={alternative.text} correct={alternative.correct === 1} />
                                    </div>
                                ))}
                            </div>
                        }
                        <div className={`flex flex-1 gap-3 w-full`}>
                            <Input value={alternativeInput} onChange={setAlternativeInput} onKeyPress={e => e.key === 'Enter' && addAlternative()} />
                            <IconButton white Icon={FiPlus} onClick={addAlternative} type="button" tooltip="Adicionar alternativa" />
                        </div>
                    </Section>
                }
                {(options[1].state || options[2].state) &&
                    <Section title="Justificativa">
                        <Textarea value={longAnswer} onChange={setLongAnswer} required  onKeyPress={e => e.key === 'Enter' && setLongAnswer(longAnswer + '\n')} />
                    </Section>
                }
                <Section
                    title="Tags"
                    Component={() => removeButton(tags.length, setTags)}
                >
                    {tags.length > 0 &&
                        <div className="flex gap-3 my-3 flex-wrap">
                            {tags.map((tag, index) => (
                                <div className={`flex items-center gap-1}`} key={index}>
                                    <button className={`p-2 ${transition} ${redContainerHover} rounded-full mr-2`} onClick={() => removeTag(index)}>
                                        <FiX color={iconColor} />
                                    </button>
                                    <Tag title={tag} createQuestion />
                                </div>
                            ))}
                        </div>
                    }
                    <div className={`flex flex-1 gap-3 w-full`}>
                        <Input value={tagInput} onChange={setTagInput} onKeyPress={e => e.key === 'Enter' && addTag()} />
                        <IconButton white Icon={FiPlus} onClick={addTag} type="button" tooltip="Adicionar Tag" />
                    </div>
                    <form className={`flex flex-1 gap-3 w-full`} onSubmit={addTag}>
                    </form>
                </Section>

                <button type="submit" className={`bg-tshare ${button} mb-3`}>Salvar quest??o</button>
            </form>
        </div>
    );
}

export default Question;