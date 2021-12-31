import { is } from "ramda"

/* object */
export const record = (
  object,
  value,
  skip
)=>
  Object.keys(object).reduce(
    (acc, cur) =>
      Object.assign({}, acc, {
        [cur]: skip?.includes(cur) ? object : value,
      }),
    {} 
  )

export const omitEmpty = (object) =>
  Object.entries(object).reduce((acc, [key, value]) => {
    const next = is(Object, value) ? omitEmpty(value) : value
    const valid = Number.isFinite(value) || value
    return Object.assign({}, acc, valid && { [key]: next })
  }, {})

/* array */
export const insertIf =(condition, ...elements) =>
  condition ? elements : []

/* string */
export const getLength = (text = "") => new Blob([text]).size
export const capitalize = (text = "") => text[0]?.toUpperCase() + text.slice(1)
