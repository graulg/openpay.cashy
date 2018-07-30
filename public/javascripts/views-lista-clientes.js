$(function() {

  moment.locale("es");
  //Para mostrar mensajes al usuario
  function mostrarMensaje(mensaje,tipo){
    $("#mensaje").removeClass("alert-danger alert-success");
    $("#mensaje").addClass("alert-"+tipo);
    $("#mensaje").html(mensaje);
    $("#mensaje").fadeIn( 1500, "linear", function(){
      $("#mensaje").fadeOut(2000, "linear");
    });
  }

  $.ajax({
    type: "post",
    url: "/clientes/listar",
    // data: {},
    // contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(res) {
      if (!res.error){
        console.log(res.lista);

        var cols = [
          {
            "data": null,
            "render": function(cliente){
              return moment(cliente.creation_date).format("D MMM YYYY, HH:mm")
            }
          },
          { "data": null,
            "render": function (cliente) {
                return cliente.name + (cliente.last_name? " " + cliente.last_name : "");
            }
          },
          {"data":"email"},
          {"data":"phone_number"}
        ];

        $("#tbl-clientes").DataTable({
          "data": res.lista,
          "columns": cols,
          "language": {
            "url": "/javascripts/dataTables.Spanish.json"
          }
        });
      }
      else {
        mostrarMensaje("Algo salió mal, intenta de nuevo", "danger");
      }
    },
    error: function(err) {
      mostrarMensaje("Algo salió mal, intenta de nuevo", "danger");
    }
  });



});
