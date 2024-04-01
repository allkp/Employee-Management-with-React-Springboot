import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';


function CreateEmployeeComponent() {

    let navigate = useNavigate();

    const [employee, setEmployee] = useState({
        firstName : "",
        lastName : "",
        email : ""
    })

    const handleClick = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setEmployee({...employee, [name]:value});
    }

    const saveHandler = (e) => {
        e.preventDefault();
        console.log("employee => " + JSON.stringify(employee));
        EmployeeService.createEmployee(employee).then(res => {
            navigate('/employees');
        })
    }

    const cancelHandler = () => {
        navigate('/employees');
    }

  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 my-3'>
                <h3 className='text-center'>Add-Employee</h3>
                <div className='card-body'>
                    <form>
                        <div className='form-group '>
                            <label className='my-3'>First Name</label>
                            <input type='text' name='firstName' 
                                placeholder='First Name' className='form-control' autoComplete='off' 
                                value={employee.firstName} 
                                onChange={handleClick}
                            />
                        </div>
                        <div className='form-group '>
                            <label className='my-3'>Last Name</label>
                            <input type='text' name='lastName' 
                                placeholder='Last Name' className='form-control' autoComplete='off' 
                                value={employee.lastName} 
                                onChange={handleClick}
                            />
                        </div>
                        <div className='form-group '>
                            <label className='my-3'>E-Mail</label>
                            <input type='email' name='email' 
                                placeholder='E-mail' className='form-control' autoComplete='off' 
                                value={employee.email} 
                                onChange={handleClick}  
                            />
                        </div>

                        <button className='btn btn-danger mt-3 px-4' onClick={cancelHandler}>CANCEL</button>
                        <button className='btn btn-success mt-3 ms-4 px-5' onClick={saveHandler}>SAVE</button>
                        
                    </form>
                </div>
            </div>

        </div>
        
    </div>
  )
}

export default CreateEmployeeComponent