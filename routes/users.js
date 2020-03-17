
var express = require('express');
var router = express.Router();

let serverApptArray = []; // our "permanent storage" on the web server

// define a constructor to create person object
var ApptObject = function (pName, pEmail, pPhone, pDate, pTime) {
  this.Name = pName;
  this.Email = pEmail;
  this.Phone = pPhone;
  this.Date = pDate;
  this.Time = pTime;
}

// for testing purposes, its nice to preload some data
// serverApptArray.push(new ApptObject("Alejandra Valencia","avalencia05outlook.com","(206)712-1234","03/25/2020","12:00 PM"));
// serverApptArray.push(new ApptObject("Beyonce Knowles","beyknow@gmail.com", "(206)412-5678","03/30/2020","1:00 PM"));
// serverApptArray.push(new ApptObject("Kylie Jenner","kyjenner@live.com", "(206)944-1278","03/31/2020","2:00 PM"));

/* POST to addMovie */
router.post('/addAppt', function(req, res) {
  console.log(req.body);
  serverApptArray.push(req.body);
  console.log(serverApptArray);
  //res.sendStatus(200);
  res.status(200).send(JSON.stringify('success'));
});


/* GET apptList. */
router.get('/apptList', function(req, res) {
  res.json(serverApptArray);
 });


//  router.???('/userlist', function(req, res) {
//  users.update({name: 'foo'}, {name: 'bar'})

module.exports = router;

