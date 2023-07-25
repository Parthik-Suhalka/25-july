const arr = [
  {
    question: "What year was JavaScript Launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    ans: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "HyperText Markup Language",
    b: "HyperText Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    ans: "a",
  },
  {
    question: "Which Language run in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    ans: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Central Simple Sheets",
    d: "Cars SUVs Sailboats",
    ans: "b",
  },
];

const box = document.getElementById("box");
const question = document.getElementById("question");
const options = document.querySelectorAll(".option");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const optionC = document.getElementById("optionC");
const optionD = document.getElementById("optionD");
const submit = document.getElementById("submit");
const backBtn = document.getElementById('backBtn');
const quizApp = document.getElementById('quiz-app');
const inputform = document.getElementById('inputform');
const userEmail = document.getElementById('useremail');
const userName = document.getElementById('username');
const usernamepara = document.getElementById('usernamepara');
const result = document.getElementById('result');
const resultContainer = document.getElementById('resultContainer') 

let score = 0;
let prevIndex = 0;
let obj = {};
// let index = 0;
// let index = obj.length || 0;
let ansSelected = [];


// swap();


function render() {


  deselect();


  // const currentmcq = arr[index];
  const currentmcq = arr[obj.index];

  question.innerText = currentmcq.question;
  optionA.innerText = currentmcq.a;
  optionB.innerText = currentmcq.b;
  optionC.innerText = currentmcq.c;
  optionD.innerText = currentmcq.d;

  // if (index != 0) {
  //   backBtn.style.display = "block";
  // }
  if (obj.index != 0) {
    backBtn.style.display = "block";
  }
}

function deselect() {
  options.forEach((option) => (option.checked = false));
}

function selected() {
  let answer;
  options.forEach((option) => {
    if (option.checked) {
      answer = option.id;
    }
  });
  return answer;
}

submit.addEventListener("click", () => {

  const useremail = userEmail.value

  let answer = selected();

  if (answer) {


    if (!obj.ansSelected) {
      obj.ansSelected = []
    }

    // obj.ansSelected[index] = answer
    obj.ansSelected[obj.index] = answer



    // prevIndex = index
    prevIndex = obj.index

    // index++;
    obj.index++;


    obj.prevIndex = prevIndex;
    // obj.index = index;
    // obj.score = score
    localStorage.setItem(useremail, JSON.stringify(obj));
    saveUserDataCookies()


    // if (index < arr.length) 
    if (obj.index < arr.length) {
      render();
      selectedOption()
    } else {

      let data = localStorage.getItem(useremail)
      data = JSON.parse(data)
      ansSelected = data.ansSelected

      for (let i = 0; i < arr.length; i++) {
        if (ansSelected[i] === arr[i].ans) {
          score++;
        }
      }

      obj.score = score
      localStorage.setItem(useremail, JSON.stringify(obj));
      saveUserDataCookies()

      showScorePage()

    }
  } else {
    alert("Please select one option");
  }
});


function swap() {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}


function selectedOption() {
  let data = localStorage.getItem(userEmail.value)
  let data1 = JSON.parse(data)
  let index = data1.index
  let ansSelected = data1.ansSelected[index]

  options.forEach((option) => {
    if (option.id == ansSelected) {
      option.checked = true;
    }
  })

}




inputform.addEventListener('submit', (e) => {

  e.preventDefault()

  const useremail = userEmail.value
  const username = userName.value

  let validation = useremail.toLowerCase().match(
    /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
  );

  if (!validation) {
    alert("Please Enter valid email address")
    location.reload()
  }
  else {
    if (localStorage.length >= 10) {
      alert("You have reached max limit of attending the quiz")
      localStorage.clear()
      window.close()
    }
    else {

      let check = false;
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == useremail) {
          check = true;
          break;
        }
      }


      if (check == false) {

        obj = { username, useremail, index:0, score:0}
        localStorage.setItem(useremail, JSON.stringify(obj));
        saveUserDataCookies()

        quizApp.style.display = "none";
        box.style.display = "block";
        render();

        usernamepara.innerText = `Hey, ${username}`
      }
      else {

        showScorePage()


      }

    }

  }


})


backBtn.addEventListener("click", () => {

  const useremail = userEmail.value

  let data = localStorage.getItem(useremail)
  data = JSON.parse(data)
  prevIndex = data.prevIndex;
  ansSelected = data.ansSelected[prevIndex]


  options.forEach((option) => {
    if (option.id == ansSelected) {
      option.checked = true;
    }
  })


  const currentmcq = arr[prevIndex];

  question.innerText = currentmcq.question;
  optionA.innerText = currentmcq.a;
  optionB.innerText = currentmcq.b;
  optionC.innerText = currentmcq.c;
  optionD.innerText = currentmcq.d;

  if (prevIndex != 0) {
    backBtn.style.display = "block";
  }
  else {
    backBtn.style.display = "none";
  }

  
  // obj.ansSelected[index] = answer
  obj.index = prevIndex
  prevIndex--;


  obj.prevIndex = prevIndex;
  // obj.index = index;
  localStorage.setItem(useremail, JSON.stringify(obj));
  saveUserDataCookies()

})




function showLogin() {
  inputform.reset()
  // deleteAllCookies()

  quizApp.style.display = "block";
  box.style.display = "none"
  resultContainer.style.display = "none"
}

function showQues() {
  quizApp.style.display = "none";
  box.style.display = "block"
  resultContainer.style.display = "none"
}

function showScorePage() {

  result.innerHTML = `` 

  quizApp.style.display = "none"
  box.style.display = "none"
  resultContainer.style.display = "block"


  let table = document.createElement('table')
  let tr = document.createElement('tr')
  let th1 = document.createElement('th')
  let th2 = document.createElement('th')
  let th3 = document.createElement('th')


  result.insertAdjacentElement("afterbegin", table)
  table.insertAdjacentElement("afterbegin", tr)
  tr.insertAdjacentElement("afterbegin", th1)
  th1.innerText = "Username"
  tr.insertAdjacentElement("beforeend", th2)
  th2.innerText = "Email"
  tr.insertAdjacentElement("beforeend", th3)
  th3.innerText = "Score"


  for (let i = 0; i < localStorage.length; i++) {
    let x = localStorage.key(i)
    let user = localStorage.getItem(x)
    user = JSON.parse(user)

    let tr = document.createElement('tr')
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let td3 = document.createElement('td')

    table.insertAdjacentElement("beforeend", tr)
    tr.insertAdjacentElement("afterbegin", td1)
    td1.innerHTML = `${user.username}`
    tr.insertAdjacentElement("beforeend", td2)
    td2.innerHTML = `${user.useremail}`
    tr.insertAdjacentElement("beforeend", td3)
    td3.innerHTML = `${user.score}`

  }

}





function restartQuiz() {
  // if (localStorage.length >= 10) {
  //   alert("Session timeout. Maximum number of users logged in.");
  //   localStorage.clear();
  //   window.close();
  // }

  inputform.reset();
  obj = {};
  ansSelected = [];
  

  showLogin()
}

document.getElementById("restartButton").addEventListener("click", restartQuiz);






function loadUserData() {
  const cookieData = getCookie("userData");
  const localStorageData = localStorage.getItem("userData");

  if (cookieData) {
    obj = cookieData;
  } else if (localStorageData) {
    obj = JSON.parse(localStorageData);
  } else {
    showLogin();
    return;
  }

  if (obj.index !== undefined) {

    ansSelected = obj.ansSelected || [];
    if (obj.index >= arr.length) {
      showScorePage();
    } else {
      showQues()
      // reload();
      render()
      
    }
    return;
  }


  showLogin();
}



function reload() {

  deselect();

  const currentmcq = arr[obj.index];

  question.innerText = currentmcq.question;
  optionA.innerText = currentmcq.a;
  optionB.innerText = currentmcq.b;
  optionC.innerText = currentmcq.c;
  optionD.innerText = currentmcq.d;

  if (obj.index != 0) {
    backBtn.style.display = "block";
  }
}








window.addEventListener("load", () => {
  loadUserData();
  // usernamepara.innerHTML = obj.username;
  usernamepara.innerText = `Hey, ${obj.username}`
});

window.addEventListener("beforeunload", () => {
  if (obj.index !== undefined) {
    saveUserDataCookies()
  }
});



// function deleteAllCookies() {
//   const cookies = document.cookie.split(";");

//   for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i];
//       const eqPos = cookie.indexOf("=");
//       const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//       document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//   }
// }


function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + expires + "; path=/";
}


function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
  }
  return null;
}


function saveUserDataCookies() {
  setCookie("userData", obj);
}

showLogin()