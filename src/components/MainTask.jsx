import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { PomodoroContext } from '../context/PomodoroContext'
import TaskType from './task-components/TaskType';
import TaskDetails from './task-components/TaskDetails';
import TaskTimer from './task-components/TaskTimer';

const ACTIVE_TASK_DEFAULT = { id: -1, timeLeft: 1500, timerStarted: false }

function MainTask(props) {
  const { activeTaskId, tasks, dispatch } = useContext(PomodoroContext);
  const [ activeTask, setActiveTask ] = useState(ACTIVE_TASK_DEFAULT)
  const [pomodoroType, setPomodoroType ] = useState('pomodoro')
  const { timeLeft, id, task, taskNo, taskCount, timerStarted, completed } = activeTask;
  const {themes} = props

  useEffect(() => {
    activeTaskId !== -1 ? setActiveTask(task.filter(row => row.id === activeTaskId)[0]) : <></>
  }, [activeTaskId, tasks])

  useEffect(() => {
    if (completed) setPomodoroType('short_break')
  }, [completed])

  useEffect(() => { 
    if ((id && id !== -1) && (pomodoroType === 'long_break' || pomodoroType === 'short_break')){
      dispatch({ type : 'resseted_active_task'})
      setActiveTask(ACTIVE_TASK_DEFAULT)
    }
  }, [pomodoroType, id, dispatch])

  useEffect(() => {
    if (id === -1) {
      if (pomodoroType === 'pomodoro') {
        setActiveTask(task => ({ ...task, timeLeft: 1500 }));
      } else if (pomodoroType === 'short_break') {
        setActiveTask(task => ({ ...task, timeLeft: 300 }));
      }
      else if (pomodoroType === 'long_break') {
        setActiveTask(task => ({ ...task, timeLeft: 900 }));
      }
    }
  }, [pomodoroType, id]);

  useEffect(() => {
    activeTaskId !== -1 ? setPomodoroType('pomodoro') : <></>
  }, [activeTaskId])

  return (
    <div className="main-task-background" style={{ backgroundColor: themes[pomodoroType].background }} >
    <div className="main-task-container">
      <TaskType timerStarted={timerStarted} pomodoroType={pomodoroType} setPomodoroType={(type) => setPomodoroType(type)} />
      <TaskDetails pomodoroType={pomodoroType} id={id} theme={themes[pomodoroType]} task={task ? `${task} (${taskNo}/${taskCount})` : undefined} />
      <TaskTimer timeLeft={timeLeft} id={id} timerStarted={timerStarted} pomodoroType={pomodoroType} theme={themes[pomodoroType]} />
    </div>

  </div>
  )
}

export default MainTask