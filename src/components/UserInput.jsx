const UserInput = ({ editMode, editTask, addTask, setTask, task, err, cancelEdit, taskList, clearList }) => {

    return (
        <div className="col-5">
            <h4 className="text-center mb-4 header">
                {editMode ? "Edit Task" : "Add a Task"}
            </h4>
            <form onSubmit={editMode ? editTask : addTask}>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter a task"
                    onChange={(e) => setTask(e.target.value)}
                    value={task}
                />

                {err ? <h6 className="text-danger text-center" style={{ 'fontSize': '12px' }}>{err}</h6> : null}

                {
                    editMode ? <button
                        className={"btn btn-warning btn-block"}
                        type="submit">
                        Edit Task
                    </button> : <button
                        className="btn btn-info btn-block"
                        type="submit">
                        Add
                    </button>
                }
                <button
                    type="reset"
                    onClick={cancelEdit}
                    className="btn btn-danger btn-block mt-2"
                    hidden={editMode ? false : true}>
                    Cancel
                </button>
                {
                    taskList.length !== 0 ? (
                        <button onClick={clearList} type="reset" className="btn btn-dark btn-block">Clear</button>
                    ) : null
                }
            </form>
        </div>
    )
}

export default UserInput