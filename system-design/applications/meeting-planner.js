class Sprint{
    begin;
    end;
    name;
    tasks=[];

    constructor(begin,end,name){
        this.begin = begin;
        this.end = end;
        this.name = name;
    }

    addTask(task){
        this.tasks.push(task);
    }

    printDetails(){
        console.log(`Sprint name: ${this.name}\n Sprint Begin: ${this.begin}\n Sprint end: ${this.end}`)
    }

}

class User{
    taskList = [];
    sprintList = [];
    changeStatus;

    createTask(taskType){
        if(taskType === "STORY"){
            console.log("warning! Task of type STORY is being created with no subract")
        }
        let task;
        task.setTaskType(taskType);
        task.setUser(this);
        this.taskList.push(task);
        return task;
    }

    createSprint(begin,end,s_name){
        let newSprint = new Sprint(begin,end,s_name);
        this.sprintList.push(newSprint);
        return newSprint;
    }

    addToSprint(sprint,task){
        for(let sprint of this.sprintList){

        }
    }

    removeFromSprint(sprint,task){

    }

    changeStatus(task,taskStatus){
        for(let singletask of this.taskList){
            if(singletask.id === task.id){
                task.taskStatus = taskStatus;
                return task.status;
            }
        }
        return false;
    }

    printAllTasks(){
        for(let task of this.taskList){
            console.log("task",task);
        }
    }

}

class Task{
    id;
    subtract;
    user;
    taskType; //STORY, FEATURE, BUG
    taskStatus;//OPEN, IN_PROGRESS, RESOLVED, DELAYED, COMPLETED

    constructor(){
        this.id = this.getUniqueId();
        this.taskStatus = "OPEN";
    }

    getId(){
        return thid.id;
    }

    getUniqueId(){
        let taskId = 1;
        return taskId++;
    }

    setSubtract(){

    }

    setTaskStatus(){

    }

    setTaskType(){

    }

    setUser(){

    }

    setSubtract(){

    }
}

main();

const main = ()=>{
    console.log("Meeting Planner started");
}