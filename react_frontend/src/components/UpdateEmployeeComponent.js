import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

function UpdateEmployeeComponent() {

    let navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const {id} = useParams();

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res) => {
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setEmail(res.data.email);

        }).catch(error => {
            console.log(error);
        })
    },[])

    const cancelHandler = (e) => {
        navigate('/employees');
    }

    const updateHandler = (e) => {
        e.preventDefault();
        const employee = {
            firstName, lastName, email
        }
        if(id){
            EmployeeService.updateEmployee(id, employee).then(res => {
                navigate('/employees');
            });
        }
        else{
            EmployeeService.createEmployee(employee).then(res => {
                console.log(res.data);
                navigate('/employees');
            })
        }
    }

  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 my-3'>
                <h3 className='text-center'>Update-Employee</h3>
                <div className='card-body'>
                    <form>
                        <div className='form-group '>
                            <label className='my-3'>First Name</label>
                            <input type='text' name='firstName' 
                                placeholder='First Name' className='form-control'
                                value={firstName} onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className='form-group '>
                            <label className='my-3'>Last Name</label>
                            <input type='text' name='lastName' 
                                placeholder='Last Name' className='form-control' 
                                value={lastName} onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className='form-group '>
                            <label className='my-3'>E-Mail</label>
                            <input type='email' name='email' 
                                placeholder='E-mail' className='form-control' 
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button className='btn btn-danger mt-3 px-4' onClick={cancelHandler} >CANCEL</button>
                        <button className='btn btn-success mt-3 ms-4 px-5' onClick={updateHandler} >SAVE</button>
                        
                    </form>
                </div>
            </div>

        </div>
        
    </div>
  )
}

export default UpdateEmployeeComponent