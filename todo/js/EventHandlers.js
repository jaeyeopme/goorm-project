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
    if (tasks.length === 0) {
      this.taskUI.addEmptyTask()
    } else {
      this.taskUI.removeEmptyTask()
    }
  }

  #setupEventListeners() {
    const $taskFormContainer = document.getElementById('task-form-container')
    const $taskForm = document.getElementById('task-form')
    const $taskInput = document.getElementById('task-input')

    const $addButton = document.getElementById('add-button')
    const $cancelButton = document.getElementById('cancel-button')
    const $modalCloseButton = document.getElementById('modal-close')

    const $searchInput = document.getElementById('search-input')

    // Search tasks
    $searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim()
      const tasks = this.taskManager.searchTasks(query)
      this.taskUI.clearTasks()
      this.taskUI.renderTasks(tasks, this.#getEventCallbacks())
    })

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
      this.taskUI.addTask(task, this.#getEventCallbacks())
      this.taskUI.removeEmptyTask()
      closeAddTaskModal()
    })

    // Filter tasks
    const $filterSelect = document.getElementById('filter-select')
    $filterSelect.addEventListener('change', (e) => {
      const filter = e.target.value
      const tasks = this.taskManager.getTasks()
      this.taskUI.clearTasks()
      if (filter === 'all') {
        this.taskUI.renderTasks(tasks, this.#getEventCallbacks())
        return
      }
      const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed === true
        if (filter === 'pending') return task.completed === false
      })
      this.taskUI.renderTasks(filteredTasks, this.#getEventCallbacks())
    })

    const $sortSelect = document.getElementById('sort-select')
    $sortSelect.addEventListener('change', (e) => {
      const sort = e.target.value
      const tasks = this.taskManager.getTasks()
      this.taskUI.clearTasks()
      switch (sort) {
        case 'oldest':
          this.taskUI.renderTasks(tasks.reverse(), this.#getEventCallbacks())
          break
        case 'importance':
          const sortedTasks = tasks.sort((a, b) =>
            a.importance === b.importance ? 0 : a.importance ? 1 : -1
          )
          this.taskUI.renderTasks(sortedTasks, this.#getEventCallbacks())
          break
        default:
          this.taskUI.renderTasks(tasks, this.#getEventCallbacks())
          break
      }
    })
  }

  #getEventCallbacks() {
    return {
      onToggleComplete: (id) => {
        this.taskManager.toggleTaskCompletion(id)
        const completed = this.taskManager.getTask(id).completed
        this.taskUI.toggleTaskCompletion(id, completed)
      },
      onToggleImportance: (id) => {
        const task = this.taskManager.getTask(id)
        if (task.completed) return
        this.taskManager.toggleTaskImportance(id)
        this.taskUI.toggleTaskImportance(id, task.importance)
      },
      onDelete: (id) => {
        this.taskManager.deleteTask(id)
        this.taskUI.removeTask(id)
        if (this.taskManager.isEmpty()) {
          this.taskUI.addEmptyTask()
        }
      },
      onUpdate: (id, newText) => {
        this.taskManager.updateTask(id, newText)
        this.taskUI.updateTaskText(id, newText)
      },
    }
  }
}
