import React, { FormEvent } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import Input from '../../../../components/Input';
import Section from '../../../../components/Section';
import { AppNotificationContext, AppNotificationCtx } from '../../../../context/AppNotificationContext';
import { PopupContext, PopupCtx } from '../../../../context/PopupContext';
import { CommentCreateProps, PdfCreationProps } from '../../../../interfaces/interfaces';
import { postExam } from '../../../../services/exam';
import { putQuestionComments } from '../../../../services/questions';
import { button } from '../../../../styles/styles';

interface GeneratePdfPopupProps {
    bankId: string;
}

const GeneratePdfPopup:React.FC<GeneratePdfPopupProps> = ({ bankId }) => {
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    const { setPopupActive } = useContext<PopupCtx>(PopupContext);

    const [teacherName, setTeacherName] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [className, setClassName] = useState('');
    const [testTitle, setTestTitle] = useState('');
    const [subject, setSubject] = useState('');
    
    function handleGeneratePDF(e: FormEvent) {
        e.preventDefault();
        
        const data: PdfCreationProps = {
            author: teacherName,
            school_name: schoolName,
            class_name: className,
            test_title: testTitle,
            subject
        }

        postExam((bankId || "-1"), data).then(res => {
            if (res) {
                showNotification("PDF gerado com sucesso", 2);
                setPopupActive(false);
            } else {
                showNotification("Falha ao gerar PDF", 1);
            }
        });
    }

    return (
        <div className={`flex`}>
            <form onSubmit={handleGeneratePDF} className={`flex flex-col flex-1 w-full gap-3`}>
                <div className={`flex flex-1 w-full gap-3`}>
                    <Section title="Nome do professor">
                        <Input className={`flex-1`} value={teacherName} onChange={setTeacherName} />
                    </Section>
                    <Section title="Nome da escola">
                        <Input className={`flex-1`} value={schoolName} onChange={setSchoolName} />
                    </Section>
                </div>
                <div className={`flex flex-1 w-full gap-3`}>
                    <Section title="Nome da disciplina">
                        <Input className={`flex-1`} value={className} onChange={setClassName} />
                    </Section>
                    <Section title="Título da avaliação">
                        <Input className={`flex-1`} value={testTitle} onChange={setTestTitle} />
                    </Section>
                </div>
                <Section title="Assunto da avaliação">
                    <Input className={`flex-1`} value={subject} onChange={setSubject} />
                </Section>

                <button type="submit" className={`bg-tshare ${button}`}>Gerar</button>
            </form>
        </div>
    );
}

export default GeneratePdfPopup;