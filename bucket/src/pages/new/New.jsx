import React, { useContext, useState } from 'react'
import "./new.css"
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import axios from "axios"
import { BucketContext } from '../../context/bucketContext';
import { useNavigate } from 'react-router-dom';

const New = () => {
  const navigate = useNavigate()
  const {dispatch} = useContext(BucketContext)
  const [task, setTask]=useState({
    title: "",
    description:"",
    expectedFinishDate: "",
    steps: [],
  })
  const [formError, setFormError] = useState({
    title:null,
    tobedoneAt:null,
    step:null
  })
  const [inputValues, setInputValue] = useState([])

  const handleStep = (id, newValue)=>{
     setInputValue((prevStepValue) =>
      prevStepValue.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
    setTask({...task, steps:inputValues?.map(value=>value.value)})
  }

  const handleRemove = (step)=>{
    setInputValue(inputValues.filter(x=>x.id !== step.id))
    setTask({...task, steps:inputValues?.map(value=>value.value)})
  }

  const create = async()=>{
    try {
      const {data} = await axios.post("http://localhost:4000/api/bucket/new-bucket",task)
      dispatch({type:"NEW_BUCKET", payload:data})
      console.log(data)
      navigate("/")
    } catch (error) {
      const {data}=error.response
      setFormError(data)
    }
  }
  return (
    <section className='new-task-page'>
      <div className='new-task-form'>
        <h1 className='form-header'>New Bucket</h1>
        {
          formError.title && formError.title !== "" && <p className="form-error">{formError.title}</p>
        }
        <input className='form-bucket-title' type="text" placeholder='Bucket Title' onChange={(e)=>{
          setTask({...task, title:e.target.value})
          setFormError({...formError, title:null})
        }}/>
        <textarea className='form-description' placeholder='Description' onChange={(e)=>setTask({...task, description:e.target.value})}/>
        <div className='form-to-be-done'>
          <label htmlFor="date">To be done at: </label>
          {
          formError.tobedoneAt && formError.tobedoneAt !== "" && <p className="form-error" style={{marginBottom:"10px"}}>{formError.tobedoneAt}</p>
        }
          <input type="date" id='date' onChange={(e)=>{
            setTask({...task, expectedFinishDate:e.target.value})
            setFormError({...formError, tobedoneAt:null})
          }}/>
        </div>
        <h1 className='form-steps'>Steps</h1>
        <button className='form-add-step-btn' onClick={()=>setInputValue([...inputValues,inputValues.length === 0 ?{id:inputValues.length+1, value:""}:{id:inputValues[inputValues.length-1].id +1, value:""}])}>
          <span>Add Step</span>
          <AddToQueueIcon className='qeue-icon'/>
        </button>
        {
          formError.step && formError.step !== "" && <p className="form-error">{formError.step}</p>
        }
        {
          inputValues.map(step =>{
            return (<div className='form-step-area' key={step?.id}>
              <textarea className='form-step' value={step?.value} placeholder='step' onChange={(e)=>{
                handleStep(step.id,e.target.value)
                setFormError({...formError, step:null})
              }}/>
              <button className='form-step-rm-btn' onClick={()=>handleRemove(step)}>
                <DeleteIcon/>
              </button>
            </div>)
          })
        }
        
        
        <button className='form-create-btn' onClick={create}>
          <span>Create</span>
          <CreateIcon className='create-icon'/>
        </button>
      </div>
    </section>
  )
}

export default New