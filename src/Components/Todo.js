import React, { useState, useEffect } from 'react'
import CreateTask from './CreateTask'
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Todo() {

    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    const [taskNumber, setTaskNumber] = useState(0)
    const [CompletedtaskNumber, setCompletedTaskNumber] = useState(0)
    const toggle = () => setModal(!modal);




    useEffect(() => {
        let myTaskStorage = localStorage.getItem('tasks')
        let tasks = JSON.parse(myTaskStorage)
        let myTaskNumberStorage = parseInt(localStorage.getItem('taskNumber'),10)
        let number =myTaskNumberStorage
        setTaskList(tasks)
        setTaskNumber(number)
    }, [])


        const UpdateListArray = (obj, index) =>{
            let temp = taskList
            let tempNumber = taskNumber
            temp[index] = obj
            localStorage.setItem('tasks', JSON.stringify(temp))
            localStorage.setItem('taskNumber', tempNumber)
            setTaskList(temp)
            setTaskNumber(tempNumber)
            window.location.reload(false);

        }

    let id = 0
    const SaveTask = (objectTask) => {
        let temp = taskList
        let tempNumber = taskNumber
        temp.push(objectTask)
        let NewtempNumber= tempNumber + 1 
        localStorage.setItem('tasks', JSON.stringify(temp))
        localStorage.setItem('taskNumber', tempNumber + 1)
        setTaskList(temp)
        setTaskNumber(NewtempNumber)
        setModal(false)
    }

    const deleteTask = (index)=>{
        let temp = taskList
        let tempNumber = taskNumber
        temp.splice(index, 1)
        tempNumber -= 1 
        localStorage.setItem('tasks', JSON.stringify(temp))
        localStorage.setItem('taskNumber', tempNumber)
        setTaskList(temp)
        setTaskNumber(tempNumber)
        window.location.reload(false);
    }
    const handleComplete = (obj, index) => {
        let temp = taskList
        let tempNumber = taskNumber
        let tempCompleted = CompletedtaskNumber
        temp[index] = obj
        setTaskList(temp)
        localStorage.setItem('tasks', JSON.stringify(temp))
        localStorage.setItem('taskNumber', tempNumber)
        localStorage.setItem('CompletedTaskNumber', tempCompleted)
        setTaskList(temp)
        setTaskNumber(tempNumber)
        setCompletedTaskNumber(tempCompleted)
        window.location.reload(false);
    }



    return (
        <>
            <div className="header-Container" >
                <h2>Your ToDo Tasks</h2>
                <button className="button" onClick={() => setModal(true)}>Create new task <i className="fas fa-plus-circle"></i></button>
                <h4 className="numberTask">Number of Tasks <span> {taskNumber} </span> </h4>
            </div>
            <div className="Tasks-Container">
                {taskList.map((obj, index) => {
                    return (
                        <div key={`${id += 1}`} className="Card-wrapper mr-5">
                            <Card obj={obj} setModal={setModal} index={index} deleteTask={deleteTask} updateListArray={UpdateListArray} handleComplete={handleComplete}/>
                        </div>)

                })}
            </div>
            <CreateTask modal={modal} toggle={toggle} save={SaveTask} />

        </>
    )
}
