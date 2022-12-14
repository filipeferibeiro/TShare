import api from "../api";

export async function postImage(questionId:number, data:FormData) {
    const image = api.post(`images/question/${questionId}/upload`, data, { headers: { "Content-Type": "multipart/form-data" } }).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return image;
}

export async function getImage(questionId:string, setSrc:any) {
    api.get(`questions/${questionId}/image`)
        .then(res => {
            const base64 = btoa(
                new Uint8Array(res.data['data']['data'])
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            setSrc(`data:${res.data['type']};base64,${base64}`);
        })
        .catch(() => {
            setSrc(undefined);
        });
}

export async function postImageProfile(userId:number, data:FormData) {
    const image = api.post(`users/${userId}/image`, data, { headers: { "Content-Type": "multipart/form-data" } }).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return image;
}

export async function getImageProfile(userId:string, setSrc:any) {
    api.get(`users/${userId}/image`)
        .then(res => {
            const base64 = btoa(
                new Uint8Array(res.data['data']['data'])
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            setSrc(`data:${res.data['type']};base64,${base64}`);
        })
        .catch((e) => {
            console.log(e)
            setSrc(undefined);
        });
}