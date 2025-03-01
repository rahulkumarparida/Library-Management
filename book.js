


let HorrorGenre = document.getElementById("Cardhrrr")
let ThrillerGenre = document.getElementById("Cardthr")
let RomanceGenre = document.getElementById("Cardslov")
let AdventureGenre = document.getElementById("CardsAdv")

function CardUI(Book , Author) {
    // Create main card container
    const card = document.createElement("div");
    card.classList.add("card");

    // Create title
    const title = document.createElement("p");
    title.classList.add("card-title");
    title.textContent = Book;

    // Create description
    const desc = document.createElement("p");
    desc.classList.add("small-desc");
    desc.textContent = `Authors: ${Author}`;

    // Create go-corner div
    const goCorner = document.createElement("div");
    goCorner.classList.add("go-corner");

    // Create go-arrow div inside go-corner
    const goArrow = document.createElement("div");
    goArrow.classList.add("go-arrow");
    goArrow.textContent = "°";
    goCorner.appendChild(goArrow);

    // Create button container
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn");

    // Create button
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "ADD";
    btnContainer.appendChild(button);
    button.classList.add("book_btn");
    // Append all elements to card
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(goCorner);
    card.appendChild(btnContainer);
    console.log(card);
 
    return card;
}

// HorrorGenre.appendChild(CardUI())

async function cardData(bname) {
    let API =await fetch(`https://openlibrary.org/search.json?q=${bname}`)
    let FetchedData = await API.json()
return FetchedData
}
let NumOfBooks = 6

//! 1st
cardData("horror").then((result) => {
    console.log(result.docs , " Docs");
    return result.docs
}).then((res) => {
    for (let i = 0; i < NumOfBooks; i++) {
        console.log(res[i].title , res[i].author_name);
        HorrorGenre.appendChild(CardUI(res[i].title , res[i].author_name))
    }
    return res
}).catch((err) => {
    console.log("ERROR: " , err);
    return err
});


//! 2nd
cardData("thriller").then((result) => {
    console.log(result.docs , " Docs");
    return result.docs
}).then((res) => {
    for (let i = 0; i < NumOfBooks; i++) {
        console.log(res[i].title , res[i].author_name);
        ThrillerGenre.appendChild(CardUI(res[i].title , res[i].author_name))
    }
    return res
}).catch((err) => {
    console.log("ERROR: " , err);
    return err
});
//! 3rd
cardData("Love").then((result) => {
    console.log(result.docs , " Docs");
    return result.docs
}).then((res) => {
    for (let i = 0; i < NumOfBooks; i++) {
        console.log(res[i].title , res[i].author_name);
        RomanceGenre.appendChild(CardUI(res[i].title , res[i].author_name))
    }
    return res
}).catch((err) => {
    console.log("ERROR: " , err);
    return err
});

//! 4th
cardData("adventure").then((result) => {
    console.log(result.docs , " Docs");
    return result.docs
}).then((res) => {
    for (let i = 0; i < NumOfBooks; i++) {
        console.log(res[i].title , res[i].author_name);
        AdventureGenre.appendChild(CardUI(res[i].title , res[i].author_name))
    }
    return res
}).catch((err) => {
    console.log("ERROR: " , err);
    return err
});