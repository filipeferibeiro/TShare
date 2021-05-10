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
    comments?: Comment[]
};

export interface Comment {
    id: number;
    text: string;
    author_id: number;
    question_id: number;
    name?: string;
    creation_date: string;
    score: number;
};

export interface QuestionCardProps {
    id?: number;
    stars?: number;
    comments?: number;
    detail?: boolean;
    question: Question;
}

export interface QuestionBankCardProps extends QuestionCardProps {
    idBank: number;
    updateFunc?(): any;
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

export interface PopupSearchProps {
    popupDialogStatus: boolean;
    setPopupDialogStatus(status: boolean): any;
}

export interface SocialCardProps {
    name: string;
    status?: boolean
}
