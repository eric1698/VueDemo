import axios from 'axios'


export default {
    data: '123',
    aaa: function () {
        return 'abc';
    },
    checkLogin: function () {
        return new Promise(function (Resolve, Reject) {
            axios.get("http://localhost:9105/api/values/0").then(res => {
                Resolve(res.data);
            }).catch(res => {
                Reject(res);
            });
        });
    }
}