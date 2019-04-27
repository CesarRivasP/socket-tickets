const fs = require('fs');

// Para manejar los tickets pendientes
class Ticket {
  constructor(number, box){ //numero del ticket que se va a atender, que caja lo va a atender
    this.number = number;
    this.box = box;
  }
}



// let ticketControl = new TicketControl() Al ocurrir esto, se dispara el constructor
class TicketControl {
  constructor(){  //Para inicializar la clase
    this.last = 0;
    this.today = new Date().getDate();
    // Va a contener todos los tickets pendientes de revision
    this.tickets = [];  //todos los tickets que no han sido atendidos

    let data = require('../data/data.json');

    // console.log(data);

    // Al empezar una nuevo dia, se debe reiniciar el proceso
    if(data.today === this.today){  //si son diferentes, es otro dia y hay que reiniciar todo
      // Para mantener de forma persistente el ultimo numero, usando el utlimo registrado en el json
      this.last = data.last;

      this.tickets = data.tickets;
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

  recordFile(){
    let jsonData = {
      last: this.last,
      today: this.today,
      // tambien hay que grabar los tickets pendientes
      tickets: this.tickets //asi se graban los tickets que esten pendientes por atender
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
    this.recordFile();

    console.log('se ha inicializado el sistema');
  }
}

module.exports = {
  TicketControl
}
