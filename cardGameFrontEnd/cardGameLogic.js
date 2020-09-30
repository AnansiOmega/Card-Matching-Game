let clicks = 0
let card1Id = '6'
let card2Id = '9'
let hiddenCard1 = 'block'
let hiddenCard2 = 'block'

let matched = false

cardGameCont.addEventListener('click', logicHandler)
cardGameCont.addEventListener('click', cardBehavior)

function logicHandler(e){
    if (e.target.parentElement.className === 'card1' || e.target.parentElement.className === 'card2'){
        if (e && clicks !== 2){
            clicks ++
        } else {
            clicks = 1
            matched = false
        }
    }
}

function cardBehavior(e){
    if (e.target.parentElement.className === 'card1' || e.target.parentElement.className === 'card2'){
    switch (clicks) {
        case 1:
        hiddenCard1 = e.target.parentElement.style.backgroundColor = 'red'
        e.target.parentElement.style.pointerEvents = 'none'
        card1Id = e.target.parentElement.dataset.matchId
        break;
        case 2:
        hiddenCard2 = e.target.parentElement.style.backgroundColor = 'red'
        e.target.parentElement.style.pointerEvents = 'none'
        card2Id = e.target.parentElement.dataset.matchId
            if (card1Id === card2Id){
                matchedCards(card1Id)
            } else {
                unmatchedCards(card1Id, card2Id)
            }
        break;
    }
}
}

function matchedCards(card1Id){
    const allCards1 = document.getElementsByClassName('card1')
    const allCards2 = document.getElementsByClassName('card2')
    let allCardsArr1 = Array.from(allCards1)
    let allCardsArr2 = Array.from(allCards2)
    let allCardsArr = allCardsArr1.concat(allCardsArr2)
    let matchedCards = allCardsArr.filter(card => card.dataset.matchId === card1Id)
    matchedCards.forEach(card => {
        card.style.pointerEvents = 'none'
        card.style.backgroundColor = 'green'
    })
}

function unmatchedCards(card1Id, card2Id){
    const allCards1 = document.getElementsByClassName('card1')
    const allCards2 = document.getElementsByClassName('card2')
    let allCardsArr1 = Array.from(allCards1)
    let allCardsArr2 = Array.from(allCards2)
    let matchedCards1 = allCardsArr1.filter(card => card.dataset.matchId === card1Id)
    let matchedCards2 = allCardsArr2.filter(card => card.dataset.matchId === card2Id)
    let matchedCards = matchedCards1.concat(matchedCards2)
    // debugger
    matchedCards.forEach(card => {
        card.style.pointerEvents = 'auto'
        card.style.backgroundColor = ''})
}



// function eventHandler(e){
//     if (e.target.parentElement.className === 'card1'){
//         let card1Id = selectedEnglishCard(e)
//         let card2Id = selectedSpanishCard(e)
//         if(card1Id === card2Id){
//             e.target.parentElement.style.backgroundColor = 'green' 
//         }
        
//     } else if (e.target.parentElement.className === 'card2'){
//         let card2Id = selectedSpanishCard(e)
//         let card1Id = selectedEnglishCard(e)
//         if(card2Id === card1Id){
//             e.target.parentElement.style.backgroundColor = 'green' 
//         }
//     }
// }


// function selectedEnglishCard(e){
//     e.target.parentElement.style.backgroundColor = 'red'   
//     let cardId = e.target.parentElement.dataset.matchId
//     return cardId
// }

// function selectedSpanishCard(e){
//     e.target.parentElement.style.backgroundColor = 'red'   
//     let cardId = e.target.parentElement.dataset.matchId
//     return cardId

// }