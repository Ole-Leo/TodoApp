import React from 'react'

const API_URL = 'https://jsonplaceholder.typicode.com/todos'

type Todo = {
  id: number
  title: string
  completed: boolean
}

type FilterStatuses = 'all' | 'active' | 'completed'

export function useHandleTodos() {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [title, setTitle] = React.useState('')
  const [filter, setFilter] = React.useState<FilterStatuses>('all')

  const getTodos = async (controller: AbortController) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}?_limit=10`, {
        signal: controller.signal,
      })
      const data = await response.json()
      return setTodos(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const addNewTodo = () => {
    if (!title) return

    setTodos([{ id: Date.now(), title, completed: false }, ...todos])
    setTitle('')
  }

  const toggleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  React.useEffect(() => {
    const controller = new AbortController()
    getTodos(controller)
    return () => controller.abort()
  }, [])

  return {
    todos,
    filter,
    setFilter,
    title,
    setTitle,
    addNewTodo,
    toggleCompleted,
    clearCompleted,
    isLoading,
  }
}
