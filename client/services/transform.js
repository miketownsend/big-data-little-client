import { pick } from "lodash/fp"
import moment from "moment"
import { format, parse, differenceInYears } from "date-fns"

const now = "3300-05-03"
const picker = pick(["name", "class", "race"])
const transform = character => {
  const dob = parse(character.dob)

  return {
    dob: format(dob, 'Do MMM YYYY'),
    age: differenceInYears(dob, now),
    ...picker(character)
  }
}

export default transform
