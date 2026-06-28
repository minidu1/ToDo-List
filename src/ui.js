import addNewTodo from "./todo.js"
import { getAllTodos } from "./project.js"

export function setupButtons() {
    const addTodoBtn = document.querySelector(".add-new-todo")
    const cancelBtn = document.querySelector(".cancel")
    // const createBtn = document.querySelector(".create")
    const form = document.querySelector(".todo-form")

    addTodoBtn.addEventListener("click", showAddTodoForm)
    cancelBtn.addEventListener("click", cancelForm)
    form.addEventListener("submit", handleSubmit)
    // createBtn.addEventListener("click", hideForm)
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

export function createTodoCards(){
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
    checkbox.type= "checkbox"
    titleSpan.classList.add("title")
    dateSpan.classList.add("date")
    deleteBtn.classList.add("action-btn", "delete")
    editBtn.classList.add("action-btn", "edit")
    editIcon.classList.add("fa-regular", "fa-pen-to-square")
    deleteIcon.classList.add("fa-regular", "fa-trash-can")

    titleSpan.textContent = "title bro"
    dateSpan.textContent = "sada"

    checkAreaLabel.append(checkbox, titleSpan)
    editBtn.appendChild(editIcon)
    deleteBtn.appendChild(deleteIcon)
    todoDiv.append(checkAreaLabel, dateSpan, editBtn, deleteBtn)
    mainListSec.appendChild(todoDiv)
}


function handleSubmit(e) {
    const isValid = validateForm(e)
    if (!isValid) return //stop function running if form isnt validated

    const values  = getValues()
    addNewTodo(values)
    
    resetForm()
}