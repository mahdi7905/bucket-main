import React, { useContext, useState } from 'react'
import "./card.css"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Task from './Task'
import axios from 'axios';
import { BucketContext } from '../../context/bucketContext';

const Card = ({item}) => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [task, setTask] = useState("")
  const {dispatch} = useContext(BucketContext)
  const date = new Date(item.createdAt)
  const eDate = new Date(item.tobedoneAt)
  const fDate = new Date(item.doneAt)

  const deleteBucket = async()=>{
    try {
      const {data} = await axios.post("http://localhost:4000/api/bucket/delete-bucket",{_id:item._id})
      console.log(data)
      dispatch({type:"REMOVE_BUCKET", payload:data._id})
    } catch (error) {
      console.log(error.message)
    }
  }
  const addTask = async()=>{
    const body = {
      bucket_id: item._id,
      step:task
    }
    try {
      const {data} = await axios.post("http://localhost:4000/api/bucket/add-task",body)
      dispatch({type:"EDIT_BUCKET", payload:data})
      setTask("")
    } catch (error) {
      console.log(error.message)
    }

  }
  
  return (
    <div className='bucket-card'>
      <button className='delete-bucket' onClick={deleteBucket}><DeleteIcon/></button>
      <div className="bucket-header">
        <h3 className="bucket-title">{item.title}</h3>
        <div className="meter">
          <span className='meter-value'>{item.meter}%</span>
          <div className="meter-reader" style={{width:`${item.meter}%`}}></div>
        </div>
      </div>
      <p className='created-date'><i>Created at: {date.getDate()}-{date.getMonth()}-{date.getFullYear()} at {date.getHours()}:{date.getMinutes()}</i></p>
      <p className='created-date'><i>Expected date of finish: {eDate.getDate()}-{eDate.getMonth()}-{eDate.getFullYear()}</i></p>
      {
        item.doneAt && <p className='created-date'><i>Finished at: {fDate.getDate()}-{fDate.getMonth()}-{fDate.getFullYear()} at {fDate.getHours()}:{fDate.getMinutes()}</i></p>
      }
      <div className="description">{item.description}</div>
      <div className="add-task">
        <button className='add-task-btn' onClick={()=>setShowAddTask(!showAddTask)}>{showAddTask ? "Close" : "Add Step"}</button>
      </div>
      <div className={showAddTask ? "add-task-area" : "hide-add-task"}>
        <textarea value={task} onChange={(e)=>setTask(e.target.value)} className='enter-task' placeholder='Type in a task'/>
        <button className='add-task-action' onClick={addTask}><AddIcon/></button>
      </div>
      <div className="tasks">
        {
          item.steps.map(step=><Task key={step._id} task={step} item_id={item._id}/>)
        }
      </div>
    </div>
  )
}

export default Card