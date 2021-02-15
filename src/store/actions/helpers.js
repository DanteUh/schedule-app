export const requestResource = (type) => ({
  type
});

export const requestSuccess = (type, data) => ({
  type,
  payload: data
});

export const requestFailed = (type, error) => ({
  type,
  payload: {
    error
  }
})
