const apiUrl = "http://localhost:8080";

fetch(apiUrl + "/task/tasks/1")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error when reading from database");
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((element) => {
      let id = element.id;
      let name = element.name;
      let description = element.description;
      let mode = element.mode;
      writeTask(id, name, description, mode);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

fetch(apiUrl + "/task/tasks/2")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error when reading from database");
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((element) => {
      let id = element.id;
      let name = element.name;
      let description = element.description;
      let mode = element.mode;
      writeTask(id, name, description, mode);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

fetch(apiUrl + "/task/tasks/3")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error when reading from database");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.forEach((element) => {
      let id = element.id;
      let name = element.name;
      let description = element.description;
      let mode = element.mode;
      writeTask(id, name, description, mode);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

fetch(apiUrl + "/task/tasks/4")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error when reading from database");
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((element) => {
      let id = element.id;
      let name = element.name;
      let description = element.description;
      let mode = element.mode;
      writeTask(id, name, description, mode);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function writeTask(id, name, description, mode) {
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

  let taskDiv = document.createElement("div");
  taskDiv.className = "task";
  container.appendChild(taskDiv);

  let title = document.createElement("h4");
  title.textContent = name;
  taskDiv.appendChild(title);

  let taskDescription = document.createElement("p");
  taskDescription.textContent = description;
  taskDiv.appendChild(taskDescription);

  let buttonHolder = document.createElement("div");
  buttonHolder.className = "button-holder";
  taskDiv.appendChild(buttonHolder);

  if (mode != 4) {
    let doneButton = document.createElement("button");
    doneButton.id = id;
    doneButton.className = "task-button done-btn";
    doneButton.innerHTML = "&#x2714;";
    buttonHolder.appendChild(doneButton);
  }

  let deleteButton = document.createElement("button");
  deleteButton.id = "1";
  deleteButton.className = "task-button delete-btn";
  deleteButton.innerHTML = "&#10006;";
  buttonHolder.appendChild(deleteButton);

  if (mode != 4) {
    let archiveButton = document.createElement("button");
    archiveButton.id = "1";
    archiveButton.className = "task-button archive-btn fa fa-book";
    buttonHolder.appendChild(archiveButton);
  }
}
function addNewTask() {
  return null;
}
