import axios from 'axios'

const demoApi = axios.create({
    baseURL: 'http://localhost:9105/api'
});
const Demo = '/Demo/'
export default {
    getDemoData: function () {
        return demoApi.get(Demo);
    },
    createDemoData: function (params) {
        return demoApi.post(Demo, params);
    },
    updateDemoData: function (params) {
        return demoApi.put(Demo, params);
    },
    deleteDemoData: function (id) {
        return demoApi.delete(Demo + id);
    }
}