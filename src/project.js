import { todoList } from "./todo.js";
const projectList = {}

function CreateNewProject(name){
    projectList[name] =[]
}



export function test() {
    CreateNewProject("one")
    CreateNewProject("hello")
    console.log(projectList)

    // console.log(project.prj1)
    // console.log(second[0])
}

// let project ={ prj1:[{}, 2], prj2 : []}
// let second = [{p1:[1,2]}, {p2:[]}]