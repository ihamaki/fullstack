import React from 'react'
import Title from './Title'
import Content from './Content'

const Course = ({ course }) => {
  return (
    <div>
      <Title title={course.name} />
      <Content content={course.parts}/>
    </div>
  )
}

export default Course