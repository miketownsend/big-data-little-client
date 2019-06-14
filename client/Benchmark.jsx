import React from "react"

export default ({
  id,
  title,
  parse = 0,
  request = 0,
  transform = 0,
  onClear,
  onUpdateTitle,
  max = 10000
}) => {
  return (
    <article className="benchmark">
      <header>
        <input
          value={title}
          name={`experiment-${id}-title`}
          onChange={e => onUpdateTitle(id, e.target.value)}
          onClick={e => e.target.select()}
        />
      </header>
      {onClear && <button onClick={() => onClear(id)}>Clear</button>}
      <div className="benchmark__runner">
        <label>
          Request: {request}, Parse: {parse}, Transform: {transform}, Total:{" "}
          {parse + transform + request}
        </label>
        <div
          className="benchmark__progress benchmark__progress--request"
          style={{ width: (request / max) * 100 + "%" }}
        />
        <div
          className="benchmark__progress benchmark__progress--parse"
          style={{ width: (parse / max) * 100 + "%" }}
        />
        <div
          className="benchmark__progress benchmark__progress--transform"
          style={{ width: (transform / max) * 100 + "%" }}
        />
      </div>
    </article>
  )
}
