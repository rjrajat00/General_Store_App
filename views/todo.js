document.addEventListener("DOMContentLoaded", function () {
  console.log("here comes the js");

  let taskForm = document.getElementById("taskForm");
  let taskList = document.getElementById("taskList");

  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const task = document.getElementById("task").value;
    const details = document.getElementById("details").value;

    const data = {
      task: task,
      details: details,
    };

    try {
      const response = await axios.post("/api/tasks", data);
      console.log("Task Added", response.data);
      taskForm.reset();
    } catch (error) {
      console.error("error adding task", error);
    }
  });

  async function getData() {
    try {
      const response = await axios.get("/api/tasks");

      taskList.innerHTML = "";

      response.data.forEach((taskData) => {
        const tasks = document.createElement("li");
        tasks.style.marginTop = "15px";

        const taskStyle = document.createElement("span");

        const descriptionStyle = document.createElement("span");

        taskStyle.className = "task";
        taskStyle.style.marginLeft = "7px";
        taskStyle.style.color = "red";

        descriptionStyle.classList = "description";
        descriptionStyle.style.marginLeft = "7px";
        descriptionStyle.style.color = "blue";

        taskStyle.textContent = `Task:${taskData.task}`;
        descriptionStyle.textContent = `Description:${taskData.details}`;

        tasks.appendChild(taskStyle);
        tasks.appendChild(descriptionStyle);
        taskList.appendChild(tasks);

        let delButton = document.createElement("button");
        delButton.innerText = "Delete";
        delButton.style.marginLeft = "10px";

        delButton.addEventListener("click", async () => {
          await deleteData(taskData.id);
        });

        descriptionStyle.appendChild(delButton);

        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.style.marginLeft = "10px";
        editButton.addEventListener("click", async () => {
          await editData(taskData.id);
        });
        descriptionStyle.appendChild(editButton);
      });

      console.log(response.data);
    } catch (error) {
      console.error("unable to fetch data");
    }
  }

  async function deleteData(taskId) {
    try {
      const response = await axios.delete(`/api/tasks/${taskId}`);

      console.log(response.data);

      getData();
    } catch (error) {
      console.error("Unable to delete the task");
    }
  }

  async function editData(taskId) {
    let updatedTask = prompt("Enter The New Task");
    let updatedDetails = prompt("Enter The New Details");

    const updatedData = {
      task: updatedTask,
      details: updatedDetails,
    };

    try {
      const response = await axios.put(`/api/tasks/${taskId}`, updatedData);

      getData();
      console.log(response.data);
    } catch (error) {
      console.error("Unable to delete the task");
    }
  }

  getData();
});
