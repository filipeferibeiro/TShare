export interface IconProps {
    color: string;
    size: number
}

export interface QuestionProps {
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
    score: number;
    long_answer: string,
    question_type: number;
    comments?: CommentProps[]
}

export interface QuestionCreateProps {
    title: string;
    description: string;
    author: number;
    tags: string[];
    alternatives: Alternative[];
    long_answer: string;
    question_type: number;
}

export interface QuestionResProps {
    message: string;
    questionId: number;
}

export interface CommentCreateProps {
    text: string;
    author_id?: number;
}

export interface CommentProps {
    id: number;
    text: string;
    author_id: number;
    question_id: number;
    name?: string;
    creation_date: string;
    score: number;
};

export interface OptionProps {
    text: string;
    state: boolean
}

export interface Alternative {
    text: string;
    correct: number;
}

export interface UserProps {
    id: number;
    name: string;
    email: string;
    reputation: number;
    accountCreation: string;
}

export interface BankCreateProps {
    title: string;
    author: number;
}

export interface BankEditProps {
    title: string;
}

export interface BankProps {
    id: number;
    title: string;
    author: number;
}

export interface QuestionToBanksProps {
    question_bank_id: number;
    question_id: number;
}