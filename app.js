
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const formSection = document.querySelector(".form-section")
const closebutton = document.querySelector(".close")
const container = document.querySelector(".container-details")
const targetSection = document.querySelector(".section-cards")
const targetDetails = document.querySelector(".section-details")
const characterButton = document.querySelector(".nav-button")
const sectionCards = document.querySelector("#cards")



// Home Page
let actualPage = 1
const searchInfo = () => {
    fetch(`https://rickandmortyapi.com/api/character?page=${actualPage}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            cardsAllHTML(data.results)

            characterOnly()

        })
}
searchInfo()




// Next Page
next.onclick = () => {
    actualPage = actualPage + 1
    searchInfo()
}
//Previuos Page
prev.onclick = () => {

    if (actualPage === 1) {
        prev.disabled = true
    }
    actualPage = actualPage - 1
    searchInfo()
}



//Character Button
characterButton.onclick = () => {
    console.log("hola")
    targetSection.style.display = "flex"
    sectionCards.style.display = "none"
    container.style.display = "flex"

}
//Location Button


//Function for all the cards

const cardsAllHTML = (data) => {
    const html = data.reduce((acc, curr) => {
        return acc + `
          <div class="card" data-id="${curr.id}">
           <h2>${curr.name}</h2>
            <img class="img" src =${curr.image}> </img>
           
           </div>
           `
    }, "")
    cards.innerHTML = html


}
searchInfo()






//Seach Caracter
const searchInfoCharacter = (name) => {
    fetch(`https://rickandmortyapi.com/api/character?name=${name}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            cardOnly(data.results)
            characterOnly()


        })
}


//Search Only one character
const cardOnly = (character) => {
    const html = character.reduce((acc, curr) => {
        return acc + `
          <div class="card" data-id="${curr.id}">
           <h2>${curr.name}</h2>
            <img class="img" src =${curr.image}> </img>
           </div>       
           `
    }, "")
    cards.innerHTML = html


}


//Form for searcg=h characters
const form = document.querySelector("#form")
const inputCharacter = document.querySelector("#character")

form.onsubmit = (e) => {
    e.preventDefault();
    searchInfoCharacter(inputCharacter.value)
}






const infoIdCharacter = (id) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            view(data)



        })
}

const view = (data) => {

    targetDetails.style.display = "flex"
    container.style.display = "flex"



    targetDetails.innerHTML =
        `
          <div class="card-details">
          <button class="close">✖</button>
          
 <img class="img" src = "${data.image}"> </img>
 <div class="card-details-info">
 
           <h2>${data.name} </h2>
           <h3><b>Status: </b>${data.status} - ${data.species} - ${data.gender}</h3>          
 
         <div>
<h3>Firts Seen in:</h3>
<p> ${data.origin.name}</p>
</div>

<div>
<h3>Last Location in:</h3>
<p> ${data.location.name}</p>
</div>


</div>
           </div> `

    const closebutton = document.querySelector(".close")
    closebutton.onclick = () => {

        targetSection.style.display = "flex"
        container.style.display = "none"
    }

}





const characterOnly = () => {
    const cardOnly = document.querySelectorAll(".card")
    for (let i = 0; i < cardOnly.length; i++) {
        cardOnly[i].onclick = () => {

            const id = cardOnly[i].dataset.id
            infoIdCharacter(id)




        }
    }
}


// const genderInfo = () => {
//     fetch(`https://rickandmortyapi.com/api/character?gender=${gender}`)
//         .then((res) => {
//             return res.json()
//         })
//         .then((data) => {
//             cardOnly(data.results)
//             characterOnly()


//         })
// }

// const select = document.querySelector("#gender")
// const option = document.querySelector(".option-gender")

// select.onchange = (e) => {
//     e.preventDefault();
//     genderInfo(option.value)
// }


// const genderOnly = () => {
//     const cardOnlyGender = document.querySelectorAll(".option-gender")
//     for (let i = 0; i < cardOnlyGender.length; i++) {
//         cardOnly[i].onchange = () => {

//             const id = cardOnlyGender[i].dataset.id
//             genderInfo(id)




//         }
//     }
// }


// const cardOnlyGender = (gender) => {
//     const html = gender.reduce((acc, curr) => {
//         return acc + `
//           <div class="card" data-id="${curr.id}">
//            <h2>${curr.name}</h2>
//             <img class="img" src =${curr.image}> </img>
//            </div>       
//            `
//     }, "")
//     cards.innerHTML = html


// }