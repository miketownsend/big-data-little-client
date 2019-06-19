const faker = require("faker")
const { parse, format } = require("date-fns")

const data = []

const randomKey = () => faker.random.alphaNumeric(5).toUpperCase()

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
    [randomKey()]: faker.random.alphaNumeric(8).toUpperCase(),
    [randomKey()]: faker.name.findName(),
    [randomKey()]: faker.lorem.sentence(),
    [randomKey()]: format(
      faker.date.between(parse("3021-01-01"), parse("3120-01-01")),
      "YYYY-MM-DD"
    ),
    [randomKey()]: faker.random.arrayElement(classes),
    [randomKey()]: faker.random.arrayElement(races),
    [randomKey()]: faker.random.number({ min: 1, max: 20 }),
    [randomKey()]: `${faker.random.number({ min: 3, max: 7 })}'${faker.random.number({
      min: 0,
      max: 11
    })}`,
    [randomKey()]: faker.random.number({ min: 8, max: 18 }),
    [randomKey()]: faker.random.number({ min: 8, max: 18 }),
    [randomKey()]: faker.random.number({ min: 8, max: 18 }),
    [randomKey()]: faker.random.number({ min: 8, max: 18 }),
    [randomKey()]: faker.random.number({ min: 8, max: 18 }),
    [randomKey()]: faker.random.number({ min: 8, max: 18 })
  })
}

module.exports = data
