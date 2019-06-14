import React, { useState } from "react"
import uuid from "uuid"
import Benchmark from "./Benchmark"

import { run, loadAll, saveOne, clearOne, clearAll } from "./experiment"

export default props => {
  const [currentExperiment, setCurrentExperiment] = useState(null)
  const [experiments, setExperiments] = useState(loadAll())

  const onCompleteExperiment = experiment => {
    const experiments = saveOne(experiment)
    setCurrentExperiment(null)
    setExperiments(experiments)
  }

  const onRunExperiment = () => {
    run(
      experiment => {
        setCurrentExperiment({ ...experiment })
      },
      experiment => onCompleteExperiment({ ...experiment })
    )
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

  return (
    <React.Fragment>
      <header>
        <h4>Benchmarking ...</h4>
        <button onClick={onRunExperiment}>Run</button>
        <button onClick={onClearExperiments}>Clear</button>
      </header>
      <main>
        {currentExperiment && (
          <Benchmark
            key={currentExperiment.id}
            {...currentExperiment}
            onUpdateTitle={onUpdateTitle}
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
                  onClear={onClearExperiment}
                  onUpdateTitle={onUpdateTitle}
                />
              )
            })}
      </main>
    </React.Fragment>
  )
}
