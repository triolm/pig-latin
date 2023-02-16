import stringFromPig from "./fromPig";
import stringToPig from "./toPig";


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

let downloadPageText = async (): Promise<string> => {
    //source: https://developer.chrome.com/articles/file-system-access/

    let text: string;
    try {
        text = document.querySelector("pre")!.innerHTML
    } catch (e) {
        return "Download failed: text not found"
    }

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
    try {
        const handle = await window.showSaveFilePicker(options);
        // Create a FileSystemWritableFileStream to write to.
        const writable = await handle.createWritable();
        // Write the contents of the file to the stream.
        await writable.write(text);
        // Close the file and write the contents to disk.
        await writable.close();
    } catch (e) {
        return "Download failed: unable to download file"
    }
    return "Download successful"
}

export { pigAllText, unpigAllText, downloadPageText }