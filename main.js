// Sellect Elements
let countSpan = document.querySelector(".quiz-info .count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");



function getQuestions() {
    
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questionsObject = JSON.parse(this.responseText);

            let questionsCount = questionsObject.length
            console.log(questionsCount);

            // Creat Bullets + Set Questions Count
            createBullets(questionsCount);
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