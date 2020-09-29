function signupFormListener() {
    const form = document.querySelector('form')

    form.addEventListener('submit', function(e){
        e.preventDefault()
        
        const formInfo = {
        name: e.target[0].value
        }
         const resetBox = document.querySelector('.input-text')
        
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formInfo)
        }

        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => {
            users.forEach(user => {
                // get id
            form.reset()
            const container =  document.querySelector('#username-display')
            const userDisplay = `<p> Hello, ${user.username}</p>`
            // if current users display name
            //  display new user
            container.innerHTML = userDisplay
            })
            
        })
    
    })
            
    

}


const cardGameCont = document.getElementById('card-game-container')

function main(){
    signupFormListener()
    loadNewGame()
}


cardGameCont.addEventListener('click', eventHandler)

function eventHandler(e){
    if (e.target.parentElement.className === 'word'){
        
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