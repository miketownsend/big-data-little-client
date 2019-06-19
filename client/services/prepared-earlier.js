import { pick } from "lodash/fp"
import { pick as nonFpPick } from 'lodash/fp'
import moment from "moment"
import { format, parse, differenceInYears } from "date-fns"

const now = "3300-05-03"

// exp 1 - moment + omit
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

// exp 2 - date-fns + lodash/fp
import { omit } from "lodash/fp"
import { format, parse, differenceInYears } from "date-fns"

const transform = character => {
  const dob = parse(character.dob)
  return {
    dob: format(dob, "Do MMM YYYY"),
    age: differenceInYears(dob, Date.now()),
    ...omit(["lair_address", "lair_secret_password"])(character)
  }
}

export default transform


// exp 3 - date-fns + pre-curried picker
import { pick } from "lodash/fp"
import { format, parse, differenceInYears } from "date-fns"

const transform = character => {
  const dob = parse(character.dob)
  return {
    dob: format(dob, "Do MMM YYYY"),
    age: differenceInYears(dob, Date.now()),
    ...pick([
      "id",
      "image",
      "name",
      "classname",
      "race",
      "wisdom",
      "intelligence",
      "charisma"
    ])(character)
  }
}

export default transform


// exp 4 - date-fns + picker curried outside
import { pick } from "lodash/fp"
import { format, parse, differenceInYears } from "date-fns"

const picker = pick([
  "id",
  "image",
  "name",
  "classname",
  "race",
  "wisdom",
  "intelligence",
  "charisma"
])

const transform = character => {
  const dob = parse(character.dob)
  return {
    dob: format(dob, "Do MMM YYYY"),
    age: differenceInYears(dob, Date.now()),
    ...picker(character)
  }
}

export default transform

// exp 5 - explicitly define properties to map
import { pick } from "lodash/fp"
import { format, parse, differenceInYears } from "date-fns"

const transform = character => {
  const dob = parse(character.dob)
  return {
    dob: format(dob, "Do MMM YYYY"),
    age: differenceInYears(dob, Date.now()),
    ...picker(character)
  }
}

export default transform


// crossfilter setup using hooks
const [cx, setCx] = useState(null)
useEffect(() => {
  const start = Date.now()
  setCx(setupCrossfilter(data))
  console.log('Updating crossfilter', Date.now() - start)
}, ['data'])

if (!cx) { 
  return null
}