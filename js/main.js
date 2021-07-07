'use strict';

{
const words = [
  'the summer days are gone too soon',
  'tell me darling true what am i to you',
  'why we had to each be lonely it was just the season',
  'to live in this moment and finally be free',
  'is what i was after no chains holding me',
  'when i saw the break of day i wished that i could fly away',
  'something has to make you run i do not know why i did not come'];
let loc;
let score;
let miss;
let word;
const timeLimit = 30 * 1000;
let starttime;
let isPlaying = false;

const target = document.getElementById('target');

const scoreLabel = document.getElementById('score');
const missLabel = document.getElementById('miss');
const timeLabel = document.getElementById('timer')


function updatetarget(){
  let placeholder = '';
    for(let i = 0; i < loc; i++){
      placeholder = '_';
    }
    target.textContent = placeholder + word.substring(loc);

}

function updateTimer(){
const timeLeft = starttime + timeLimit - Date.now();
timeLabel.textContent = (timeLeft / 1000).toFixed(2);

const timeoutId = setTimeout(() => {
updateTimer();
},10);

if(timeLeft < 0){
  isPlaying = false;
  clearTimeout(timeoutId);
  timeLabel.textContent = '0.00';
  setTimeout(() =>{
    showResult();
    
  },100);
  target.textContent = 'click to replay';
  //ゲームオーバごにclick to replayと表示
}
}

function showResult(){
  const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
  
  alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
  
}

window.addEventListener('click', () => {
  if(isPlaying === true){
    return;
  }
  isPlaying = true;
  loc = 0;
  score = 0;
  miss = 0;
  scoreLabel.textContent = score;
  missLabel.textContent = miss;
  word = words[Math.floor(Math.random() * words.length)];
  //上の方で行っていた初期化の処理を、ウィンドウがクリックされた時に行うようにする
  target.textContent = word;
  starttime = Date.now();
  updateTimer();
});

window.addEventListener('keydown', e => {
  if(isPlaying !== true){
    return;
  }
  console.log(e.key);
  if(e.key === word[loc]){
    console.log('score'); 
    loc++;
    if(loc === word.length){
      word = words[Math.floor(Math.random() * words.length)];
      loc = 0;
    
    }
    updatetarget();
    score++;
    scoreLabel.textContent = score;
  }else{
    console.log('miss');
    miss++;
    missLabel.textContent = miss;
  }
});





}