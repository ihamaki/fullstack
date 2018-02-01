import React from 'react'
import Part from './Part'

const Content = ({ content }) => {
  return (
    <ul>
      {content.map(part=><Part key={part.id} part={part}/>)}
    </ul>
  )
}

export default Content