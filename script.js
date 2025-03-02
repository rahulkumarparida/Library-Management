
let Logdata = JSON.parse(localStorage.getItem("LoggedData"))
let LogBoolean = Logdata?Logdata.TorF:false;
let Container = document.getElementById("Container")
console.log(LogBoolean);    
let PFP = document.getElementById("log_signUp") 
function Logout(e) {
    let Logdata = JSON.parse(localStorage.getItem("LoggedData"))
      Logdata.TorF = false
      console.log(Logdata.TorF , " the given value ");
      localStorage.setItem("LoggedData" , JSON.parse(Logdata.TorF))
         location.reload()
 }
import { addBooks } from "./book.js";
// Log out Function


async function BooksName(name){
    let API =await fetch(`https://openlibrary.org/search.json?q=${name}`)
    let books =await API.json()
    return books
}

let cardContainer = document.getElementById("cardContainer")

function CardsUI(book , author , idx) {

const card = document.createElement('div');
card.classList.add('card');

const cardDetails = document.createElement('div');
cardDetails.classList.add('card-details');

const bookTitle = document.createElement('p');
bookTitle.classList.add('text-title');
bookTitle.id = 'bookname';
bookTitle.textContent = book; 

const authorName = document.createElement('p');
authorName.classList.add('text-body');
authorName.id = 'AuthorName';
authorName.textContent = ` Author: ${author}`;

cardDetails.appendChild(bookTitle);
cardDetails.appendChild(authorName);

const addButton = document.createElement('button');
addButton.id = 'card_button';
addButton.textContent = 'ADD';

addButton.setAttribute("key" , idx) 

addButton.addEventListener("click" , (e)=>{
    console.log("button is clicked add");    
    let Cont_div = e.target.closest("div").textContent
    let text =Cont_div.slice(0,-3)
    
    console.log(text);
 
    addBooks(text)
   
     })



card.appendChild(cardDetails);
card.appendChild(addButton);

cardContainer.appendChild(card); 

    
}
let srch_bar = document.getElementById("src_input")
let search_btn = document.getElementById("search_BTN")

function srchValue() {
    let bookName = srch_bar.value.trim()
    cardContainer.innerHTML = ""
    return bookName    
}


let Name
if (LogBoolean == true) {
    search_btn.addEventListener("click" , ()=>{
        Name = srchValue()
        console.log(Name);
        srch_bar.value = ""
        BooksName(Name).then((result) => {
           return result.docs
          }).then((res)=>{
            console.log(res , " this is the res");
               res.forEach((element , index)=> {
                CardsUI(element.title,element.author_name  , index)
               })
          }).catch((err) => {
               console.log(err);
               return `ERROR : ${err}`      
          });
        
    })
  console.log("Done");
    document.getElementById("MainPage").style.display = "block"
    // PFP.style.display = "block"
    let Login_BTN = document.getElementById("login")
    let SignUp_BTN = document.getElementById("signUp")
    Login_BTN.style.display = "none"
    SignUp_BTN.style.display = "none"
    let button_after = document.createElement("button")
    button_after.innerText = "LOG-OUT"
    button_after.onclick =Logout;
    PFP.appendChild(button_after)
    
   

   

} else {
    Container.innerHTML = `<h1>Welcome to my Library!</h1>`
    window.location.replace("./SignUp.html");
}

