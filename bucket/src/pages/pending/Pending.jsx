import React, { useContext } from 'react'
import { BucketContext } from '../../context/bucketContext'
import Card from '../../components/card/Card'

const Pending = () => {
  const {bucket}=useContext(BucketContext)
  const pending = bucket.filter(item=>item.meter < 100)
  return (
    <section className='home-container'>
      {
        pending.map(task => <Card key={task._id} item={task}/>)
      }
      {
        pending.length === 0 && (
          <p style={{color: "var(--primary-icon)", fontFamily:"interSemiBold", fontSize:"20px"}}>You have no pending task</p>
        )
      }
    </section>
  )
}

export default Pending