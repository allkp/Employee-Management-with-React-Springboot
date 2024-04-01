import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

class ListEmployeeComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            employees : []
        }

    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({employees:res.data})
        })
    }

    deleteEmployee = (employeeId) => {
        EmployeeService.deleteEmployee(employeeId).then(res => {
            EmployeeService.getEmployees().then((res) => {
                this.setState({employees:res.data})
            })
        }).catch(error => {
            console.log(error);
        })
    }


  render() {
    return (
      <div>
        <h2 className='text-center mt-3'>Employees List</h2>
        <div className='row mt-5'>
            <table className='table table-stripped table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>E-MAIL</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.employees.map(employee => {
                            return <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                            <Link to={`/update-employee/${employee.id}`} className='btn btn-info'>Update</Link>
                                            <button className='btn btn-danger' style={{marginLeft:"15px"}} onClick={() => this.deleteEmployee(employee.id)} >Delete</button>
                                        </td>
                                   </tr>
                        })
                    }
                </tbody>
            </table>
            <Link to="/add-employee" className='btn btn-outline-primary my-3' >Add Employee</Link>

        </div>
      </div>
    )
  }
}

export default ListEmployeeComponent
