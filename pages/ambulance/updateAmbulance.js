import Head from 'next/head'
import Layout, { siteTitle } from '../../layouts/Layout'
import utilStyles from '../../styles/utils.module.css'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import React from 'react';
import axios from 'axios';

import { useEffect, useState } from "react";

export default function Update(props) {

    // console.log('auth', auth);
    const [DistrictId, setDistrictId] = useState('');
    const [DivisionId, setDivisionId] = useState('');
    // const [UpazillaId, setUpazillaId] = useState('');
    const [DivisionData, setDivisionData] = useState(props.divisions);
    const [DistrictData, setDistrictData] = useState([]);
    const [UpazillaData, setUpazillaData] = useState([]);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        organizationName: Yup.string()
            .required('Organization Name is required')
            .matches(/^.{5,}$/, "Please enter minimum 5 characters"),
        division: Yup.string()
            .required('Division is required')
            .matches(/^((?!Select Division).)*$/, "Please select a division"),
        district: Yup.string()
            .required('District is required')
            .matches(/^((?!Select District).)*$/, "Please select a district"),
        upazilla: Yup.string()
            .required('Upazilla is required')
            .matches(/^((?!Select Upazilla).)*$/, "Please select an upazilla"),
        contactNo: Yup.string()
            .min(5)
            .required("This field is Required")
            .matches(/^[0-9]+$/, "Contact number is not valid"),
        // .matches(
        //     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        //     "Contact number is not valid"
        // )
        remarks: Yup.string().nullable().notRequired()


    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const ChangeDistrict = (e) => {
        console.log(e);
        setDivisionId(e.target.value);
        axios.get('http://absb.herokuapp.com/api/area/dis/' + e.target.value).then(response => {
            // console.log(response.data);
            setDistrictData(response.data);
        });
    }

    const ChangeUpazilla = (e) => {
        setDistrictId(e.target.value);
        axios.get('http://absb.herokuapp.com/api/area/upz/' + e.target.value).then(response => {
            // console.log(response.data);
            setUpazillaData(response.data);
        });



    }


    function onSubmit(data) {
        // display form data on success
        // console.log(data);
        axios.put('http://absb.herokuapp.com/api/ambulance/'+props.ambulance._id,
            data, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': window.localStorage.getItem('x-auth-token')
            }
        })
            .then(function (response) {
                // console.log(response);
                alert('Ambulance is successfully updated');
            })
            .catch(function (error) {
                // console.log(error);
            });
        
        return false;
    }

    return (

        <div className="card m-3">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">

                        <div className="form-group col-5">
                            <label>Organization Name</label>
                            <input name="organizationName" defaultValue={props.ambulance.organizationName} type="text" {...register('organizationName')} className={`form-control ${errors.organizationName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.organizationName?.message}</div>
                        </div>
                    </div>
                    <div className="form-row col-5">
                        <div className="form-group dropdn">
                            <label>Division</label>
                            <select name="division" {...register('division')} className={`form-control ${errors.division ? 'is-invalid' : ''}`} onChange={ChangeDistrict} >
                                <option>Select Division</option>
                                {DivisionData.map((e, key) => {
                                    return <option key={key} value={e._id}>{e.Division}</option>;
                                })}
                            </select>
                            <div className="invalid-feedback">{errors.division?.message}</div>
                        </div>
                    </div>
                    <div className="form-row col-5">
                        <div className="form-group dropdn">
                            <label>District</label>
                            <select name="district" {...register('district')} className={`form-control ${errors.district ? 'is-invalid' : ''}`} onChange={ChangeUpazilla} >
                                <option>Select District</option>
                                {DistrictData.map((e, key) => {
                                    return <option key={key} value={e._id}>{e.District}</option>;
                                })}
                            </select>
                            <div className="invalid-feedback">{errors.district?.message}</div>
                        </div>
                    </div>
                    <div className="form-row col-5">
                        <div className="form-group dropdn">
                            <label>Upazilla</label>
                            <select name="upazilla" {...register('upazilla')} className={`form-control ${errors.upazilla ? 'is-invalid' : ''}`} >
                                <option>Select Upazilla</option>
                                {UpazillaData.map((e, key) => {
                                    return <option key={key} value={e._id}>{e.Upazilla}</option>;
                                })}
                            </select>
                            <div className="invalid-feedback">{errors.upazilla?.message}</div>
                        </div>
                    </div>

                    <div className="form-row">

                        <div className="form-group col-5">
                            <label>Contact No.</label>
                            <input name="contactNo" defaultValue={props.ambulance.contactNo} type="text" {...register('contactNo')} className={`form-control ${errors.contactNo ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.contactNo?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">

                        <div className="form-group col-5">
                            <label>Remarks</label>
                            <input name="remarks" defaultValue={props.ambulance.remarks} type="text" {...register('remarks')} className='form-control' />
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-1">Update</button>
                        

                    </div>
                </form>
            </div>
        </div>
    );
}

