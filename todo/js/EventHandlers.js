export class EventHandler {
  constructor(taskManager, taskUI) {
    this.taskManager = taskManager
    this.taskUI = taskUI
    this.emptyTask = document.getElementById('empty-task')

    this.setupEventListeners()
    this.renderInitialTasks()
  }

  setupEventListeners() {
    const addButton = document.getElementById('add-button')
    const taskFormContainer = document.getElementById('task-form-container')
    const taskForm = document.getElementById('task-form')
    const taskInput = document.getElementById('task-input')
    const cancelButton = document.getElementById('cancel-button')

    addButton.addEventListener('click', () => {
      taskFormContainer.classList.remove('hidden')
      taskInput.focus()
    })

    taskForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const text = taskInput.value.trim()
      if (text) {
        const task = this.taskManager.addTask(text)
        this.taskUI.addTask(task, this.getEventCallbacks())
        this.setEmptyTaskVisibility()

        taskInput.value = ''
        taskFormContainer.classList.add('hidden')
      }
    })

    if (cancelButton) {
      cancelButton.addEventListener('click', () => {
        taskInput.value = ''
        taskFormContainer.classList.add('hidden')
      })
    }
  }

  getEventCallbacks() {
    return {
      onToggleComplete: (id) => {
        this.taskManager.toggleTaskCompletion(id)
        this.taskUI.updateTaskCompletion(
          id,
          this.taskManager.isTaskCompleted(id)
        )
      },

      onDelete: (id) => {
        this.taskManager.deleteTask(id)
        this.taskUI.removeTask(id)
        this.setEmptyTaskVisibility()
      },

      onUpdate: (id, newText) => {
        this.taskManager.updateTask(id, newText)
        this.taskUI.updateTaskText(id, newText)
      },
    }
  }

  setEmptyTaskVisibility() {
    if (this.taskManager.isEmpty()) {
      this.emptyTask.classList.remove('hidden')
      return
    }
    this.emptyTask.classList.add('hidden')
  }

  renderInitialTasks() {
    const tasks = this.taskManager.getTasks()
    this.taskUI.renderTasks(tasks, this.getEventCallbacks())
    this.setEmptyTaskVisibility()
  }
}
