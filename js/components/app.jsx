import React from 'react';
import SalgadoGrid from './salgado-grid';
import OrcamentoGrid from './orcamento-grid';
import Formulario from './formulario';
import Data from '../data/data.json'
 
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {salgados: [], totalValue: 0, totalQuantity: 0};
    }
    updateList(item, total){
        
        var [salgados,totalValue, totalQuantity,push] = [this.state.salgados, 0, 0, true];
        
        salgados.forEach((value, index)=>{
            
            if(item.id == value.id){
                salgados[index].total = total;  
                totalValue += total*value.value;
                totalQuantity += total*value.quantity;
                push = false;
            }else{
                totalValue += value.total*value.value;
                totalQuantity += value.total*value.quantity;
            }            

        });

        if(push){
            salgados.push({id: item.id, name: item.name, quantity: item.quantity, value:item.value, total:total});
            totalValue += total*item.value;
            totalQuantity += total*item.quantity;
        }


        this.setState({salgados, totalValue, totalQuantity});

    }

    render() {

        return (
            <div className="container">
                <div className="col-lg-9">
                    <SalgadoGrid data={Data} onUpdate={this.updateList.bind(this)}/>
                    <br />
                    <br />
                    <Formulario data={this.state.salgados} totalValue={this.state.totalValue} totalQuantity={this.state.totalQuantity}/>
                </div>      
                <div className="col-lg-3">
                    <OrcamentoGrid data={this.state.salgados} totalValue={this.state.totalValue} totalQuantity={this.state.totalQuantity}/>
                </div>
            </div>
        );
    }
}
 
export default App;