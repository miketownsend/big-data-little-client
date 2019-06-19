import { tap } from "lodash/fp"
import uuid from "uuid"

import transform from "./transform"

const runTransforms = (data) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(data.map(transform))
  }, 0)
})

export const copyPublicFields = ({ id, title, request, parse, transform, render }) => {
  return {
    id,
    title,
    request,
    parse,
    transform,
    render
  }
}

export const startStep = (ex, stepName, onIterate) => {
  ex.stepStart = Date.now()
}

export const stopStep = (ex, stepName, onIterate) => {
  clearInterval(ex.interval)
  ex[stepName] = Date.now() - ex.stepStart
  delete ex.stepStart
  onIterate(copyPublicFields(ex))
  if (stepName === 'render') {
    ex.renderCount++
  }
}

export const run = (onIterate, onComplete) => {
  const id = uuid()
  const experiment = {
    id,
    title: "Test " + id.substr(0,7),
    request: 0,
    parse: 0,
    transform: 0
  }
  
  startStep(experiment, 'request', onIterate)
  return fetch("http://localhost:3003/data", {
    headers: {
      cache: "no-store"
    }
  })
    .then(tap(() => stopStep(experiment, 'request', onIterate)))
    .then(res => {
      startStep(experiment, 'parse', onIterate)
      return res.json()
    })
    .then(tap(() => stopStep(experiment, 'parse', onIterate)))
    .then(data => {
      startStep(experiment, 'transform', onIterate)
      return runTransforms(data)
    })
    .then(tap(() => stopStep(experiment, 'transform', onIterate)))
    .then((data) => onComplete(experiment, data))
    .catch(e => {
      if(experiment.interval) clearInterval(experiment.interval)
      console.error(e)
    })
}

export const saveOne = experiment => {
  const experiments = loadAll()
  experiments[experiment.id] = experiment
  localStorage.setItem("experiments", JSON.stringify(experiments))
  return experiments
}

export const loadAll = () => {
  return JSON.parse(localStorage.getItem("experiments") || "{}")
}

export const clearOne = id => {
  const experiments = loadAll()
  delete experiments[id]
  localStorage.setItem("experiments", JSON.stringify(experiments))
  return experiments
}

export const clearAll = () => {
  localStorage.clear()
}
