// Comando para establecer la conexion con el servidor
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function(){
  console.log('Conectado al servidor');
});

socket.on('disconnect', function(){
  console.log('Perdida la conexión al servidor');
});

// todos los botones al hacer click en esta pantalla van a disparar esta funcion
$('button').on('click', function(){
  console.log('click');
  socket.emit('siguienteTicket', null, function(nextTicket) {
    label.text(nextTicket);
  });
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
