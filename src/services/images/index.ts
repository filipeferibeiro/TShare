import api from "../api";

export async function postImage(questionId:number, data:FormData) {
    console.log(data.get("file"));
    const image = api.post(`images/question/${questionId}/upload`, data, { headers: { "Content-Type": "multipart/form-data" } }).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return image;
}

export async function getImage(questionId:string, setSrc:any) {
    api.get(`images/question/${questionId}`).then(() => {
        setSrc(`${api.defaults.baseURL}/images/question/${questionId}`);
    }).catch(() => {
        setSrc(undefined);
    });
}

export async function postImageProfile(userId:number, data:FormData) {
    console.log(data.get("file"));
    const image = api.post(`images/profile/${userId}/upload`, data, { headers: { "Content-Type": "multipart/form-data" } }).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return image;
}

export async function getImageProfile(userId:string, setSrc:any) {
    api.get(`images/profile/${userId}`).then(() => {
        setSrc(`${api.defaults.baseURL}/images/profile/${userId}`);
    }).catch(() => {
        setSrc(undefined);
    });
}