const shuffleBtn = document.getElementById('shuffle-btn')
const leafPopup = document.querySelector('.leaf-popup')
const completedGamePopup = document.querySelector('.completed-game')
const playBtn = document.querySelector('#login-submit')

let clicks = 0
let moves = 0
let card1Id = ''
let card2Id = ''
let points = 50


cardGameCont.addEventListener('click', matchHandler)
cardGameCont.addEventListener('click', cardBehavior)
cardGameCont.addEventListener('click', cardCounter)
shuffleBtn.addEventListener('click', shuffleCards)
// shuffleBtn.addEventListener('click', renderCompletedGame)
newGameButton.addEventListener('click', loadNewGame)
// completedGamePopup.addEventListener('click', loadNewGame)

//leaf.notification
function renderPopup() {
    leafPopup.style.display = 'block'
    leafPopup.style.animationName = 'flip-vertical-fwd'
    leafPopup.style.animationDuration = '.4s'
    setTimeout(floatPopup, 400)
}

function floatPopup() {
    // leafPopup.style.display = 'none'
    leafPopup.style.animationName = 'slide-out-elliptic-top-bck'
    leafPopup.style.animationDuration = '.7s'
    setTimeout(hidePopup, 700)
}

function hidePopup() {
    leafPopup.style.display = 'none'
}


function matchHandler(e){
    if (e.target.className === 'card-down' || e.target.parentElement.className === 'card-down'){
        if (clicks !== 2){
            clicks ++
        } else {
            clicks = 1
        }
        moves += .5
        points -= .5
    }
}

function cardBehavior(e){
    if (e.target.className === 'card-down' || e.target.parentElement.className === 'card-down'){
        const cardPic = e.target.parentElement
        const card = e.target
        switch (clicks) {
        case 1:
            if (e.target.className === 'card-down'){
                flipCard180(card)
            }
            else{
                flipCard180(cardPic)
            }
            setTimeout( () => {
            if (cardPic.className === 'card-down'){
                cardPic.style.display = 'none'
            } else {
                card.style.display = 'none'
            }
            if (card.nextElementSibling === null){
                cardPic.nextElementSibling.style.animationName = 'none'
                cardPic.nextElementSibling.style.display = ''
                cardPic.nextElementSibling.style.backgroundColor = 'white'
            } else {
                card.nextElementSibling.style.animationName = 'none'
                card.nextElementSibling.style.display = ''
                card.nextElementSibling.style.backgroundColor = 'white'
            }
            if (card.nextElementSibling === null){
                card1Id = cardPic.nextElementSibling.dataset.matchId
            } else {
                card1Id = card.nextElementSibling.dataset.matchId
            }
        },100)
            break;
        case 2:
            if (e.target.className === 'card-down'){
                flipCard180(card)
            }
            else {
                flipCard180(cardPic)
            }
            setTimeout( () => {
            if (cardPic.className === 'card-down'){
                cardPic.style.display = 'none'
            } else {
                card.style.display = 'none'
            }
            if (card.nextElementSibling === null){
                cardPic.nextElementSibling.style.animationName = 'none'
                cardPic.nextElementSibling.style.display = ''
                cardPic.nextElementSibling.style.backgroundColor = 'white'
            } else {
                card.nextElementSibling.style.animationName = 'none'
                card.nextElementSibling.style.display = ''
                card.nextElementSibling.style.backgroundColor = 'white'
            }
            if (card.nextElementSibling === null){
                card2Id = cardPic.nextElementSibling.dataset.matchId
            } else {
                card2Id = card.nextElementSibling.dataset.matchId
            }
            if (card1Id === card2Id){
                matchedCards(card1Id)
                renderPopup()
            } else {
                    setTimeout( () => {
                        unmatchedCards()
                },500)
            }
        },100)
        break;
    }
}
}

function grabAllCards(){
    const allCards1 = document.getElementsByClassName('card1')
    const allCards2 = document.getElementsByClassName('card2')
    let allCardsArr1 = Array.from(allCards1)
    let allCardsArr2 = Array.from(allCards2)
    let allCardsArr = allCardsArr1.concat(allCardsArr2)
    return allCardsArr
}

function matchedCards(card1Id){
    let allCardsArr = grabAllCards()
    let matchedCards = allCardsArr.filter(card => card.dataset.matchId === card1Id)
    matchedCards.forEach(card => {
        card.style.animationName = 'jello-horizontal'
        card.style.animationDuration = '.5s'
        card.style.backgroundColor = card.dataset.color
        card.dataset.matched = 'true'
    })
    cardCounter()
}

function unmatchedCards(){
    const allCards1 = document.getElementsByClassName('card1')
    const allCards2 = document.getElementsByClassName('card2')
    let allCardsArr1 = Array.from(allCards1)
    let allCardsArr2 = Array.from(allCards2)
    let matchedCards1 = allCardsArr1.filter(card => card.style.display === '' && card.dataset.matched === 'false')
    let matchedCards2 = allCardsArr2.filter(card => card.style.display === '' && card.dataset.matched === 'false')
    let matchedCards = matchedCards1.concat(matchedCards2)
        matchedCards.forEach(card => {
            card.style.transform += 'rotateX(0) rotateY(360deg)'
            setTimeout( () => {
                card.style.display = "none"
                card.previousElementSibling.style.animationName = 'shake-horizontal'
                card.previousElementSibling.style.display = ''
                card.style.pointerEvents = 'auto'
            },100)
        })
}

function cardCounter(){
    let allCardsArr = grabAllCards()
    let matchedCards = allCardsArr.filter(card => card.dataset.matched === 'true')
    if (matchedCards.length === 18){
        if (points < 0){
            points = 1
        }
        gameCompleted(allCardsArr)
    }
}


function gameCompleted(array){
    let game = JSON.parse(array[0].dataset.gameId)
    game['points'] = points
    game['completed'] = true

    let reqObj = {
        method: "PATCH",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(game)
    }

    fetch(`http://localhost:3000/games/${game['id']}`, reqObj)
    .then(resp => resp.json())
    .then(game => {
        return renderCompletedGame(game)
    })
}

function renderCompletedGame(game) {
    completedGamePopup.style.visibility = 'visible'
    completedGamePopup.style.animationName = 'slide-in-elliptic-top-fwd'
    completedGamePopup.innerHTML = `
    <h1 id='winning-header'>YOU WON!</h1>
    <div class='inside-completed'>
        <div id='points'>
        <div id='points-header'>POINTS</div>
        <div id='points-number'>${game.points}</div>
        </div>
        <div id='moves'>
        <div id='moves-header'>MOVES</div>
        <div id='moves-number'>${moves}</div>
        </div>
        <div id='new-game-winner'>NEW GAME</div>
        <div id='load-completed-games'>High Score</div>
    </div>
    `
    setTimeout(colorChange, 200)
    let highScoreBtn = document.getElementById('load-completed-games')
    highScoreBtn.addEventListener('click', getHighScores)
    const newGameButton = document.getElementById('new-game-winner')
    newGameButton.addEventListener('click', loadNewGame)
}

function getHighScores(){
    fetch('http://localhost:3000/games/highscore')
    .then(resp => resp.json())
    .then(user => {
        completedGamePopup.innerHTML = `
    <h1 id='winning-header'>${user['user']} holds the highest score!</h1>
    <div class='inside-completed'>
        <div id='points'>
        <div id='points-header'>POINTS</div>
        <div id='points-number'>${user['game']}</div>
        </div>
        <div id='new-game-winner'>NEW GAME</div>
    </div>
    `
    const newGameButton = document.getElementById('new-game-winner')
    newGameButton.addEventListener('click', loadNewGame)
    })
}


function colorChange() {
    completedGamePopup.style.animationName = 'color-change-5x'
    completedGamePopup.style.animationDuration = '8s'
    completedGamePopup.style.animationIterationCount = 'infinite'
}

function shuffleCards(){
    renderPopup()
    let allCards = grabAllCards()
    let shuffledCards = shuffle(allCards)
    let pairDivs = Array.from(cardGameCont.children)
    let i = 0
    pairDivs.forEach(div => {
        div.children[1].outerHTML = shuffledCards[i].outerHTML
        i++
        div.children[3].outerHTML = shuffledCards[i].outerHTML
        i++
    })
    toggleCardsDown()
}

// Fisher-Yates shuffle (thank you Mike Bostock)
function shuffle(array) {
    let m = array.length, t, i;

    while (m) {
  
      i = Math.floor(Math.random() * m--);
  
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}


function flipCard(card) {
    card.style.transform += 'rotateX(0) rotateY(360deg)'
    card.style.transitionDuration = "300ms"
}
function flipCard180(card) {
    card.style.transform = 'rotateX(0) rotateY(180deg)'
    card.style.transitionDuration = "300ms"
}


const hintBtn = document.getElementById('hint-button')
hintBtn.addEventListener('click', giveHint)

function giveHint(){
    points -= 1
    flipBlankCards()
    setTimeout(toggleCardsUpWhite,100)
    setTimeout( () => {
        let allCards = grabAllCards()
        allCards.forEach(card => {
            if(card.dataset.matched === 'false'){
                flipCard(card)
                setTimeout(() => {
                    // card.style.animationName = 'none'
                    card.style.display = "none"
                    card.previousElementSibling.style.display = ''
                    card.style.pointerEvents = 'auto'
                },200)
            }
        })
    },1000)
}

function flipBlankCards(){
    let allBlankCards = document.getElementsByClassName('card-down')
    let allBlankCardsArr = Array.from(allBlankCards)
    allBlankCardsArr.forEach(card => {
        card.style.animationName = 'none'
        card.style.transform += `rotateX(0) rotateY(360deg)`
        card.style.transitionDuration = "300ms"
        setTimeout( () => {
            card.style.transform = `rotateX(0) rotateY(0deg)`
        },100)
    })
}

function toggleCardsUpWhite() {
    [...cards1].forEach(card => {
        card.style.display = ''
        if(card.dataset.matched === 'false'){
            card.style.animationName = 'none'
        card.style.backgroundColor = 'white'
        }
    });
    [...cards2].forEach(card => {
        card.style.display = ''
        if(card.dataset.matched === 'false'){
            card.style.animationName = 'none'
        card.style.backgroundColor = 'white'
        }
    });
    [...cardsDown].forEach(card => {
        card.style.display = 'none'
    })
}

