let Logdata = JSON.parse(localStorage.getItem("LoggedData"));
let LogBoolean = Logdata ? Logdata.TorF : false;
let Container = document.getElementById("Container");

let PFP = document.getElementById("log_signUp");
function Logout(e) {
  let Logdata = JSON.parse(localStorage.getItem("LoggedData"));
  Logdata.TorF = false;

  localStorage.setItem("LoggedData", JSON.parse(Logdata.TorF));
  location.reload();
}
import { addBooks } from "./book.js";
// Log out Function



async function BooksName(name) {
  let API = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}`)
  let data = await API.json();
  // console.log(data.items[0].volumeInfo.imageLinks.thumbnail);
  // console.log(data.items[0].volumeInfo.title);
  // console.log(data.items[0].volumeInfo.authors);
  return data;
}


let cardContainer = document.getElementById("cardContainer");

function CardsUI(book, author,image, idx) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardDetails = document.createElement("div");
  cardDetails.classList.add("card-details");
const BookImage = document.createElement('img')
BookImage.setAttribute('src' , image)
BookImage.classList.add("bookImages")


const InfoDIv = document.createElement("div");
  cardDetails.classList.add("InfoDiv");

  const bookTitle = document.createElement("p");
  bookTitle.classList.add("text-title");
  bookTitle.id = "bookname";
  bookTitle.textContent = book;


  const authorName = document.createElement("p");
  authorName.classList.add("text-body");
  authorName.id = "AuthorName";
  authorName.textContent = ` Author: ${author}`;
  InfoDIv.appendChild(bookTitle);
  InfoDIv.appendChild(authorName);

  cardDetails.appendChild(BookImage)
  cardDetails.appendChild(InfoDIv)
  cardDetails.classList.add('scale_animation')
  const addButton = document.createElement("button");
  addButton.id = "card_button";
  addButton.textContent = "ADD";

  addButton.setAttribute("key", idx);

  addButton.addEventListener("click", (e) => {
    let Cont_div = e.target.closest("div").textContent;
    let text = Cont_div.slice(0, -3);
   alert("Book Added Successfully");
    addBooks(text);
  });

  card.appendChild(cardDetails);
  card.appendChild(addButton);
  card.classList.add('upToDown_animation')
  cardContainer.appendChild(card);
}
let srch_bar = document.getElementById("src_input");
let search_btn = document.getElementById("search_BTN");

function srchValue() {
  let bookName = srch_bar.value.trim();
  cardContainer.innerHTML = "";

  return bookName;
}






let Name;
if (LogBoolean == true) {
  let Genre = "Romance"
  BooksName(Genre)
  .then((result) => {
    // console.log("results " ,result.items);
    
    return result.items;
  })
  .then((res) => {
    // console.log(res[0].volumeInfo.imageLinks.thumbnail);
    res.forEach((ele, index) => {
     
      
      CardsUI(res[index].volumeInfo.title, res[index].volumeInfo.authors, res[index].volumeInfo.imageLinks.thumbnail,index);
    });
  })
  .catch((err) => {
    console.log(err);
    return `ERROR : ${err}`;
  });

  search_btn.addEventListener("click", () => {
    Name = srchValue();

    srch_bar.value = "";
    BooksName(Name)
      .then((result) => {
        // console.log("results " ,result.items);
        
        return result.items;
      })
      .then((res) => {
        // console.log(res[0].volumeInfo.imageLinks.thumbnail);
        res.forEach((ele, index) => {
         
          
          CardsUI(res[index].volumeInfo.title, res[index].volumeInfo.authors, res[index].volumeInfo.imageLinks.thumbnail,index);
        });
      })
      .catch((err) => {
        console.log(err);
        return `ERROR : ${err}`;
      });
  });

  document.getElementById("MainPage").style.display = "block";
  // PFP.style.display = "block"
  let Login_BTN = document.getElementById("login");
  let SignUp_BTN = document.getElementById("signUp");
  Login_BTN.style.display = "none";
  SignUp_BTN.style.display = "none";
  let button_after = document.createElement("button");
  button_after.innerText = "LOG-OUT";
  button_after.onclick = Logout;
  PFP.appendChild(button_after);

// Slider
let currentIndex = 0;
let slideConatainer = document.getElementById('slideContainer')

  // console.log(data.items[0].volumeInfo)

function SliderUI(img, Bname, Author) {
  let slide = document.createElement('div');
  slide.classList.add('slide');

  let imageDiv = document.createElement('div');
  imageDiv.classList.add('SlideImage');

  let image = document.createElement('img');
  image.setAttribute('src', img);
  imageDiv.appendChild(image);

  let infodiv = document.createElement('div');
  infodiv.classList.add('SlideInfo');

  let p = document.createElement('p');
  p.innerHTML = ` by ${Author}`;

  let h6 = document.createElement('h6');
  h6.innerHTML =Bname ;

  let button = document.createElement('button');
  button.innerText = "Add";

  
  button.addEventListener("click", (e) => {
    let Cont_div = e.target.closest("div").textContent;
    let text = Cont_div.slice(0, -3);
    // console.log('Text',text)
   alert("Book Added Successfully");
    addBooks(text);
  });


  infodiv.appendChild(h6);
  infodiv.appendChild(p);
  infodiv.appendChild(button);

  slide.appendChild(imageDiv);
  slide.appendChild(infodiv);

  let slideContainer = document.querySelector('.slide'); 
  slideContainer.appendChild(slide);

}


let arra = ['HarryPotter' , 'The Lord of the rings' , 'Kimetsu no Yaiba' , 'Attack on titan']

function RandomChoose(arr) {
let random = Math.floor(Math.random() * arr.length)
 return arr[random]
}

let Bname = RandomChoose(arra)
console.log(Bname);

let totalSlides = 0

BooksName(Bname).then((result)=>{

  return result.items
}).then((result)=>{
// console.log(result[0].volumeInfo);
totalSlides = result.length
for (let i = 0; i < totalSlides; i++) {
  SliderUI( result[i].volumeInfo.imageLinks.thumbnail ,result[i].volumeInfo.title , result[i].volumeInfo.authors )
}

}).catch((err)=>{
  console.log('Error :' , err)
  return err
})


setInterval(() => {
  currentIndex = (currentIndex +1)%totalSlides;
  slideConatainer.style.transform = `translateX(-${currentIndex*100}%)`
}, 3000);




} else {
  Container.innerHTML = `<h1>Welcome to my Library!</h1>`;
  window.location.replace("./SignUp.html");
}
