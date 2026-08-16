import { id } from "date-fns/locale"

const projectList = JSON.parse(localStorage.getItem("projects")) || {}

export function saveProjects(){
    localStorage.setItem("projects", JSON.stringify(projectList))
}

function createNewProject(name) {
    projectList[name] = {
        data: [],
        id: crypto.randomUUID(),
        name: name
    }
}

//check todo's project already in projectList, if not add it to project list
function ensureProjectExist(todo) {
    if (todo.project in projectList) { //check is project of todo already in the list
    }
    else {
        createNewProject(todo.project)
    }
}

export function addToProjectList(todo) {
    ensureProjectExist(todo)
    projectList[todo.project].data.push(todo) // add new todo to projectlist(inside the project user gave [todo.project])
    saveProjects()
    return projectList[todo.project].id
}

export function getAllProjects() {
    const projects = []
    for (const project in projectList) {
        projects.push(projectList[project])
    }
    return projects
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

export function deleteTodo(todoId){

    for (const project of getAllProjects()){ //get the project obj from getAllProjects()
       const index =  project.data.findIndex( todo => todo.id === todoId) //find the index of deleting todoid on every project(-1 if index not found)

       if (index !== -1){ 
         project.data.splice(index, 1) //Remove the todo from the project, Because projects are objects, this project in getAllProjects() aarray is a reference to real project
         saveProjects() //Save the Projects. bcs of reference deleting a project from this array will also delete the project from main array
         return true
       }
    }
    return false
}

export function test() {
    // console.log("final project list  ",projectList)
    // getAllProjects()
    // getAllTodos()

    // console.log(projectList)

}
