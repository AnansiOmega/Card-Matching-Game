const cardGameCont = document.getElementById('card-game-container')
const cards1 = document.getElementsByClassName('card1')
const cards2 = document.getElementsByClassName('card2')
const cardsDown = document.getElementsByClassName('card-down')
const pair1 = document.querySelector('#pair-1')
const pair2 = document.querySelector('#pair-2')
const pair3 = document.querySelector('#pair-3')
const pair4 = document.querySelector('#pair-4')
const pair5 = document.querySelector('#pair-5')
const pair6 = document.querySelector('#pair-6')
const pair7 = document.querySelector('#pair-7')
const pair8 = document.querySelector('#pair-8')


// pair1.addEventListener('click', toggleCardsDown)



function main(){
    loadNewGame()
}



function loadNewGame(){
    fetch('http://localhost:3000/games/new')
    .then(resp => resp.json())
    .then(newGame => renderNewGame(newGame))
}

function renderNewGame(newGame){
    placeCards(newGame)
    // toggleCardsDown()
    toggleCardsUp()
}

function placeCards(newGame) {
    const match1 = newGame[0].match
    const match2 = newGame[1].match
    const match3 = newGame[2].match
    const match4 = newGame[3].match
    const match5 = newGame[4].match
    const match6 = newGame[5].match
    const match7 = newGame[6].match
    const match8 = newGame[7].match
    // const pairs = [
    //     {pair: pair1, match: match1},
    //     {pair: pair1, match: match1},
    //     {pair: pair1, match: match1},
    //     {pair: pair1, match: match1}
    // ]......

    //     pairs.forEach(pairObj => {
    //         pairObj.pair.innerHTML += 
    //         `<div class='card-down cd'>${renderMintLeaf()}</div>
    //         <div data-match-id=${match1.id} data-matched=false class='card1'><h4>${match1.english_word}</h4></div>
    
    //         <div class='card-down cd'>${renderMintLeaf()}</div>
    //         <div data-match-id=${match1.id} data-matched=false class='card2'><h4>${match1.spanish_word}</h4></div>
    //         `
    //     })
    return (
        pair1.innerHTML = `

        <div class="card-down">${renderMintLeaf()}</div>
        <div data-color='#eeddff' data-match-id=${match1.id} data-matched=false class='card1'><h4>${match1.english_word}</h4></div>

        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#eeddff' data-match-id=${match1.id} data-matched=false class='card2'><h4>${match1.spanish_word}</h4></div>
        `,
        pair2.innerHTML = `
        <div  class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#ffd6f3' data-match-id=${match2.id} data-matched=false class='card1'><h4>${match2.english_word}</h4></div>
        
        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#ffd6f3' data-match-id=${match2.id} data-matched=false class='card2'><h4>${match2.spanish_word}</h4></div>
        `,
        pair3.innerHTML = `
        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#c0ffee' data-match-id=${match3.id} data-matched=false class='card1'><h4>${match3.english_word}</h4></div>
        
        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#c0ffee' data-match-id=${match3.id} data-matched=false class='card2'><h4>${match3.spanish_word}</h4></div>
        `,
        pair4.innerHTML = `
        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#bdf2ff' data-match-id=${match4.id} data-matched=false class='card1'><h4>${match4.english_word}</h4></div>
        
        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#bdf2ff' data-match-id=${match4.id} data-matched=false class='card2'><h4>${match4.spanish_word}</h4></div>
        `,
        pair5.innerHTML = `
        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#f7f5bf' data-match-id=${match5.id} data-matched=false class='card1'><h4>${match5.english_word}</h4></div>
        
        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#f7f5bf' data-match-id=${match5.id} data-matched=false class='card2'><h4>${match5.spanish_word}</h4></div>
        `,
        pair6.innerHTML = `
        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#fadbc4' data-match-id=${match6.id} data-matched=false class='card1'><h4>${match6.english_word}</h4></div>
        
        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#fadbc4' data-match-id=${match6.id} data-matched=false class='card2'><h4>${match6.spanish_word}</h4></div>
        `,
        pair7.innerHTML = `
        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#eeddff' data-match-id=${match7.id} data-matched=false class='card1'><h4>${match7.english_word}</h4></div>
        
        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#eeddff' data-match-id=${match7.id} data-matched=false class='card2'><h4>${match7.spanish_word}</h4></div>
        `,
        pair8.innerHTML = `
        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#ffd6f3' data-match-id=${match8.id} data-matched=false class='card1'><h4>${match8.english_word}</h4></div>
        
        <div class='card-down'>${renderMintLeaf()}</div>
        <div data-color='#ffd6f3' data-match-id=${match8.id} data-matched=false class='card2'><h4>${match8.spanish_word}</h4></div>
        `
    )
}

function gameType(type) {
    if (type = 'englishspanish') {
        englishSpanishGame(type)
    }

}

function toggleCardsUp() {
    [...cards1].forEach(card => {
        card.style.display = '';
    });
    [...cards2].forEach(card => {
        card.style.display = '';
    });
    [...cardsDown].forEach(card => {
        card.style.display = 'none';
    })
}

function toggleCardsDown() {
    [...cards1].forEach(card => {
        card.style.display = 'none';
    });
    [...cards2].forEach(card => {
        card.style.display = 'none';
    });
    [...cardsDown].forEach(card => {
        card.style.display = '';
    })
}

function renderMintLeaf() {
 return `
 <img id='mint-leaf' src="/Users/anansi/Development/code/Mod3DickingAround/cardGame/cardGameBackEnd/app/assets/images/mintleaf.png">
 `
}


main()