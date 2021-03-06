let currentNum = "";
let mathString = "";
let plusMinus = "";
let mathReady = false;
let operationSelected = false;
let lastNums = 0;
let negativeResult = false;
let operationsRan = 1;
let firstOperation = true;
const calcButtons = document.querySelector('.calc-wrapper')
const midSpeak = ["You're really pushing my buttons.", "Can we speed this up?", "This is really doing a number on me.", "Can we take 5?", "I'm at my sixes and sevens here.", "I was on cloud nine a few minutes ago.", "Math really isn't my thing.", "Do you really need this number?", "Can you just ask Siri?", "Mind coming back tomorrow?"]


calcButtons.addEventListener('mousedown', function(event){
    const button = event.target;
    document.querySelector('.result').style.fontSize = "48px";
    speakLazy();
    if (button.tagName === 'BUTTON') {
        if (button.classList.contains('num')) {
            formNum(button);
        }
        if (button.classList.contains('percent')) {
            if (currentNum === "") {currentNum = 0;}
            currentNum = currentNum / 100;
            mathString = mathString.slice(lastNums);
            mathString = mathString + currentNum;
            lastNums = currentNum.length;
            document.querySelector('.result').innerText = currentNum;
        }
        if (button.classList.contains('cancel')) {
            currentNum = "";
            plusMinus = "";
            mathString = "";
            lastNums = 0;
            negativeResult = false;
            firstOperation = true;
            mathReady = false;
            document.querySelector('.result').innerText = 0;
        }
        if (button.className == 'math-op') {

            if (firstOperation && currentNum === "") {
                currentNum = "0";
                mathString = mathString + "0";
                firstOperation = false;
            }

            if (currentNum === "") {
                currentNum = "0";
            }

            let operation = "";
            if (button.innerText === "x"){
                operation = "*"
            }
            else {
                operation = button.innerText;
            }
            if (mathReady) {
                evalMath();
            }
            if (operationSelected){
                mathString = mathString.slice(0, -1);
                mathString = mathString + operation;
                currentNum = "";
                mathReady = true;
                lastNums = 0;
            }
            else {
            mathString = mathString + operation;
            currentNum = "";
            operationSelected = true;
            mathReady = true;
            lastNums = 0;
            }
        }
        if (button.classList.contains('equals')) {
            evalMath();
        }
        if (button.classList.contains('plus-minus')) {
            if (currentNum === ""){
                //currentNum = document.querySelector('.result').innerText;
                currentNum = 0;
            }
            if (plusMinus == "+"){
                plusMinus = "-";
                mathString = mathString.slice(0, (mathString.length-lastNums));
                currentNum = "-"+currentNum;
                mathString = mathString + currentNum;
                lastNums = currentNum.length;
                document.querySelector('.result').innerText = currentNum;
            }
            else if (plusMinus == "-"){
                plusMinus = "+";
                mathString = mathString.slice(0, (mathString.length-lastNums));
                //currentNum = currentNum.substring(1);
                currentNum = Math.abs(parseInt(currentNum)).toString();
                mathString = mathString + currentNum;
                lastNums = currentNum.length;
                document.querySelector('.result').innerText = currentNum;
            }
            else {
                plusMinus = "-";
                mathString = mathString.slice(0, (mathString.length-lastNums));
                currentNum = "-"+currentNum
                mathString = mathString + currentNum;
                lastNums = currentNum.length;
                document.querySelector('.result').innerText = currentNum;
            }
        }
    }
})

 function formNum(button) {
    if (currentNum.length > 7) {
        document.querySelector('.result').style.fontSize = "26px";
        document.querySelector('.result').innerText = "Sorry, I'm not that good with numbers";
        currentNum = "";
        plusMinus = "";
        mathString = "";
        lastNums = 0;
        negativeResult = false;
        firstOperation = true;
        operationSelected = false;
        mathReady = false;
     }
    else {
        currentNum = currentNum + button.innerText;
        mathString = mathString + button.innerText;
        lastNums++;
        //if (currentNum > 0) {
        document.querySelector('.result').innerText = currentNum;
        //}
        operationSelected = false;
    }
 }

 function evalMath() {
    let result = eval(mathString);
     if (result % 1 != 0) {
        document.querySelector('.result').style.fontSize = "26px";
        result = "Decimals really aren't my thing."
        document.querySelector('.result').innerText = result
        currentNum = "";
        plusMinus = "";
        mathString = "";
        lastNums = 0;
        negativeResult = false;
        firstOperation = true;
        operationSelected = false;
        mathReady = false;
     } 
     else if (result.toString().length > 7) {
        document.querySelector('.result').style.fontSize = "26px";
        document.querySelector('.result').innerText = "I don't have enough fingers to count that"; 
        currentNum = "";
        plusMinus = "";
        mathString = "";
        lastNums = 0;
        negativeResult = false;
        firstOperation = true;
        operationSelected = false;
        mathReady = false;
     }
     else {
         document.querySelector('.result').innerText = result;
         mathString = result.toString();
         // currentNum = result.toString();
         if (result == 0) {
             currentNum = ""
         }
         else {currentNum = result.toString();}
         lastNums = result.toString().length;
         if (Math.sign(result) == -1) {
            plusMinus = "-";
         }
         else {
            plusMinus = "";
         }
     }
 }

 function speakLazy(){
     if (operationsRan % 8 === 0) {
            document.querySelector('.title').innerText = midSpeak[getRandomInt(midSpeak.length)]
         }
         operationsRan++;
     }

 function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
