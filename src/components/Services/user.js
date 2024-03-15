import axios from 'axios';
import url from './url';

let user = {
    list: async (token) => {
        try {
            const response = await axios.get(url+'/user/list_users',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res)=>{
                let data = res.data;
                if(data.status == "success"){
                    return data.data;
                }else{
                    return false;
                }
            });

            return response;

        } catch (error) {
            console.error('Error: ', error);
        }
    },
}
export default user;