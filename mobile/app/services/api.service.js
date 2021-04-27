/**
* Author: Tautvydas Dikšas
* Date: 2021-04-26
* Path: app/services/api.service
*/
export default class api {
    login (user) {
        return this.$http.post('http://192.168.1.11:5000/api/login', {
            username: user.username,
            password: user.password
        })
        .then(res => {
            return res.result
        })
    }
}