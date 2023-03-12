// Sellect Elements
let countSpan = document.querySelector(".quiz-info .count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");


//   Set Options
let currentIndex = 0;
let rightAnswers = 0;


function getQuestions() {
    
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questionsObject = JSON.parse(this.responseText);

            let qCount = questionsObject.length
            

            // Creat Bullets + Set Questions Count
            createBullets(qCount);

            // Add Question Data
            addQuestionData(questionsObject[currentIndex], qCount);

            // Click On Submit
            submitButton.onclick = () => {
                // Get Right Answer
                let theRightAnswer = questionsObject[currentIndex].right_answer;
             

                // Increase Index
                currentIndex++;

                // Check The Answer
                checkAnswer(theRightAnswer, qCount);

                // Remove Previous Question
                quizArea.innerHTML = '';
                answersArea.innerHTML = '';
                // Add New Question
                addQuestionData(questionsObject[currentIndex], qCount);
                
                // Handle Bullets Class
                handleBullets();

                // Show Results
                showResults(qCount);

            };

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
   if (currentIndex < count) {
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
    
}

function checkAnswer(rAnswer, count) {

    let answers = document.getElementsByName("question");
    let theChoosenAnswer;

    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            theChoosenAnswer = answers[i].dataset.answer;
        if (rAnswer === theChoosenAnswer) {
            rightAnswers++;
        }
        }
        
    }
    
}

function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {
        if (currentIndex === index) {
            span.className = "on";
        }
    })
}

function showResults(count) {
    let theResults;
    if (currentIndex === count) {
        quizArea.remove();
        answersArea.remove();
        submitButton.remove();
        bullets.remove();

        if (rightAnswers > (count / 2) && rightAnswers < count) {
            theResults = `<span class="good">Good</span>, ${rightAnswers} Out Of ${count} `
        } else if(rightAnswers === count){
             theResults = `<span class="perfect">Perfect</span>, All Answers is right`
        } else {
            theResults = `<span class="bad">Bad</span>, just ${rightAnswers} Out Of ${count}`
        }
        resultsContainer.innerHTML = theResults;
        resultsContainer.style.padding = '10px';
        resultsContainer.style.backgroundColor = 'white';
        resultsContainer.style.marginTop = '10px';

    }
}