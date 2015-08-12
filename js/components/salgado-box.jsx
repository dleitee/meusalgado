import React from 'react';
import SalgadoHeader from './salgado-header'
import SalgadoBody from './salgado-body'
import SalgadoFooter from './salgado-footer'

class SalgadoBox extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {total: 0, clickStatus: false};
  }

  setTimeButton() {
      setTimeout(() => {
        var change = {};
        change['clickStatus'] = false;
        this.setState(change);
      }.bind(this), 250);
  }

  add() {
    
    var change= {};
    var modal = $('#myModal').hasClass('in');
    
    if(!modal && this.state.clickStatus == false){
      
      var total = this.state.total;
      total += 1;
      
      change['total'] = total;
      change['clickStatus'] = true;
      
      this.setState(change);
      
      this.props.onUpdate(this.props.item, total);

    }

    this.setTimeButton();

  }

  remove() {

    var change= {};
    var modal = $('#myModal').hasClass('in');
    
    if(!modal && this.state.clickStatus == false){
      
      var total = this.state.total;
      
      if(total > 0)
        total -= 1;

      change['total'] = total;
      change['clickStatus'] = true;
      
      this.setState(change);
      this.props.onUpdate(this.props.item, total);
    }

    this.setTimeButton();

  }

  render() {
    return (
      <div className="col-lg-4">
        <div className="panel panel-default">
        
          <SalgadoHeader 
                key={this.props.item.id} 
                name={this.props.item.name} 
                onAdd={this.add.bind(this)} 
                onRemove={this.remove.bind(this)} />

          <SalgadoBody img={this.props.item.img} />

          <SalgadoFooter 
                quantity={this.props.item.quantity} 
                value={this.props.item.value} 
                total={this.state.total} />

        </div>
      </div>
    	);
  }
}
 
export default SalgadoBox;