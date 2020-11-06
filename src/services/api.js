import axios from 'axios'

const api = axios.create({
  baseURL:'http://testealmanarasurvey-com.umbler.net/'
})

export default api