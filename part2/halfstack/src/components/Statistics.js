import React from 'react'

const Statistics = ({ parts }) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <p>Yhteensä {sum} tehtävää</p>
    </div>
  )
}

export default Statistics