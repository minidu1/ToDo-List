import addNewTodo, {deleteTodo, editTodo, findTodo, getAllTodos} from "./todo.js"
import { getAllProjects, saveProjects,  } from "./project.js"
import { isToday, isThisWeek } from "date-fns"
import { vi } from "date-fns/locale"

let activeProject = "home"
let formMode = "create"
let activeTodo = null

export function setupButtons() {
    const addTodoBtn = document.querySelector(".add-new-todo")
    const cancelBtn = document.querySelector(".cancel")
    const form = document.querySelector(".todo-form")
    const navButtons = document.querySelectorAll(".nav-btn")

    addTodoBtn.addEventListener("click", showAddTodoForm)
    cancelBtn.addEventListener("click", cancelForm)
    form.addEventListener("submit", handleSubmit) //pass "create" param
    globalEventListner("click", ".nav-btn", navBtnEventHandler)
    globalEventListner("click", ".project-item", projectEventHandler)
    globalEventListner("click", "input[type='checkbox']", toggleCompleted)
    globalEventListner("click", ".delete", handleDelete)
    globalEventListner("click", ".edit", handleEdit)
}
//show form when click the add todo button
function showAddTodoForm() {
    const modal = document.querySelector("#todoModal")
    modal.classList.remove("hidden")

    formMode = "create"
    const createBtn = document.querySelector(".create")
    createBtn.textContent = "Create"
}
//hide form when click cancel or create
function hideForm() {
    const modal = document.querySelector("#todoModal")
    modal.classList.add("hidden")
}

function resetForm() {
    const form = document.querySelector(".todo-form")
    form.reset()
}

function createNavBtn(projectName, projectId) {
    const projectListDiv = document.querySelector(".project-list")

    // container so we can have a project button and a separate delete button
    const container = document.createElement("div")
    container.classList.add("project-item-wrap")

    const projectBtn = document.createElement("button")
    projectBtn.classList.add("btn", "project-item")
    projectBtn.dataset.projectId = projectId
    projectBtn.textContent = projectName

    // delete UI button for projects (no delete logic here)
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("project-delete")
    deleteBtn.dataset.projectId = projectId
    deleteBtn.setAttribute("aria-label", `Delete project ${projectName}`)
    // optional icon (uses same icon classes as elsewhere in the app)
    const deleteIcon = document.createElement("i")
    deleteIcon.classList.add("fa-regular", "fa-trash-can")
    deleteBtn.appendChild(deleteIcon)

    container.append(projectBtn, deleteBtn)
    projectListDiv.appendChild(container)
}

function getValues(e) {
    const titleValue = document.querySelector("#todo-title").value.trim()
    const descValue = document.querySelector("#todo-desc").value.trim()
    const dateValue = document.querySelector("#todo-due").value
    // const date = new Date(dateValue)
    const priorityvalue = document.querySelector("#todo-priority").value
    const projectValue = document.querySelector("#todo-project").value.trim() || "common" //use project as common if empty string
    // call addNewTodo in todo.js
    return { titleValue, descValue, dateValue, priorityvalue, projectValue }
}

function setError(element, message) {
    //select parent element of the element that have error
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector(".error") //Select error div created for show error msg

    errorDisplay.innerText = message
    inputControl.classList.add("error") //add parent a .error class so error css work
}

//reset to normal status if user input correct data
function setSuccess(element) {
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector(".error")

    errorDisplay.innerText = ""
    inputControl.classList.remove("error")
}

function cancelForm() {
    resetForm()
    hideForm()
}

function validateForm(e) {
    e.preventDefault()
    const title = document.querySelector("#todo-title")
    if (title.value.trim() == "") {
        setError(title, "Title is required")
        return false
    } else {
        setSuccess(title)
        hideForm()
        return true
    }
}

function clearCards() {
    const mainListSec = document.querySelector(".main-list")
    mainListSec.textContent = ""
}

function createTodoCard(todo) {
    // console.log(todo)
    const { title, description, dueDate, priority, project, id, completed } = todo
    const mainListSec = document.querySelector(".main-list")
    const todoDiv = document.createElement("div")
    const checkAreaLabel = document.createElement("label")
    const checkbox = document.createElement("input")
    const titleSpan = document.createElement("span")
    const dateSpan = document.createElement("span")
    const editBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")
    const editIcon = document.createElement("i")
    const deleteIcon = document.createElement("i")

    todoDiv.classList.add("todo", `${todo.priority}-priority`)
    todoDiv.dataset.todoId = id
    checkAreaLabel.classList.add("check-area")
    checkbox.type = "checkbox"
    titleSpan.classList.add("title")
    dateSpan.classList.add("date")
    deleteBtn.classList.add("action-btn", "delete")
    editBtn.classList.add("action-btn", "edit")
    editIcon.classList.add("fa-regular", "fa-pen-to-square")
    deleteIcon.classList.add("fa-regular", "fa-trash-can")

    titleSpan.textContent = title
    if (dueDate == "") {
        dateSpan.textContent = "Unknown"
    }
    else { dateSpan.textContent = dueDate }

    //check the checkbox if todo object completed property is true
    checkbox.checked = completed // true or false


    checkAreaLabel.append(checkbox, titleSpan)
    editBtn.appendChild(editIcon)
    deleteBtn.appendChild(deleteIcon)
    todoDiv.append(checkAreaLabel, dateSpan, editBtn, deleteBtn)
    mainListSec.appendChild(todoDiv)
}

function createHome(todos) {
    todos.forEach(createTodoCard)

}

function createToday(todos) {
    const filteredTodos = todos.filter(todo => filterToday(todo))
    filteredTodos.forEach(createTodoCard)
}

function createWeek(todos) {
    const filteredTodos = todos.filter(todo => filterWeek(todo))
    filteredTodos.forEach(createTodoCard)
}

function createProject(filter) {
    const filteredProject = filterProject(filter)
    filteredProject.data.forEach(createTodoCard)
}

function filterToday(todo) {
    const todoDate = new Date(todo.dueDate)
    return isToday(todoDate)
}

function filterWeek(todo) {
    const todoDate = new Date(todo.dueDate)
    return isThisWeek(todoDate)
}

function filterProject(filter) {
    const projects = getAllProjects()

    return projects.find(project => project.id === filter) || "none";
}

function renderTodos(filter) {
    clearCards()
    const todos = getAllTodos()
    const projects = getAllProjects()

    //filter the wanted todos
    const views = {
        home: createHome,
        today: createToday,
        week: createWeek
    }
    if (views[filter]) { //select the filter function from views
        views[filter](todos) //run the function with param
    }
    //if user select a project
    else {
        createProject(filter)
    }
}

function shouldRender(todo) {
    if (activeProject === todo.projectId) return true
    if (activeProject === "home") return true
    if (activeProject === "week") return isThisWeek(todo.dueDate)
    if (activeProject === "today") return isToday(todo.dueDate)
}

function handleSubmit(e) {
    const isValid = validateForm(e)
    if (!isValid) return //stop function running if form isn't validated

    const values = getValues()

    if (formMode === "create") {
        const newTodo = addNewTodo(values) //go to todo.js and create a todo obj
        if (shouldRender(newTodo)) { renderTodos(activeProject) } // check if new todo is going to current opend project and if true, render it aouto
        renderNavBar()
    }
    else if(formMode === "edit"){
        const editedTodo = editTodo(activeTodo,values)
        renderTodos(activeProject)
        renderNavBar()
    }
    else{
        alert("Create button error")
    }

    resetForm()
}

function clearNavBar(){
   const projectListDiv = document.querySelector(".project-list")
   projectListDiv.textContent = ""
}

function renderNavBar() {
    clearNavBar()
    const projects = getAllProjects()
    projects.forEach(project => {
        createNavBtn(project.name, project.id)
    })
}

function getTodoId(e) {
    const todoCard = e.target.closest(".todo")
    const todoId = todoCard?.dataset.todoId
    return todoId
}
function toggleCompleted(e) {
    const todoId = getTodoId(e)
    if (!todoId) return

    const todos = getAllTodos()
    const todo = todos.find(todo => todo.id === todoId);

    if (todo) {
        todo.completed = e.target.checked
        saveProjects()
    }
}

function handleDelete(e) {
    const todoId = getTodoId(e)
    deleteTodo(todoId)
    renderTodos(activeProject)
}

function populateTodoForm(e) {
    const todoId = getTodoId(e)
    const todo = findTodo(todoId)

    const title = document.querySelector("#todo-title").value = todo.title
    document.querySelector("#todo-desc").value = todo.description
    document.querySelector("#todo-due").value = todo.dueDate
    document.querySelector("#todo-priority").value = todo.priority
    document.querySelector("#todo-project").value = todo.project

    const createBtn = document.querySelector(".create")
    createBtn.textContent = "edit"
}

function handleEdit(e) {
    showAddTodoForm()
    populateTodoForm(e)
    formMode = "edit"
    activeTodo = getTodoId(e)
}

//add global event listner on document so new buttons also get the listner and can use for any button
function globalEventListner(type, selector, callback) { //type=click , selector is the button we need, callback function.(eventlistners blog webdevsimplified)
    document.addEventListener(
        type,
        e => {
            if (e.target.closest(selector)) callback(e) //methana {} danna one na ekama peliya nisa
        }
    )
}

// Create Home,Today, This week by using dat-* in html
function navBtnEventHandler(e) {
    activeProject = e.target.dataset.filter
    renderTodos(activeProject)
}
//create project todos by using project id
function projectEventHandler(e) {
    activeProject = e.target.dataset.projectId
    renderTodos(activeProject)
}

function colorTodoPriority(){

}


export function test() {
    setupButtons()
    renderTodos("home")
    renderNavBar()
}
// new project ekak haduwaama new project eka auto refresh une na