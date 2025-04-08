export class EventHandler {
  constructor(taskManager, taskUI) {
    this.taskManager = taskManager
    this.taskUI = taskUI
  }

  init() {
    this.#setupEventListeners()
    this.#setupTasks()
  }

  #setupTasks() {
    const tasks = this.taskManager.getTasks()
    this.taskUI.renderTasks(tasks, this.#getEventCallbacks())
    this.#setEmptyTask()
  }

  #setupEventListeners() {
    const $taskFormContainer = document.getElementById('task-form-container')
    const $taskForm = document.getElementById('task-form')
    const $taskInput = document.getElementById('task-input')

    const $addButton = document.getElementById('add-button')
    const $cancelButton = document.getElementById('cancel-button')

    $addButton.addEventListener('click', () => {
      $taskFormContainer.classList.remove('hidden')
      $taskInput.focus()
    })

    $taskForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const text = $taskInput.value.trim()

      if (!text) return

      const task = this.taskManager.addTask(text)
      this.taskUI.addTask(task, this.#getEventCallbacks())

      $taskInput.value = ''
      $taskFormContainer.classList.add('hidden')

      this.#setEmptyTask()
    })

    $cancelButton.addEventListener('click', () => {
      $taskInput.value = ''
      $taskFormContainer.classList.add('hidden')
    })
  }

  #getEventCallbacks() {
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
        this.#setEmptyTask()
      },
      onUpdate: (id, newText) => {
        this.taskManager.updateTask(id, newText)
        this.taskUI.updateTaskText(id, newText)
      },
    }
  }

  #setEmptyTask() {
    if (!this.taskManager.isEmpty()) {
      this.taskUI.removeEmptyTask()
      return
    }
    this.taskUI.addEmptyTask()
  }
}
