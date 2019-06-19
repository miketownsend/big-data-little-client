import { omit } from "lodash/fp"
import moment from "moment"

const convertHeight = height => {
  const [feet, inches] = height.split("'")
  return (parseInt(feet) * 12 + parseInt(inches)) * 0.0254
}

const transform = character => {
  return {
    dob: moment(character.dob).format("Do MMM YYYY"),
    age: moment(character.dob).diff(new Date(), "years"),
    height: convertHeight(character.height),
    ...omit(["lair_address", "lair_secret_password"])(character)
  }
}

export default transform
