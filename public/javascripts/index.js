let apptArray = [];
let selectedService = "not selected";

// define a constructor to create person object
let ApptObject = function (pName, pEmail, pPhone, pDate, pTime) {
  this.Name = pName;
  this.Email = pEmail;
  this.Phone = pPhone;
  this.Date = pDate;
  this.Time = pTime;
}

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("buttonAdd").addEventListener("click", function () {
    let newAppt = new ApptObject(
      document.getElementById("name").value, 
      document.getElementById("email").value,
      document.getElementById("phone").value, 
      document.getElementById("date").value, 
      document.getElementById("time").value
      );
    addNewAppt(newAppt);
  });

  //when there is a change in the service, the system will recognize the change 
  $(document).bind("change", "#select-service", function (event, ui) {
    selectedService = $('#select-service').val();
  });

  document.getElementById("buttonSortDate").addEventListener("click", function () {
    apptArray = apptArray.sort(compareDate);
    createList();
  });

  $(document).on("pagebeforeshow", "#appointments", function (event) {   
    FillArrayFromServer();  // need to get fresh data
  });

$(document).on("pagebeforeshow", "#refreshPage", function (event) {   
  document.location.href = "index.html#appointments";
});

document.getElementById("buttonClear").addEventListener("click", function () {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
});

$(document).on("pagebeforeshow", "#contact", function (event) {   // have to use jQuery 
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
  });

//load info I PROBABLY WONT NEED THIS. THIS DISPLAYS THE MOVIE INFO WHEN THE USER SELECTS THE MOVIE IMAGE. 
  $(document).on("pagebeforeshow", "#detailPage", function (event) {   // have to use jQuery 
    let localTitle = document.getElementById("IDparmHere").innerHTML;
    for(let i=0; i < apptArray.length; i++) {   
        if(apptArray[i].Title = localTitle){
            document.getElementById("oneName").innerHTML =  apptArray[i].Name;
            document.getElementById("oneEmail").innerHTML =  apptArray[i].Email;
            document.getElementById("onePhone").innerHTML =  apptArray[i].Phone;
            document.getElementById("oneDate").innerHTML =   apptArray[i].Date;
            document.getElementById("oneTime").innerHTML =   apptArray[i].Time;
        }  
    }
 });
  // $(document).on("pagebeforeshow", "#appointments", function (event) {   // have to use jQuery 
  //   document.getElementById("IDparmHere").innerHTML = "";
  //   createList();
  // });

  
 
});

function createList() {
  // clear prior data
  var apptList = document.getElementById("apptList");
  while (apptList.firstChild) {    // remove any old data so don't get duplicates
    apptList.removeChild(apptList.firstChild);
  };

  var ul = document.createElement('ul');
  console.log(apptArray);
  apptArray.forEach(function (element, ) {   // use handy array forEach method
    var li = document.createElement('li');
    li.innerHTML = element.Name + " " + element.Email + " " + element.Date + " " + element.Time;
    //"<a data-transition='pop' class='oneAppt' data-parm=" + element.Name + "  href='#detailPage'>Get Details </a> "  + element.Date + "  " + element.Time;
    ul.appendChild(li);
  });
  apptList.appendChild(ul)

  //set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
  var classname = document.getElementsByClassName("oneAppt");
  Array.from(classname).forEach(function (element) {
    element.addEventListener('click', function () {
      var parm = this.getAttribute("data-parm");  // passing in the record.Id
      //do something here with parameter on  pickbet page
      document.getElementById("IDparmHere").innerHTML = parm;
      document.location.href = "index.html#detailPage";
    });
  });

};

function compareDate(a, b) {
  // Use toUpperCase() to ignore character casing
  const dateA = a.Date.toUpperCase();
  const dateB = b.Date.toUpperCase();

  let comparison = 0;
  if (dateA > dateB) {
    comparison = 1;
  } else if (dateA < dateB) {
    comparison = -1;
  }
  return comparison;
}

// code to exchange data with node server

function FillArrayFromServer() {
  // using fetch call to communicate with node server to get all data
  fetch('/users/apptList')
    .then(function (theResonsePromise) {  // wait for reply.  Note this one uses a normal function, not an => function
      return theResonsePromise.json();
    })
    .then(function (serverData) { // now wait for the 2nd promise, which is when data has finished being returned to client
      console.log(serverData);
      apptArray.length = 0;  // clear array
      apptArray = serverData;   // use our server json data which matches our objects in the array perfectly
      createList();  // placing this here will make it wait for data from server to be complete before re-doing the list
    })
    .catch(function (err) {
      console.log(err);
    });
};


// using fetch to push an object up to server
function addNewAppt(newAppt) {

  // the required post body data is our movie object passed in, newMovie

  // create request object
  const request = new Request('/users/addAppt', {
    method: 'POST',
    body: JSON.stringify(newAppt),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });

  // pass that request object we just created into the fetch()
  fetch(request)
    // wait for frist server promise response of "200" success (can name these returned promise objects anything you like)
    // Note this one uses an => function, not a normal function, just to show you can do either 
    .then(theResonsePromise => theResonsePromise.json())    // the .json sets up 2nd promise
    // wait for the .json promise, which is when the data is back
    .then(theResonsePromiseJson => console.log(theResonsePromiseJson), document.location.href = "#appointments")
    // that client console log will write out the message I added to the Repsonse on the server
    .catch(function (err) {
      console.log(err);
    });

}; // end of addNewUser

var slideIndex = [1, 1];
var slideId = ["mySlides1", "mySlides2"]
showSlides(1, 0);
showSlides(1, 1);

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) { slideIndex[no] = 1 }
  if (n < 1) { slideIndex[no] = x.length }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no] - 1].style.display = "block";

}