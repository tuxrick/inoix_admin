import React, { useEffect, useState } from 'react';
import NavBar from '../General/NavBar';
import { Container, Typography } from '@material-ui/core';


const User = () => {
    const user_info = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <NavBar />
            <Container>
                    <h1>User</h1>
                    <Typography sx={{ mt: 2 }}>
                        Name: {user_info.name}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Last Name: {user_info.last_name}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Email: {user_info.email}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Role: {user_info.role}
                    </Typography>
            </Container>

        </>
    );
}
export default User;