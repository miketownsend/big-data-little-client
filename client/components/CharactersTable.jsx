import React from 'react'
import { sortBy } from 'lodash/fp'

export default ({ characters }) => {
  return <table>
    <thead>
      <tr>
        <th colSpan={2}>Candidate</th>
        <th>Race</th>
        <th>Class</th>
        <th className={'number'}>Level</th>
      </tr>
    </thead>
    <tbody>
      {characters.map(({ id, image, name, level, classname, race }) => {
        return <tr key={id}>
        <td><img src={image} title={'Super accurate portrait of ' + name}/></td>
        <td>{name}</td>
        <td>{race}</td>
        <td>{classname}</td>
        <td className={'number'}>{level}</td>
      </tr>
      })}
    </tbody>
  </table>
}