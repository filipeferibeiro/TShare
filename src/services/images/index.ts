import api from "../api";

export async function postImage(questionId:number, data:File) {
    const image = api.post(`images/question/${questionId}/upload`, data, { headers: { 'Content-Type': 'image/png' } }).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return image;
}

export async function getImage(questionId:number) {
    const image = api.get(`images/question/${questionId}`).then(res => {
        console.log(res.data);
    })
}