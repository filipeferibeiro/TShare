import { CommentCreateProps } from "../../interfaces/interfaces";
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

export async function postQuestion(data: FormData) {
    const question = api.post(`questions`, data, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
        return true;
    }).catch(() => {
        return false;
    });

    return question;
}

export async function putQuestion(questionId: string, data: FormData) {
    const question = api.put(`questions/${questionId}`, data, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
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

export async function putQuestionComments(question_id: number, commentId: number, data: CommentCreateProps) {
    const comment = api.put(`questions/${question_id}/comments/${commentId}`, data).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return comment;
}

export async function deleteComment(question_id: number, commentId: number) {
    const comment = api.delete(`questions/${question_id}/comments/${commentId}`).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return comment;
}

export async function postVoteUp(questionId:number, userId:number) {
    const vote = api.post(`questions/${questionId}/vote?direction=0&userId=${userId}`).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return vote;
}

export async function postVoteDown(questionId:number, userId:number) {
    const vote = api.post(`questions/${questionId}/vote?direction=1&userId=${userId}`).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return vote;
}

export async function getVote(questionId:number, userId:number) {
    const vote = api.get(`questions/${questionId}/vote?userId=${userId}`).then((res) => {
        return res.data;
    }).catch(() => {
        return undefined;
    });

    return vote;
}

