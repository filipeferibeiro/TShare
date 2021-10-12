import api from "../api";

export async function getUser(id: string) {
    const user = api.get(`users/${id}`).then(response => {
        return response.data;
    }).catch(() => {
        return {};
    });

    return user;
}

export async function putUser(userId: number, data: FormData, deleteImage: boolean) {
    const user = api.put(`users/${userId}?deleteImage=${deleteImage}`, data, { headers: { "Content-Type": "multipart/form-data" } }).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return user;
}