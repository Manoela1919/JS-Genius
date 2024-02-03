let sequence = [];
let userAttempt = []
let gameStatus = 'over'
let level = 0
let historic = []

let localHistoric = localStorage.getItem('historic')
if (localHistoric) {
  historic = JSON.parse(localHistoric)
}
setMenu()

// Função que da inicio ao jogo
function start() {
  level = 0
  sequence = []
  userAttempt = []
  document.getElementById('menu').style.display = 'none'
  nextLevel()
}

// Função que adiciona mais um item a sequência e mostra a ordem
function nextLevel() {
  userAttempt = []
  level++
  let newItem = Math.floor(Math.random() * 4);
  let buttons = document.getElementById("buttons-wrapper");
  sequence.push(newItem);
  document.activeElement.blur()
  setTimeout(() => {
    for (let index = 0; index < sequence.length; index++) {
      setTimeout(() => {
        buttons.children[sequence[index]].focus();
        setTimeout(() => {
          buttons.children[sequence[index]].blur();
        }, 700);
      }, 800 * index);
    }
  }, 250);
}

// Função que valida se o usuário clicou na ordem certa
function pressed(pressValue) {
  userAttempt.push(pressValue)
  let slicedSequence = sequence.slice(0, userAttempt.length)
  if (JSON.stringify(userAttempt) !== JSON.stringify(slicedSequence)) {
    gameOver()
    return
  }
  if (slicedSequence.length === sequence.length) {
    nextLevel()
  }
}

// Função ativada quando o usuário erra a sequência
function gameOver() {
  gameStatus = 'over'
  if (historic.length < 10 || historic[historic.length -1].score < level) {
    setHistoric()
  }
  let menuElement = document.getElementById('menu')
  menuElement.style.display = 'grid'
  menuElement.children[0].innerHTML = `Game Over! Score: ${level}`
}

function showMenu(isGameOver) {
  let historic = localStorage.getItem('historic')
}

// Função que atualiza o histórico no local storage
function setHistoric() {
  if (historic.length === 10) {
    historic.pop
  }

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; 
  let dd = today.getDate();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  const formattedToday = dd + '/' + mm + '/' + yyyy;

  let newItem = {
    score: level,
    date: formattedToday
  }

  historic.push(newItem)
  historic.sort((a, b) => b.score - a.score);

  localStorage.setItem('historic', JSON.stringify(historic))
  setMenu()
}

// Coloca os dados do histórico no HTML
function setMenu() {
  let scores = document.getElementById('menu').children[1]
  for (let index = 0; index < historic.length; index++) {
    const element = historic[index];
    scores.children[index].children[0].innerHTML = element.score
    scores.children[index].children[1].innerHTML = element.date
  }
}