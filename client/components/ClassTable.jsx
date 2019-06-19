import React from 'react'
import numeral from 'numeral'

export default ({ classStats=[], onClick }) => {
  return <table>
    <thead>
      <tr>
        <th>Class</th>
        <th>Candidates</th>
        <th className="number">Intelligence</th>
        <th className="number">Wisdom</th>
        <th className="number">Charisma</th>
        <th className="number">Average</th>
      </tr>
    </thead>
    <tbody>
      {classStats.map(({ key, value }) => {
        const { wisdom, intelligence, charisma, count, total } = value
        return <tr key={key}>
        <td><a href="#" onClick={() => onClick(key)}>{key}</a></td>
        <td>{count}</td>
        <td className="number">{Math.round(wisdom / count)}</td>
        <td className="number">{Math.round(intelligence / count)}</td>
        <td className="number">{Math.round(charisma / count)}</td>
        <td className="number">{numeral(total / count / 3).format('0,0.00')}</td>
      </tr>
      })}
    </tbody>
  </table>
}