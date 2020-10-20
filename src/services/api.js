import axios from 'axios'

const api = axios.create({
  baseURL:'http://almanara-covid-com-br.umbler.net/'
})

export default api