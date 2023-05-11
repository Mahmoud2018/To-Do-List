
let tasks = [
    {

        "title": "Task 1",
        "date": "2021-01-01",
        "isDone": false
    },
    {
        "title": "Task 2",
        "date": "2022-03-01",
        "isDone": false
    },
    {
        "title": "Task 3",
        "date": "2023-05-01", 
        "isDone": true
    },
];

function getDate() {

    let retrievdTasks = JSON.parse(localStorage.getItem('tasks'));

    tasks = retrievdTasks ?? [];
}

getDate();



function addTask() {



document.getElementById("tasks").innerHTML = '';

let index = 0
for (task of tasks){

    let content = 
    `
    <!-- Task -->
    <div id="tasks" >
      <ul >

        <li class="task" >
             <div >
              <h5 style="font-weight: 700;" >${task.title}</h5>
              <div style="display: flex;">
                <span class="material-symbols-outlined">calendar_month</span>
                <span >${task.date}</span> 
              </div>
            </div>

            <div class="actions"  >
            ${task.isDone ? `
            <button onclick="toggleTaskCompletion(${index})"  type="button" class="btn btn-labeled btn-dark">
            <span class="btn-label"><i class="fa fa-remove"></i></span></button>
            ` : `
            <button onclick="toggleTaskCompletion(${index})" type="button" class="btn btn-labeled btn-success">
            <span class="btn-label"><i class="fa fa-check"></i></span></button>
            `}
                   
            <button onclick="editTask(${index})" type="button" class="btn btn-labeled btn-info">
            <span class="btn-label"><i class="fa fa-refresh"></i></span></button>
    
            <button onclick="deleteTask(${index})" type="button" class="btn btn-labeled btn-danger">
            <span class="btn-label"><i class="fa fa-trash"></i></span></button>
        </div>
        </li>
        
      </ul>

    </div>
  <!-- //Task // -->
    
    `
document.getElementById("tasks").innerHTML += content
index++;

}
}



addTask();


document.getElementById("add-btn").addEventListener("click", () => {
    let inputData = document.getElementById("inputData").value;
    
    if(inputData == ""){
        alert("Please enter a task !!");

     } else{

        let now = new Date();
        let date = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear();
        let taskName = inputData

        taskObj = {
        "title": taskName,
            "date": date,
            "isDone": false
        }

        tasks.push(taskObj);
    
        let tasksString = JSON.stringify(tasks);
        localStorage.setItem("tasks", tasksString);
        storeTasks();
        addTask();
       
    }

   
});

function deleteTask(index) {
    let Task = tasks[index];
    let isConfirm =  confirm("Are you sure you want to delete " + Task.title + " ?");
    if (isConfirm) {
        tasks.splice(index, 1);
        storeTasks();
        addTask();
    }        
}
	
function editTask(index) {
    let Task = tasks[index];
    let newTaskTitle = prompt("Enter new task title" , Task.title);
    Task.title = newTaskTitle;
    storeTasks();
    addTask();
}
 
function toggleTaskCompletion(index) {
    let Task = tasks[index];
    Task.isDone =!Task.isDone;
    storeTasks();
    addTask();
   
}

function storeTasks() {
    let tasksString = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksString);
}


