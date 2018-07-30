exports.index = function(req, res) {
  res.render('index')
};

exports.registroCliente = function(req, res) {
  res.render('registro-cliente');
}

exports.listaClientes = function(req, res) {
  res.render('lista-clientes');
}
