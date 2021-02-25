export function apiCall(url='', options={}) {
  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    ...options
  })
  .then(response => response.json())
  .then(response => {
    console.log(response);
  })
  .catch(error => console.log('Error', error));
}
