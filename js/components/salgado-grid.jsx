import React from 'react';
import SalgadoBox from './salgado-box'

 
class SalgadoGrid extends React.Component {
  render() {

  		var temp = this;
		var itens = this.props.data.salgados.map(function(item, i){
			return (
    			<SalgadoBox key={item.id} item={item} onUpdate={temp.props.onUpdate}/>
			);
		});

    return (
    	
    	<div className="row">
			{itens}
		</div>	
	
		
    );
  }
}
 
export default SalgadoGrid;