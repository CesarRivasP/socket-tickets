const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {
  console.log('Usuario conectado');

  client.emit('siguienteTicket', {
    message: 'Bienvenido a esta aplicacion'
  });

  client.on('disconnect', () => {
    console.log('Usuario desconectado');
  });

  // Escuchar eventos
  client.on('siguienteTicket', (data, callback) => {
    console.log('Cual es el siguiente ticket');
    // Mediante la clase tambien se puede accder al metodo
    let next = ticketControl.nextTicket()
    console.log(next);

    callback(next);  //Callback que proviene del frontend
  });

  client.emit('currentState', {
    current: ticketControl.getLastTicket()
  });

  client.on('attendTicket', (data, callback) => {
    // Lo que llega en data es lo que se envia desde la emision
    //en el cliente
    console.log(data.numberBox);
    if(!data.numberBox){
      return callback({
        err: true,
        message: 'El numero de caja es necesario '
      })
    }

    let attendTickets = ticketControl.attendTicket(data.numberBox);
    callback(attendTickets);

    // Actualizar o notificar cambios en los ultimos 4
  })

});
