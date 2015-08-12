"use strict"
import React from 'react';
 
class OrcamentoGrid extends React.Component {
  
  modal() {
  	$('#myModal').on('shown.bs.modal', function () {
  		$('#myInput').focus()
	});
  }

  render() {

  	var salgados = this.props.data.filter(value=>value.total > 0);

  	var disabled= salgados.length > 0?'':'disabled';

  	var itens = (salgados.length>0)?salgados.map((item, i) => {
				return (
	    			<tr key={item.id}>
						<td className="small">{item.name}</td>
						<td className="small" style={{whiteSpace: 'nowrap'}}>R$ {(item.total*item.value).toFixed(2)}</td>
						<td className="small">{item.total*item.quantity}</td>
					</tr>
				);
			}):(
    			<tr key={9999}>
					<td colSpan="3" className="small text-center"><i>Nenhum</i></td>
				</tr>
			);

    return (
    	<fieldset>
        	<legend>Seu Pedido</legend>
	    	<table className="table table-striped">
	  			<thead>
	  				<tr>
	  					<th>Item</th>
	  					<th>Valor</th>
	  					<th>Qtde.</th>
	  				</tr>
	  			</thead>
	  			<tbody>
	  				{itens}
	  			</tbody>
	  			<tfoot>
	  				<th>Total:</th>
	  				<th style={{whiteSpace: 'nowrap'}}>R$ {this.props.totalValue.toFixed(2)}</th>
	  				<th>{this.props.totalQuantity}</th>
	  			</tfoot>
			</table>
			<button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#myModal" disabled={disabled}>
  				Finalizar Pedido
			</button>
		</fieldset>
    );
  }
}
 
export default OrcamentoGrid;