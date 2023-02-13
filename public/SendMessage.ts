const toPigBtn: HTMLElement = document.querySelector("#to-pig")!;
const fromPigBtn: HTMLElement = document.querySelector("#from-pig")!;
const suffix: HTMLInputElement = document.querySelector("#suffix")!;
const suffixInvalid: HTMLElement = document.querySelector("#suffixInvalid")!;
const failed: HTMLElement = document.querySelector("#failed")!;
const pending: HTMLElement = document.querySelector("#pending")!;
const success: HTMLElement = document.querySelector("#success")!;

let sendMessage = async (direction: string, suffix: string) => {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);
    try {
        pending.style.display = "inline-block";
        failed.style.display = "none";
        success.style.display = "none";
    } catch (e) {
        console.log("GUI not loaded")
    }

    chrome.tabs.sendMessage(tabs[0].id ?? 0, { direction, suffix }, function (response) {
        let lastError = chrome.runtime.lastError;
        if (lastError) {
            console.log(lastError.message);
            failed.style.display = "inline-block";
            pending.style.display = "none";
            return;
        } else {
            success.style.display = "inline-block";
            pending.style.display = "none";
        }
    });

}

suffix.addEventListener("keyup", () => {
    if (/[^A-Za-z]/g.test(suffix.value)) {
        suffixInvalid.style.display = "inline-block";
    } else {
        suffixInvalid.style.display = "none";
    }
})

let checkSuffix = () => {
    let s = suffix.value.trim();
    if (!s || /[^A-Za-z]/g.test(s)) {
        return "ay"
    }
    return s;
}

toPigBtn.addEventListener("click", async () => {
    try {
        sendMessage("topig", checkSuffix());
    } catch (e) {
    }
});
fromPigBtn.addEventListener("click", async () => {
    try {
        sendMessage("frompig", checkSuffix());
    } catch (e) {
    }
});
