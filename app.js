
/**
* 
* Technical requirements:
* 
* Your app should include a render() function, that regenerates the view each time the store is updated. 
* See your course material and access support for more details.
*
* NO additional HTML elements should be added to the index.html file.
*
* You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
*
* SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
* 
*/
  
/********** TEMPLATE GENERATION FUNCTIONS **********/
  
// These functions return HTML templates
  
/********** RENDER FUNCTION(S) **********/
  
// This function conditionally replaces the contents of the <main> tag based on the state of the store
  
/********** EVENT HANDLER FUNCTIONS **********/
  
// These functions handle events (submit, click, etc)

// Content Generation Functions

function generateHomeScreen() {
  return `
  <div class="home-screen">
    <p>I hope you defeated some rats to farm XP because it's time for a Quiz!</p>
    <button type="button" id="start">Start</button>
  </div>`;
}

function generateHud() {
  return `
  <ul class="hud">
    <li id="current-question-number">
      <p>Question ${DATA.questionNumber + 1} out of ${DATA.questions.length}</p>
    </li>
    <li id="correct-questions">
      <p>${DATA.score}: Correct</p>
    </li>
    <li id="incorrect-questions">
      <p>${DATA.incorrect}: Incorrect</p>
  </ul>`;
}

function generateOptions() {
  const optionsArray = DATA.questions[DATA.questionNumber].answers;
  let optionsHtml = '';
  let i = 0;

  optionsArray.forEach(option => {
    optionsHtml += `
    <div id="option-container-${i}">
      <input type="radio" name="option" id="option${i + 1}" value = "${option}" tabindex ="${i + 1}" required>
      <label for="option${i + 1}"> ${option}</label>
    </div>`;
    i++;
    });
  return optionsHtml;
}

function generateQuestion() {
  let questionNumber = DATA.questions[DATA.questionNumber];
  return `
  <form id="question-form" class="question-form">
    <div class="question">
      <h2> ${questionNumber.question} </h2>
    </div>
    <div class="question-img">
      <img src="${questionNumber.backgroundIMG}" alt="question-pic">
    </div>
    <div class="options-container">
      <div class="options">
        ${generateOptions()}
      </div>
    </div>
    <button type="submit" id="submit-answer-button" tabindex="5">Submit</button>
    <button type="button" id="next-question-button" tabindex="6">Next Question</button>
  </form>`;
}

function generateResults() {
  if (DATA.score === 5) {
    return `
    <div class="results">
      <p>Wow, you got a score of ${DATA.score} out of ${DATA.questions.length}!</p>
      <p>Remind me to hire you for my Esports team!</p>
      <button type="button" id="restart">Restart Quiz</button>
    </div>`;
  } else if (DATA.score < 5 && DATA.score >= 3){
    return `
    <div class="results">
      <p>You got a score of ${DATA.score} out of ${DATA.questions.length}.</p>
      <p>Not bad, I bet you could do better though!</p>
      <button type="button" id="restart">Restart Quiz</button>
    </div>`;
  } else {
    return `
    <div class="results">
      <p>Ouch, you got a score of ${DATA.score} out of ${DATA.questions.length}.</p>
      <p>Not your day huh, how about you give it another shot!</p>
      <button type="button" id="restart">Restart Quiz</button>
    </div>`;
  }
}

function generateFeedback(answerStatus) {
  let correctAnswer = DATA.questions[DATA.questionNumber].correctAnswer;  
  let html = '';
  if (answerStatus === 'correct'){
    html = `
    <div class="correct-answer">Goob job! That's correct.</div>`;
  }
  else if (answerStatus === 'incorrect'){
    html = `
    <div class="incorrect-answer">Oops, that's incorrect. The correct answer is ${correctAnswer}.`;
  }
  return html;
}

// Render Function

function render() {
  let html = '';

  if (DATA.quizStarted === false) {
    $('main').html(generateHomeScreen());
    return;
  } else if (DATA.questionNumber >= 0 && DATA.questionNumber < DATA.questions.length){
    html = generateHud();
    html += generateQuestion();
    $('main').html(html);
    $('#next-question-button').hide();
  } else {
    $('main').html(generateResults());
  }
}

// Event Handler Functions

function handleStartClick() {
  $('main').on('click', '#start', (event) => {
    DATA.quizStarted = true;
    render();
  });
}

function handleNextQuestionClick() {
  $('main').on('click', '#next-question-button', (event) => {
    render();
  });
}

function handleQuestionSubmission() {
  $('main').on('submit', '#question-form', (event) => {
    event.preventDefault();
    const questionNumber = DATA.questions[DATA.questionNumber];
    //Finds the highlighted option from the user
    let highlightedOption = $('input[name=option]:checked').val();
    let optionContainer = `#option-container-${questionNumber.answers.findIndex(i => i === highlightedOption)}`;
    //Adds feedback and updates score
    if (highlightedOption === questionNumber.correctAnswer){
      DATA.score++;
      $(optionContainer).append(generateFeedback('correct'));
    } else {
      DATA.incorrect++;
      $(optionContainer).append(generateFeedback('incorrect'));
    }
    DATA.questionNumber++;
    //Hiding and Disabling Buttons
    $('#submit-answer-button').hide();
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    $('#next-question-button').show();
  });
}

//Following functions reset quiz
function restartQuiz() {
  DATA.quizStarted = false;
  DATA.questionNumber = 0;
  DATA.score = 0;
  DATA.incorrect = 0;
}

function handleRestartClick() {
  $('main').on('click', '#restart', (event) =>{
    restartQuiz();
    render();
  })
}

//Function That Renders the elements

function renderElements() {
  render();
  handleStartClick();
  handleNextQuestionClick();
  handleQuestionSubmission();
  handleRestartClick();
}

$(renderElements);