//Have a player ship
let playerShip = {hull: 20 , firepower: 5, accuracy: 0.5}

//Have more than one alien ships
let alienShips = []

//Create alien ships with randomized property values

class AlienShip {
    constructor(hitPoints, damage, hitRate) {
        this.hull = hitPoints
        this.firepower = damage
        this.accuracy = hitRate
    }
}


function randomInRange (minNum, maxNum){
    if(minNum >= 1){
        return Math.floor(Math.random() * (maxNum - minNum) + minNum)
    } else {
        return Math.random() * (maxNum - minNum) + minNum
    }
}

function createAliens (){
    let numOfShips = (randomInRange(5,10))
    for(let i = 0; i < numOfShips; i++){
        alienShips.push(new AlienShip(randomInRange(3,6), randomInRange(2,4), randomInRange(.6,.8)))
    }
}

function playGame(){
    let retreat = false
    let alienIndex = 0
    createAliens()
    console.log(alienShips)
    while(playerShip.hull > 0 && alienIndex < alienShips.length && !retreat){
        //Player attacks alien
        if (Math.random() < playerShip.accuracy){
            alienShips[alienIndex].hull =  alienShips[alienIndex].hull - playerShip.firepower
            alert(`Alien ship was hit for ${playerShip.firepower} damage! It now has ${alienShips[alienIndex].hull} health remaining`)
        } else {
            alert(`You missed the alien ship! It still has ${alienShips[alienIndex].hull} health remaining`)
        }
        //If alien survives, alien attacks player
        if(alienShips[alienIndex].hull <= 0){
            alienIndex++
            alert(`Alien number ${alienIndex} destroyed! ${alienShips.length - alienIndex} ships remain`)
            //If alien is destroyed, have the option to retreat or fight the next ship
            if (alienIndex < alienShips.length){
                let playerResponse = prompt('Do you want to retreat? (Yes or No)')
                retreat = (playerResponse.toLowerCase() == 'yes')
            }
        } else {
            if (Math.random() < alienShips[alienIndex].accuracy){
                playerShip.hull = playerShip.hull - alienShips[alienIndex].firepower
                alert(`Your ship was hit for ${alienShips[alienIndex].firepower} damage! It now has ${playerShip.hull} health remaining`)
            } else {
                alert(`The alien's shot missed! You still have ${playerShip.hull} health remaining!`)
            }
        }
        //If retreat, game ends
    }
    if (retreat){
        alert(`You destroyed ${alienIndex} ships, leaving ${alienShips.length - alienIndex} remaining while you retreated`)
    } else if (playerShip.hull == 0){
        //You lose lose if your ship is destroyed
        alert('Your ship was destroyed! You lose!')
    } else {
        //You win if you destroy all aliens
        alert('All aliens were destroyed, you win!')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    playGame()
})
    


