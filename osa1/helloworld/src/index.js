import React from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.name1} exercises={props.exercises1} />
      <Part name={props.name2} exercises={props.exercises2} />
      <Part name={props.name3} exercises={props.exercises3} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const All = (props) => {
  return (
    <div>
      <p>Yhteensä {props.exercises1 + props.exercises2 + props.exercises3} tehtävää.</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = {
    name: 'Reactin perusteet',
    exercises: 10
  }

  const part2 = {
    name: 'Tiedonvälitys propseilla',
    exercises: 7
  }

  const part3 = {
    name: 'Komponenttien tila',
    exercises: 14
  }

	return(
		<div>
        <Title course={course} />
        <Content
          name1={part1.name} exercises1={part1.exercises}
          name2={part2.name} exercises2={part2.exercises}
          name3={part3.name} exercises3={part3.exercises}/>
        <All
          exercises1={part1.exercises}
          exercises2={part2.exercises}
          exercises3={part3.exercises} />
		</div >
	)
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)