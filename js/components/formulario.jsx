"use strict"
import React from 'react';
import classNames from 'classnames';
import Bairros from '../data/bairros.json'
import Input from './input'
 
class Formulario extends React.Component {
  
  	constructor(props) {
        super(props);
        this.state = {
        	nome: '',
        	nome_err: false,
        	telefone: '',
        	telefone_err: false,
        	email: '',
        	data_entrega: '',
        	data_entrega_err: false,
        	hora_entrega: '',
        	hora_entrega_err: false,
        	endereco: '',
        	endereco_err: false,
        	complemento: '',
        	cidade: '',
        	bairro: '',
        	bairro_err: false,
        	bairro_err_qtde: '',
        	valor_entrega: 0,
        	observacao: '',
        	bairros: [],
        	valor_total: props.totalValue,
        	temEntrega: true
        };
    }

    handleChange(name, value){
    	var change = {};
      	change[name] = value;

      	if(name == 'cidade'){
      		change['bairros'] = Bairros.bairros.filter((item)=>item.city==change[name]);
      		change['valor_entrega'] = 0;
      	}
      	if(name == 'bairro'){
      		var bairro = Bairros.bairros.filter(item=>item.id==change[name])[0];
      		change['valor_entrega'] = bairro.value;
      		if(this.props.totalQuantity < bairro.min){
      			
      		}

      	}

      	this.setState(change);
    }

    handleSelect(name, event){
    	var change = {};
      	change[name] = event.target.value;

      	if(name == 'cidade'){
      		change['bairros'] = Bairros.bairros.filter((item)=>item.city==change[name]);
      		change['valor_entrega'] = 0;
      	}

      	if(name == 'bairro'){
      		var bairro = Bairros.bairros.filter(item=>item.id==change[name])[0];
      		change['valor_entrega'] = bairro.value;
      		if(this.props.totalQuantity < bairro.min){
      			change['bairro_err_qtde'] = 'A quantidade mínima para entrega no bairro <b>' + bairro.name + '</b> são <b>'+bairro.min+'</b> salgados'; 
      		}else{
      			change['bairro_err_qtde'] = '';
      		}

      	}

      	this.setState(change);
    }

    handleRadio(event){

    	var change = {};
    	if(event.target.value == 1){
    		change['temEntrega'] = true;
    	}else{
    		change['temEntrega'] = false;
    	}

    	this.setState(change);


    }

    validate() {

		var change = {};
    	var retorno = true;

    	if(this.state.nome.length == 0){
      		change['nome_err'] = true;
      		retorno = false;
      	}else{
      		change['nome_err'] = false;
		}

		if(this.state.telefone.length < 8){
      		change['telefone_err'] = true;
      		retorno = false;
      	}else{
      		change['telefone_err'] = false;
		}

		if(this.state.data_entrega == ''){
      		change['data_entrega_err'] = true;
      		retorno = false;
      	}else{
      		change['data_entrega_err'] = false;
		}

		if(this.state.hora_entrega == ''){
      		change['hora_entrega_err'] = true;
      		retorno = false;
      	}else{
      		change['hora_entrega_err'] = false;
		}

		if(this.state.temEntrega){

			if(this.state.endereco == ''){
	      		change['endereco_err'] = true;
	      		retorno = false;
	      	}else{
	      		change['endereco_err'] = false;
			}

			if(this.state.bairro == ''){
	      		change['bairro_err'] = true;
	      		retorno = false;
	      	}else{
	      		change['bairro_err'] = false;
			}

			if(this.state.bairro_err_qtde != '')
				retorno = false;

		}

		this.setState(change);

      	return retorno;
    }


	envia() {


		if(!this.validate())
			return;

		var salgados = this.props.data.filter(value=>value.total > 0);


		var data = this.state;

		data['salgados'] = salgados;
		data['valor_total'] = this.props.totalValue;
		data['tem_entrega'] = this.state.temEntrega?'Sim':'Não';
		
		var conteudo = $.ajax({
					type: "POST",
					enctype: 'multipart/form-data',
					cache: false,
					url: './envia.php',
					data: data,
					async: false
				}).responseText;
		
		if (conteudo === 'sucesso') {
			location.href = 'sucesso.php';
		} else {
			$('#retorno').html('<p class="bg-danger">' + conteudo + '</p>');
		}
	}

	render() {


		var datas = [0, 1, 2, 3].map((item)=>{
			var data = new Date();
			data.setDate(data.getDate()+item);
			var result = ('0' + data.getDate()).slice(-2) + '/' + ('0' + (data.getMonth()+1)).slice(-2) + '/' + data.getFullYear();
			return (
				<option key={item} value={result}>{result}</option>
			)
		});

		var horas = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
		'12:00', '13:00', '13:30','14:00', '14:30','15:00', '15:30','16:00', '16:30',
		'17:00', '17:30','18:00'].map((item)=>{
			return (
				<option key={item} value={item}>{item}</option>
			)
		});

		var bairros = this.state.bairros.map((bairro)=>{
				return (
					<option key={bairro.id} value={bairro.id}>{bairro.name}</option>
				)
		});

		return (
			<form>
			<div className="modal fade" 
					id="myModal" 
					tabIndex="-1" 
					role="dialog" 
					aria-labelledby="myModalLabel">
  				<div className="modal-dialog" role="document">
    				<div className="modal-content">
      					<div className="modal-header">
        					<button type="button" 
        							className="close" 
        							data-dismiss="modal" 
        							aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
        					<h4 className="modal-title" id="myModalLabel">Finalizar Pedido</h4>
      					</div>
      				<div className="modal-body">

      					<Input id="input-nome" 
      							name="nome" 
      							label="Nome" 
      							minLength={0}
      							handleChange={this.handleChange.bind(this)} 
      							value={this.state.nome}
      							required={true} />

      					<p className={this.state.nome_err?'bg-danger':'hide'}>
							Favor preencher o campo <strong>nome</strong>
						</p>


						<Input id="input-telefone" 
								name="telefone" 
								label="Telefone" 
								minLength={7}
								handleChange={this.handleChange.bind(this)} 
								value={this.state.telefone}
								required={true} />

						<p className={this.state.telefone_err?'bg-danger':'hide'}>
							Favor preencher o campo <strong>telefone</strong>
						</p>

						<Input id="input-email" 
								name="email" 
								label="E-mail" 
								handleChange={this.handleChange.bind(this)} 
								value={this.state.email}
								required={false} />

						<div className="form-group">
							<label htmlFor="input-data">Data de Entrega</label>
							<select className="form-control"
									id="input-data" 
									onChange={this.handleSelect.bind(this, 'data_entrega')}
									value={this.state.data_entrega}>
									<option value="" />
									{datas}									
							</select>
						</div>

						<p className={this.state.data_entrega_err?'bg-danger':'hide'}>
							Favor preencher o campo <strong>data de entrega</strong>
						</p>

						<div className="form-group">
							<label htmlFor="input-hora">Horário de Entrega</label>
							<select className="form-control"
									id="input-hora" 
									onChange={this.handleSelect.bind(this, 'hora_entrega')}
									value={this.state.hora_entrega}>
									<option value="" />
									{horas}									
							</select>
							<p className="bg-info">
							<strong>Horário de Atendimento:</strong><br/>
							De Segunda à Sábado das <b>08:00</b> às <b>12:00h</b> e das <b>13:00</b> às <b>18:00h</b><br/>
							Domingos e Feriados das <b>08:00</b> às <b>12:00h</b>.
							</p>

						</div>

						<p className={this.state.hora_entrega_err?'bg-danger':'hide'}>
							Favor preencher o campo <strong>horário de entrega</strong>
						</p>

						<strong>Deseja incluir o serviço de entrega?</strong>
						<div className="radio">
							<label>
								<input type="radio" id="radioEntregaSim" name="radioEntrega" value="1" onChange={this.handleRadio.bind(this)} defaultChecked /> Sim
							</label>
						</div>
						<div className="radio">
							<label>
								<input type="radio" id="radioEntregaNao" name="radioEntrega" value="0" onChange={this.handleRadio.bind(this)} /> Não. vou retirar na MeuSalgado.
							</label>
						</div>

						<br/>
						<div className={this.state.temEntrega?'show':'hide'}>
						<Input id="input-endereco" 
								name="endereco" 
								label="Endereço" 
								handleChange={this.handleChange.bind(this)} 
								value={this.state.endereco}
								required={true} />


						<p className={this.state.endereco_err?'bg-danger':'hide'}>
							Favor preencher o campo <strong>endereço</strong>
						</p>

						<Input id="input-complemento" 
								name="complemento" 
								label="Complemento" 
								handleChange={this.handleChange.bind(this)} 
								value={this.state.complemento}
								required={false} />

						<div className="form-group">
							<label htmlFor="input-cidade">Cidade</label>
							<select className="form-control"
									id="input-cidade" 
									onChange={this.handleSelect.bind(this, 'cidade')}
									value={this.state.cidade}>
									<option value="" />
									<option value="Florianópolis">Florianópolis</option>
									<option value="São José">São José</option>
									<option value="Palhoça">Palhoça</option>
									<option value="Biguaçu">Biguaçu</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="input-bairro">Bairro</label>
							<select className="form-control"
									id="input-bairro" 
									onChange={this.handleSelect.bind(this, 'bairro')}
									value={this.state.bairro}>
									<option value="" />
									{bairros}
							</select>

							<p className={this.state.bairro_err?'bg-danger':'hide'}>
								Favor preencher o campo <strong>bairro</strong>
							</p>
							<p className={this.state.bairro_err_qtde?'bg-danger':'hide'} dangerouslySetInnerHTML={{__html: this.state.bairro_err_qtde}}>
							</p>
						</div>

						</div>
						
						<Input id="input-observacao" 
								name="observacao" 
								label="Observação" 
								handleChange={this.handleChange.bind(this)} 
								value={this.state.observacao}
								required={false} />

						<p className="bg-info">
							<strong>Valor da Entrega: R$ </strong>{this.state.valor_entrega.toFixed(2)}<br/>
							<strong>Valor: R$ </strong>{this.props.totalValue.toFixed(2)}
						</p>
						<div id="retorno"></div>
						
					
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        <input onClick={this.envia.bind(this)} type="button" value="Efetuar Pedido" className="btn btn-default"  />
      </div>
    </div>
  </div>
</div>
</form>

					

    );
  }
}
 
export default Formulario;