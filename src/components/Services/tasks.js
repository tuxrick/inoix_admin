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
    },
    status_list: async (token) => {
        try {
            const response = await axios.get(url+'/task/list_status',{
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
    change_status: async (token, id_task, id_status) => {
        try {
            const response = await axios.post(url+'/task/change_status',{
                id_task,
                id_status
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res)=>{
                let data = res.data;
                console.log("la data",data);
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
    add_comment: async (token, id_task, comment) => {
        try {
            const response = await axios.post(url+'/task/add_comment',{
                id_task,
                comment
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res)=>{
                let data = res.data;
                console.log("la data",data);
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
    add_task: async (token, id_user, title, description, due_date) => {
        try {
            const response = await axios.post(url+'/task/create_task',{
                id_user,
                title, 
                description,
                due_date
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res)=>{
                let data = res.data;
                console.log("la data",data);
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
export default task;