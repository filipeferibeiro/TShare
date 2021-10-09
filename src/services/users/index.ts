import api from "../api";

export async function getUser(id: string) {
    const user = api.get(`users/${id}`).then(response => {
        return response.data;
    }).catch(() => {
        return {};
    });

    return user;
}