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

let downloadPageText = async () => {
    //source: https://developer.chrome.com/articles/file-system-access/

    const options = {
        types: [
            {
                description: 'Text Files',
                accept: {
                    'text/plain': ['.txt'],
                },
            },
        ],
    };
    const handle = await window.showSaveFilePicker(options);
    console.log("here");
    // Create a FileSystemWritableFileStream to write to.
    const writable = await handle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(document.querySelector("pre")!.innerHTML);
    // Close the file and write the contents to disk.
    await writable.close();
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
    else if (request.action === "download") {
        console.log("download");
        downloadPageText();
        try {
            sendResponse({ status: "done" });
        } catch (e) {
            console.log(e)
        }
    }
    else if (request.action === "checktxt") {
        try {
            if (/(.txt)$/.test(document.URL)) {
                sendResponse({ status: "true" });
            }
            else {
                sendResponse({ status: "false" });
            }
        } catch (e) {
            console.log(e)
        }
    }
});