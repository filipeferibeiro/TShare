import api from "../api";

export async function getTags(userId: number) {
    const tags = api.get(`users/${userId}/tags`).then(response => {
        return response.data;
    }).catch(() => {
        return [];
    });

    return tags;
}

export async function postTags(userId: number, tagsList: string[]) {
    const tags = api.post(`users/${userId}/tags`, tagsList).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return tags;
}