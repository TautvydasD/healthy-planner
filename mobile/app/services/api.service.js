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