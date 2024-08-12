import React, { useContext } from 'react'
import { BucketContext } from '../../context/bucketContext'
import Card from '../../components/card/Card'

const Accomplished = () => {
  const {bucket}=useContext(BucketContext)
  const accomplished = bucket.filter(item=>item.meter === 100)
  return (
    <section className='home-container'>
      {
        accomplished.map(task => <Card key={task._id} item={task}/>)
      }
      {
        accomplished.length === 0 && (
          <p style={{color: "var(--primary-icon)", fontFamily:"interSemiBold", fontSize:"20px"}}>You have no accomplished task</p>
        )
      }
    </section>
  )
}

export default Accomplished