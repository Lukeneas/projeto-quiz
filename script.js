//initial data
let currentQuestion = 0;
let correctAnswers = 0;

//functions
const showQuestions = () => {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion];
    let pct = Math.floor((currentQuestion/questions.length)*100)//floor para nav antigos;
    //pct dentro porque precisa estar atualizando

    document.querySelector(".progress .progress--bar").style.width = `${pct}%`;
    document.querySelector(".scoreArea").style.display = "none";
    document.querySelector(".questionArea").style.display = "block";

    //question => html
    document.querySelector(".question").innerHTML = q.question;
    //options => html
    let optionHtml = "";
    for (let i in q.options) {
      optionHtml += `<div data-op="${i}" class=option><span>${
        parseInt(i) + 1
      }</span> ${q.options[i]}</div>`;
    }
    document.querySelector(".options").innerHTML = optionHtml;

    //event click options
    document
      .querySelectorAll(".options .option")
      .forEach((i) => i.addEventListener("click", optionClickEvent));
  } else {
    finishQuiz();
  }
};

const optionClickEvent = (e) => {
  let clickedOption = parseInt(e.target.getAttribute("data-op"));
  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++;
  }
  //pule question
  currentQuestion++;
  //mostra question
  showQuestions();
};

const finishQuiz = ()=> {
    let points = Math.floor((correctAnswers / questions.length) * 100);;
    //inverso de showQuestions

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = `Você pode melhorar!`;
        document.querySelector('.scorePct').style.color = '#ff0000';
    } else if (points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = `Boa!!`;
        document.querySelector('.scorePct').style.color = '#ffff00';
    } else if (points >= 70 && points < 100) {
        document.querySelector('.scoreText1').innerHTML = `Você está craque!!!`;
        document.querySelector('.scorePct').style.color = '#0d630d';
    } else {
        document.querySelector('.scoreText1').innerHTML = `Só fé só fé só fé!!!!`;
        document.querySelector('.scorePct').style.color = '#39FF14';
    }
   
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

    document.querySelector(".questionArea").style.display = "none";
    document.querySelector(".scoreArea").style.display = "block";
    document.querySelector(".progress .progress--bar").style.width = '100%';
}
const resetEvent = ()=>{
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestions();
}
showQuestions();
//events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent)
