import { useRouter } from "next/router";

// import { getDivision } from '../api/divisions'
import React from 'react';
import axios from 'axios';

// import { getAmbulance } from '../api/ambulance'
import Update from "../ambulance/updateAmbulance";
import { useEffect, useState } from "react";
import { Container, Button, Modal } from 'react-bootstrap';



export default function search({ divisions, ambulances }) {
    // const [message, setMessage] = useState('');
    // const [auth, setAuth] = useState(false);
    const ambdata = useState(ambulances)
    const [modalShow, setModalShow] = useState(false);
    const [ambUpdate, SetAmbUpdate] = useState('');
    const router = useRouter();
    // console.log(ambdata[0]);

    return (

        <Container className="p-2">
            {ambdata[0].map((amd, key) => {

                return <div className="card m-3" key={key}>
                    <h5 className="card-header">Ambulance No {key + 1}</h5>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><b>Organization Name</b> : {amd.organizationName}</li>
                            <li className="list-group-item"><b>Division</b> : {amd.division.Division}</li>
                            <li className="list-group-item"><b>District</b> : {amd.district.District}</li>
                            <li className="list-group-item"><b>Upazilla</b> : {(amd.upazilla !== null) && (amd.upazilla !== undefined) ? amd.upazilla.Upazilla : "Not found"}</li>
                            <li className="list-group-item"><b>Contact No.</b> : {amd.contactNo}</li>
                            <li className="list-group-item"><b>Remarks</b> : {amd.remarks}</li>
                        </ul>
                    </div>
                    <div className="card-footer">
                        <Button className="m-2" data-backdrop="false" variant="primary" onClick={() => { setModalShow(true); SetAmbUpdate(amd); }}>
                            Update
                            </Button>

                        <Modal
                            size="lg"
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    Update Ambulance
                                    </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Update ambulance={ambUpdate} divisions={divisions} />
                            </Modal.Body>
                        </Modal>
                        <Button className="m-2" variant="primary" onClick={() => {
                            if (window.confirm('Delete the item?')) {
                                axios.delete('http://absb.herokuapp.com/api/ambulance/' + amd._id, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'x-auth-token': window.localStorage.getItem('x-auth-token')
                                    }
                                }).then(function (response) {
                                    // console.log(response);
                                    alert('Ambulance is successfully deleted');
                                    window.location.reload()
                                })
                                .catch(function (error) {
                                    // console.log(error);
                                });

                                // router.push('/ambulance/viewambulance')
                            }
                        }}>
                            Delete
                            </Button>
                    </div>
                </div>

            })}
        </Container>


    );
}

