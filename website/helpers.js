export function execCopyCommand(el) {
    let r = false,
        selected;
    const txt = document.createElement('textarea');

    txt.value = el.textContent;
    txt.setAttribute('readonly', '');
    txt.classList.add('sr-only');
    
    document.body.appendChild(txt);

    if(document.getSelection) {
        selected =
            document.getSelection().rangeCount > 0
                ? document.getSelection().getRangeAt(0)
                : false;
    }

    txt.select();

    if(document.execCommand('copy')) {
        r = true;
    }
    document.body.removeChild(txt);

    if(selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
    return r;
}

