import { EventHandler } from './EventHandlers.js'
import { TaskManager } from './TaskManager.js'
import { TaskUI } from './TaskUI.js'

document.addEventListener('DOMContentLoaded', () => {
  const taskManager = new TaskManager()
  const taskUI = new TaskUI()
  const eventHandlers = new EventHandler(taskManager, taskUI)
  eventHandlers.init()
})
