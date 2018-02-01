import React from 'react'
import Title from './Title'
import Content from './Content'
import Statistics from './Statistics'

const Course = ({ course }) => {
  return (
    <div>
      <Title title={course.name} />
      <Content content={course.parts} />
      <Statistics parts={course.parts}/>
    </div>
  )
}

export default Course