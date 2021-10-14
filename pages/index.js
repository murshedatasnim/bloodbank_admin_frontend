import Layout, { siteTitle } from "../layouts/Layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";


export default function Home() {
    const [message, setMessage] = useState('');
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch('https://absb.herokuapp.com/api/user', {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': window.localStorage.getItem('x-auth-token')
                        }
                    });
                    // console.log('res',credentials);
                    const content = await response.json();
                    // console.log(content);

                    setMessage(`Hi ${content.firstname}`);
                    setAuth(true);
                    window.localStorage.setItem('auth', true)
                } catch (e) {
                    setMessage('You are not logged in');
                    setAuth(false);
                    window.localStorage.setItem('auth', false)
                }
            }
        )();
    });

    return (
        <Layout auth={auth}>
            <head>
                <title>{siteTitle}</title>
            </head>


            {auth ? <div><div className="ambulance">
                <Link href="/ambulance/search"><Button >Search Ambulance</Button></Link>
                <style jsx>{`
                    .ambulance {
                    margin-top: 10%;
                    text-align: center;
                    }
              `}</style>
            </div>
                <div className="cylinder">
                    <Link href="/cylinder/search"><Button>Search Cylinder</Button></Link>
                    <style jsx>{`
                    .cylinder {
                    margin-top: 10px;
                    text-align: center;
                    }
              `}</style>
                </div></div> : <div className="msg"><h3>{message}</h3>
                <style jsx>{`
                    .msg {
                    margin-top: 10%;
                    text-align: center;
                    }
              `}</style>
                </div>}



        </Layout>
    )
}
