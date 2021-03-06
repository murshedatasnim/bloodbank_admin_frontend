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

        const res = await fetch('https://absb.herokuapp.com/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            // credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });
        
        // console.log('token', res.headers.get('x-auth-token'));
        window.localStorage.setItem('x-auth-token', res.headers.get('x-auth-token'));
        // window.localStorage.setItem('email',email);

        await router.push('/');
    }

    return (
        <Layout>
             <head>
                <title>{siteTitle}</title>
            </head>
            <Container className="p-5">
            <form onSubmit={submit} className="col-6">
                <h1 className="h3 mb-3 fw-normal">Please Log in</h1>
                <input type="email" className="form-control m-2" placeholder="Email" required
                       onChange={e => setEmail(e.target.value)}
                />

                <input type="password" className="form-control m-2" placeholder="Password" required
                       onChange={e => setPassword(e.target.value)}
                />

                <button className="w-100 btn btn-lg btn-primary m-2" type="submit">Log in</button>
            </form>
            </Container>
        </Layout>
    );
};

export default Login;
