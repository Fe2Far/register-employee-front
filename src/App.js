import React, {Component} from 'react';
import axios from 'axios';
import { Table,Button,Modal,ModalHeader,ModalFooter,ModalBody,FormGroup,Label,Input } from 'reactstrap';

class App extends Component {

  state = {
    employees:[],
    newEmployeeData : {
      name:'',
      email:''
    },
    editEmployeeData : {
      name:'',
      email:''
    },
    newEmployeeModal : false,
    editEmployeeModal : false
  }

  componentWillMount() {
    this._refreshList();
  }

  toggleNewEmployee() {
    this.setState({
      newEmployeeModal: ! this.state.newEmployeeModal
    });
  }

  toggleEditEmployee() {
    this.setState({
      editEmployeeModal: ! this.state.editEmployeeModal
    });
  }

  addEmployee() {

    axios.post('https://jsonplaceholder.typicode.com/todos',this.state.newEmployeeData).then((response) => {
      let { employees } = this.state;

      employees.push(response.data);
    
      this.setState({ employees,newEmployeeModal:false,newEmployeeData : {
        name:'',
        email:''
      } });
    });
  }

  updateEmployee() {
    let { name, email} = this.state.editEmployeeData;
    axios.put('https://jsonplaceholder.typicode.com/todos' + this.state.editEmployeeData.id , {
      name,email
    } ).then((response) =>  {
      this._refreshList();
    });
      
  }

  _refreshList(){
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then((response) => {
      this.setState({
        //employees : [{'title':'123456','nome':'Felipe','email':'felipe@2far.com.br'}]
        employees : [response.data]
      })
    });
  }

  editEmployee(id,name,email) {
    this.setState({
      editEmployeeData: { id,name,email}, editEmployeeModal : ! this.editEmployeeModal
    });

  }

  deleteEmployee() {
    axios.delete('https://jsonplaceholder.typicode.com/todos' + this.state.editEmployeeData.id).then((response) =>{
      this._refreshList();
    });
  }


  render() {

    let employees = this.state.employees.map((e) => {
      return(
        <tr key={e.id}>
          <td>{e.title}</td>
          <td>{e.title}</td>
          <td>{e.title}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editEmployee.bind(this,e.name,e.email)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteEmployee.bind(this,e.id)} >Delete</Button>
          </td>
        </tr>
      )
    });
    

    return (
      <div className="App container">

          <Table>
              <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {employees}
              </tbody>
          </Table>

          <Button color="primary" onClick={this.toggleNewEmployee.bind(this)}>Add Employee</Button>
          
          <Modal isOpen={this.state.newEmployeeModal} toggle={this.toggleNewEmployee.bind(this)} className={this.props.className}>
            <ModalHeader toggle={this.toggleNewEmployee.bind(this)}>Add New Employee</ModalHeader>
            <ModalBody>
              
            <FormGroup>
              <Label for="name">Name</Label>
              <Input id="name" type="text" value={this.state.newEmployeeData.name} onChange={(e) => { 
                let { newEmployeeData } = this.state;
                newEmployeeData.name = e.target.value;
                this.setState({ newEmployeeData });
              } } />

              <Label for="email">Email</Label>
              <Input id="name" type="text" value={this.state.newEmployeeData.email} onChange={(e) => { 
                let { newEmployeeData } = this.state;
                newEmployeeData.email = e.target.value;
                this.setState({ newEmployeeData });
              } } />
            </FormGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addEmployee.bind(this)}>Save</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewEmployee.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.editEmployeeModal} toggle={this.toggleEditEmployee.bind(this)} className={this.props.className}>
            <ModalHeader toggle={this.toggleEditEmployee.bind(this)}>Edit Employee</ModalHeader>
            <ModalBody>
              
            <FormGroup>
              <Label for="name">Name</Label>
              <Input id="name" type="text" value={this.state.editEmployeeData.name} onChange={(e) => { 
                let { editEmployeeData } = this.state;
                editEmployeeData.name = e.target.value;
                this.setState({ editEmployeeData });
              } } />

              <Label for="email">Email</Label>
              <Input id="name" type="text" value={this.state.editEmployeeData.email} onChange={(e) => { 
                let { editEmployeeData } = this.state;
                editEmployeeData.email = e.target.value;
                this.setState({ editEmployeeData });
              } } />
            </FormGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateEmployee.bind(this)}>Save</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditEmployee.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>


      </div>
    );
  }
}

export default App;
