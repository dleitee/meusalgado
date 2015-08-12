import React from 'react';
 
class SalgadoBody extends React.Component {
  render() {
  	var src = "./dist/img/" + this.props.img;
    return (
        <div className="panel-body">
          <img style={{maxWidth:100 + '%'}} src={src} alt="..." className="img-circle" />
        </div>
    	);
  }
}
 
export default SalgadoBody;