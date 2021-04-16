// import config from 'config'
// import { authHeader } from '../helpers'

// function login (username, password) {
//   return this.$http.post('http://localhost:5000/api/login', {
//     username,
//     password
//   }).then(handleLoginResponse)
//     .then(user => {
//       if (user.token) {
//         localStorage.setItem('user', JSON.stringify(user))
//       }
//       return user
//     })
// }

// function logout () {
//   localStorage.removeItem('user')
// }

// function handleLoginResponse (response) {
//   console.log(response)
//   return Promise.reject('lol')
// }