import addNewTodo from "./todo.js"

export function setupButtons() {
    const addTodoBtn = document.querySelector(".add-new-todo")
    const cancelBtn = document.querySelector(".cancel")
    // const createBtn = document.querySelector(".create")
    const form = document.querySelector(".todo-form")

    addTodoBtn.addEventListener("click", showAddTodoForm)
    cancelBtn.addEventListener("click", cancelForm)
    form.addEventListener("submit", createTodo)
    // createBtn.addEventListener("click", hideForm)
}
//show form when click the add todo button
function showAddTodoForm(){
    const modal = document.querySelector("#todoModal")
    modal.classList.remove("hidden")
}
//hide form when click cancel or create
function hideForm(){
    const modal = document.querySelector("#todoModal")
    modal.classList.add("hidden") 
}

function resetForm(){
    const form = document.querySelector(".todo-form")
    form.reset()
}

function createTodo(e){
    const isValid = validateForm(e)
    if(!isValid) return //stop function running if form isnt validated

    const titleValue = document.querySelector("#todo-title").value.trim()
    const descValue = document.querySelector("#todo-desc").value.trim()
    const dateValue = document.querySelector("#todo-due").value
    const priorityvalue = document.querySelector("#todo-priority").value
    const projectValue = document.querySelector("#todo-project").value.trim() || "common" //use project as common if empty string
    // call addNewTodo in todo.js
    addNewTodo(titleValue,descValue, dateValue, priorityvalue, projectValue)

    resetForm()
}

function setError(element, message){
    //select parent element of the element that have error
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector(".error") //Select error div created for show error msg
    
    errorDisplay.innerText = message 
    inputControl.classList.add("error") //add parent a .error class so error css work
}

//reset to normal status if user input correct data
function setSuccess(element){
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector(".error")
    
    errorDisplay.innerText =""
    inputControl.classList.remove("error")
}

function cancelForm(){
    resetForm()
    hideForm()
}

function validateForm(e){
    e.preventDefault()
    const title = document.querySelector("#todo-title")
     if (title.value.trim() == ""){
        setError(title, "Title is required")
        return false
     } else{
        setSuccess(title)
        hideForm()
        return true
     }
}