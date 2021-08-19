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
    fetch(`${api.defaults.baseURL}/images/question/${questionId}`)
        .then(res => res.blob())
        .then(blob => {
            setSrc(URL.createObjectURL(blob));
        })
        .catch(() => {
            setSrc(undefined);
        })

    /* api.get(`images/question/${questionId}`).then((res) => {
        setSrc(`${api.defaults.baseURL}/images/question/${questionId}`);  */
        /* console.log(res.headers)
        var bytes = new Uint8Array(res.data);
        var binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '');
        setSrc(`data:${res.headers['content-type']};base64,${btoa(binary)}`); */
        
        /* console.log(res.data)
        setSrc(`data:image/png;base64,${res.data }`); */
        /* Buffer.of(res.data)
        */
    /* }).catch(() => {
        setSrc(undefined);
    }); */
}

export async function postImageProfile(userId:number, data:FormData) {
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