import addNewTodo from "./todo.js"
import { getAllTodos } from "./project.js"
import { isToday, isThisWeek } from "date-fns"
import { vi } from "date-fns/locale"

let activeProject = "home"

export function setupButtons() {
    const addTodoBtn = document.querySelector(".add-new-todo")
    const cancelBtn = document.querySelector(".cancel")
    const form = document.querySelector(".todo-form")
    const navButtons = document.querySelectorAll(".nav-btn")

    addTodoBtn.addEventListener("click", showAddTodoForm)
    cancelBtn.addEventListener("click", cancelForm)
    form.addEventListener("submit", handleSubmit)
    globalEventListner("click", ".nav-btn", navBtnEventHandler)
    globalEventListner("click", ".project-item", projectEventHandler)
}
//show form when click the add todo button
function showAddTodoForm() {
    const modal = document.querySelector("#todoModal")
    modal.classList.remove("hidden")
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

function getValues(e) {


    const titleValue = document.querySelector("#todo-title").value.trim()
    const descValue = document.querySelector("#todo-desc").value.trim()
    const dateValue = document.querySelector("#todo-due").value
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
    const { title, description, dueDate, priority, project } = todo
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

    todoDiv.classList.add("todo")
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

function filterToday(todo) {
    const todoDate = new Date(todo.dueDate)
    return isToday(todoDate)
}

function filterWeek(todo) {
    const todoDate = new Date(todo.dueDate)
    return isThisWeek(todoDate)
}

function renderTodos(filter) {
    clearCards()
    const todos = getAllTodos()

    //filter the wanted todos
    const views = {
        home: createHome,
        today: createToday,
        week: createWeek
    }
    if (views[filter]) {
        views[filter](todos)
    }
    else {
        
    }
}

function handleSubmit(e) {
    const isValid = validateForm(e)
    if (!isValid) return //stop function running if form isnt validated

    const values = getValues()
    addNewTodo(values) //go to todo.js and create a todo obj

    if (activeProject === values.projectValue) {
        // need to call the project making 
    }
    resetForm()
}

//add global event listner on document so new buttons also get the listner and can use for any button
function globalEventListner(type, selector, callback) { //type=click , selector is the button we need, callback function.(eventlistners blog webdevsimplified)
    document.addEventListener(
        type,
        e => {
            if (e.target.matches(selector)) callback(e) //methana {} danna one na ekama peliya nisa
        }
    )
}

function navBtnEventHandler(e) {
    activeProject = e.target.dataset.filter
    renderTodos(activeProject)
}

function projectEventHandler(e) {
    activeProject = e.target.dataset.id
    renderTodos(activeProject)
}

export function test() {
    setupButtons()
    // createTodoCard()
    renderTodos("home")
}