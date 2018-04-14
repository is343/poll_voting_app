import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {getCustomers} from '../../store/actions/customer'
import './customers.css';

import axios from 'axios';

class Customers extends Component {

  static propTypes = {
    getCustomers: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired
  }

  static defaultProps = {
    customers: []
  }

  componentWillMount() {
    this.props.getCustomers();
  }

  render() {
    return (
      <div>
      <button onClick={() => {
        axios.post('/api/customers', {
          firstName: 'Test',
          lastName: 'TESTER'
        });
      }}>
        TEST POST!
      </button>
        <h2>Customers</h2>
        <ul>
        {this.props.customers.map(customer =>
          <li key={customer._id}>{customer.firstName} {customer.lastName}</li>
        )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customers: state.customers
})

const dispatchToProps = (dispatch) => ({
   getCustomers: () => dispatch(getCustomers())
})

export default connect(mapStateToProps, dispatchToProps)(Customers);
