import stringToPig from "./toPig";
import stringFromPig from "./fromPig";


let pigAllText = (document: Document): void => {
    let elements: NodeListOf<HTMLElement> = document.body.querySelectorAll<HTMLElement>("*");
    for (let e of elements) {
        for (let n of e.childNodes) {
            if (n.nodeName == "#text") {
                n.textContent = stringToPig(n.textContent ?? "");
            }
        }
    }
}
let unpigAllText = (document: Document): void => {
    let elements: NodeListOf<HTMLElement> = document.body.querySelectorAll<HTMLElement>("*");
    for (let e of elements) {
        for (let n of e.childNodes) {
            if (n.nodeName == "#text") {
                n.textContent = stringFromPig(n.textContent ?? "");
            }
        }
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.direction === "topig") {
        pigAllText(document);
        try {
            sendResponse({ status: "done" });
        } catch (e) {
            console.log(e)
        }
    }
    else if (request.direction === "frompig") {
        unpigAllText(document);
        try {
            sendResponse({ status: "done" });
        } catch (e) {
            console.log(e)
        }
    }
});