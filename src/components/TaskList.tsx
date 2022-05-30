import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Don't allow to create a new task if the title input is empty
    if (!newTaskTitle) {
      return;
    }
    // Create a new task with a random id
    const newTask = {
      id: Math.floor(Date.now() * Math.random()),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks(oldState => [...oldState, newTask]) // using a callback function to maintain old states and add the new task
    setNewTaskTitle('') //reset title input
  }

  function handleToggleTaskCompletion(id: number) {
    //Setting task isComplete value: mapping all tasks to find task id and them setting only isComplete to a different value them the old one
    const newTasks = tasks.map(task => task.id === id ? 
    {
      ...task, 
      isComplete: !task.isComplete
    } : task); // returns same task properties if id is different

    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    // Remove task by id number
    const filterIdTasks = tasks.filter(task => task.id !== id) // filter tasks getting only the tasks with a different id
    
    setTasks(filterIdTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}