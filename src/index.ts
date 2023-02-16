import { pigAllText, unpigAllText, downloadPageText } from "./DOM"


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
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
        let status = await downloadPageText();
        console.log(status);
        try {
            sendResponse({ status });
        } catch (e) {
            console.log(e)
        }
    }
    else if (request.action === "checktxt") {
        try {
            if (/((.txt)|(.md))$/.test(document.URL)) {
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