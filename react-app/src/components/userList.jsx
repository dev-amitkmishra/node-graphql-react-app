import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const getUsers = (e) => {
        e.preventDefault();
        const graphqlQuery = {
            query: `
                query {
                    fetchUsers
                    {
                        name
                        email
                    }
                }
            `
        }
    
        fetch('http://localhost:9000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphqlQuery)
        }).then((res) => {
            return res.json();
        }).then(resData => {
            console.log('resData', resData);
            if (resData.errors && resData.errors[0].status === 422) {
                throw new Error('something went wrong');
            }
            if (resData.errors) {
                throw new Error('user list failed');
            }
            setUsers(resData.data.fetchUsers);
            debugger;
        })
    }
    return (
        <div>
            <Button variant="primary" type="submit" onClick={(e) => getUsers(e)}>
                Get users
            </Button>
            {
                users.length > 0 && <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            }
        </div>
    )
};

export default UserList;