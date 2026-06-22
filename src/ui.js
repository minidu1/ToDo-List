export function setupButtons() {
    const addTodoBtn = document.querySelector(".add-new-todo")
    const cancelBtn = document.querySelector(".cancel")
    // const createBtn = document.querySelector(".create")
    const form = document.querySelector(".todo-form")

    addTodoBtn.addEventListener("click", showAddTodoForm)
    cancelBtn.addEventListener("click", hideForm)
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

}

function createTodo(e){
    validateForm(e)
}

function setError(element, message){
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector(".error")
    
    errorDisplay.innerText = message
    inputControl.classList.add("error")
}

function setSuccess(element){
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector(".error")
    
    errorDisplay.innerText =""
    inputControl.classList.remove("error")
}

function validateForm(e){
    e.preventDefault()
    const title = document.querySelector("#todo-title")
     if (title.value.trim() == ""){
        setError(title, "Title is required")
     } else{
        setSuccess(title)
        hideForm()
     }
}