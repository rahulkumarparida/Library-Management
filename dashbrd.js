let dsh_user_name = document.getElementById("dsh_user_name");
let dsh_email = document.getElementById("dsh_email");
let dsh_log_data = JSON.parse(localStorage.getItem("LoggedData"));
let Cart = document.querySelector(".Cart");

dsh_user_name.innerText = dsh_log_data.SignupData.Usename.toUpperCase();
dsh_email.innerText = dsh_log_data.SignupData.Email;
let accessData = JSON.parse(localStorage.getItem("LoggedData"));

let login_VAL = accessData.TorF;
if (login_VAL == true) {
  let username = accessData.LoginData.Name;
  let LoggBdata = JSON.parse(localStorage.getItem(`${username}data`)); //
  let BOOKdata = LoggBdata.books;
  let ArrOFDATA = BOOKdata;

  function ADdUITask(bookInfo, idx) {
    // Create the main container
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("bookContainer");
    // Create the image container
    const imgContainer = document.createElement("div");
    imgContainer.id = "img";
    const img = document.createElement("img");
    img.src = "./Images/dsh_book_icon.png";
    img.alt = "Book Icon";
    img.height = 60;
    imgContainer.appendChild(img);
    // Create the info container
    const bookInfoContainer = document.createElement("div");
    bookInfoContainer.classList.add("dsh_book_info");
    // Create the book name container
    const bookNameDiv = document.createElement("div");
    bookNameDiv.id = "dsh_bookName";
    const bookNamePara = document.createElement("p");
    bookNamePara.id = "b_name";
    bookNamePara.textContent = bookInfo;
    bookNameDiv.appendChild(bookNamePara);
    // Create the button container
    const btnContainer = document.createElement("div");
    btnContainer.id = "dsh_btn";
    // Return button
    const returnBtn = document.createElement("button");
    returnBtn.classList.add("styled-btn");
    returnBtn.id = "return";
    returnBtn.textContent = "Return";
    returnBtn.setAttribute("id", idx);

    returnBtn.addEventListener("click", (e) => {
      // display removed success
      let innerDiv = e.target.parentNode;
      let containerDIv = innerDiv.parentNode;
      let mainDIv = containerDIv.parentNode;
      mainDIv.remove();

      // now array remove fromn localstorage
      let ident = e.target.getAttribute("id");
      let filterARR = ArrOFDATA.filter((ele, idx) => {
        return idx != ident;
      });
      LoggBdata.books = filterARR;
      localStorage.setItem(`${username}data`, JSON.stringify(LoggBdata)); //!
      location.reload();
    });
    // Extend button
    const extendBtn = document.createElement("button");
    extendBtn.classList.add("styled-btn");
    extendBtn.id = "extend";
    extendBtn.textContent = "Extend";

    // Append buttons to the button container
    btnContainer.appendChild(returnBtn);
    // btnContainer.appendChild(extendBtn);

    // Append all parts to the book info container
    bookInfoContainer.appendChild(bookNameDiv);
    bookInfoContainer.appendChild(btnContainer);

    // Append image and info containers to the main book container
    bookContainer.appendChild(imgContainer);
    bookContainer.appendChild(bookInfoContainer);

    // Finally, append the complete bookContainer to the Cart
    Cart.appendChild(bookContainer);
  }

  let GoBack = document.querySelector(".goback");

  GoBack.addEventListener("click", (e) => {
    window.location.replace("./index.html");
    e.preventDefault();
  });

  if (ArrOFDATA) {
    ArrOFDATA.forEach((element, index) => {
      ADdUITask(element.BookData, index);
    });
  }

  let del_btn = document.getElementById("delete_id");

  del_btn.addEventListener("click", (e) => {
    let ans = prompt(
      ` ${accessData.LoginData.Name} you want to delete the account please type "${accessData.LoginData.Name}/_Password_"\n (Your PassWord) ?`
    );
    if (ans == `${accessData.LoginData.Name}/${accessData.LoginData.Pass}`) {
      localStorage.removeItem(`${accessData.LoginData.Name}data`);
      localStorage.removeItem("LoggedData");
      window.location.replace("./SignUp.html");
    }

    e.preventDefault();
  });
}
