export class TaskUI {
  constructor() {
    this.container = document.getElementById('tasks-container')
  }

  updateTaskText(id, newText) {
    const textElement = document.querySelector(`#task-${id} input[type="text"]`)
    textElement.value = newText
  }

  updateTaskCompletion(id, completed) {
    const taskElement = document.getElementById(`task-${id}`)
    taskElement.classList.toggle('bg-gray-50', completed)
    const textElement = taskElement.querySelector('input[type="text"]')
    textElement.classList.toggle('line-through', completed)
    textElement.classList.toggle('text-gray-500', completed)
    textElement.classList.toggle('pointer-events-none', completed)
  }

  removeTask(id) {
    document.getElementById(`task-${id}`).remove()
  }

  addTask(task, handlers) {
    const taskElement = this.createTaskElement(task, handlers)
    this.container.prepend(taskElement)
  }

  renderTasks(tasks, handlers) {
    tasks.forEach((task) => {
      const taskElement = this.createTaskElement(task, handlers)
      this.container.prepend(taskElement)
    })
  }

  createTaskElement(task, handlers) {
    const taskElement = document.createElement('div')
    taskElement.id = `task-${task.id}`
    taskElement.className = `border-b p-3 w-full gap-2 flex items-center ${
      task.completed ? 'bg-gray-50' : ''
    }`

    taskElement.innerHTML = `
      <div class="flex items-center w-full gap-2">
        <input type="checkbox" class="flex-shrink-0" ${
          task.completed ? 'checked' : ''
        } />
        <input type="text" 
          class="flex-1 w-full px-2 py-1 outline-none border-none ${
            task.completed
              ? 'line-through text-gray-500 pointer-events-none'
              : ''
          } 
          cursor-pointer" 
          value="${task.text}" />
        <button class="delete-btn flex-shrink-0 bg-red-500 text-white px-2 py-1 text-sm font-medium rounded">Remove</button>
      </div>
    `

    taskElement
      .querySelector('input[type="checkbox"]')
      .addEventListener('change', () => {
        handlers.onToggleComplete(task.id)
      })

    const textElement = taskElement.querySelector('input[type="text"]')
    textElement.addEventListener('blur', () => {
      const newText = textElement.value
      handlers.onUpdate(task.id, newText)
    })

    taskElement.querySelector('.delete-btn').addEventListener('click', () => {
      handlers.onDelete(task.id)
    })

    return taskElement
  }
}
