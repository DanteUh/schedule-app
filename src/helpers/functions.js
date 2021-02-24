export function apiCall(url='', options={}, callback = () => {}) {
  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    ...options
  })
  .then(response => response.json())
  .then(response => {
    callback(response);
  })
}