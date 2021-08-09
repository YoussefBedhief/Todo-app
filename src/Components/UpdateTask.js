import React, {useState, useEffect} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default function UpdateTask({ modal, toggle, update, obj }) {

    const [taskName, setTaskName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(()=>{
        setTaskName(obj.name)
        setDescription(obj.description)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        name === 'description' ? setDescription(value) : setTaskName(value)
    }

    
    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObject = {}
        tempObject["name"] = taskName
        tempObject["description"] = description
        tempObject["isComplete"] = false
        update(tempObject)
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update this task</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label>Task Name</label>
                            <input type="text" className="form-control" placeholder="Task Name" value={taskName} name="Task Name" onChange={handleChange} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label>Description</label>
                            <textarea rows='5' className="form-control" placeholder="Description" value={description} name="description" onChange={handleChange} />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button style={{backgroundColor: "#7e1f9d"}} onClick={handleUpdate} >Update</Button>
                    <Button onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}