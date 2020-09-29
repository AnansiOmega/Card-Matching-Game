let clicks = 0
let card1Id = '6'
let card2Id = '9'
let hiddenCard1 = 'block'
let hiddenCard2 = 'block'

let matched = false

cardGameCont.addEventListener('click', logicHandler)
cardGameCont.addEventListener('click', cardBehavior)




function logicHandler(e){
    if (e && clicks !== 2){
        clicks ++
    } else {
        clicks = 0
        matched = false
    }
}

function cardBehavior(e){
    if (e.target.parentElement.className === 'card1' || 'card2'){
    switch (clicks) {
        case 1:
        hiddenCard1 = e.target.parentElement.style.display = 'none'
        card1Id = e.target.parentElement.dataset.matchId
        break;
        case 2:
        hiddenCard2 = e.target.parentElement.style.display = 'none'
        card2Id = e.target.parentElement.dataset.matchId
        setTimeout( () => {
            if (card1Id === card2Id){
                alert('you did it!')
                matched = true
                matchedCards(card1Id)
            } else {
                alert('boo hoo you suck')
                unmatchedCards(card1Id, card2Id)
            }
        }, 1000)
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
    matchedCards.forEach(card => card.style.display = 'block')
}

function unmatchedCards(card1Id, card2Id){

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