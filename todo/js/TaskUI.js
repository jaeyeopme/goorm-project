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

  updateTaskCompletion(id, completed) {
    const $task = document.getElementById(`task-${id}`)
    $task.classList.toggle('bg-gray-50', completed)

    const $text = $task.querySelector('input[type="text"]')
    $text.classList.toggle('line-through', completed)
    $text.classList.toggle('text-gray-500', completed)
    $text.classList.toggle('pointer-events-none', completed)
  }

  removeTask(id) {
    document.getElementById(`task-${id}`).remove()
  }

  renderTasks(tasks, handlers) {
    if (tasks.length === 0) return
    this.$container.innerHTML = ''
    tasks.forEach((task) => {
      const $task = this.#createTaskElement(task, handlers)
      this.$container.prepend($task)
    })
  }

  addEmptyTask() {
    this.$emptyTask.classList.remove('hidden')
  }

  removeEmptyTask() {
    this.$emptyTask.classList.add('hidden')
  }

  #createTaskElement(task, handlers) {
    const $task = document.createElement('div')
    $task.id = `task-${task.id}`
    $task.className = `border-b pt-3 pb-3 w-full gap-2 flex items-center ${
      task.completed ? 'bg-gray-50' : ''
    }`
    $task.innerHTML = `
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

    // Toggle task completion
    $task
      .querySelector('input[type="checkbox"]')
      .addEventListener('change', () => handlers.onToggleComplete(task.id))

    // Edit task text on blur
    const $text = $task.querySelector('input[type="text"]')
    $text.addEventListener('blur', () =>
      handlers.onUpdate(task.id, $text.value)
    )

    // Delete task
    $task
      .querySelector('.delete-btn')
      .addEventListener('click', () => handlers.onDelete(task.id))

    return $task
  }
}
