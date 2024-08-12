import React, { useContext } from 'react'
import "./home.css"
import Card from '../../components/card/Card'
import { BucketContext } from '../../context/bucketContext'

const Home = () => {
  const {bucket} = useContext(BucketContext)
  return (
    <section className='home-container'>
      {
        bucket.map(y=><Card key={y._id} item={y}/>)
      }
    </section>
  )
}

export default Home