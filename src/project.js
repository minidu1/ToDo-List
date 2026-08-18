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

export function deleteProject(projectId){
    const projects = getAllProjects()
    for(const project of projects){
        if (projectId === project.id){
            delete projectList[project.name]
            saveProjects()
            
            return
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
