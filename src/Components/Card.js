import React, { useState } from 'react'
import UpdateTask from './UpdateTask'

export default function Card({ obj, deleteTask, index, updateListArray, handleComplete }) {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal);

    let randomColor = `rgb(${Math.floor(Math.random() * 255) + index},${Math.floor(Math.random() * 255) + index},${Math.floor(Math.random() * 255) + index})`
    const handleDelete = () => {
        deleteTask(index)
    }

    const Update = (objectTask) => {
        updateListArray(objectTask, index);
    }
    const Completed = () => {
        let tempObject = {}
        tempObject["name"] = obj.name
        tempObject["description"] = obj.description
        tempObject["isComplete"] = !obj.isComplete
        handleComplete(tempObject, index)
    }

    return (

        <div>
            <div className="card-top" style={{ "backgroundColor": randomColor }}></div>
            <div className="task-holder">
                <div className="card-header" style={{ "borderRadius": "10px", "padding": "1px 1px", "backgroundColor": randomColor }}>
                    <span >{obj.name}</span>
                </div>
                <div style={{ "color": randomColor, "cursor": "pointer" }} onClick={Completed}>
                    {obj.isComplete ? <i className="fas fa-check"></i> : <i className="fas fa-hourglass-half"></i>}
                </div>
                <p className="mt-3">{obj.description}</p>

                <div className="task-option">
                    <i className="far fa-edit mr-3" style={{ "color": randomColor, "cursor": "pointer", "margin": "0 5px" }} onClick={() => setModal(true)}></i>
                    <i className="fas fa-trash-alt" style={{ "color": randomColor, "cursor": "pointer" }} onClick={handleDelete}></i>
                </div>

            </div>
            <UpdateTask modal={modal} toggle={toggle} update={Update} obj={obj} />
        </div>
    )
}
