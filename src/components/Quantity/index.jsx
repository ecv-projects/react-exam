import React, {Component} from "react";
import { useEffect, useState } from 'react'

  class Quantity extends Component {
    constructor(props) {
      super(props);
      this.state = {quantity: 1};
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
      this.textChanged = this.textChanged.bind(this);
    }
    
    increment() {
      this.setState((state, props) => ({
        quantity: state.quantity + 1
      }))
    }
    
    decrement() {
      this.setState((state, props) => ({
        quantity: state.quantity - 1
      }))
    }
    
    textChanged(e) {
      this.setState({quantity: parseInt(e.target.value)})
    }
    
    render() {
      return (
        <div>
          <button onClick={this.decrement}>-</button>
          <input type="text" value={this.state.quantity} onChange={this.textChanged} />
          <button onClick={this.increment}>+</button>
        </div>
      )
    }
  }
  
  export default Quantity;
  