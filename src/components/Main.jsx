import { useState, useEffect } from "react";
import swal from '@sweetalert/with-react'
import UserInput from "./UserInput";
import TaskList from "./TaskList";


const Main = () => {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [id, setId] = useState('');
    const [err, setErr] = useState('')

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem("TaskList"));
        if (storedList !== null) {
            setTaskList(storedList)
        }
    }, [])

    const saveLocal = (id, value) => {
        localStorage.setItem(id, JSON.stringify(value))
    }

    const addTask = (e) => {
        e.preventDefault();
        if (!task.trim()) {
            setErr("Empty task!");
            return
        }
        setTaskList([...taskList, { id: taskList.length, taskName: task }]);
        saveLocal(`Task#${taskList.length}`, task)
        saveLocal('TaskList', [...taskList, { id: taskList.length, taskName: task }])
        setTask("")
        setErr("")
    };


    const removeTask = (id) => {
        swal(
            {
                title: 'This task will be removed permanently!',
                text: 'Continue?',
                icon: 'warning',
                dangerMode: true,
                buttons: true
            })
            .then((value) => {
                if (value) {
                    const newList = taskList.filter(task => task.id !== id)
                    setTaskList(newList)
                    setEditMode(false)
                    setTask('')
                    swal('Successfully Removed!', '  ', 'success', { buttons: false, timer: 1200 })
                    console.log(`Task#${id}`)
                    localStorage.removeItem(`Task#${id}`)
                    saveLocal(`TaskList`, newList)
                }
            })
    }

    const edit = (task) => {
        setErr('')
        editMode ? setErr('Already Editing!') : setEditMode(true)
        setTask(task.taskName)
        setId(task.id)
    }

    const editTask = (e) => {
        e.preventDefault();
        if (!task.trim()) {
            setErr("Empty task!");
            return;
        }
        const editedTask = taskList.map(item => item.id === id ? { id: id, taskName: task } : item)
        setTaskList(editedTask)
        setEditMode(false)
        setTask('')
        setId('')
        setErr('')
        saveLocal(`Task#${id}`, task)
        saveLocal(`TaskList`, editedTask)
    }

    const cancelEdit = (e) => {
        e.preventDefault()
        setTask('')
        setErr('')
        setEditMode(false)
    }

    const clearList = () => {
        swal({
            title: 'The tasks list will be cleared permanently!',
            text: 'Continue?',
            icon: 'warning',
            dangerMode: true,
            buttons: true
        })
            .then((value) => {
                if (value) {
                    setTaskList("")
                    setEditMode(false)
                    setTask('')
                    swal('Successfully Cleared!', '  ', 'success', { buttons: false, timer: 1200 })
                    localStorage.clear()
                }
            })
    }


    return (
        <div className="row">
            <UserInput editMode={editMode} editTask={editTask} addTask={addTask} setTask={setTask} task={task} err={err} cancelEdit={cancelEdit} taskList={taskList} clearList={clearList} />

            <TaskList taskList={taskList} removeTask={removeTask} edit={edit} />

        </div>
    )
}
export default Main