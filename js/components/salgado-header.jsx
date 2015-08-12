import React from 'react';
 
class SalgadoHeader extends React.Component {

  render() {
    return (
    	<div className="panel-heading panel-title small">
            {this.props.name}
              <div className="pull-right">
                <button onClick={this.props.onRemove} className="btn btn-danger btn-xs"><i className="glyphicon glyphicon-minus"></i></button>
                &nbsp;
                <button onClick={this.props.onAdd} className="btn btn-success btn-xs"><i className="glyphicon glyphicon-plus"></i></button>
            </div>
        </div>
    	);
  }
}
 
export default SalgadoHeader;