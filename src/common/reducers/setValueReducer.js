export default (state, action) => {
  const { error, payload } = action

  if (error) {
    return state
  }

  return payload || null
}
