import React from "react"
import { sumBy } from "lodash/fp"
import numeral from "numeral"

export default ({ classStats = [], onClick }) => {
  const totalCandidates = sumBy("value.count")(classStats)
  return (
    <table>
      <thead>
        <tr>
          <th>Class</th>
          <th className="number"># Candidates</th>
          <th className="number">Intelligence</th>
          <th className="number">Wisdom</th>
          <th className="number">Charisma</th>
          <th className="number">Average</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <a href="#" onClick={() => onClick(null)}>
              All
            </a>
          </td>
          <td className="number">{totalCandidates}</td>
          <td className="number">
            {Math.round(sumBy("value.wisdom")(classStats) / totalCandidates)}
          </td>
          <td className="number">
            {Math.round(
              sumBy("value.intelligence")(classStats) / totalCandidates
            )}
          </td>
          <td className="number">
            {Math.round(sumBy("value.charisma")(classStats) / totalCandidates)}
          </td>
          <td className="number">
            {numeral(
              sumBy("value.total")(classStats) / totalCandidates / 3
            ).format("0,0.00")}
          </td>
        </tr>
        {classStats.map(({ key, value }) => {
          const { wisdom, intelligence, charisma, count, total } = value
          return (
            <tr key={key}>
              <td>
                <a href="#" onClick={() => onClick(key)}>
                  {key}
                </a>
              </td>
              <td className="number">{count}</td>
              <td className="number">{Math.round(wisdom / count)}</td>
              <td className="number">{Math.round(intelligence / count)}</td>
              <td className="number">{Math.round(charisma / count)}</td>
              <td className="number">
                {numeral(total / count / 3).format("0,0.00")}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
