"use strict"
import React from 'react';
import classNames from 'classnames';
 
class Input extends React.Component {
 
	constructor(props) {
        super(props);
        this.state = {
        	init: false,
        	value: ''
        };
    }

    handleChange(event){

        let value = event.target.value;
    	var changes = {};

        if(!this.state.init)
    		changes['init'] = true;
    		
    	this.setState(changes);
    	this.props.handleChange(this.props.name, value);
    }

    render() {

    	var minLength = this.props.minLength?this.props.minLength:0;
    	var required = this.props.required?true:false;
    	var value = this.props.value;
        var type = this.props.type?this.props.type:'text';

		var validateClass = classNames({
			'form-group': true,
			'has-feedback': true,
			'has-success': (value.length>minLength && required),
			'has-error': (value.length <= minLength  && this.state.init && required)
		});

		var optional = !required?<mark><small>(Opcional)</small></mark>:'';

		var validateGlyphicon = this.state.init && required?value.length <= minLength?
							<span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>:
							<span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>:'';

		return (
			<div className={validateClass}>
				<label htmlFor={this.props.id} >{this.props.label}</label>{optional}
				<input type='text' 
						className="form-control" 
						id={this.props.id} 
						onChange={this.handleChange.bind(this)} 
						value={this.props.value} />
				{validateGlyphicon}
			</div>
    );
  }
}
 
export default Input;