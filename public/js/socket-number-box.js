var socket = io();
// Obtener parametros por la url
var searchParams = new URLSearchParams(window.location.search);
// has para preguntar si existe una palabra clave en la url
console.log(searchParams.has('escritorio'));

let label = $('small')

socket.on('connnect', function(){
  console.log('Numero de caja connectado al servidor');
});

socket.on('disconnect', function(){
  console.log('Numero de caja desconectado');
});

if(!searchParams.has('escritorio')){  //sino existe, salirse de esta pantalla
  window.location = 'index.html';
  throw new Error('El escritorio es necesario en la url')
}
//si viene informacion sobre el escritorio
var desk = searchParams.get('escritorio');
console.log(desk);
//etiqueta h1 del html
$('h1').text('Caja ' + desk);
$('button').on('click', function(){
  socket.emit('attendTicket', { numberBox: desk }, function(response){
    // En la funcion llega como parametro la respuesta del
    // valor que se pasa por el Callback en el servidor
    console.log('respuesta: ', response);

    if(response === 'No hay tickets'){
      label.text(response);
      return alert(response);
    }

    label.text('Ticket: ' + response.number);
  });
});
