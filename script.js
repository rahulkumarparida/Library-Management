
let Logdata = JSON.parse(localStorage.getItem("LoggedData"))
let LogBoolean = Logdata?Logdata.TorF:false;
let Container = document.getElementById("Container")
console.log(LogBoolean);    
let PFP = document.getElementById("log_signUp") 


// Log out Function
function Logout() {
   let Logdata = JSON.parse(localStorage.getItem("LoggedData"))
     Logdata.TorF = false
     console.log(Logdata.TorF , " the given value ");
     localStorage.setItem("LoggedData" , JSON.parse(Logdata.TorF))
        
}

async function BooksName(name){
    let API =await fetch(`https://openlibrary.org/search.json?q=${name}`)
    let books =await API.json()
    return books
}
// let a = 0
// function count(){
//  let b= a+1
//  a = b 
//  console.log(b);
//  return b
// }

//! create a called Function conatineing counter  for number of times function called and thus pushing it to array


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
    
    function addBooks(bookdata , key) {
        let LoggBdata = JSON.parse(localStorage.getItem("LoggedData"))
        
       if (!LoggBdata.books) {
        LoggBdata.books = []
        // let bookKEY = `book${key}`

        let BOOK = bookdata
        LoggBdata.books.push(BOOK)
        localStorage.setItem("LoggedData" , JSON.stringify(LoggBdata) )
    
       } else {
         let bookKEY = `book${key}`

        let BOOK = {key :bookKEY , BookData : bookdata}
        LoggBdata.books.push(BOOK)
        localStorage.setItem("LoggedData" , JSON.stringify(LoggBdata) )
    
        console.log(LoggBdata , " inside addBOOK " , LoggBdata.books , " from the button");
       }
            
    }
    addBooks(text , idx+1)
   
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
            // console.log(result.docs);
            // let resultDocs = result.docs
           
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
    PFP.style.display = "block"
    PFP.innerHTML = `<button style="margin-top:15px ;" onclick="Logout()">LOG-OUT</button>`
   

   

} else {
    Container.innerHTML = `<h1>Welcome to my Library!</h1>`
}

