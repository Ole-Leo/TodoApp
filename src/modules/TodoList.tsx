import styles from './TodoList.module.scss'

import { useHandleTodos } from './hooks/useHandleTodos'
import { Button, Flex, Input, List, Checkbox, Typography } from 'antd'

export function TodoList() {
  const {
    todos,
    title,
    filter,
    setTitle,
    setFilter,
    addNewTodo,
    toggleCompleted,
    clearCompleted,
    isLoading,
  } = useHandleTodos()

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })

  return (
    <Flex vertical className={styles.base} gap={12}>
      <Typography.Title className={styles.title}>todos</Typography.Title>

      <Input
        value={title}
        className={styles.input}
        variant="underlined"
        placeholder="What needs to be done?"
        onChange={(e) => setTitle(e.target.value.trim())}
        onPressEnter={addNewTodo}
      />

      <Flex align="center" gap={4}>
        <Button
          color="primary"
          size="small"
          variant={filter === 'all' ? 'filled' : 'text'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          color="primary"
          size="small"
          variant={filter === 'active' ? 'filled' : 'text'}
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          color="primary"
          size="small"
          variant={filter === 'completed' ? 'filled' : 'text'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </Flex>

      <List
        bordered
        loading={isLoading}
        dataSource={filteredTodos}
        renderItem={(item) => (
          <List.Item>
            <Checkbox
              checked={item.completed}
              onChange={() => toggleCompleted(item.id)}
            >
              {item.title}
            </Checkbox>
          </List.Item>
        )}
        footer={
          <Flex align="center" justify="space-between">
            <Typography.Text className={styles.total}>
              {todos.filter((todo) => !todo.completed).length} items left
            </Typography.Text>
            <Button
              variant="filled"
              color="primary"
              size="small"
              onClick={clearCompleted}
            >
              Clear completed
            </Button>
          </Flex>
        }
      />
    </Flex>
  )
}
