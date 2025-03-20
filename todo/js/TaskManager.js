import { Storage } from './Storage.js'

export class TaskManager {
  constructor() {
    this.tasks = []
    this.loadTasks()
  }

  loadTasks() {
    this.tasks = Storage.loadTasks()
    return this.tasks
  }

  saveTasks() {
    Storage.saveTasks(this.tasks)
  }

  addTask(text) {
    const task = {
      id: Date.now(),
      text,
      completed: false,
    }
    this.tasks.push(task)
    this.saveTasks()
    return task
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id)
    this.saveTasks()
  }

  toggleTaskCompletion(id) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    this.saveTasks()
  }

  updateTask(id, newText) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    )
    this.saveTasks()
  }

  isEmpty() {
    return this.tasks.length === 0
  }

  getTasks() {
    return this.tasks
  }
}
