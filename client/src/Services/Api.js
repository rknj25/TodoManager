import axios from 'axios';

const Api=axios.create({
    baseURL: "http://localhost:9999/api"
})

export default Api