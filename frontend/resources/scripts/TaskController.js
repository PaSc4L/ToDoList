const apiUrl = "http://localhost:8080/task";

// API CALLS

//DELETE TASK
function deleteTask(id) {
  fetch(apiUrl + "/delete/" + id, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when reading from database");
    }
    location.reload();
  });
}

// MOVE TASK
function moveTaskUp(id) {
  fetch(apiUrl + "/moveTaskUp/" + id, {
    //task will be moved to the next cathegory
    method: "POST",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when reading from database");
    }
    location.reload();
  });
}

function moveTaskDown(id) {
  fetch(apiUrl + "/moveTaskDown/" + id, {
    //task will be moved to the next cathegory
    method: "POST",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when reading from database");
    }
    location.reload();
  });
}

//ARCHIVE AND UNARCHIVE TASK
function archive(id) {
  fetch(apiUrl + "/archive/" + id, {
    //if task not archived archive it. If task archived move it to to-do
    method: "POST",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when reading from database");
    }
    location.reload();
  });
}

//Writing out task
function writeTask(id, name, description, mode) {
  //selecting the container where the task goes
  let container;
  if (mode == 1) {
    container = document.getElementById("to-do");
  } else if (mode == 2) {
    container = document.getElementById("in-progress");
  } else if (mode == 3) {
    container = document.getElementById("done");
  } else if (mode == 4) {
    container = document.getElementById("archive");
  }

  //create task container
  let taskDiv = document.createElement("div");
  taskDiv.className = "task";
  container.appendChild(taskDiv);

  //create title element
  let title = document.createElement("h4");
  title.textContent = name;
  taskDiv.appendChild(title);

  //create task description
  let taskDescription = document.createElement("p");
  taskDescription.textContent = description;
  taskDiv.appendChild(taskDescription);

  //create div for buttons
  let buttonHolder = document.createElement("div");
  buttonHolder.className = "button-holder";
  taskDiv.appendChild(buttonHolder);

  if (mode != 4) {
    let moveButton = document.createElement("button");
    moveButton.id = id;
    moveButton.className = "task-button move-btn";
    moveButton.innerHTML = "&laquo;";
    buttonHolder.appendChild(moveButton);

    //calling the backend on clicking
    moveButton.onclick = function () {
      doneId = this.id;
      moveTaskDown(doneId);
    };
  }

  //Done button creatinon (should not display at archived tasks)
  if (mode != 4) {
    let moveButton = document.createElement("button");
    moveButton.id = id;
    moveButton.className = "task-button move-btn";
    moveButton.innerHTML = "&raquo;";
    buttonHolder.appendChild(moveButton);

    //calling the backend on clicking
    moveButton.onclick = function () {
      doneId = this.id;
      moveTaskUp(doneId);
    };
  }

  //delete button
  let deleteButton = document.createElement("button");
  deleteButton.id = id;
  deleteButton.className = "task-button delete-btn";
  deleteButton.innerHTML = "&#10006;";
  buttonHolder.appendChild(deleteButton);

  //archive button
  let archiveButton = document.createElement("button");
  archiveButton.id = id;
  archiveButton.className = "task-button archive-btn fa fa-book";
  buttonHolder.appendChild(archiveButton);

  //calling backend methods on remaining buttons
  deleteButton.onclick = function () {
    deleteId = this.id;
    deleteTask(deleteId);
  };

  archiveButton.onclick = function () {
    archiveId = this.id;
    archive(id);
  };
}

//add new task (open form)
function addNewTask() {
  document.getElementById("add-form").style.display = "block";
}

//save added task (close form)
function addTask() {
  let taskName = document.getElementById("name").value;
  let taskDescription = document.getElementById("description").value;
  let taskMode = document.getElementById("mode").value;
  document.getElementById("add-form").style.display = "none";

  const task = { name: taskName, description: taskDescription, mode: taskMode };

  fetch(apiUrl + "/add", {
    //if task not archived archive it. If task archived move it to to-do
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when reading from database");
    }
    location.reload();
  });
}

let language;
function getLanguage() {
  localStorage.getItem("language") == null ? setLanguage("en") : false;
  language = localStorage.getItem("language");

  let url = "../resources/languages/" + language + ".json";
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);

      document.getElementById("main_title").innerHTML = data.main_title;
      document.getElementById("motto").innerHTML = data.motto;
      document.getElementById("to-do-title").innerHTML = data.to_do;
      document.getElementById("in-progress-title").innerHTML = data.in_progress;
      document.getElementById("done-title").innerHTML = data.done;
      document.getElementById("archive-title").innerHTML = data.archived;
    })
    .catch((error) => console.error("Unable to fetch data:", error));

  // CALL ALL TO-DO TASKS
  fetch(apiUrl + "/tasks/1") //read all to-do tasks
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error when reading from database");
      }
      return response.json();
    })
    .then((data) => {
      //get all to-do tasks' data
      data.forEach((element) => {
        let id = element.id;
        let name = element.name;
        let description = element.description;
        let mode = element.mode;
        //write out to-do task in the to-do container
        writeTask(id, name, description, mode);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //CALL ALL IN-PROGRESS TASKS
  fetch(apiUrl + "/tasks/2") //read all in-progress tasks
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error when reading from database");
      }
      return response.json();
    })
    .then((data) => {
      //get all in-progress tasks' data
      data.forEach((element) => {
        let id = element.id;
        let name = element.name;
        let description = element.description;
        let mode = element.mode;
        //write out all in-progress task in the in-progress container
        writeTask(id, name, description, mode);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //CALL ALL DONE TASKS
  fetch(apiUrl + "/tasks/3") //read all done tasks
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error when reading from database");
      }
      return response.json();
    })
    .then((data) => {
      //get all done tasks' data
      data.forEach((element) => {
        let id = element.id;
        let name = element.name;
        let description = element.description;
        let mode = element.mode;
        //write out all done task in the in-progress container
        writeTask(id, name, description, mode);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  fetch(apiUrl + "/tasks/4") //read all archived tasks
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error when reading from database");
      }
      return response.json();
    })
    .then((data) => {
      //get all archived tasks' data
      data.forEach((element) => {
        let id = element.id;
        let name = element.name;
        let description = element.description;
        let mode = element.mode;
        //write out all task in archive container
        writeTask(id, name, description, mode);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getTasks() {}

function setLanguage(lang) {
  localStorage.setItem("language", lang);
  getLanguage();
}

window.onload = function () {
  let data = getLanguage();
  console.log(data);
};
