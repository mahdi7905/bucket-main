import React, { useContext } from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';
import { BucketContext } from '../../context/bucketContext';

const Task = ({task, item_id}) => {
  const {dispatch} = useContext(BucketContext)
  const time = new Date(task.finishedAt)


  const removeTask = async () =>{
    try {
      const {data} = await axios.post("http://localhost:4000/api/bucket/delete-task",{item_id, task_id:task._id})
      dispatch({type:"EDIT_BUCKET", payload:data})
    } catch (error) {
      console.log(error.message)
    }
  }
  const taskDone = async () =>{
    try {
      const {data} = await axios.post("http://localhost:4000/api/bucket/task-done",{item_id, task_id:task._id})
      dispatch({type:"EDIT_BUCKET", payload:data})
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='task-container'>
        <div className='task'>
            <p className="">{task.step}</p>
            {
              task.finishedAt && <p className='task-finish-time'><i>Finished at: {time.getDay()}-{time.getMonth()}-{time.getFullYear()} at {time.getHours()}:{time.getMinutes()}</i></p>
            }
        </div>
        {
          !task.done && <button className='task-done-btn' onClick={taskDone}><DoneIcon/></button> 
        }
        {
          !task.done && <button className='remove-btn' onClick={removeTask}><RemoveIcon/></button>
        }
    </div>
  )
}

export default Task