import { BankCreateProps, BankEditProps } from "../../interfaces/interfaces";
import api from "../api";

export function postBank(data:BankCreateProps) {
    const bank = api.post(`banks`, data).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return bank;
}

export function putBank(bankId:number, data:BankEditProps) {
    const bank = api.put(`banks?questionBankId=${bankId}`, data).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return bank;
}

export function deleteBank(bankId:number) {
    const bank = api.delete(`banks?questionBankId=${bankId}`).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return bank;
}

export async function getAllBanks(userId:number) {
    const questions = api.get(`banks?author=${userId}`).then(response => {
        return response.data;
    }).catch(() => {
        return [];
    });

    return questions;
}

export async function getBank(bankId:string) {
    const questions = api.get(`banks?id=${bankId}`).then(response => {
        return response.data;
    }).catch(() => {
        return [];
    });

    return questions;
}

export async function getQuesntionsFromBank(bankId:string) {
    const questions = api.get(`banks/${bankId}`).then(response => {
        return response.data;
    }).catch(() => {
        return [];
    });

    return questions;
}

export async function getCheckQuestionFromBanks(questionId:number, authorId:number) {
    const questions = api.get(`questions/${questionId}/banks?author=${authorId}`).then(response => {
        console.log(response.data)
        return response.data;
    }).catch(() => {
        return [];
    });

    return questions;
}

export async function putAddToBank(bankId:number, questionId:number) {
    const questions = api.put(`banks/${bankId}/questions/${questionId}`).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return questions;
}

export async function deleteFromBank(bankId:number, questionId:number) {
    const questions = api.delete(`banks/${bankId}/question/${questionId}`).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return questions;
}