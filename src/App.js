import { useState, useRef, useEffect } from "react"
import "./index.css"
import TaskHolder from "./components/TaskHolder"

function App() {

    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])
    const taskRef = useRef(null)

    useEffect(() => {
        const items = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            const value = localStorage.getItem(key)
            items.push({ key, value })
        }

        items.sort((a, b) => parseInt(b.key) - parseInt(a.key))
        setTasks(items)
    }, [])

    function addTask(e) {
        e.preventDefault()
        if (task.trim() === "") return
        const taskKey = Date.now().toString()
        const newTask = { key: taskKey, value: task }

        localStorage.setItem(taskKey, task)
        setTasks([newTask, ...tasks])
        setTask("")
        taskRef.current.focus()
    }

    function deleteTask(taskIndex) {
        const taskToDelete = tasks[taskIndex]
        localStorage.removeItem(taskToDelete.key)

        const updatedTasks = tasks.filter((_, i) => i !== taskIndex)
        setTasks(updatedTasks)
    }

    function editTask(taskKey, newTaskValue) {

        const updatedTasks = tasks.map((t) =>
            t.key === taskKey ? { ...t, value: newTaskValue } : t
        )

        localStorage.setItem(taskKey, newTaskValue)

        setTasks(updatedTasks)
    }

    function finishTask(taskIndex) {
        const taskToFinish = tasks[taskIndex]
        localStorage.removeItem(taskToFinish.key)

        const updatedTasks = tasks.filter((_, i) => i !== taskIndex)

        setTimeout(() => {
            setTasks(updatedTasks)
        }, 300)

    }

    return (
        <>
            <div className="flex justify-center flex-col items-center">
                <div className="mt-20 w-full">
                    <h1 className="text-center text-3xl font-medium mb-5">Todo Made Easy!</h1>
                    <form onSubmit={addTask} className="w-full flex justify-center">
                        <i class="bi bi-pencil-square text-2xl text-gray-500 mr-2"></i>
                        <input
                            type="text"
                            placeholder="Enter a task..."
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            ref={taskRef}
                            className="border-none pl-2 outline-none h-10 bg-gray-300 hover:bg-gray-200 w-1/2"
                        />
                        <button
                            type="submit"
                            className="border-none text-white bg-blue-600 hover:bg-blue-500 px-2 py-1 ml-2 h-10"
                        >
                            <i
                                className="bi bi-plus-circle"
                                style={{ position: "relative", top: "-1.5px", marginRight: "4px" }}
                            ></i>
                            Add
                        </button>
                    </form>
                </div>
                <div className="flex w-1/2 justify-start items-center max-h-[400px] overflow-auto flex-col mt-4">
                    {tasks.map((t, i) => (
                        <TaskHolder
                            key={t.key}
                            index={i}
                            task={t}
                            editTask={editTask}
                            deleteTask={deleteTask}
                            finishTask={finishTask}
                        />
                    ))}
                </div>
            </div>



        </>
    )
}

export default App
