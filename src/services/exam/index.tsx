import { PdfCreationProps } from "../../interfaces/interfaces";
import api from "../api";

function dec2hex (dec: { toString: (arg0: number) => string; }) {
    return dec.toString(16).padStart(2, "0")
}

function generateId () {
    var arr = new Uint8Array(10)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}
    
export async function postExam(bankId:string, data: PdfCreationProps) {
    const pdf = api.post(`pdf/generate/${bankId}`, data, {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        }
    }).then(res => {
        let blob = new Blob([res.data], { type:   'application/pdf' } );
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `documento_${generateId()}.pdf`;
        link.click();

        return true;
    }).catch(() => false);

    return pdf;
}