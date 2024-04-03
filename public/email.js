function formSubmit(event) {
    var url = "/api";
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function() { // request successful
    // we can use server response to our request now
      document.getElementById("formstatus").innerHTML = "Sent!"
    };
  
    request.onerror = function() {
        document.getElementById("formstatus").innerHTML = "An Unknown error occurred. "
    };
  
    request.send(new FormData(event.target)); // create FormData from form that triggered event
    event.preventDefault();
  }
  
  // and you can attach form submit event like this for example
document.getElementById("contactform").addEventListener("submit", formSubmit);

//method="POST" action="/api"
