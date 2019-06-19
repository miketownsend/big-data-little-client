import { omit } from "lodash/fp"
import moment from "moment"

const transform = character => {
  return {
    dob: moment(character.dob).format("Do MMM YYYY"),
    age: moment(character.dob).diff(new Date(), "years"),
    ...omit(["lair_address", "lair_secret_password"])(character)
  }
}

export default transform