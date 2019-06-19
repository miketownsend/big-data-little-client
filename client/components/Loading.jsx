import React from "react"

const images = [
  "http://localhost:3003/images/Orc.png",
  "http://localhost:3003/images/Hobbit.png",
  "http://localhost:3003/images/Hobbit2.png",
  "http://localhost:3003/images/Human.png",
  "http://localhost:3003/images/Human2.png",
  "http://localhost:3003/images/Human3.png",
  "http://localhost:3003/images/Elf.png",
  "http://localhost:3003/images/Lizardfolk.png",
  "http://localhost:3003/images/Lizardfolk2.png",
  "http://localhost:3003/images/Dragonborn.png",
  "http://localhost:3003/images/Gnome.png",
  "http://localhost:3003/images/Gnome2.png"
]

const Loading = () => {
  return (
    <div className={"loading"}>
      {images.map(src => {
        return (
          <img
            src={src}
            key={src}
            title={"Loading image"}
            style={{ order: Math.floor(Math.random() * images.length * 2) }}
          />
        )
      })}
    </div>
  )
}

export default Loading
