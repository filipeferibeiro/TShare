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

export async function getImage(questionId:string) {
    const image = api.get(`images/question/${questionId}`).then(res => {
        console.log(res);
    })
}