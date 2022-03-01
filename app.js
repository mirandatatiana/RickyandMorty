
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
// nunca usas esta variable
const formSection = document.querySelector(".form-section")
// nunca usas esta variable. Deberia ser closeButton, en camelCase
const closebutton = document.querySelector(".close")
const container = document.querySelector(".container-details")
const targetSection = document.querySelector(".section-cards")
const targetDetails = document.querySelector(".section-details")
const characterButton = document.querySelector(".nav-button")
// nunca usas esta variable
const sectionCards = document.querySelector("#cards")



// Home Page
let actualPage = 1
const searchInfo = () => {
    // Este buscador no funciona bien en combinación con la busquda y la paginación. 
    // Cuando busco "rick" y aprieto la pagina 2, no veo la pagina 2 de rick, sino 
    // la pagina 2 de todos los personajes. 
    // No necesitas tantos fetch sino uno solo que pueda seguir todas las variables. 
    // Por ejemplo, asi:
    // const name = inputCharacter.value 
    // fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}&name=${name}`)
    // Y podes eliminar la funcion searchInfoCharacter

    fetch(`https://rickandmortyapi.com/api/character?page=${actualPage}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            cardsAllHTML(data.results)

            characterOnly()

        })
}

// Las variables que se ejecutan apenas carga el codigo deben ir todas juntas al final, 
// para que el flujo de ejecucion sea mas claro
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
    // No dejes console log en una entrega
    console.log("hola")
    searchInfo(actualPage)

}



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
// estos saltos de linea al azar que dejas confunden mucho la lectura, 
// no agregues seis o siete enter a menos que tenga un proposito. 





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
// Todas las variables del dom deben ir agrupadas arriba
const form = document.querySelector("#form")
const inputCharacter = document.querySelector("#character")

form.onsubmit = (e) => {
    e.preventDefault();
    searchInfoCharacter(inputCharacter.value)
}




// Fetch ID

const infoIdCharacter = (id) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(data => {

            view(data)



        })
}

const view = (data) => {

    targetDetails.style.display = "flex"
    container.style.display = "flex"


// Muy desprolijo el tabulado
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
// closeButton, en camelCase
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

