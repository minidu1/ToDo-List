import { addToProjectList } from "./project.js";
class Todo {
    constructor({ title, description, dueDate, priority = "low", project = "common" }) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

// export const todoList = []

function createTodo(title,description,dueDate,priority,project) {
    const todoItem = new Todo({
        title,
        description,
        dueDate,
        priority,
        project
    })
    return todoItem //return obj to getInput
}

function addTodoToList(){
    const newTodo = getInputs() //need a returned obj
    todoList.push(newTodo)
}

export function test() {
    const todo1 = createTodo("Buy milk", "from store", "2024-01-01", "low", "common")
    const todo2 = createTodo("Finish project", "odin todo", "2024-01-05", "high", "newProj")
    const todo3 = createTodo("Read book", "chapter 3", "2024-01-03", "medium", "newProj")

    addToProjectList(todo1)
    addToProjectList(todo2)
    addToProjectList(todo3)
}