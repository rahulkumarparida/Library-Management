let HorrorGenre = document.getElementById("Cardhrrr");
let ThrillerGenre = document.getElementById("Cardthr");
let RomanceGenre = document.getElementById("Cardslov");
let AdventureGenre = document.getElementById("CardsAdv");

export function addBooks(bookdata) {
  let accessData = JSON.parse(localStorage.getItem("LoggedData"));

  let login_VAL = accessData.TorF;
  if (login_VAL == true) {
    let username = accessData.LoginData.Name;
    let LoggBdata = JSON.parse(localStorage.getItem(`${username}data`));

    if (!LoggBdata.books) {
      LoggBdata.books = [];

      let BOOK = { BookData: bookdata };
      LoggBdata.books.push(BOOK);
      localStorage.setItem(`${username}data`, JSON.stringify(LoggBdata));
    } else {
      let BOOK = { BookData: bookdata };
      LoggBdata.books.push(BOOK);
      localStorage.setItem(`${username}data`, JSON.stringify(LoggBdata));

    }
  }
}
function CardUI(Book, Author) {
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
  desc.textContent = ` Authors: ${Author}`;

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

  button.addEventListener("click", (e) => {
    let btn_Node = e.target.parentNode;
    let mainNode = btn_Node.parentNode.textContent.slice(0, -4);
    let UserData = JSON.parse(localStorage.getItem("LoggedData"));
    let Uname = UserData.LoginData.name;
    addBooks(mainNode);
  });

  // Append all elements to card
  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(goCorner);
  card.appendChild(btnContainer);

  return card;
}

async function cardData(bname) {
  let API = await fetch(`https://openlibrary.org/search.json?q=${bname}`);
  let FetchedData = await API.json();
  return FetchedData;
}
let NumOfBooks = 6;

//! 1st  Horror Genre
cardData("horror")
  .then((result) => {
    return result.docs;
  })
  .then((res) => {
    for (let i = 0; i < NumOfBooks; i++) {
      HorrorGenre.appendChild(CardUI(res[i].title, res[i].author_name));
    }
    return res;
  })
  .catch((err) => {
    console.log("ERROR: ", err);
    return err;
  });
//! 2nd Thriller Genre
cardData("thriller")
  .then((result) => {
    return result.docs;
  })
  .then((res) => {
    for (let i = 0; i < NumOfBooks; i++) {
      ThrillerGenre.appendChild(CardUI(res[i].title, res[i].author_name));
    }
    return res;
  })
  .catch((err) => {
    console.log("ERROR: ", err);
    return err;
  });
//! 3rd Love Genre
cardData("Love")
  .then((result) => {
    return result.docs;
  })
  .then((res) => {
    for (let i = 0; i < NumOfBooks; i++) {
      RomanceGenre.appendChild(CardUI(res[i].title, res[i].author_name));
    }
    return res;
  })
  .catch((err) => {
    console.log("ERROR: ", err);
    return err;
  });

//! 4th Adventure Genre
cardData("adventure")
  .then((result) => {
    return result.docs;
  })
  .then((res) => {
    for (let i = 0; i < NumOfBooks; i++) {
      AdventureGenre.appendChild(CardUI(res[i].title, res[i].author_name));
    }
    return res;
  })
  .catch((err) => {
    console.log("ERROR: ", err);
    return err;
  });

let back = document.getElementById("Book_goback");
if (back) {
  back.addEventListener("click", (e) => {
    window.location.replace("./index.html");
    e.preventDefault();
  });
}
