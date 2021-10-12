import { ChangePasswordProps } from "../../interfaces/interfaces";
import api from "../api";

/**
 * Funcao que envia o token do header e retorna o id em caso de sucesso e undefined caso o token não seja valido.
 */
export async function handleCheckToken() {
    const userID = await api.get('checkToken').then(({ data: { id } }) => {
        return id;
    }).catch(() => {
        return undefined;
    });

    return userID;
};

/**
 * Funcao que recebe o email e a senha e retorna true em caso de sucesso e false caso nao faca login
 * @param email 
 * @param password 
 */
export async function postLogin(email: string, password: string) {
    const body = {
        email,
        password
    }

    const isLogged = await api.post('login', body).then(({ data: { token } }) => {
        localStorage.setItem('token', JSON.stringify(token));
        api.defaults.headers['x-access-token'] = token;
        return true;
    }).catch(() => {
        return false;
    });

    return isLogged;
}

/**
 * Realiza o registro do novo usuario
 * @param name 
 * @param birthday 
 * @param email 
 * @param password 
 * @param main_subject 
 * @param school 
 * @param formation 
 * @returns 
 */
export async function postUsers(name: string, birthday: string, email: string, password: string, main_subject: string, school: string) {
    const data = {
        name,
        birthday,
        email,
        password,
        subject: main_subject,
        school
    };

    const isRegistred = api.post('/users', data).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return isRegistred;
}

export async function putPassword(userId: number, data: ChangePasswordProps) {
    const changed = api.put(`users/${userId}/password`, data).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return changed;
}