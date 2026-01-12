let tasksList = [
    "Сделать проектную работу",
    "Полить цветы", 
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

const taskContainer = document.querySelector(".to-do__list");
const taskForm = document.querySelector(".to-do__form");
const taskInput = document.querySelector(".to-do__input");

function initializeTasks() {
    const storedTasks = localStorage.getItem("taskData");
    return storedTasks ? JSON.parse(storedTasks) : tasksList.slice();
}

function generateTaskElement(taskContent) {
    const taskTemplate = document.getElementById("to-do__item-template");
    const taskNode = taskTemplate.content.querySelector(".to-do__item").cloneNode(true);
    const contentSpan = taskNode.querySelector(".to-do__item-text");
    const removeBtn = taskNode.querySelector(".to-do__item-button_type_delete");
    const copyBtn = taskNode.querySelector(".to-do__item-button_type_duplicate");
    const modifyBtn = taskNode.querySelector(".to-do__item-button_type_edit");

    contentSpan.innerText = taskContent;

    removeBtn.onclick = () => {
        taskNode.remove();
        updateStorage();
    };

    copyBtn.onclick = () => {
        const currentContent = contentSpan.textContent;
        const clonedTask = generateTaskElement(currentContent);
        taskContainer.prepend(clonedTask);
        updateStorage();
    };

    modifyBtn.onclick = () => {
        contentSpan.contentEditable = "true";
        contentSpan.focus();
    };

    contentSpan.addEventListener("focusout", () => {
        contentSpan.contentEditable = "false";
        updateStorage();
    });

    return taskNode;
}

function extractTasksFromPage() {
    const contentElements = taskContainer.querySelectorAll('.to-do__item-text');
    return Array.from(contentElements).map(el => el.textContent);
}

function updateStorage() {
    const currentTasks = extractTasksFromPage();
    localStorage.setItem('taskData', JSON.stringify(currentTasks));
}

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const userInput = taskInput.value.trim();
    
    if (userInput.length > 0) {
        const newTask = generateTaskElement(userInput);
        taskContainer.prepend(newTask);
        updateStorage();
        taskInput.value = "";
    }
});

tasksList = initializeTasks();
tasksList.forEach(taskContent => {
    const taskElement = generateTaskElement(taskContent);
    taskContainer.appendChild(taskElement);
});