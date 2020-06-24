import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import MessageModal from './messageModal';

const SignupForm = () => {
    const [userEmail, setUserEmail] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const createUserHandler = (e) => {
        e.preventDefault();
        const graphqlQuery = {
            query: `
                mutation {
                    createUser(userInput:{
                        email: "${e.currentTarget.form.elements[0].value}",
                        name: "${e.currentTarget.form.elements[1].value}",
                        password: "${e.currentTarget.form.elements[2].value}"
                    })
                    {
                        _id
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
            console.log(resData);
            if (resData.errors && resData.errors[0].status === 422) {
                throw new Error('something went wrong');
            }
            if (resData.errors) {
                throw new Error('User not created');
            }
            setUserEmail(resData.data.createUser.email);
            handleShow();
        })
    }
    return (
        <div>
            {
                userEmail && <MessageModal show={show} handleClose={handleClose} userName={ userEmail } />
            }
            <Form style={{width: 'fit-content', margin: '50px auto'}} autoComplete="off" id="form">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" autoComplete="off"/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" autoComplete="off"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" autoComplete="none" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e) => createUserHandler(e)}>
                    Submit
                </Button>
            </Form>
        </div>
    )
};

export default SignupForm;
