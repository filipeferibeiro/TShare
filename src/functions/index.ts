export function toDate(text: string) {
    const date = new Date(text);

    return date.toLocaleDateString("pt-BR");
}

export function linkBase() {
    return "http://localhost:3333";
}

export function copyToClipboard(text:string) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // text area method
        let textArea = document.createElement("textarea")
        textArea.value = text;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
    }
}