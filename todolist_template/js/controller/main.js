import Task from "../models/TaskManager.js";
import TaskList from "../models/TaskList.js";

let taskList = new TaskList();

const getEle = selector => document.querySelector(selector);



// Lưu trữ data vào local storage
const setLocalStorageTask = () => {
    localStorage.setItem('arrTask', JSON.stringify(taskList.arrTask))
};
const setLocalStorageComplete = () => {
    localStorage.setItem('arrComplete', JSON.stringify(taskList.arrTaskCompleted))
};

const getLocalStorageTask = () => {
    if (localStorage.getItem('arrTask')) {
        taskList.arrTask = JSON.parse(localStorage.getItem('arrTask'))
    }
    renderTask(taskList.arrTask)
};
const getLocalStorageComplete = () => {
    if (localStorage.getItem('arrComplete')) {
        taskList.arrTaskCompleted = JSON.parse(localStorage.getItem('arrComplete'))
    }
    renderCompelte(taskList.arrTaskCompleted)
};



const renderTask = (arrTask) => {
    let content = '';
    arrTask.map((item, index) => {
        content += `
        <li>
            <span>${item.task}</span>
            <div class="buttons">
                <button class="remove"  onclick="deleteTask(${index})"><i class=" fa fa-trash-alt"></i></button>
                <button class="complete"  onclick="checkComplete(${index})"><i class=" fa fa-check"></i></button>
            </div>
        </li>
        `;
    });

    getEle('#todo').innerHTML = content;
};

const renderCompelte = (arrComplete) => {
    let content = '';

    arrComplete.map((item, index) => {
        content += `
        <li>
            <span>${item.task}</span>
            <div class="buttons">
                <button class="remove"  onclick="deleteTaskComplete(${index})"><i class="far fa fa-trash-alt"></i></button>
                <button class="complete"><i class="fas fa fa-check"></i></button>
            </div>
        </li>
        `;
    });

    getEle('#completed').innerHTML = content;
};
getLocalStorageTask();
getLocalStorageComplete();

const getTask = () => {
    let newTask = getEle('#newTask').value;
    if (!newTask) {
        noteNewTask.innerHTML = "Task input is empty";
    } else {
        noteNewTask.innerHTML = "";
        const task = new Task(newTask);
        taskList.addTask(task);
        setLocalStorageTask();
        renderTask(taskList.arrTask);

    }

}
getEle('#addItem').addEventListener('click', getTask);
// getEle('#newTask').addEventListener('keydown', getTask);

const deleteTask = (index) => {
    taskList.deleteTask(index);
    renderTask(taskList.arrTask);
    setLocalStorageTask();
};
const deleteTaskComplete = index => {
    taskList.deleteTaskComplete(index);
    renderCompelte(taskList.arrTaskCompleted);
    setLocalStorageComplete();
};


const renderAll = () => {
    renderTask(taskList.arrTask);
    setLocalStorageTask();
    renderCompelte(taskList.arrTaskCompleted);
    setLocalStorageComplete();
};


const checkComplete = index => {
    taskList.checkComplete(index);
    renderAll();
};


const checkAll = () => {
    taskList.checkAll();
    renderAll();
}
getEle('#one').addEventListener('click', checkAll);

// Sort A->Z
const sortAZ = () => {
    taskList.sortAZ();
    renderAll();
}
getEle('#two').addEventListener('click', sortAZ);


// Sort Z->A
const sortZA = () => {
    taskList.sortZA();
    renderAll();
}
getEle('#three').addEventListener('click', sortZA);


let arrTask = taskList.arrTask

window.deleteTaskComplete = deleteTaskComplete
window.checkComplete = checkComplete
window.deleteTask = deleteTask