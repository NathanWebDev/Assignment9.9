//Question Data
const DATA = {
    questions: [
      {
        question: 'What year did the Nintendo Entertainment System come out?',
        answers: [
          '1972',
          '1985',
          '1988',
          '1990'
        ],
        correctAnswer: '1985',
        backgroundIMG: "./images/NesPic.jpg"
      },
      {
        question: 'This character was inspired by a partially eaten pizza, who is this character?',
        answers: [
          'Pac-Man',
          'Jumpman',
          'Popo',
          'Q*bert'
        ],
        correctAnswer: 'Pac-Man',
        backgroundIMG: './images/PizzaPic.jpg'
      },
      {
        question: 'How many levels are in Galaga?',
        answers: [
          '228',
          '255',
          '256',
          '271'
        ],
        correctAnswer: '255',
        backgroundIMG: './images/GalagaLogoPic.jpg'
      },
      {
        question: 'The Japanese version of Megaman is called what?',
        answers: [
          'Megaman',
          'Roboman',
          'Blasterman',
          'Rockman'
        ],
        correctAnswer: 'Rockman',
        backgroundIMG: './images/MegamanPic.jpg'
      },
      {
        question: 'What is the highest selling video game console of all time?',
        answers: [
          'Nintendo DS',
          'PlayStation 2',
          'Xbox 360',
          'Wii'
        ],
        correctAnswer: 'Wii',
        backgroundIMG: './images/GamingConsolesPic.jpg'
      },
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0,
    incorrect: 0
};