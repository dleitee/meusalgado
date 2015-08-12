import React from 'react';
import SalgadoBox from './salgado-box'

class SalgadoFooter extends React.Component {
  


  render() {
    return (
        <div className="panel-footer panel-title text-center" >
          Subtotal: R$ {(this.props.total*this.props.value).toFixed(2)}
          <br />
          Quantidade: {this.props.total * this.props.quantity}
        </div>
    	);
  }
}
 
export default SalgadoFooter;