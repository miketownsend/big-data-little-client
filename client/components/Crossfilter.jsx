import React, { useState, useEffect } from "react"
import Crossfilter from "crossfilter"
import numeral from "numeral"

import ClassTable from "./ClassTable"
import CharactersTable from "./CharactersTable"
import Loading from "./Loading"
import Reporter from "./Reporter"

const setupCrossfilter = (data = []) => {
  const crossfilter = Crossfilter(data)

  const dimClass = crossfilter.dimension(d => {
    if (!d.classname) console.log(d)
    return d.classname
  })

  // const dimTotal = crossfilter.dimension(d => d.intelligence + d.charisma + d.wisdom)
  const dimCharacter = crossfilter.dimension(d => d.id)

  const reduceInit = () => ({
    count: 0,
    level: 0,
    wisdom: 0,
    intelligence: 0,
    charisma: 0,
    total: 0
  })

  const reduceAdd = (reduction, { level, charisma, wisdom, intelligence }) => {
    reduction.count++
    reduction.wisdom += wisdom
    reduction.intelligence += intelligence
    reduction.charisma += charisma
    reduction.total += charisma + wisdom + intelligence

    return reduction
  }

  const reduceRemove = (
    reduction,
    { level, charisma, wisdom, intelligence }
  ) => {
    reduction.count--
    reduction.wisdom -= wisdom
    reduction.intelligence -= intelligence
    reduction.charisma -= charisma
    reduction.total += charisma + wisdom + intelligence

    return reduction
  }

  const groupClass = dimClass
    .group()
    .reduce(reduceAdd, reduceRemove, reduceInit)

  return {
    crossfilter,
    dimClass,
    dimCharacter,
    groupClass
  }
}

const processCrossfilter = ({ groupRace, groupClass }) => {
  return {
    classStats: groupClass.all()
  }
}

const CrossfilterView = ({ data }) => {
  if (!data) return <Loading />

  const start = Date.now()
  const [cx, setCx] = useState(null)

  useEffect(() => {
    const start = Date.now()
    setCx(setupCrossfilter(data))
    console.log("Setting up crossfilter", Date.now() - start)
  }, ["data"])

  if (!cx) return <Loading />

  const classStats = cx.groupClass.all()
  const filteredCharacters = cx.dimCharacter.top(1000)

  return (
    <React.Fragment>
      <h1>DnD Candidates</h1>
      <ClassTable
        classStats={classStats}
        onClick={classname => {
          cx.dimClass.filter(classname)
          setCx({ ...cx })
        }}
      />
      <CharactersTable characters={filteredCharacters} />
      <Reporter start={start} />
    </React.Fragment>
  )
}

export default CrossfilterView
