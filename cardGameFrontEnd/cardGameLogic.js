const shuffleBtn = document.getElementById('shuffle-btn')
let clicks = 0
let moves = 0
let card1Id = ''
let card2Id = ''
let points = 25

cardGameCont.addEventListener('click', matchHandler)
cardGameCont.addEventListener('click', cardBehavior)
cardGameCont.addEventListener('click', cardCounter)
shuffleBtn.addEventListener('click', shuffleCards)



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
    switch (clicks) {
        
        case 1:
            if (e.target.parentElement.className === 'card-down'){
                e.target.parentElement.style.display = 'none'
            } else {
                e.target.style.display = 'none'
            }
            if (e.target.nextElementSibling === null){
                e.target.parentElement.nextElementSibling.style.display = ''
                e.target.parentElement.nextElementSibling.style.backgroundColor = 'white'
            } else {
                e.target.nextElementSibling.style.display = ''
                e.target.nextElementSibling.style.backgroundColor = 'white'
            }
            if (e.target.nextElementSibling === null){
                card1Id = e.target.parentElement.nextElementSibling.dataset.matchId
            } else {
                card1Id = e.target.nextElementSibling.dataset.matchId
            }
        break;
        case 2:
            if (e.target.parentElement.className === 'card-down'){
                e.target.parentElement.style.display = 'none'
            } else {
                e.target.style.display = 'none'
            }
            if (e.target.nextElementSibling === null){
                e.target.parentElement.nextElementSibling.style.display = ''
                e.target.parentElement.nextElementSibling.style.backgroundColor = 'white'
            } else {
                e.target.nextElementSibling.style.display = ''
                e.target.nextElementSibling.style.backgroundColor = 'white'
            }
            if (e.target.nextElementSibling === null){
                card2Id = e.target.parentElement.nextElementSibling.dataset.matchId
            } else {
                card2Id = e.target.nextElementSibling.dataset.matchId
            }
            setTimeout(() => {
                if (card1Id === card2Id){
                    matchedCards(card1Id)
                } else {
                    unmatchedCards()
                }
            },1000)
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
        card.style.display = "none"
        card.previousElementSibling.style.display = ''
        card.style.pointerEvents = 'auto'
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
    debugger
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
card.addEventListener('click', function() {
    card.style.transform = 'rotateX(0) rotateY(180deg)'
})
}
