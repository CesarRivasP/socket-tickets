// Comando para establecer la conexion con el servidor
var socket = io();
var label = $('#lblNuevoTicket');

// Escuchar conexion con el servidor, si es satisfactoria o no
socket.on('connect', function(){
  console.log('Conectado al servidor');
});

// Escuchar la conexion con el servidor, si ocurre una desconexion
socket.on('disconnect', function(){
  console.log('Perdida la conexión al servidor');
});

// todos los botones al hacer click en esta pantalla van a disparar esta funcion
$('button').on('click', function(){
  // console.log('click');           //callback a enviar al servidor. En el servidor se debe ejecutar el callback
  socket.emit('siguienteTicket', null, function(nextTicket) {
    label.text(nextTicket);
  });
})

socket.on('currentState', function(currentTicket){
  console.log(currentTicket);
  label.text(currentTicket.current);
})

socket.on('siguienteTicket', function(message) {
  console.log('Servidor: ', message);
})


// $('button').on('click', function(){
//   console.log('click');
//   socket.emit(
//     'siguienteTicket',
//     {  //Enviar informacion
//       user: 'Cesar',
//       message: 'Hello World'
//     },
//     function(response){
//       console.log('Server response: ', response);
//     }
//   );
// })
