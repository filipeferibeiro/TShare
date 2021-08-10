import { CommentCreateProps, QuestionCreateProps } from "../../interfaces/interfaces";
import api from "../api";

export async function getAllQuestions() {
    const questions = api.get('questions').then(response => {
        return response.data;
    }).catch(() => {
        return [];
    });

    return questions;
}

export async function getQuestion(id: string) {
    const question = api.get(`questions/${id}`).then(response => {
        return response.data;
    }).catch(() => {
        return {};
    });

    return question;
}

export async function postQuestion(data: QuestionCreateProps) {
    const question = api.post(`questions`, data).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return question;
}

export async function deleteQuestion(questionId: number) {
    const question = api.delete(`questions/${questionId}`).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return question;
}

export async function getQuestionComments(questionId: string) {
    const comments = api.get(`questions/${questionId}/comments`).then(response => {
        return response.data;
    }).catch(() => {
        return {};
    });

    return comments;
}

export async function postQuestionComments(questionId: string, data:CommentCreateProps) {
    const comment = api.post(`question/${questionId}/comments`, data).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return comment;
}