const faker = require("faker")
const { parse, format, addYears } = require("date-fns")

const data = []

const classes = [
  "Fighter",
  "Barbarian",
  "Wizard",
  "Sorceror",
  "Cleric",
  "Druid",
  "Bard",
  "Rogue",
  "Paladin",
  "Warlock"
]

const classStats = {
  Fighter: { strength: 2, constitution: 2, wisdom: -1, intelligence: -1 },
  Barbarian: {
    strength: 2,
    dexterity: 2,
    constitution: 2,
    wisdom: -2,
    intelligence: -2
  },
  Wizard: { intelligence: 2 },
  Sorceror: { charisma: 2 },
  Cleric: {
    strength: 1,
    constitution: 1,
    wisdom: 2,
    dexterity: -1,
    intelligence: -1
  },
  Druid: { strength: -1, dexterity: 1, wisdom: 2 },
  Bard: { dexterity: 1, charisma: 2, wisdom: -1 },
  Rogue: { dexterity: 2 },
  Paladin: { strength: 1, dexterity: -1, wisdom: 1, charisma: 1 },
  Warlock: { strength: -1, wisdom: 1, charisma: 2 }
}

const races = [
  "Hobbit",
  "Elf",
  "Half-Orc",
  "Dwarf",
  "Human",
  "Gnome",
  "Dragonborn",
  "Lizardfolk"
]

const raceStats = {
  Hobbit: { height: 3, age: 250, dexterity: 2 },
  Elf: { height: 5, age: 750, dexterity: 2, wisdom: 1 },
  "Half-Orc": { height: 6, age: 60, strength: 2, intelligence: -1 },
  Dwarf: { height: 4, age: 350, wisdom: 1, constitution: 2 },
  Human: {
    height: 5,
    age: 85,
    strength: 1,
    constitution: 1,
    wisdom: 1,
    dexterity: 1,
    intelligence: 1
  },
  Gnome: { height: 3, age: 400, dexterity: 2 },
  Dragonborn: { height: 5, age: 80, strength: 2, charisma: 1 },
  Lizardfolk: {
    height: 5,
    age: 60,
    strength: 2,
    constitution: 2,
    intelligence: -2
  }
}

const images = {
  Hobbit: ["Hobbit.png", "Hobbit2.png"],
  Elf: ["Elf.png"],
  "Half-Orc": ["Orc.png", "Orc2.png"],
  Dwarf: ["Dwarf.png"],
  Human: ["Human.png", "Human2.png", "Human3.png"],
  Gnome: ["Gnome.png", "Gnome2.png"],
  Dragonborn: ["Dragonborn.png"],
  Lizardfolk: ["Lizardfolk.png", "Lizardfolk2.png"]
}

const getRaceStat = (race, stat) =>
  raceStats[race][stat] ? raceStats[race][stat] : 0
const getClassStat = (classname, stat) =>
  classStats[classname][stat] ? classStats[classname][stat] : 0
const getRageImage = ({ race }) =>
  "http://localhost:3003/images/" + faker.random.arrayElement(images[race])
const calculateStat = ({ race, classname }, stat, min = 8, max = 14) => {
  return (
    faker.random.number({ min, max }) +
    getRaceStat(race, stat) +
    getClassStat(classname, stat)
  )
}
const calculateDob = ({ race }) => {
  const max = raceStats[race]["age"]
  const age = faker.random.number({ min: max * 0.15, max })
  return format(addYears(new Date(), -age), "YYYY-MM-DD")
}

const calculateHeight = character => {
  return `${calculateStat(character, "height", 0, 1)}'${faker.random.number({
    min: 0,
    max: 11
  })}`
}

for (let i = 0; i < 25000; i++) {
  const character = {
    id: faker.random.alphaNumeric(8).toUpperCase(),
    name: faker.name.findName(),
    motto: faker.lorem.sentence(),
    lair_location: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.zipCode()}`,
    lair_secret_password: faker.hacker.verb() + " " + faker.hacker.verb(),
    classname: faker.random.arrayElement(classes),
    race: faker.random.arrayElement(races),
    level: faker.random.number({ min: 1, max: 20 }),
    height: `${faker.random.number({ min: 3, max: 7 })}'${faker.random.number({
      min: 0,
      max: 11
    })}`
  }

  data.push({
    ...character,
    image: getRageImage(character),
    dob: calculateDob(character),
    height: calculateHeight(character),
    strength: calculateStat(character, "strength"),
    dexterity: calculateStat(character, "dexterity"),
    constitution: calculateStat(character, "constitution"),
    intelligence: calculateStat(character, "intelligence"),
    wisdom: calculateStat(character, "wisdom"),
    charisma: calculateStat(character, "charisma")
  })
}

console.log(data[0])

module.exports = data
