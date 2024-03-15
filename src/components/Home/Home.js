import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../General/NavBar';
import CustomCard from '../General/CustomCard';
import { Grid } from '@material-ui/core';
import tasks from '../Services/tasks';
/*
const tasks_data = [
    {
        "id": 5,
        "title": "new task2",
        "description": "new task desc2",
        "id_status": 3,
        "id_user": 3,
        "due_date": "2024-03-15",
        "created": "2024-03-15",
        "status": {
            "id": 3,
            "status": "Finish Success"
        },
        "user": {
            "id": 3,
            "email": "tuxrick2@gmail.com",
            "name": "Ricardo",
            "last_name": "Hernandez",
            "role": "executor"
        },
        "comments": [
            {
                "id": 1,
                "id_user": 2,
                "id_task": 5,
                "comment": "this is a comment",
                "created": "2024-03-15"
            },
            {
                "id": 2,
                "id_user": 2,
                "id_task": 5,
                "comment": "this is a comment",
                "created": "2024-03-15"
            },
            {
                "id": 3,
                "id_user": 2,
                "id_task": 5,
                "comment": "this is a comment",
                "created": "2024-03-15"
            },
            {
                "id": 4,
                "id_user": 2,
                "id_task": 5,
                "comment": "this is a comment",
                "created": "2024-03-15"
            }
        ]
    },
    {
        "id": 6,
        "title": "new task2",
        "description": "new task desc2",
        "id_status": 1,
        "id_user": 3,
        "due_date": "2024-03-15",
        "created": "2024-03-15",
        "status": {
            "id": 1,
            "status": "Assigned"
        },
        "user": {
            "id": 3,
            "email": "tuxrick2@gmail.com",
            "name": "Ricardo",
            "last_name": "Hernandez",
            "role": "executor"
        },
        "comments": []
    }
];
*/

const Home = () => {

    const [taskList, setTaskList] = useState([]);
    const [statusList, setStatusList] = useState([]);

    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        tasks.list(token).then((data) => {
            if (Array.isArray(data)) {
              setTaskList(data);
            } else {
              console.error("Wrong data: ", data);
            }
        }).catch((error) => {
            console.error("Error getting data: ", error);
        });

        tasks.status_list(token).then((data) => {
            if (Array.isArray(data)) {
                setStatusList(data);
            } else {
              console.error("Wrong data: ", data);
            }
        }).catch((error) => {
            console.error("Error getting data: ", error);
        });
    }, [token]);

    return (
        <>
            <NavBar />
            <Grid container spacing={3}>
                {taskList.map((task, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <CustomCard cardData={task} statusList={statusList}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
export default Home;