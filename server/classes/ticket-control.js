const fs = require('fs');

// let ticketControl = new TicketControl() Al ocurrir esto, se dispara el constructor
class TicketControl {
  constructor(){  //Para inicializar la clase
    this.last = 0;
    this.today = new Date().getDate();

    let data = require('../data/data.json');

    // console.log(data);

    // Al empezar una nuevo dia, se debe reiniciar el proceso
    if(data.today === this.today){  //si son diferentes, es otro dia y hay que reiniciar todo
      // Para mantener de forma persistente el ultimo numero, usando el utlimo registrado en el json
      this.last = data.last;
    }
    else {
      this.restartCounting()
    }
  }

  nextTicket(){
    // Incrementar en uno el ultimo ticket
    this.last += 1;
    // Grabar cuando se actualice el ultimo ticket
    this.recordFile();

    // Al llamar esta funcion va a retornar el numero de cada uno de los tickets
    return `Ticket ${this.last}`;
  }

  recordFile(){
    let jsonData = {
      last: this.last,
      today: this.today
    };

    let jsonDataString = JSON.stringify(jsonData);
    // PAra grabar en el json
    fs.writeFileSync('./server/data/data.json', jsonDataString);
  }

  restartCounting(){
    // reiniciar los valores
    this.last = 0;

    this.recordFile();

    console.log('se ha inicializado el sistema');
  }
}

module.exports = {
  TicketControl
}
