let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

//check if there are element in local
if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}
// if find elem in local this function will work
showLocalOnWindow();

// when you click to add new task
submit.onclick = function () {
  if (input.value != "") {
    pushData(input.value);
  }
  input.value = "";
};

// click on task that already created
tasksDiv.addEventListener("click", function (e) {
  // when you click on delete icon || this will delete task from window and localStorage
  if (e.target.classList.contains("del")) {
    let taskId = e.target.parentElement.getAttribute("data-id");
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addElemToLocal(arrayOfTasks);
    e.target.parentElement.remove();
  }

  //when you click on task it will check and add onit class named "done" and update the data of this task.compleated in localStorage

  if (e.target.classList.contains("task")) {
    let taskId = e.target.getAttribute("data-id");
    //update data of class in local
    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id == taskId) {
        arrayOfTasks[i].compleated == false
          ? (arrayOfTasks[i].compleated = true)
          : (arrayOfTasks[i].compleated = false);
      }
    }
    addElemToLocal(arrayOfTasks);
  }
  e.target.classList.toggle("done");
});

// create object data for new task
function pushData(value) {
  const data = {
    id: Date.now(),
    title: value,
    compleated: false,
  };

  arrayOfTasks.push(data);

  addElemToWindow(arrayOfTasks);
  addElemToLocal(arrayOfTasks);
}

// create element in window
function addElemToWindow(array) {
  tasksDiv.innerHTML = "";
  array.forEach((task) => {
    let div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    let span = document.createElement("span");
    span.appendChild(document.createTextNode("Delete"));
    span.classList.add("del");
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}

// save data in local storage
function addElemToLocal(array) {
  window.localStorage.setItem("tasks", JSON.stringify(array));
}

// if local have tasks we convert data and show them in page
function showLocalOnWindow() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElemToWindow(tasks);
  }
}
