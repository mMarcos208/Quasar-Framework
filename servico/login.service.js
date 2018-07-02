import axios from 'axios'
export class LoginService {
login (email, senha) {
    return axios.post(`url`, {email: email, password: senha})
  }
}
