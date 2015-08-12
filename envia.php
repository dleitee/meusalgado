<?php

$p = $_POST;

//var_dump($p);


$pedido = 'Nome: ' . $p['nome'] . "\n";
$pedido.= 'Telefone: ' . $p['telefone'] . "\n";
$pedido.= 'E-mail: ' . $p['email'] . "\n";
$pedido.= 'Data da Entrega: ' . $p['data_entrega'] . "\n";
$pedido.= 'Horário da Entrega: ' . $p['hora_entrega'] . "\n";
$pedido.= 'Tem entrega: ' . $p['tem_entrega'] . "\n";
$pedido.= 'Endereço: ' . $p['endereco'] . "\n";
$pedido.= 'Complemento: ' . $p['complemento'] . "\n";
$pedido.= 'Bairro: ' . $p['bairro'] . "\n";
$pedido.= 'Cidade: ' . $p['cidade'] . "\n";
$pedido.= 'Observação: ' . $p['observacao'] . "\n";
$pedido.= 'Valor Entrega: ' . $p['valor_entrega'] . "\n";
$pedido.= 'Valor Total: ' . $p['valor_total'] . "\n";
$pedido.= 'Obs: ' . $p['obs'] . "\n";
$pedido.= '<table><tr><th>Item</th><th>Quantidade</th><th>Valor</th></tr>';

foreach ($p['salgados'] as $key => $value) {
	$pedido.= '<tr><td>' . $value['name'] . '</td><td>' . $value['total']*$value['quantity'] . '</td><td>R$ ' . $value['total']*$value['value'] . '</td></tr>';	
}

$pedido.='</table>';


$headers = "MIME-Version: 1.1\r\n";
$headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
$headers .= "From: contato@meusalgado.com.br\r\n"; // remetente
$headers .= "Return-Path: contato@meusalgado.com.br\r\n"; // return-path
if (mail('contato@meusalgado.com.br', "Pedido pelo site", $pedido, $headers)) {
    echo 'sucesso';
} else {
    echo 'Ocorreu algum erro no envio de seu pedido, favor tentar novamente ou entrar em contato com contato@meusalgado.com.br';
}






