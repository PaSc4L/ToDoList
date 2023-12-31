const apiUrl = "http://localhost:8080/task";

// API CALLS

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
function moveTask(id) {
  fetch(apiUrl + "/updateMode/" + id, {
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

  //Done button creatinon (should not display at archived tasks)
  if (mode != 4) {
    let doneButton = document.createElement("button");
    doneButton.id = id;
    doneButton.className = "task-button done-btn";
    doneButton.innerHTML = "&#x2714;";
    buttonHolder.appendChild(doneButton);

    //calling the backend on clicking
    doneButton.onclick = function () {
      doneId = this.id;
      moveTask(doneId);
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
  document.getElementById("add-form").style.display = "none";
}
