import { addToProjectList, getAllProjects, saveProjects } from "./project.js";
class Todo {
    constructor({ title, description, dueDate, priority = "low", project = "common" }) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.completed = false
        this.id = crypto.randomUUID()
    }
}

//create the todo
function createTodo(title, description, dueDate, priority, project) {
    const todoItem = new Todo({ //call todo class
        title,
        description,
        dueDate,
        priority,
        project
    })
    return todoItem //return obj to getInput
}

//get user entered data from ui form
export default function addNewTodo({ titleValue, descValue, dateValue, priorityvalue, projectValue }) {
    const newTodo = createTodo(titleValue, descValue, dateValue, priorityvalue, projectValue)
    const projectId = addToProjectList(newTodo) //catch the project id returning in addToProjectList
    newTodo.projectId = projectId
    return (newTodo)
}

export function deleteTodo(todoId) {

    for (const project of getAllProjects()) { //get the project obj from getAllProjects()
        const index = project.data.findIndex(todo => todo.id === todoId) //find the index of deleting todoid on every project(-1 if index not found)

        if (index !== -1) {
            project.data.splice(index, 1) //Remove the todo from the project, Because projects are objects, this project in getAllProjects() aarray is a reference to real project
            saveProjects() //Save the Projects. bcs of reference deleting a project from this array will also delete the project from main array
            return true
        }
    }
    return false
}

export function findTodo(todoId) {
    const todos = getAllTodos()
    for (const todo of todos) {
        if (todo.id === todoId) {
            return todo
        }
    }
    return -1
}

export function getAllTodos() {
    const projects = getAllProjects() //give all project name isnside an array
    const todos = []
    for (const project of projects) {
        for (const todo of project.data) {
            todos.push(todo)
        }
    }
    return todos
}

export function editTodo(todoId, newValues) {
    const todo = findTodo(todoId)

    if (todo.project !== newValues.projectValue) {
        deleteTodo(todoId)
        addNewTodo(newValues)
    }
    else {
        todo.title = newValues.titleValue
        todo.dueDate = newValues.dateValue
        todo.description = newValues.descValue
        todo.priority = newValues.priorityvalue
    }

    saveProjects()
}

export function test() {
    // const todo1 = createTodo("Buy milk", "from store", "2024-01-01", "low", "common")
    // const todo2 = createTodo("Finish project", "odin todo", "2024-01-05", "high", "newProj")
    // const todo3 = createTodo("Read book", "chapter 3", "2024-01-03", "medium", "newProj")

    // addToProjectList(todo1)
    // addToProjectList(todo2)
    // addToProjectList(todo3)
}