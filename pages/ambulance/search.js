import Head from 'next/head'
import Layout, { siteTitle } from '../../layouts/Layout'
import utilStyles from '../../styles/utils.module.css'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import React from 'react';
import axios from 'axios';


import { useEffect, useState } from "react";
import Search from '../ambulance/viewsearch'
import { getDivision } from '../api/divisions';

export async function getStaticProps(context) {
    const divisions = await getDivision()
    return {
        props: { divisions }
    }

}



export default function SearchAmbulance({ divisions }) {

    // console.log('auth', auth);
    const [DistrictId, setDistrictId] = useState('');
    const [DivisionId, setDivisionId] = useState('');
    // const [UpazillaId, setUpazillaId] = useState('');
    const [DivisionData, setDivisionData] = useState(divisions);
    const [DistrictData, setDistrictData] = useState([]);
    const [isDistrict, setIsDistrict] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [result, setResult] = useState([]);

    const [message, setMessage] = useState('');
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch('http://absb.herokuapp.com/api/user', {
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

    // form validation rules 
    const validationSchema = Yup.object().shape({
        text: Yup.string().nullable().notRequired(),
        division: Yup.string()
            .nullable().notRequired(),
        district: Yup.string()
            .nullable().notRequired(),




    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const ChangeDistrict = (e) => {
        console.log(e.target.value);
        e.target.value !== '' ? setIsDistrict(true) : setIsDistrict(false)
        setDivisionId(e.target.value);
        axios.get('http://absb.herokuapp.com/api/area/dis/?id=' + e.target.value).then(response => {
            // console.log(response.data);
            setDistrictData(response.data);
        });
    }


    function onSubmit(data) {
        // display form data on success
        console.log(data);
        setIsSubmitted(false)
        setResult([])
        axios.get('http://absb.herokuapp.com/api/search/ambulance/?text=' + data.text + '&DistrictCode=' + data.district + '&DivisionCode=' + data.division)
            .then(response => {
                // console.log('res', response.data);
                setResult(response.data);
                setIsSubmitted(true);

            });

        return false;
    }

    return (
        <Layout auth={auth}>
            <head>
                <title>{siteTitle}</title>
            </head>
            <div className="card m-3">
                <div className="card-header m-3"><h3>Search Ambulance</h3></div>
                <div className="card-body m-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">

                            <div className="form-group">
                                <label>Put Organization Name or Remarks</label>
                                <input name="text" type="text" {...register('text')} className={`form-control`} />
                                {/* <div className="invalid-feedback">{errors.organizationName?.message}</div> */}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group dropdn">
                                <label>Division</label>
                                <select name="division" {...register('division')} className={`form-control ${errors.division ? 'is-invalid' : ''}`} onChange={ChangeDistrict} >
                                    <option></option>
                                    {DivisionData.map((e, key) => {
                                        return <option key={key} value={e.DivisionCode}>{e.Division}</option>;
                                    })}
                                </select>
                                {/* <div className="invalid-feedback">{errors.division?.message}</div> */}
                            </div>
                        </div>
                        {isDistrict ? <div className="form-row">
                            <div className="form-group dropdn">
                                <label>District</label>
                                <select name="district" {...register('district')} className={`form-control`}>
                                    <option></option>
                                    {DistrictData.map((e, key) => {
                                        return <option key={key} value={e.DistrictCode}>{e.District}</option>;
                                    })}
                                </select>
                                {/* <div className="invalid-feedback">{errors.district?.message}</div> */}
                            </div>
                        </div> : <></>}


                        <br />
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-1">Search </button>


                        </div>
                    </form>
                    {isSubmitted && <Search ambulances={result} divisions={divisions} />}
                    <style jsx>{`
                    .card-body {
                    padding-left: 50px;
                    padding-right: 5%;
                    }
                `}</style>
                </div>

                {/* <style jsx>{`
            .card {
            margin-left: 20px;
            }
        `}</style> */}
            </div>
        </Layout>
    );
}

