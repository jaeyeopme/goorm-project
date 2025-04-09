import { Storage } from './Storage.js'

export class TaskManager {
  constructor() {
    this.tasks = Storage.loadTasks()
  }

  #saveTasks() {
    Storage.saveTasks(this.tasks)
  }

  addTask(text) {
    const task = {
      id: Date.now(),
      text,
      completed: false,
      importance: false,
    }
    this.tasks.push(task)
    this.#saveTasks()
    return task
  }

  updateTask(id, newText) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    )
    this.#saveTasks()
  }

  toggleTaskCompletion(id) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    this.#saveTasks()
  }

  toggleTaskImportance(id) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, importance: !task.importance } : task
    )
    this.#saveTasks()
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id)
    this.#saveTasks()
  }

  getTasks() {
    return this.tasks.sort((a, b) => a.id - b.id)
  }

  getTask(id) {
    return this.tasks.find((it) => it.id === id)
  }

  isEmpty() {
    return this.tasks.length === 0
  }
}
