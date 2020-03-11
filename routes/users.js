
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
serverApptArray.push(new ApptObject("Alejandra Valencia","test1@gmail.com", "(206)555-1234)", "12:00 PM"));
serverApptArray.push(new ApptObject("Beyonce Knowles","test2@gmail.com", "(206)444-1234)", "1:00 PM"));
serverApptArray.push(new ApptObject("Kylie Jenner","test3@gmail.com", "(206)666-1234)", "2:00 PM"));

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

