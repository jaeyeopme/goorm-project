export class EventHandler {
  constructor(taskManager, taskUI) {
    this.taskManager = taskManager
    this.taskUI = taskUI

    this.$searchInput = document.getElementById('search-input')
    this.$filterSelect = document.getElementById('filter-select')
    this.$sortSelect = document.getElementById('sort-select')
  }

  init() {
    this.#setupEventListeners()
    this.#renderTasks()
  }

  #setupEventListeners() {
    const $taskFormContainer = document.getElementById('task-form-container')
    const $taskForm = document.getElementById('task-form')
    const $taskInput = document.getElementById('task-input')

    const $addButton = document.getElementById('add-button')
    const $cancelButton = document.getElementById('cancel-button')
    const $modalCloseButton = document.getElementById('modal-close')

    // Open add task modal
    $addButton.addEventListener('click', () => {
      $taskFormContainer.classList.remove('hidden')
      $taskInput.focus()
    })

    // Close add task modal
    const closeAddTaskModal = () => {
      $taskInput.value = ''
      $taskFormContainer.classList.add('hidden')
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
      if (e.target === $taskFormContainer) closeAddTaskModal()
    })
    $modalCloseButton.addEventListener('click', closeAddTaskModal)
    $cancelButton.addEventListener('click', closeAddTaskModal)

    // Add task form submission
    $taskForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const text = $taskInput.value.trim()
      if (!text) return
      const task = this.taskManager.addTask(text)
      this.taskUI.addTask(task, this.#getTaskEventCallbacks())
      this.taskUI.toggleEmptyTask(false)
      closeAddTaskModal()
    })

    this.$searchInput.addEventListener('input', () => this.#renderTasks())
    this.$filterSelect.addEventListener('change', () => this.#renderTasks())
    this.$sortSelect.addEventListener('change', () => this.#renderTasks())
  }

  #renderTasks() {
    const searchedTasks = this.taskManager.searchTasks({
      query: this.$searchInput.value,
      filterOption: this.$filterSelect.value,
      sortOption: this.$sortSelect.value,
    })
    this.taskUI.renderTasks(searchedTasks, this.#getTaskEventCallbacks())
  }

  #getTaskEventCallbacks() {
    return {
      onToggleComplete: (id) => {
        this.taskManager.toggleTaskCompletion(id)
        this.#renderTasks()
      },
      onToggleImportance: (id) => {
        const task = this.taskManager.getTask(id)
        if (task.completed) return
        this.taskManager.toggleTaskImportance(id)
        this.#renderTasks()
      },
      onDelete: (id) => {
        this.taskManager.deleteTask(id)
        this.taskUI.removeTask(id)
        if (this.taskManager.isEmpty()) this.taskUI.toggleEmptyTask(true)
      },
      onUpdate: (id, newText) => {
        this.taskManager.updateTask(id, newText)
        this.taskUI.updateTaskText(id, newText)
      },
    }
  }
}
