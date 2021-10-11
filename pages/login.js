import React, {SyntheticEvent, useState} from 'react';
import Layout, {siteTitle}from "../layouts/Layout";
import Head from "next/head";
import {useRouter} from "next/router";
import {Container} from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://absb.herokuapp.com/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            // credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });
        
        console.log('token', res.headers.get('x-auth-token'));
        window.localStorage.setItem('x-auth-token', res.headers.get('x-auth-token'));
        // window.localStorage.setItem('email',email);

        await router.push('/');
    }

    return (
        <Layout>
             <head>
                <title>{siteTitle}</title>
            </head>
            <Container>
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <input type="email" className="form-control" placeholder="Email" required
                       onChange={e => setEmail(e.target.value)}
                />

                <input type="password" className="form-control" placeholder="Password" required
                       onChange={e => setPassword(e.target.value)}
                />

                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
            </Container>
        </Layout>
    );
};

export default Login;
