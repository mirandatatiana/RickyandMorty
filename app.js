const tarjetas = document.querySelector("#cards")
const busqueda = document.querySelector("#search")
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const formSection = document.querySelector(".form-section")


const targetSection = document.querySelector("#section-cards")
const targetDetails = document.querySelector("#section-details")

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

const cardsAllHTML = (data) => {
    const html = data.reduce((acc, curr) => {
        return acc + `
          <div class="card" data-id="${curr.id}">
           <h2>${curr.name}</h2>
            <img class="img" src =${curr.image}> </img>
           <p>${curr.gender}</p>
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
           <p>${curr.gender}</p>
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
    targetSection.style.display = "none"
    targetDetails.style.display = "flex"
    formSection.style.display = "none"



    targetDetails.innerHTML = `
   
          <div class="cardFull">
 <img class="img" src =${data.image}> </img>
 <div>
           <span>${data.name}<span>
</div>
  <div>         
           <span>${data.gender}</span>
       </div>
           </div>    
           `
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


