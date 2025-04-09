export class TaskUI {
  constructor() {
    this.$container = document.getElementById('tasks-container')
    this.$emptyTask = document.getElementById('empty-task')
  }

  addTask(task, handlers) {
    const $task = this.#createTaskElement(task, handlers)
    this.$container.prepend($task)
  }

  updateTaskText(id, newText) {
    const $text = document.querySelector(`#task-${id} input[type="text"]`)
    $text.value = newText
  }

  removeTask(id) {
    document.getElementById(`task-${id}`).remove()
  }

  toggleTaskCompletion(id, completed) {
    const $task = document.getElementById(`task-${id}`)
    $task.classList.toggle('bg-gray-50', completed)

    const $text = $task.querySelector('input[type="text"]')
    $text.classList.toggle('line-through', completed)
    $text.classList.toggle('text-gray-500', completed)
    $text.classList.toggle('bg-gray-50', completed)
    $text.classList.toggle('pointer-events-none', completed)
  }

  toggleTaskImportance(id, importance) {
    const $task = document.getElementById(`task-${id}`)
    if (!$task) return
    const $starIcon = $task.querySelector('.importance-star i')
    if (!$starIcon) return

    if (!importance) {
      $starIcon.classList.replace('far', 'fas')
      $starIcon.classList.add('text-yellow-400')
      $starIcon.classList.remove('text-gray-300')
    } else {
      $starIcon.classList.replace('fas', 'far')
      $starIcon.classList.remove('text-yellow-400')
      $starIcon.classList.add('text-gray-300')
    }
  }

  toggleEmptyTask(isVisible) {
    this.$emptyTask.classList.toggle('hidden', !isVisible)
  }

  renderTasks(tasks, handlers) {
    this.#clearTasks()

    const hasTasks = tasks && tasks.length > 0
    this.toggleEmptyTask(!hasTasks)

    if (!hasTasks) return

    tasks.forEach((it) => {
      const $task = this.#createTaskElement(it, handlers)
      this.$container.prepend($task)
    })
  }

  #clearTasks() {
    this.$container.querySelectorAll('.task').forEach(($task) => $task.remove())
  }

  #createTaskElement(task, handlers) {
    const $task = document.createElement('div')
    $task.id = `task-${task.id}`
    $task.className = `task border-b pt-3 pb-3 w-full gap-2 flex items-center ${
      task.completed ? 'bg-gray-50' : ''
    }`

    $task.innerHTML = `
        <div class="flex items-center w-full gap-2">
          <input type="checkbox" class="flex-shrink-0" ${
            task.completed ? 'checked' : ''
          } />
          
          <button class="importance-star flex-shrink-0 text-lg px-1 focus:outline-none" title="Toggle importance">
            <i class="fa${task.importance ? 's' : 'r'} fa-star ${
      task.importance ? 'text-yellow-400' : 'text-gray-300'
    }"></i>
          </button>
          
          <input type="text" 
            class="flex-1 w-full px-2 py-1 outline-none border-none ${
              task.completed
                ? 'line-through text-gray-500 pointer-events-none bg-gray-50'
                : ''
            } 
            cursor-pointer" 
            value="${task.text}" />
          <button class="delete-btn flex-shrink-0 bg-red-500 text-white px-2 py-1 text-sm font-medium rounded-lg">Remove</button>
        </div>
      `

    // Delete task
    $task
      .querySelector('.delete-btn')
      .addEventListener('click', () => handlers.onDelete(task.id))

    // Toggle task completion
    const $checkbox = $task.querySelector('input[type="checkbox"]')
    $checkbox.addEventListener('change', () =>
      handlers.onToggleComplete(task.id)
    )

    // Toggle task importance
    const $importanceStar = $task.querySelector('.importance-star')
    $importanceStar.addEventListener('click', () =>
      handlers.onToggleImportance(task.id, !task.importance)
    )

    // Edit task text on blur
    const $text = $task.querySelector('input[type="text"]')
    $text.addEventListener('blur', () =>
      handlers.onUpdate(task.id, $text.value)
    )

    return $task
  }
}
