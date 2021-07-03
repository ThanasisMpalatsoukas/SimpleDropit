export function execCopyCommand(el) {
    if (document.selection) {
        let range = document.body.createTextRange();
        range.moveToElementText(el);
        range.select().createTextRange();
        return document.execCommand("copy");
    } else if (window.getSelection) {
        let range = document.createRange();
        range.selectNode(el);
        window.getSelection().addRange(range);
        return document.execCommand("copy");
    }
    return false;
}