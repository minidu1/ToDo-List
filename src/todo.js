import { addToProjectList } from "./project.js";
class Todo {
    constructor({ title, description, dueDate, priority = "low", project = "common" }) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project ;
    }
}

//create the todo
function createTodo(title,description,dueDate,priority,project) {
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
export default function addNewTodo({titleValue, descValue, dateValue, priorityvalue, projectValue}){
    const newTodo = createTodo(titleValue, descValue, dateValue, priorityvalue, projectValue)
    addToProjectList(newTodo) //add todo obj to a project in project.js
}

export function test() {
    // const todo1 = createTodo("Buy milk", "from store", "2024-01-01", "low", "common")
    // const todo2 = createTodo("Finish project", "odin todo", "2024-01-05", "high", "newProj")
    // const todo3 = createTodo("Read book", "chapter 3", "2024-01-03", "medium", "newProj")

    // addToProjectList(todo1)
    // addToProjectList(todo2)
    // addToProjectList(todo3)
}