import React, { useContext, useEffect, useRef } from 'react'

import uuid from 'react-uuid'

import { ThemeContext } from './features/ThemeContext'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Header from './layout/Header'
import Footer from './layout/Footer'

import { Box, Button, Checkbox, Container, CssBaseline, FormGroup, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, TextField } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { TabContext, TabList } from '@mui/lab'

import CheckboxList from './components/CheckboxList'

const light = createTheme({
    palette: {
      mode: 'light',
    },
  }),
  dark = createTheme({
    palette: {
      mode: 'dark',
    },
  })

const App = () => {
  // Theme
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode

  // Tabs
  const [currentTab, setCurrentTab] = React.useState('1')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => setCurrentTab(newValue)

  const defaultTodoList = JSON.parse(localStorage.getItem('todoList')!) || [
    { id: uuid(), name: 'First task', checked: false },
    { id: uuid(), name: 'Second task', checked: false },
    { id: uuid(), name: 'Third task', checked: false },
    { id: uuid(), name: 'Fourth task', checked: true },
  ]

  const [todoList, setTodoList] = React.useState(defaultTodoList)

  const [newTask, setNewTask] = React.useState('')

  const addTodoItem = () => () => {
    setTodoList([...todoList, { id: uuid(), name: newTask, checked: false }])
    setNewTask('')
  }

  const toggleTodoItem = (id: uuid) => () => {
    setTodoList(todoList.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const deleteTodoItem = (id: uuid) => () => {
    setTodoList(todoList.filter((item) => item.id !== id))
  }

  const deleteAllCompleted = () => () => {
    setTodoList(todoList.filter((item) => !item.checked))
  }

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  const FormGroupNewTodoItem = (
    <FormGroup row sx={{ width: '100%', padding: '1em 0' }}>
      <TextField
        // id="input__new-task"
        variant="outlined"
        color="primary"
        label="New task"
        placeholder="add details"
        value={newTask}
        sx={{
          flexGrow: 1,
          '& fieldset': {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
        onChange={(event) => {
          setNewTask(event.target.value)
        }}
      />
      <Button
        variant="contained"
        endIcon={<Add />}
        disableElevation
        onClick={addTodoItem()}
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          textTransform: 'capitalize',
        }}
      >
        Add
      </Button>
    </FormGroup>
  )
  const Todo = (
    <Container maxWidth="sm">
      <Box paddingY={3} sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label="todo list"
              centered
              sx={{ justifyContent: 'space-around', '& button': { fontWeight: 'bold', textTransform: 'capitalize' } }}
              TabIndicatorProps={{ sx: { height: '4px', borderRadius: '16px 16px 0 0' } }}
            >
              <Tab label="All" value="1" />
              {/* If any active */}
              <Tab label="Active" value="2" />
              {/* If any completed */}
              <Tab label="Completed" value="3" />
            </TabList>
          </Box>
          {FormGroupNewTodoItem}
          <CheckboxList
            list={currentTab === '2' ? todoList.filter((item) => item.checked === false) : currentTab === '3' ? todoList.filter((item) => item.checked === true) : todoList}
            toggleChecked={toggleTodoItem}
            deletable={currentTab === '3' ? true : false}
            deleteHandler={deleteTodoItem}
          />
          {currentTab === '3' ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              onClick={deleteAllCompleted()}
              sx={{
                textTransform: 'capitalize',
              }}
            >
              Delete all
            </Button>
          ) : null}
        </TabContext>
      </Box>
    </Container>
  )

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <CssBaseline enableColorScheme />

      <Header />
      {Todo}
      <Footer />
    </ThemeProvider>
  )
}

export default App
