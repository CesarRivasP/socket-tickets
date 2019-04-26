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

    }
    else {
      this.restartCounting()
    }
  }

  restartCounting(){
    // reiniciar los valores
    let jsonData = {
      last: this.last,
      today: this.today
    };

    let jsonDataString = JSON.stringify(jsonData);
    // PAra grabar en el json
    fs.writeFileSync('./server/data/data.json', jsonDataString);

    console.log('se ha inicializado el sistema');
  }

}

module.exports = {
  TicketControl
}
