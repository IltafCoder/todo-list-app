import { useState, useRef, useEffect } from "react"

function TaskHolder({ task, index, editTask, deleteTask, finishTask }) {

    const taskHolderRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedTask, setEditedTask] = useState(task.value)

    function handleBlur(val) {
        if (val === "") {
            setTimeout(() => {
                taskHolderRef.current.style.border = '2px solid red'
                taskHolderRef.current.querySelector('input[type="text"]').focus()

            }, 100)
        
            return
        }
        taskHolderRef.current.style.border = '2px solid transparent'
        editTask(task.key, val)
        setIsEditing(false)
    }

    useEffect(() => {
        if (isEditing) {
            const taskInput = taskHolderRef.current.querySelector('input[type="text"]')
            if (taskInput) {
                taskInput.focus()
            }
        }
    }, [isEditing])

    function handleEditClick() {
        taskHolderRef.current.style.border = '2px solid #2ea0ff'
        setIsEditing(true)
    }

    return (
        <div
            className="w-full bg-gray-100 rounded-lg min-h-9 px-5 my-1 hover:bg-gray-200 flex justify-between"
            ref={taskHolderRef}
        >
            <div className="flex items-center">
                <input type="checkbox" onChange={(() => finishTask(index))} className="relative mr-2 bottom-0" />
                {isEditing ? (
                    <input
                        className="outline-none border-bottom-2"
                        type="text"
                        value={editedTask}
                        onBlur={(e) => handleBlur(e.target.value)}
                        onChange={(e) => setEditedTask(e.target.value)}
                    />
                ) : (
                    <div>{editedTask}</div>
                )}
            </div>
            <div className="flex justify-center items-center">
                <button onClick={() => deleteTask(index)}>
                    <i className="bi bi-trash-fill mx-1 text-gray-400 hover:text-red-600"></i>
                </button>
                <button onClick={handleEditClick}>
                    <i className="bi bi-pencil-fill mx-1 text-gray-400 hover:text-black"></i>
                </button>
            </div>
        </div>
    )
}

export default TaskHolder
