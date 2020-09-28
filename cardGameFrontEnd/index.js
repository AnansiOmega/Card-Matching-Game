const cardGameCont = document.getElementById('card-game-container')

function main(){
    loadNewGame()
}


cardGameCont.addEventListener('click', eventHandler)

function eventHandler(e){
if (e.target.parentElement.className === 'word'){
    debugger
}
}

function loadNewGame(){
    fetch('http://localhost:3000/games/new')
    .then(resp => resp.json())
    .then(newGame => renderNewGame(newGame))
}

function renderNewGame(newGame){
    const cardGameCont = document.getElementById('card-game-container')
    newGame.forEach(gameattr => {
        cardGameCont.innerHTML += `
        <div class='word'><h4>${gameattr.match.english_word}<h4></div>
        <div class='word'><h4>${gameattr.match.spanish_word}<h4></div>
        `
    })
}



main()