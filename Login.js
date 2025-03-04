//! Log_In

let Uname = document.getElementById("Lusername");
let LPassword = document.getElementById("Lpassword");
let LogInBtn = document.getElementById("login_Btn");

function GetInputData() {
  let Name = Uname.value;
  let Pass = LPassword.value;

  Uname.value = "";
  LPassword.value = "";
  return { Name, Pass };
}

function CheckAccount() {
  let InputData = GetInputData();
  //  InputData

  let StoredData = JSON.parse(localStorage.getItem(`${InputData.Name}data`));

  if (StoredData) {
    if (StoredData.Password == InputData.Pass) {
      let Loggeddata = {
        TorF: true,
        SignupData: StoredData,
        LoginData: InputData,
      };

      localStorage.setItem(`LoggedData`, JSON.stringify(Loggeddata));

      window.location.replace("./index.html");
    } else {
      alert("Wrong Password");
    }
  } else {
    alert("Account not found");
  }
}

if (LogInBtn) {
  LogInBtn.addEventListener("click", (e) => {
    CheckAccount();

    e.preventDefault();
  });
}
