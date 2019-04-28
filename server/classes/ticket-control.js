const fs = require('fs');

// Para manejar los tickets pendientes
class Ticket {
  constructor(number, numberBox){ //numero del ticket que se va a atender, que caja lo va a atender
    this.number = number;
    this.numberBox = numberBox;
  }
}


// let ticketControl = new TicketControl() Al ocurrir esto, se dispara el constructor
class TicketControl {
  constructor(){  //Para inicializar la clase
    this.last = 0;
    this.today = new Date().getDate();
    // Va a contener todos los tickets pendientes de revision
    this.tickets = [];  //todos los tickets que no han sido atendidos
    this.lastFour = []; //ultimos 4 tickets que se estan atendiendo

    let data = require('../data/data.json');

    // console.log(data);

    // Al empezar una nuevo dia, se debe reiniciar el proceso
    if(data.today === this.today){  //si son diferentes, es otro dia y hay que reiniciar todo
      // Para mantener de forma persistente el ultimo numero, usando el utlimo registrado en el json
      this.last = data.last;

      this.tickets = data.tickets;
      this.lastFour = data.lastFour;
    }
    else {
      this.restartCounting()
    }
  }

  nextTicket(){
    // Incrementar en uno el ultimo ticket
    this.last += 1;
    // Nueva instancia para crear nuevos tickets
    let ticket = new Ticket(this.last, null)
    this.tickets.push(ticket);
    // Grabar cuando se actualice el ultimo ticket
    this.recordFile();

    // Al llamar esta funcion va a retornar el numero de cada uno de los tickets
    return `Ticket ${this.last}`;
  }

  getLastTicket(){
    // Va a retornar cual fue el ultimo ticket
    return`Ticket ${this.last}`;
  }

  getLastFour(){
    return this.lastFour;
  }

  attendTicket(numberBox){
    // si no hay tickets pendientes, no se debe hacer nada
    if(this.tickets.length === 0){
      return 'No hay tickets'
    }
    // Hay que tomar el primer ticket que se encuentre en el array de tickets
    let numberTicket = this.tickets[0].number;
    // Una vez tomado dicho ticket, se debe borrar el mismo del array
    this.tickets.shift(); //Asi se elimina el primer elemento

    // Instancia de un nuevo ticket, puesto que este es el que se quiere atender
    let attendTicket = new Ticket(numberTicket, numberBox); //Creacion del nuevo ticket que se va a atender
    // Se va a agregar el nuevo ticket al inicio del array
    this.lastFour.unshift(attendTicket); //unshift para agregarlo al inicio del array

    // Cuando el array se llene se deben borrar los primeros que ingresaron en orden
    if(this.lastFour.length > 4){
      // Para remover el ultimo elemento
      this.lastFour.splice(-1,1);
    }

    console.log('Ultimos 4');
    console.log(this.lastFour);

    this.recordFile();

    // ticket a atender
    return attendTicket;
  }

  recordFile(){
    let jsonData = {
      last: this.last,
      today: this.today,
      // tambien hay que grabar los tickets pendientes
      tickets: this.tickets, //asi se graban los tickets que esten pendientes por atender
      lastFour: this.lastFour
    };

    let jsonDataString = JSON.stringify(jsonData);
    // PAra grabar en el json
    fs.writeFileSync('./server/data/data.json', jsonDataString);
  }

  restartCounting(){
    // reiniciar los valores
    this.last = 0;
    // Aparte de reiniciar cual fue el ultimo, se debe reiniciar todo lo que contiene el objeto ticket
    this.tickets = [];
    this.lastFour = [];
    this.recordFile();

    console.log('se ha inicializado el sistema');
  }
}

module.exports = {
  TicketControl
}
