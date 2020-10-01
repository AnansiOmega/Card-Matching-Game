const shuffleBtn = document.getElementById('shuffle-btn')
const leafPopup = document.querySelector('.leaf-popup')

// document.addEventListener('click', renderPopup)

let clicks = 0
let moves = 0
let card1Id = ''
let card2Id = ''
let points = 25

cardGameCont.addEventListener('click', matchHandler)
cardGameCont.addEventListener('click', cardBehavior)
cardGameCont.addEventListener('click', cardCounter)
shuffleBtn.addEventListener('click', shuffleCards)

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
            matched = false
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
                flipCard(card)
            }
            else{
                flipCard(cardPic)
            }
            setTimeout( () => {
            if (cardPic.className === 'card-down'){
                cardPic.style.display = 'none'
            } else {
                card.style.display = 'none'
            }
            if (card.nextElementSibling === null){
                cardPic.nextElementSibling.style.display = ''
                cardPic.nextElementSibling.style.backgroundColor = 'white'
            } else {
                card.nextElementSibling.style.display = ''
                card.nextElementSibling.style.backgroundColor = 'white'
            }
            if (card.nextElementSibling === null){
                card1Id = cardPic.nextElementSibling.dataset.matchId
            } else {
                card1Id = card.nextElementSibling.dataset.matchId
            }
        },50)
            break;
        case 2:
            if (e.target.className === 'card-down'){
                flipCard(card)
            }
            else {
                flipCard(cardPic)
            }
            setTimeout( () => {
            if (cardPic.className === 'card-down'){
                cardPic.style.display = 'none'
            } else {
                card.style.display = 'none'
            }
            if (card.nextElementSibling === null){
                cardPic.nextElementSibling.style.display = ''
                cardPic.nextElementSibling.style.backgroundColor = 'white'
            } else {
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
        },50)
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
        card.style.backgroundColor = card.dataset.color
        card.dataset.matched = 'true'
    })
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
            card.style.transform = 'rotateX(0) rotateY(360deg)'
            setTimeout( () => {
                card.style.display = "none"
                card.previousElementSibling.style.display = ''
                card.style.pointerEvents = 'auto'
            },50)
        })
}

function cardCounter(){
    let allCardsArr = grabAllCards()
    let matchedCards = allCardsArr.filter(card => card.dataset.matched === 'true')
    if (matchedCards.length === 18){
        if (points < 0){
            points = 1
        }
        setTimeout( () => {
            alert(`You won the video game it only took you ${moves} moves you get ${points} points`)
        }, 500)
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
}

function shuffleCards(){
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
    var m = array.length, t, i;

    while (m) {
  
      i = Math.floor(Math.random() * m--);
  
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}


function flipCard(card) {
    card.style.transform = 'rotateX(0) rotateY(180deg)'
}

cardCounter()
