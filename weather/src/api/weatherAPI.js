import axios from 'axios'; //import axios

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const api = axios.create({ baseURL: BASE_URL }); //Make axios instance from base url and save it to a variable called `api`

export default api;