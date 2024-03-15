import axios from 'axios';
import url from './url';

let task = {
    list: async (token) => {
        try {
            const response = await axios.get(url+'/task/list_tasks',{
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
    }
}
export default task;