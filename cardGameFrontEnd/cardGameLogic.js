let clicks = 0
let card1Id = '6'
let card2Id = '9'
let card1Color = ""
let card2Color = ""
cardGameCont.addEventListener('click', logicHandler)
cardGameCont.addEventListener('click', eventHandler)




function logicHandler(e){
    if (e && clicks !== 2){
        clicks ++ 
    } else {
        clicks = 0
    }
}

function eventHandler(e){
    if (e.target.parentElement.className === 'card1' || 'card2'){
    switch (clicks) {
        case 1:
        card1Color = e.target.parentElement.style.backgroundColor = 'red'
        card1Id = e.target.parentElement.dataset.matchId
        break;
        case 2:
        card2Color = e.target.parentElement.style.backgroundColor = 'red' 
        card2Id = e.target.parentElement.dataset.matchId
        setTimeout( ()=> {
            if (card1Id === card2Id){
                alert('you did it!')
                card1Color = 'green'
                debugger
                card2Color = 'green'
            } else {
                alert('boo hoo you suck')
                // e.target.parentElement.style.backgroundColor = ''
            }
        }, 1000)
        break;
    }
}
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