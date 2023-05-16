
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

function closeAlert(){
    const alert = document.getElementById('myalert')
    alert.style.display = "block"

    setTimeout(function(){ 
        alert.style.display = "none"

    }, 3000);

 }

 let num = 0

 function showms(index) {
    let Task = tasks[index];
    let masseg1 = document.getElementById("masseg1");
    let masseg2 = document.getElementById("masseg2");
    masseg2.style.fontWeight = "600";
    masseg2.style.color = "red";
    masseg1.innerHTML = "Are you sure you want to delete " 
    masseg2.innerHTML = `${Task.title} ? `
    num = index

    }

    


function showms2(index) {
    let Task = tasks[index];
    let masseg3 = document.getElementById("masseg3");
    let masseg4 = document.getElementById("masseg4");
    masseg4.style.fontWeight = "600";
    masseg4.style.color = "green";
    masseg3.innerHTML = "Are you sure you want to update "  
    masseg4.innerHTML = `${Task.title} ? `
    num = index

    }



function addTask() {

    
        
document.getElementById("tasks").innerHTML = '';

let index = 0
for (task of tasks){

    let content = 
    `
    <!-- Task -->
    <div id="tasks" >
      <ul >
        <li class="task ${task.isDone ? 'done' : ''}" >
            <div class="${task.isDone ? 'done2' : ''}">
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
                   
            <button onclick="showms2(${index})" type="button" class="btn btn-labeled btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal2">
            <span class="btn-label"><i class="fa fa-refresh"></i></span></button>
    
            <button onclick="showms(${index})" type="button" class="btn btn-labeled btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
        closeAlert()

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

        document.getElementById('inputData').value = ''
       
    }
   
});

function deleteTask() {
    tasks.splice(num, 1);
    storeTasks();
    addTask();
       
    }        


function updateTask() {
    let inputuser = document.getElementById("inputuser").value;
    let Task = tasks[num];
    Task.title = inputuser
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




