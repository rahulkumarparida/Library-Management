
//! Log_In



let Uname = document.getElementById("Lusername")
let LPassword = document.getElementById("Lpassword")
let LogInBtn = document.getElementById("login_Btn")

function GetInputData() {
    let Name = Uname.value
    let Pass = LPassword.value

    Uname.value = ""
    LPassword.value = ""
    return { Name, Pass }

}




function CheckAccount() {
    let InputData = GetInputData()
    //  InputData 
    console.log(InputData.Name, InputData.Pass);
    let StoredData = JSON.parse(localStorage.getItem(`${InputData.Name}data`))
    // console.log(StoredData);

    if (StoredData) {

        if ((StoredData.Password == InputData.Pass)) {
            let Loggeddata = { TorF: true, SignupData: StoredData, LoginData: InputData }
            console.log("Account Found :", StoredData);
            localStorage.setItem(`LoggedData`, JSON.stringify(Loggeddata))

            window.location.replace("./index.html");

        } else {
            console.log("Wrong Password");

        }

    } else {
        console.log("Account not found");

    }



}


function ChangePage() {
    let INPUT_DATA = GetInputData()
    let Logged = JSON.parse(localStorage.getItem(`LoggedData`));
    if (Logged.TorF == true) {
        console.log("Logged IN Sucessfully");
        setInterval(() => {
            console.log("The page Refreshed");

        }, 2000);

    } else {
        setInterval(() => {
            console.log("The page Refreshed And it logOUt");

        }, 2000);
    }

}

if (LogInBtn) {
    LogInBtn.addEventListener("click", (e) => {
        CheckAccount()
        ChangePage()
        e.preventDefault()
    })
}


