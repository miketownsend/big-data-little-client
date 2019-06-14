import { map, pick, tap } from "lodash/fp"
import moment from "moment"

const now = "3300-05-03"

const transform = character => {
  return {
    age: moment.duration(character.dob, now).asYears(),
    ...pick(["name", "class", "race"])(character)
  }
}

export default transform
