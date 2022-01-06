const tarjetas = document.querySelector("#cards")
const busqueda = document.querySelector("#search")
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")

// Home Page
let actualPage = 1
const searchInfo = () => {
    fetch(`https://rickandmortyapi.com/api/character?page=${actualPage}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            cardsAll(data.results)
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

const cardsAll = (data) => {
    const html = data.reduce((acc, curr) => {
        return acc + `
          <div class="tarjeta">
           <h2>${curr.name}</h2>
            <img src =${curr.image}> </img>
           <p>${curr.gender}</p>
           </div>
           `
    }, "")
    cards.innerHTML = html

}


//Seach Caracter
const searchInfoCharacter = (name) => {
    fetch(`https://rickandmortyapi.com/api/character?name=${name}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            cardOnly(data.results)
        })
}


//Search Only one character
const cardOnly = (character) => {
    const html = character.reduce((acc, curr) => {
        return acc + `
          <div class="tarjeta">
           <h2>${curr.name}</h2>
            <img src =${curr.image}> </img>
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
//tengo que poner cada buscadaor en cada espacio de la pagina y ver como haria llegar al
// fetch("https://rickandmortyapi.com/api/character")
//     .then((res) => {
//         return res.json()
//     })
//     .then((data) => {
//         crearBusqueda(data.results)
//     })

// const crearBusqueda = (array) => {
//     const html = array.reduce((acc, curr) => {
//         return acc + `
//               <div class="tarjeta">
//                <h2>${curr.value}</h2>
//                 <img src =${curr.value}> </img>
//                <p>${curr.value}</p>
//                </div>
//                `
//     }, "")
//     search.innerHTML = html
// }

// cuando sea en la pagina se pondra el lugar de la pagina


//open web appi key AIzaSyD-mpKwV5ndjGtxw-UlGCsk9taN75izSZI

// fetch("https://rickandmortyapi.com/api/character")
//     .then(res => res.json())
//     .then(data => console.log(data))