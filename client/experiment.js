import { tap } from "lodash/fp"
import uuid from "uuid"

import transform from "./transform"

const runTransforms = (data, reporter) => {
  const promise = new Promise((resolve, reject) => {
    function runTransformsBatch(index) {
      try {
        const start = Date.now()
        for (var i = index; i < Math.min(data.length, index + 1000); i++) {
          transform(data[i])
        }

        reporter(Date.now() - start)

        if (i < data.length) {
          setTimeout(() => runTransformsBatch(i), 0)
        } else {
          resolve()
        }
      } catch (e) {
        reject(e)
      }
    }

    runTransformsBatch(0)
  })

  return promise
}

export const run = (onIterate, onComplete) => {
  const id = uuid()
  const experiment = {
    id,
    title: "Test " + id,
    request: 0,
    parse: 0,
    transform: 0
  }

  let startRequest = Date.now()
  const reportRequest = () => {
    experiment.request = Date.now() - startRequest
    onIterate({ ...experiment })
  }
  const requestInterval = setInterval(reportRequest, 50)

  let startParse, parseInterval
  const reportParse = () => {
    experiment.parse = Date.now() - startParse
    onIterate({ ...experiment })
  }

  const reportTransform = duration => {
    experiment.transform += duration
    onIterate({ ...experiment })
  }

  fetch("http://localhost:3003/data", {
    headers: {
      cache: "no-store"
    }
  })
    .then(
      tap(() => {
        clearInterval(requestInterval)
        reportRequest()
      })
    )
    .then(res => {
      startParse = Date.now()
      parseInterval = setInterval(reportParse, 50)
      return res.json()
    })
    .then(
      tap(() => {
        clearInterval(parseInterval)
        reportParse()
      })
    )
    .then(data => runTransforms(data, reportTransform))
    .then(() => onComplete({ ...experiment }))
    .catch(e => {
      if (requestInterval) clearInterval(requestInterval)
      if (parseInterval) clearInterval(parseInterval)
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
