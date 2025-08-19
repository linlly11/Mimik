const questions = [
  {thai:"หมี", answer:"Bear", options:["Bear","Baer","Beer"]},
  {thai:"จระเข้", answer:"Crocodile", options:["Crocodile","Crocadile","Cracodile"]},
  {thai:"วัว", answer:"Cow", options:["Cow","Caw","Cew"]},
  {thai:"นก", answer:"Bird", options:["Bird","Birt","Bidr"]},
  {thai:"ไก่", answer:"Chicken", options:["Chickan","Chickkn","Chicken"]},
  {thai:"นกยูง", answer:"Peacock", options:["Peacock","Peecock","Paecock"]},
  {thai:"หมู", answer:"Pig", options:["Pig","Peg","Pag"]},
  {thai:"แมวน้ำ", answer:"Seal", options:["Seal","Sela","Sale"]},
  {thai:"วาฬ", answer:"Whale", options:["Whala","Whale","Whalo"]},
  {thai:"สุนัข", answer:"Dog", options:["Dog","Dug","Dop"]},
  {thai:"กวาง", answer:"Deer", options:["Deer","Dear","Daar"]},
  {thai:"เพนกวิน", answer:"Penguin", options:["Panguin","Penguin","Panguun"]},
  {thai:"หมีขั้วโลก", answer:"Polar Bear", options:["Polar Bear","Bear","Bat"]},
  {thai:"ยุง", answer:"Mosquito", options:["Mosoqito","Mosquito","Mosqeito"]}, 
  {thai:"แมลงสาบ", answer:"Cockroach", options:["Cockroech","Cockarech","Cockroach"]},
];

let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionText = document.getElementById("question-text");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

// หน้า start
const startPage = document.getElementById("start-page");
const gamePage = document.getElementById("game-page");
const startBtn = document.getElementById("startBtn");

startBtn.onclick = () => {
  startPage.classList.add("hidden");
  gamePage.classList.remove("hidden");
  loadQuestion();
};

function loadQuestion(){
  let q = questions[currentQ];
  questionText.textContent = `ข้อที่ ${currentQ+1}: ${q.thai}`;
  optionsEl.innerHTML = "";
  q.options.sort(()=>Math.random()-0.5).forEach(opt => {
    let btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = ()=>checkAnswer(opt);
    optionsEl.appendChild(btn);
  });
  nextBtn.classList.add("hidden");
  resetTimer();
}

function checkAnswer(answer){
  let correct = questions[currentQ].answer;
  if(answer === correct){
    score++;
  } else {
    score -= 2;
  }
  scoreEl.textContent = score;
  stopTimer();
  nextBtn.classList.remove("hidden");
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
}

function nextQuestion(){
  currentQ++;
  if(currentQ < questions.length){
    loadQuestion();
  } else {
    endGame();
  }
}

function resetTimer(){
  clearInterval(timer);
  timeLeft = 10; // เริ่มที่ 10 วิ
  timeEl.textContent = timeLeft;
  timer = setInterval(()=>{
    timeLeft--;
    timeEl.textContent = timeLeft;
    if(timeLeft <= 0){
      clearInterval(timer);
      score -= 2; // หมดเวลา = ผิด
      scoreEl.textContent = score;
      nextBtn.classList.remove("hidden");
      Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
    }
  },1000);
}

function stopTimer(){
  clearInterval(timer);
}

function endGame(){
  document.getElementById("quiz").classList.add("hidden");
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `<h2>จบเกมแล้ว!</h2><p>คะแนนรวม: ${score}</p>`;
}

nextBtn.onclick = nextQuestion;
