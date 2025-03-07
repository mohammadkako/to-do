let text = document.querySelector("h1");
let questionForm = document.querySelector(".question-items");
let questionCanceler = document.querySelector("#question-canceler");
let addButtom = document.querySelector(".add-buttom");
let clearButtom = document.querySelector(".clear-buttom");
let q = document.querySelector(".question-buttom");
let form = document.querySelector(".form");
let formHolder = document.querySelector(".form-holder");
let container = document.querySelector(".container");
let cancel = document.querySelector("#canceler");
let taskMaker = document.querySelector("#task-maker");
let title = document.querySelector(".input1");
let task = document.querySelector(".input2");
let asking = document.querySelector(".ask-to-clean");
let yes = document.querySelector("#yes");
let no = document.querySelector("#no");

let editingTask = null; //a variable to save editing task value


q.addEventListener("click", (e) => {
    formFocuse(e)
    questionForm.style.display = "flex";
});//to appear the support window

questionCanceler.addEventListener("click", (e) => {
    formUnfocused(e)
    questionForm.style.display = "none";
});//to close the support window

addButtom.addEventListener("click", (e) => {
    formFocuse(e)
    form.style.display = "flex";
    editingTask = null; // برای اطمینان از اینکه در حالت ویرایش نیستیم.
});// to appear a window for creating a task

cancel.addEventListener("click", (e) => {
    formUnfocused(e)
    form.style.display = "none";

    title.value = "";
    task.value = "";
    editingTask = null; // در صورت کنسل کردن ویرایش، متغیر را خالی کنید.
});//to cancel creating or editing        

taskMaker.addEventListener("click", (e) => {
    if (!title.value || !task.value) return;// اگر این دو مقدار وارد نشدن تسک قابل ایجاد نیست

    formUnfocused(e)
    form.style.display = "none";
    text.style.display = "none";
    

    if (editingTask) {
        // در حالت ویرایش
        editingTask.querySelector("#title").innerHTML = `<strong>title: ${title.value}</strong>`;
        editingTask.querySelector("#task").innerHTML = `task: ${task.value}`;
        updateTaskInLocalStorage(editingTask); // بروزرسانی تسک در localStorage
        editingTask = null; // پایان ویرایش
    } else {

        const taskData = {
            title: title.value,
            text: task.value,
            done: false, // اضافه کردن وضعیت انجام شده
          };
        
          saveTaskToLocalStorage(taskData); // ذخیره تسک در localStorage
          
        // در حالت ایجاد تسک جدید
        newForm = document.createElement("form");
        newForm.action = "#";
        newForm.classList.add("tasks");

        newForm.innerHTML = `
            <div class="sections">
                <div class="edit-delete">
                    <a href="#" class="tasks-buttom"><img src="./cut.png" class="editor" alt="edit task"></a>
                    <a href="#" class="tasks-buttom"><img src="./wrong.png" class="deleter" alt="delete task"></a>
                </div>
            </div>
            <div class="sections">
                <a href="#" class="done-colorful-icon"><img src="./check-mark.png" class="done" alt="done task"></a>
                <a href="#" class="done-black-icon"><img src="./check-mark-black.png" class="done" alt="done task"></a>
                <div class="essay" id="essay-title">
                    <label id="title"><strong>title: ${title.value}</strong></label>
                </div>
                <div class="essay" id="essay-task">
                    <label id="task">task: ${task.value}</label>
                </div>
            </div>
        `;
        addDADHandlers(newForm)
        formHolder.appendChild(newForm);
    }
  
    title.value = "";
    task.value = "";
});//to create or edite a task

formHolder.addEventListener("click", (e) => {
    if (e.target.closest(".editor")) {
        formFocuse(e)
        form.style.display = "flex";

        const taskForm = e.target.closest(".tasks");
        title.value = taskForm.querySelector("#title").textContent.replace("title: ", "").trim();
        task.value = taskForm.querySelector("#task").textContent.replace("task: ", "").trim();
        editingTask = taskForm; // ذخیره تسک در حال ویرایش
    }
});//to appear a window for editing a task

formHolder.addEventListener("click",(e)=>{
    if (e.target.closest(".deleter")) {
        e.preventDefault();
        const taskElement = e.target.closest(".tasks");
        removeTaskFromLocalStorage(taskElement);
        taskElement.remove();
    }

    if(!formHolder.querySelector("form")){
        text.style.display="flex"
    }
})//to delete a task

clearButtom.addEventListener("click",(e)=>{
    formFocuse(e)
    asking.style.display ="flex"//پرسیدن برای مطمعن شدن از حذف تمام تسک ها


    no.addEventListener("click",(e)=>{
        formUnfocused(e)
        asking.style.display="none"
    })// اگر جواب منفی بود چیزی حذف نمیشه

    yes.addEventListener("click",(e)=>{
        let allTasks = formHolder.querySelectorAll(".tasks")
           allTasks.forEach((item)=> item.remove());
           localStorage.clear();

            
           formUnfocused(e)
           asking.style.display="none"


          if(!formHolder.querySelector("form")){
                text.style.display="flex"
          }
    })//اگر جواب مثبت بود همه تسک ها حذف میشوند
    
});//to delete the all task

formHolder.addEventListener("click", (e) => {
    if (e.target.closest(".done-colorful-icon")) {

        const taskElement = e.target.closest(".tasks");
            taskElement.querySelector(".edit-delete").style.display = "none";
            taskElement.querySelector(".done-colorful-icon").style.display="none"
            taskElement.querySelector(".done-black-icon").style.display="block"
            
            taskElement.classList.add("done-task");
    }
});//to mark a task as done

formHolder.addEventListener("click", (e) => {
    if (e.target.closest(".done-black-icon")) {

        const taskElement = e.target.closest(".tasks");
            taskElement.querySelector(".edit-delete").style.display = "flex";
            taskElement.querySelector(".done-colorful-icon").style.display="block"
            taskElement.querySelector(".done-black-icon").style.display="none"

            taskElement.classList.remove("done-task");
              }
});//to mark a task as undone


 //// displays ////
function formFocuse(e){
  e.preventDefault();
  addButtom.style.display = "none";
  clearButtom.style.display = "none";
  q.style.display="none"
  container.style.filter = "blur(3px)";
  container.style.pointerEvents = "none";
}

function formUnfocused(e){
  e.preventDefault();
  addButtom.style.display = "block";
  clearButtom.style.display = "block";
  q.style.display="block"
  container.style.filter = "blur(0px)";
  container.style.pointerEvents = "auto";
}


//// local storage /////
function saveTaskToLocalStorage(taskData) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (!Array.isArray(tasks)) { // بررسی اینکه تسک آرایه است یا خیر
      tasks = []; // اگر آرایه نیست، یک آرایه خالی ایجاد می کنیم
    }
    tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }//to save the tasks in local storage

window.addEventListener("load", () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (!Array.isArray(tasks)) {
      tasks = [];
    }
    tasks.forEach((taskData) => {
      createTaskElement(taskData);
      text.style.display = "none";
    });
  });//to recognize the previous tasks which were in local storage
  
function createTaskElement(taskData) {
    const newForm = document.createElement("form");
    newForm.action = "#";
    newForm.classList.add("tasks");
    
    newForm.innerHTML = `
      <div class="sections">
        <div class="edit-delete">
          <a href="#" class="tasks-buttom"><img src="./cut.png" class="editor" alt="edit task"></a>
          <a href="#" class="tasks-buttom"><img src="./wrong.png" class="deleter" alt="delete task"></a>
        </div>
      </div>
      <div class="sections">
        <a href="#" class="${taskData.done ?  "done-black-icon" : "done-colorful-icon"}"><img src="${taskData.done ? "./check-mark-black.png" : "./check-mark.png"}" class="done" alt="done task"></a>
        <a href="#" class="${taskData.done ? "done-colorful-icon" : "done-black-icon"}" style="display: ${taskData.done ? "block" : "none"}"><img src="${taskData.done ? "./check-mark.png" : "./check-mark-black.png"}" class="done" alt="done task"></a>
        <div class="essay" id="essay-title">
          <label id="title"><strong>title: ${taskData.title}</strong></label>
        </div>
        <div class="essay" id="essay-task">
          <label id="task">task: ${taskData.text}</label>
        </div>
      </div>
    `;
  
    if (taskData.done) {
      newForm.classList.add("done-task");
      newForm.querySelector(".edit-delete").style.display = "none";
      newForm.querySelector(".done-colorful-icon").style.display = "none";
      newForm.querySelector(".done-black-icon").style.display = "block";
    }
  
    addDADHandlers(newForm);
    formHolder.appendChild(newForm);
  };//to create a new task from previous tasks which were in local storage

function updateTaskInLocalStorage(taskElement) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (!Array.isArray(tasks)) {
      tasks = [];
    }
    const titleText = taskElement.querySelector("#title").textContent.replace("title: ", "").trim();
    const taskText = taskElement.querySelector("#task").textContent.replace("task: ", "").trim();
  
    const index = tasks.findIndex(task => task.title && task.text);
    if (index !== -1) {
      tasks[index].title = title.value;
      tasks[index].text = task.value;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }//to update the tasks which were edited in local storage
  
function removeTaskFromLocalStorage(taskElement) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (!Array.isArray(tasks)) {
      tasks = [];
    }
    const titleText = taskElement.querySelector("#title").textContent.replace("title: ", "").trim();
    const taskText = taskElement.querySelector("#task").textContent.replace("task: ", "").trim();
  
    const index = tasks.findIndex(task => task.title === titleText && task.text === taskText);
    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }//to delete the tasks from local storage


 //// drag and drop ////
 function addDADHandlers(element) {
  element.setAttribute('draggable', true);
  element.addEventListener('dragstart', handleDragStart);
  element.addEventListener('dragover', handleDragOver);
  element.addEventListener('dragleave', handleDragLeave);
  element.addEventListener('drop', handleDragDrop);
  element.addEventListener('dragend', handleDragEnd);
}

let dragSrcEl = null; 
function handleDragStart(e) {
    dragSrcEl = e.target;
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.target.classList.add('dragElem');
}//to save the dragged task data

function handleDragOver(e) {
 e.preventDefault();

 e.currentTarget.classList.add('over');

}//to show an effect from the task which is below

function handleDragLeave(e) {
  e.currentTarget.classList.remove('over');
}//to remove an effect from the task which is below

function handleDragDrop(e) {
  let target = e.target.closest('.tasks');
  if (dragSrcEl !== target) {
      target.parentNode.removeChild(dragSrcEl);
      let dropHTML = e.dataTransfer.getData('text/html');
      target.insertAdjacentHTML('afterend', dropHTML);
      addDADHandlers(target.nextSibling);


      updateTasksOrder();
  }

    e.currentTarget.classList.remove('over');
}//to drop a dragged task and remove its first place

function handleDragEnd(e) {
    e.target.classList.remove('dragElem');
}//to remove an effect from the task which is above

function updateTasksOrder() {
  let tasks = [];
  let taskElements = formHolder.querySelectorAll('.tasks');
  taskElements.forEach(taskElement => {
      let titleText = taskElement.querySelector('#title').textContent.replace('title: ', '').trim();
      let taskText = taskElement.querySelector('#task').textContent.replace('task: ', '').trim();
      let done = taskElement.classList.contains('done-task');
      tasks.push({ title: titleText, text: taskText, done: done });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}//to update task`s order in local storage

