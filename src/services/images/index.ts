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
    setSrc(`${api.defaults.baseURL}/images/question/${questionId}`);

    /* function _imageEncode (arrayBuffer: ArrayBuffer) {
        const string:string[] = []
        let b64encoded = btoa(`${string.reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(parseInt(c))},'')}`)
        let mimetype="image/png"
        return "data:"+mimetype+";base64,"+b64encoded
    }

    const image = await api.get(`images/question/${questionId}`, { responseType: "arraybuffer" });
    console.log(await(image.data)) */
    
    
    
  /*   
    .then(res => {
        let image = btoa(
            new Uint8Array(res.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        const data = `data:${res.headers['content-type'].toLowerCase()};base64,${image}`;
        console.log(data);
        setSrc(data)
        /* console.log(_imageEncode(res.data))
        setSrc(_imageEncode(res.data)) */
    /* }).catch(() => {
        setSrc("erro")
    }); */ 

}