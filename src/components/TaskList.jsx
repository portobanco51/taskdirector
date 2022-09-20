import TaskItem from "./TaskItem"

const TaskList = ({ taskList, removeTask, edit }) => {
    return (
        <div className="col-7">
            <h4 className="text-center mb-4 header">Tasks List</h4>
            <ul className="list-group">
                {taskList.length === 0
                    ? (<li className="list-group-item text-capitalize mb-2 shadow font-weight-bold text-center bg header">no tasks pending</li>)
                    : (
                        taskList.map((task) => (
                            <TaskItem key={task.id} task={task} edit={edit} removeTask={removeTask} />
                        ))
                    )}
            </ul>
        </div>
    )
}
export default TaskList