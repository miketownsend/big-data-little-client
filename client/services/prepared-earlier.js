import { pick } from "lodash/fp"
import { pick as nonFpPick } from 'lodash/fp'
import moment from "moment"
import { format, parse, differenceInYears } from "date-fns"

const now = "3300-05-03"

// exp 1 - moment + lodash/fp
const transform = character => {
  return {
    dob: moment(character.dob).format('Do MMM YYYY'),
    age: moment(character.dob).difference(now).asYears(),
    ...pick(["name", "class", "race"])(character)
  }
}

// exp 2 - date-fns + lodash/fp
const transform = character => {
  const dob = parse(character.dob)

  return {
    dob: format(dob, 'Do MMM YYYY'),
    dob: differenceInYears(dob, now),
    ...pick(["name", "class", "race"])(character)
  }
}

// exp 3 - date-fns + pre-curried picker
const picker = pick(character, ["name", "class", "race"])
const transform = character => {
  const dob = parse(character.dob)

  return {
    dob: format(dob, 'Do MMM YYYY'),
    dob: differenceInYears(dob, now),
    ...picker(character)
  }
}

// exp 4 - date-fns + explicit pick + object.assign
const picker = pick(character, ["name", "class", "race"])
const transform = character => {
  const dob = parse(character.dob)

  return Object.assign({}, {
    dob: format(dob, 'Do MMM YYYY'),
    age: differenceInYears(dob, now),
  }, picker(character))
}

// exp 5 - date-fns + explicit pick
const transform = character => {
  const dob = parse(character.dob)

  return {
    dob: format(dob, 'Do MMM YYYY'),
    age: differenceInYears(dob, now),
    name: character.name,
    class: character.class,
    race: character.race
  }
}