const faker = require("faker")
const { parse, format } = require("date-fns")

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

const races = [
  "Hobbit",
  "High Elf",
  "Wood Elf",
  "Half-Orc",
  "Mountain Dwarf",
  "Hill Dwarf",
  "Tiefling",
  "Asamir",
  "Half-Elf",
  "Human",
  "Gnome"
]

for (let i = 0; i < 25000; i++) {
  data.push({
    id: faker.random.alphaNumeric(8).toUpperCase(),
    name: faker.name.findName(),
    motto: faker.lorem.sentence(),
    dob: format(
      faker.date.between(parse("3021-01-01"), parse("3120-01-01")),
      "YYYY-MM-DD"
    ),
    class: faker.random.arrayElement(classes),
    race: faker.random.arrayElement(races),
    level: faker.random.number({ min: 1, max: 20 }),
    height: `${faker.random.number({ min: 3, max: 7 })}'${faker.random.number({
      min: 0,
      max: 11
    })}`,
    strength: faker.random.number({ min: 8, max: 18 }),
    dexterity: faker.random.number({ min: 8, max: 18 }),
    constitution: faker.random.number({ min: 8, max: 18 }),
    intelligence: faker.random.number({ min: 8, max: 18 }),
    wisdom: faker.random.number({ min: 8, max: 18 }),
    charisma: faker.random.number({ min: 8, max: 18 })
  })
}

module.exports = data
