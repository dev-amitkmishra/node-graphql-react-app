import React from 'react';
import { Form, Button } from 'react-bootstrap';

const loginHandler = (e) => {
    e.preventDefault();
    const graphqlQuery = {
        query: `
            query {
                login(loginInput:{
                    email: "${e.currentTarget.form.elements[0].value}",
                    password: "${e.currentTarget.form.elements[1].value}"
                })
                {
                    userId
                    token
                    status
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
            throw new Error('login failed');
        }
        window.location.href = '/home';
    })
}

const loginForm = () => {
    return (
        <div>
            <Form style={{width: 'fit-content', margin: '50px auto'}} autoComplete="off">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" autoComplete="off"/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" autoComplete="none" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e) => loginHandler(e)}>
                    Submit
                </Button>
            </Form>
        </div>
    )
};

export default loginForm;
