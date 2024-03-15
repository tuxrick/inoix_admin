import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../General/NavBar';
import CustomCard from '../General/CustomCard';
import AddTask from './AddTask';
import { Grid, Container } from '@material-ui/core';
import tasks from '../Services/tasks';

const Home = () => {

    const [taskList, setTaskList] = useState([]);
    const [statusList, setStatusList] = useState([]);

    const token = useSelector(state => state.auth.token);
    const user_info = JSON.parse(localStorage.getItem("user"));

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
            <br/><br/>
            {user_info.role === "admin" ?
                <Container>
                    <AddTask /> 
                </Container>
            : null}
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