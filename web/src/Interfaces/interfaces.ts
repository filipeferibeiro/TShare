export interface User {
    name: string,
    birthday: string,
    email: string,
    password: string,
    main_subject: string,
    school: string,
    formation: string
};

export interface Question {
    id: number;
    title: string;
    description: string;
    author: number;
    authorName: string;
    alternatives: {
        text: string,
        correct: number
    }[];
    tags: string[];
    long_answer: string,
    question_type: number,
};

export interface Comment {
    id: number;
    text: string;
    authorId: number;
    name: string;
    creationDate: string;
};

export interface QuestionCardProps {
    id?: number;
    stars?: number;
    comments?: number;
    detail?: boolean;
    question: Question;
}

export interface Banks {
    id: number;
    title: string;
}

export interface PopupDialogProps {
    popupDialogStatus: boolean;
    setPopupDialogStatus(status: boolean): any;
    title: string;
}
