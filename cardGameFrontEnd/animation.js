function animations() {

    //invoked
    animateCards()

    //animation.functions
    function animateCards() {
        [...cards1].forEach(card => {
            // animateCard(card)
            flipCard(card)
        });
        [...cards2].forEach(card => {
            // animateCard(card)
            flipCard(card)
        });
        [...cardsDown].forEach(card => {
            animateCard(card)
            // flipCard(card)
        })
    }

    function animateCard(card) {
        const height = card.clientHeight
        const width = card.clientWidth

        
        card.addEventListener('mousemove', handleMove)

        function handleMove(e) {
       
        const xVal = e.layerX
        const yVal = e.layerY
        const yRotation = 20 * ((xVal - width / 2) / width)
        const xRotation = -20 * ((yVal - height / 2) / height)
        const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
        card.style.transform = string
        }

        card.addEventListener('mouseout', function() {
        card.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
        })

        card.addEventListener('mousedown', function() {
        card.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
        })

        card.addEventListener('mouseup', function() {
        card.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
        })
    }

    function flipCard(card) {
        card.addEventListener('click', function() {
            card.style.transform = 'rotateX(0) rotateY(180deg)'
        })
    }
}