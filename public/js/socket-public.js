var socket = io();

var labelTicket1 = $('#lblTicket1');
var labelBox1 = $('#lblEscritorio1');
var labelTicket2 = $('#lblTicket2');
var labelBox2 = $('#lblEscritorio2');
var labelTicket3 = $('#lblTicket3');
var labelBox3 = $('#lblEscritorio3');
var labelTicket4 = $('#lblTicket4');
var labelBox4 = $('#lblEscritorio4');

var labelTickets = [
  labelTicket1,
  labelTicket2,
  labelTicket3,
  labelTicket4
];

var labelBoxes = [
  labelBox1,
  labelBox2,
  labelBox3,
  labelBox4
];


socket.on('connect', function(){
  console.log('Conectado al servidor');
});

socket.on('disconnect', function(){
  console.log('Se ha perdido la conexion con el servidor');
});

socket.on('currentState', function(data){
  console.log(data);
  updateHTML(data.lastFour);
});

// Para actualizar el html
function updateHTML(lastFour){
  console.log(lastFour.length );
  for(var i = 0; i <= lastFour.length - 1; i++){
    labelTickets[i].text('Ticket: ' + lastFour[i].number)
    labelBoxes[i].text('Caja: ' + lastFour[i].numberBox)
  }
}
