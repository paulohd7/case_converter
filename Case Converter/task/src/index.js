// Util Regex
const specialCharPatternToProper = /^[.,$;%*@]+\w/;
const specialCharPatternToSentence = /^[.,$;%*@ ]+\w/;

const specialCharRegToProper = new RegExp(specialCharPatternToProper);
const specialCharRegToSentence = new RegExp(specialCharPatternToSentence);


// Get elements from the DOM

// Text Area
const textArea = document.querySelector("textarea");
const textAreaResult = document.querySelector("#result");

// Buttons
const buttonUpperCase = document.getElementById("upper-case");
const buttonLowerCase = document.getElementById("lower-case");
const buttonProperCase = document.getElementById("proper-case");
const buttonSentenceCase = document.getElementById("sentence-case");

const buttonClear = document.getElementById("clear-result");
const buttonSave = document.getElementById("save-text-file");

// Listeners
buttonUpperCase.addEventListener("click", upperCaseHandleClick, false);
buttonLowerCase.addEventListener("click", lowerCaseHandleClick, false);
buttonProperCase.addEventListener("click", properCaseHandleClick, false);
buttonSentenceCase.addEventListener("click", sentenceHandleClick, false);
buttonClear.addEventListener("click", cleanResult, false);
buttonSave.addEventListener("click", saveAsTxt, false);
buttonSave.textRef="mainTextArea";

// Handle Functions
function upperCaseHandleClick() {
        //textAreaResult.innerHTML += textArea.value.toUpperCase();
        textArea.value = textArea.value.toUpperCase();
}

function lowerCaseHandleClick() {
        //textAreaResult.innerHTML += textArea.value.toUpperCase();
        textArea.value = textArea.value.toLowerCase();
}

function properCaseHandleClick() {
        textArea.value = textArea.value.toLowerCase();
        let _wordsToProperCase = textArea.value.split(' ');

        console.log(_wordsToProperCase);

        let wordsWithProperCase = _wordsToProperCase.map((word) => {
               if (specialCharRegToProper.test(word) && word !== " " && word !== "") {
                       return word.charAt(0) + word.charAt(1).toUpperCase() + word.slice(2);
               } else if (specialCharRegToProper.test(word) == false && word !== " " && word !== "") {
                       return word.charAt(0).toUpperCase() + word.slice(1);
               }

               return word;
        });

        textArea.value = wordsWithProperCase.join(" ");
}

function sentenceHandleClick() {
        textArea.value = textArea.value.toLowerCase();
        let _linesToSentenceCase = textArea.value.split('.');

        console.log(_linesToSentenceCase);

        let linesWithSentenceCase = _linesToSentenceCase.map((line) => {
                if (specialCharRegToSentence.test(line) && line !== " " && line !== "") {
                        return line.charAt(0) + line.charAt(1).toUpperCase() + line.slice(2);
                } else if (specialCharRegToSentence.test(line) == false && line !== " " && line !== "") {
                        return line.charAt(0).toUpperCase() + line.slice(1);
                }

                return line;
        });

        textArea.value = linesWithSentenceCase.join(".");
}

function cleanResult() {
        textArea.value = "";
}

function saveAsTxt(evt) {

        let fileName = "text";
        let textRefToSave = document.getElementById(evt.currentTarget.textRef).value;
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textRefToSave));
        element.setAttribute('download', fileName);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
}