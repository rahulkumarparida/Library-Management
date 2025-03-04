//! Sign-Up
let Username = document.getElementById("Uname");
let Email = document.getElementById("Email");
let Password = document.getElementById("password");
let SignUpBtn = document.getElementById("SignUp_Btn");
let SignUpForm = document.getElementById("Form");

let userData;
function GetUserData() {
  if ((Username.value && Email.value && Password.value) == "") {
    throw new Error("The Input is empty should provide Vlaues to the Input");
  } else {
    userData = {
      Usename: Username.value.trim(),
      Email: Email.value.trim(),
      Password: Password.value.trim(),
    };
    location.href = "./Login.html";
    return userData;
  }
}
let ALLUserPersonalData = [];
function PushUserData(dataa) {
  let data = dataa;
  let stringifiedData = JSON.stringify(dataa);
  localStorage.setItem(`${Username.value}data`, stringifiedData);
}

if (SignUpBtn) {
  SignUpBtn.addEventListener("click", (e) => {
    PushUserData(GetUserData());

    Username.value = "";
    Email.value = "";
    Password.value = "";

    e.preventDefault();
  });
}
