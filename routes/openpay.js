var Openpay = require('openpay');
var openpay =  new Openpay('mnfouy26uokgq4nsl4b9','sk_f4fe7752cfbd4cb187d34abb594b1c12');

exports.registrarCliente = function(req, res) {
  openpay.customers.create(req.body, function(error, cliente) {
    res.json({"error": error, "cliente": cliente});
  });

}

exports.listarClientes = function(req, res){
  openpay.customers.list(function(error, lista){
    res.json({"error": error, "lista": lista});
  });
}
