const TaskItem = ({ task, removeTask, edit }) => {
    return (
        <li className="list-group-item text-dark text-capitalize mb-2 shadow bg">
            <span className="lead font-weight-bold header">{task.taskName}</span>
            <button onClick={() => removeTask(task.id)} className="btn btn-danger btn-sm float-right mx-2">
                Remove
            </button>
            <button onClick={() => edit(task)} className="btn btn-warning btn-sm float-right">
                Edit
            </button>
        </li>
    )
}
export default TaskItem