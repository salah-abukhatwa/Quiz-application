// Sellect Elements
let countSpan = document.querySelector(".quiz-info .count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
//   Set Options
let currentIndex = 0;


function getQuestions() {
    
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questionsObject = JSON.parse(this.responseText);

            let qCount = questionsObject.length
            console.log(qCount);

            // Creat Bullets + Set Questions Count
            createBullets(qCount);

            // Add Question Data
            addQuestionData(questionsObject[currentIndex], qCount);
        }
    };

    myRequest.open("GET", "questions.json", true);
    myRequest.send();
}

getQuestions();

function createBullets(num) {
    countSpan.innerHTML = num;

    // Creat Spans
    for (let i = 0; i < num; i++) {

        // Creat Span
        let theBullet = document.createElement("span");
        // Append Bullets To Main Bullet Container
        bulletsSpanContainer.appendChild(theBullet);

        if (i === 0) {
            theBullet.className = "on"
        }
        
    }
}

function addQuestionData(obj , count) {
// Creat H2 Question Title
    let questionTitle = document.createElement("h2");
    // Creat Question Text
    let questionText = document.createTextNode(obj.title);
    questionTitle.appendChild(questionText);
    quizArea.appendChild(questionTitle);

    // Creat Answers
    for (let i = 1; i <= 4; i++) {
        // Creat Main Answers
    let mainDiv = document.createElement("div");
        mainDiv.className = "answer";
        let radioInput = document.createElement("input");
        // Add Type + Name + Id + Data-Attribute
        radioInput.name = 'question';
        radioInput.type = 'radio';
        radioInput.id = `answer_${i}`;
        radioInput.dataset.answer = obj[`answer_${i}`];

        // Make First Option Selected
        if (i === 1) {
            radioInput.checked = true;
        }

        // Create Label
        let theLabel = document.createElement("label");

        // Add For Attribute
        theLabel.htmlFor = `answer_${i}`;
        let theLabelText = document.createTextNode(obj[`answer_${i}`]);
        theLabel.appendChild(theLabelText);

        // Add Input + Label To Main Div
        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(theLabel);
        answersArea.appendChild(mainDiv);

        
    }
    
}