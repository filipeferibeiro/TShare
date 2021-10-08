import download from 'downloadjs';
import { PdfCreationProps } from "../../interfaces/interfaces";
import api from "../api";

export async function postExam2(data: PdfCreationProps) {
    const pdf = api.post(`pdf/generate`, data).then(async (res) => (
        {
            headers: res.headers,
            responseType: 'blob',
        }
        )).then((response: any) => {
            const content = response.headers['content-type'];
            download(response.data, 'teste.pdf', content)
        }) 
        
        
        .catch(() => {
            return false;
        });
        
        return pdf;
    }
    
    
export async function postExam(data: PdfCreationProps) {
    const pdf = api.post(`pdf/generate`, data).then(res => console.log(res))/* .then(res => {
        console.log(res);
        download(res.data, 'teste2.pdf', res.headers['content-type'])
    }) */
}