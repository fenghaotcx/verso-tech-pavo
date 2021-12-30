export const parseResult = (params) =>
  params ? (JSON.parse(params.Result)) : undefined

export const parseResults = (object) =>
  Object.entries(object).reduce((acc, [token, data]) => {
    const next = data && parseResult(data)
    return Object.assign({}, acc, next && { [token]: next })
  }, {})
