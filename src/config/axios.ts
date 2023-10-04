import axios from 'axios'

const axiosConfig = axios.create({baseURL: 'https://pokeapi.co/api/v2/'})

export default axiosConfig