$(function() {
  //Para mostrar mensajes al usuario
  function mostrarMensaje(mensaje,tipo){
    $("#mensaje").removeClass("alert-danger alert-success");
    $("#mensaje").addClass("alert-"+tipo);
    $("#mensaje").html(mensaje);
    $("#mensaje").fadeIn( 1500, "linear", function(){
      $("#mensaje").fadeOut(2000, "linear");
    });
  }

  function llenarPaises(){
    $.getJSON("https://restcountries.eu/rest/v2/all?fields=name;alpha2Code", function(paises){
      var options = {
        "data": paises,
        "getValue": "name",
        "list": {
          "match": {
            "enabled": true
          }
        }
      };

      $("#country_code").easyAutocomplete(options);
      $("#country_code").on("change", function(){
        var country = $(this).val().trim();
        var seleccion = $.grep(paises, function(e, i){
          return e.name == country;
        });

        $(this).data("country_code", seleccion.length? seleccion[0].alpha2Code : null);
      });

    });
  }
  llenarPaises();

  //Quita espacios en todos los campos de texto
  $('body').on("blur", "input", function(){
    $(this).val($(this).val().trim()).trigger("change");
  });

  $('#frm-registrar-cliente').on("submit", function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    //Se valida que se haya seleccionado un país de la lista
    var country_code = $("#country_code").data("country_code");
    if (!country_code){
      console.log("validación no superada");
      return false;
    }

    //Se construye el objeto Cliente para ser enviado
    var domicilio = {
      "line1": $("#line1").val(),
      "line2": $("#line2").val(),
      "line3": $("#line3").val(),
      "city": $("#city").val(),
      "state": $("#state").val(),
      "postal_code": $("#postal_code").val(),
      "country_code": country_code
    };
    var cliente = {
      "name": $("#name").val(),
      "last_name": $("#last_name").val(),
      "email": $("#email").val(),
      "phone_number":$("#phone_number").val(),
    }

    //Todos los datos se pasan a mayúsculas, excepto el email
    for (dato in domicilio){
      domicilio[dato] = domicilio[dato].toUpperCase();
    }
    for (dato in cliente){
      cliente[dato] = cliente[dato].toUpperCase();
    }
    cliente.email = cliente.email.toLowerCase();
    cliente.address = domicilio;

    console.log(cliente);
    //Se envían los datos del cliente para su registro
    $.ajax({
      type: "post",
      url: "/clientes/registrar",
      data: JSON.stringify(cliente),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(res) {
        if (!res.error){
          mostrarMensaje("Cliente registrado", "success");
          $('#frm-registrar-cliente')[0].reset();
        }
        else {
          mostrarMensaje("Algo salió mal, intenta de nuevo", "danger");
        }
      },
      error: function(err) {
        mostrarMensaje("Algo salió mal, intenta de nuevo", "danger");
      }
    });
    return false;
  });

});
