import React, { Component } from 'react';

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedCar: {
        brand: '',
        model: '',
        manufactureYear: ''
      }
    };
    }
    
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      updatedCar: {
        ...prevState.updatedCar,
        [name]: value
      }
    }));
  };


  handleUpdate = () => {
    const { updatedCar } = this.state;
    const { updateCar } = this.props;
    if (!updatedCar.brand || !updatedCar.model || !updatedCar.manufactureYear) {
      alert("Please fill out all fields.");
      return;
    }

  updateCar(updatedCar);
    
    this.setState({
      updatedCar: {
        brand: '',
        model: '',
        manufactureYear: ''
      }
    });
  };


  render() {
    const { updatedCar } = this.state;
  return (
    <>
      <h2>Update car here:</h2>
      <br/>
      <form id="carForm">
        <label htmlFor="brand">Brand:</label><br/>
        <input type="text" id="brand" name="brand" value={updatedCar.brand} onChange={this.handleInputChange}/><br/><br/>
        
        <label htmlFor="model">Model:</label><br/>
        <input type="text" id="model" name="model" value={updatedCar.model} onChange={this.handleInputChange}/><br/><br/>
        
        <label htmlFor="manufactureYear">Manufacture Year:</label><br/>
        <input type="number" id="manufactureYear" name="manufactureYear" value={updatedCar.manufactureYear} onChange={this.handleInputChange}/><br/><br/>
        
        <button type="button" onClick={this.handleUpdate}>Update car</button><br/><br/>
      </form>
    </>
  );
}
}

export default UpdateForm;