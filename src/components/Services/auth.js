import axios from 'axios';
import url from './url';

let auth = {
    login: async (email,password) => {
        try {
            const response = await axios.post(url+'/user/login', { email, password });
            const token = response.data.data.token;
            if (token) {
                //Save locally user data 
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                return token;
            }
            return false;

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    }
}
//export default
export default auth;