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

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id)
    this.#saveTasks()
  }

  getTask(id) {
    return this.tasks.find((it) => it.id === id)
  }

  isEmpty() {
    return this.tasks.length === 0
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

  searchTasks({ query, filterOption, sortOption }) {
    let searchedTasks = [...this.tasks]

    if (query) {
      searchedTasks = searchedTasks.filter((task) =>
        task.text.toLowerCase().includes(query.toLowerCase())
      )
    }

    switch (filterOption) {
      case 'completed':
        searchedTasks = searchedTasks.filter((task) => task.completed)
        break
      case 'pending':
        searchedTasks = searchedTasks.filter((task) => !task.completed)
        break
    }

    switch (sortOption) {
      case 'oldest':
        searchedTasks.sort((a, b) => b.id - a.id)
        break
      case 'importance':
        searchedTasks.sort((a, b) => {
          if (a.importance === b.importance) return 0
          return a.importance ? 1 : -1
        })
        break
      default: // newest
        searchedTasks.sort((a, b) => a.id - b.id)
        break
    }

    return searchedTasks
  }
}
