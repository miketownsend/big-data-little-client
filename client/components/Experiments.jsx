import React, { useState, useEffect, memo } from "react"
import uuid from "uuid"
import { reduce } from "lodash/fp"
import Benchmark from "./Benchmark"
import Crossfilter from "./Crossfilter"

import {
  run,
  loadAll,
  saveOne,
  clearOne,
  clearAll,
  startStep,
  stopStep
} from "../services/experiment"

export default () => {
  const [data, setData] = useState(null)
  const [showExperiments, setShowExperiments] = useState(false)
  const [showRequest, setShowRequest] = useState(false)
  const [showParse, setShowParse] = useState(false)
  const [showTransform, setShowTransform] = useState(true)
  const [lastExperiment, setLastExperiment] = useState(null)
  const [experiments, setExperiments] = useState(loadAll())
  const [currentExperiment, setCurrentExperiment] = useState(null)

  const onKeyPress = event => {
    if (event.key === "Tab") {
      toggleShowExperiments()
    }

    if (event.key === "Enter") {
      onRunExperiment()
    }
  }

  useEffect(() => {
    onRunExperiment()
    document.addEventListener("keydown", onKeyPress)
    return () => {
      document.removeEventListener("keydown", onKeyPress)
    }
  }, [])

  const onComplete = (experiment, data) => {
    const experiments = saveOne({ ...experiment })
    setCurrentExperiment(null)
    setLastExperiment(experiment)
    setData(data)
    setExperiments(experiments)
  }

  const onRunExperiment = () => {
    setData(null)
    run(setCurrentExperiment, onComplete)
  }

  const onClearExperiments = () => {
    clearAll()
    setExperiments({})
  }

  const onClearExperiment = id => {
    const experiments = clearOne(id)
    setExperiments(experiments)
    return experiments
  }

  const onUpdateTitle = (id, title) => {
    setExperiments(saveOne({ ...experiments[id], title }))
  }

  const toggleShowExperiments = () => {
    setShowExperiments(prev => !prev)
  }

  const calculateTotal = ex =>
    showRequest * ex.request +
    showParse * ex.parse +
    showTransform * ex.transform

  const max = reduce((max, ex) => {
    if (!ex) return max
    const total = calculateTotal(ex)
    return total > max ? total : max
  }, 0)([...Object.values(experiments), currentExperiment])

  return (
    <React.Fragment>
      <aside className={showExperiments ? "" : "hidden"}>
        <header className={"header"}>
          <button onClick={onRunExperiment}>Run</button>
          <button onClick={onClearExperiments}>Clear</button>
          <button
            className={`toggle request ${showRequest && "active"}`}
            onClick={() => setShowRequest(!showRequest)}
          >
            Request
          </button>
          <button
            className={`toggle parse ${showParse && "active"}`}
            onClick={() => setShowParse(!showParse)}
          >
            Parse
          </button>

          <button
            className={`toggle transform ${showTransform && "active"}`}
            onClick={() => setShowTransform(!showTransform)}
          >
            Transform
          </button>
        </header>
        <article className="benchmark benchmark--header">
          <header>
            <label>Name</label>
            {showRequest && <label>Fetch</label>}
            {showParse && <label>Parse</label>}
            {showTransform && <label>Transform</label>}
            <label>Total</label>
            <label />
          </header>
        </article>
        {currentExperiment && (
          <Benchmark
            key={currentExperiment.id}
            {...currentExperiment}
            total={calculateTotal(currentExperiment)}
            onUpdateTitle={onUpdateTitle}
            max={max}
            showRequest={showRequest}
            showTransform={showTransform}
            showParse={showParse}
          />
        )}
        {experiments &&
          Object.keys(experiments)
            .reverse()
            .map(key => {
              return (
                <Benchmark
                  key={experiments[key].id}
                  {...experiments[key]}
                  total={calculateTotal(experiments[key])}
                  onClear={onClearExperiment}
                  onUpdateTitle={onUpdateTitle}
                  max={max}
                  showRequest={showRequest}
                  showTransform={showTransform}
                  showParse={showParse}
                />
              )
            })}
      </aside>
      <main>
        <Crossfilter data={data} />
      </main>
      <a className="showExperiments" href="#" onClick={toggleShowExperiments}>
        {showExperiments ? "Hide" : "Experiments"}
      </a>
    </React.Fragment>
  )
}
