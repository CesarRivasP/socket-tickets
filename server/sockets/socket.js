const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {
  console.log('Usuario conectado');

  client.emit('siguienteTicket', {
    message: 'Bienvenido a esta aplicacion'
  })

  client.on('disconnect', () => {
    console.log('Usuario desconectado');
  })

  // Escuchar eventos
  client.on('siguienteTicket', (data, callback) => {
    console.log('Cual es el siguiente ticket');
    // Mediante la clase tambien se puede accder al metodo
    let next = ticketControl.nextTicket()
    console.log(next);

    callback(next);  //Callback que proviene del frontend
  })

});
