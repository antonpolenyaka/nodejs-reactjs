/* Prohibir click derecho para que no copian los textos */

// Prohibimos hacer click derecho

function disableAction() {
    return false;
}

document.oncontextmenu = disableAction;

function right(e) {
    if (navigator.appName === 'Netscape' && e.which === 3) {
        return false;
    }
    // eslint-disable-next-line no-restricted-globals
    else if (navigator.appName === 'Microsoft Internet Explorer' && event.button === 2) {
        return false;
    }
    return true;
}
document.onmousedown = right;

// Prohibimos seleccionar texto

document.ondragstart = disableAction;
document.onselectstart = disableAction;
if (document.body) {
    document.body.oncopy = disableAction;
}