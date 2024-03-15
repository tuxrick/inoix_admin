import axios from 'axios';
import url from './url';

let auth = {
    login: async (email,password) => {
        try {
            const response = await axios.post(url+'/user/login', { email, password });
            const data = response.data.data;
            if (data) {
                return data;
            }
            return false;

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    }
}
//export default
export default auth;