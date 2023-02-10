import stringToPig from "./toPig";
import stringFromPig from "./fromPig";


let pigAllText = (document: Document, suffix?: string): void => {
    let elements: NodeListOf<HTMLElement> = document.body.querySelectorAll<HTMLElement>("*");
    for (let e of elements) {
        if (e.tagName == "STYLE" || e.tagName == "SCRIPT") {
            continue;
        }
        for (let n of e.childNodes) {
            if (n.nodeName == "#text" && n.nodeType == Node.TEXT_NODE) {
                n.textContent = stringToPig(n.textContent ?? "", suffix);
            }
        }
    }
}
let unpigAllText = (document: Document, suffix?: string): void => {
    let elements: NodeListOf<HTMLElement> = document.body.querySelectorAll<HTMLElement>("*");
    for (let e of elements) {
        for (let n of e.childNodes) {
            if (n.nodeName == "#text") {
                n.textContent = stringFromPig(n.textContent ?? "", suffix);
            }
        }
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.direction === "topig") {
        pigAllText(document, request.suffix);
        try {
            sendResponse({ status: "done" });
        } catch (e) {
            console.log(e)
        }
    }
    else if (request.direction === "frompig") {
        unpigAllText(document, request.suffix);
        try {
            sendResponse({ status: "done" });
        } catch (e) {
            console.log(e)
        }
    }
});