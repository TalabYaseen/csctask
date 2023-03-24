
//-------------------------------------- if the user not loged in start-----------------------------------------
if (!(JSON.parse(sessionStorage.getItem("user")))){
  window.location.assign("../pages/login.html")
}
//-------------------------------------- if the user not loged in end-------------------------------------------


//----------------------------------------- if user not admin start----------------------------------------------
if ((JSON.parse(sessionStorage.getItem("user"))).is_admin ==0 ){
  // home but
  document.getElementById("homedashcon").innerHTML= `<a href="../pages/home.html" class="btn btn-outline-secondary"><i class="fa-solid fa-house"></i></a>`
// get users to send masseges
var user= (JSON.parse(sessionStorage.getItem("user")));
$(document).ready(function() {
    var formData = {
        id: user.user_id,}
    $.ajax({
      url: "http://localhost/cscbyound/day1/php/getfriends.php",
      type: "GET",
      dataType: "json",
      data: formData,
      success: function(response) {
        let html = ``;
        response.map(e=>{
            html +=`<li class="clearfix border border-secondary" onclick="openmsg(${e.user_id },'${e.user_name}')">
            <div class="about">
                <div class="name">${e.user_name}</div>
            </div>
        </li>`
        })
         document.getElementById("freindscon").innerHTML = html;
         
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  });
}
//----------------------------------------- if user not admin end----------------------------------------------

  function openmsg (id,name){
    document.getElementById("chat-about").innerHTML = `<h6 class="m-b-0">${name}</h6>`;
    document.getElementById('sendto').defaultValue = id;
    $(document).ready(function() {
        var formData = {
            userid: user.user_id,
            freindid :id }
        $.ajax({
          url: "http://localhost/cscbyound/day1/php/getmasseges.php",
          type: "GET",
          dataType: "json",
          data: formData,
          success: function(response) {
            let html = ``;
            response.map(e=>{
                if (e.sender_id == user.user_id) {
                    html += `<li class="clearfix">
                    <div class="message other-message float-right">${e.content}</div>
                </li>`
                } else {
                    html += `<li class="clearfix">
                    <div class="message-data">
                        <span class="message-data-time">${e.send_at}</span>
                    </div>
                    <div class="message my-message">${e.content}</div>                                    
                </li>  `
                }
            })
             document.getElementById("massegecontainer").innerHTML = html;
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
          }
        });
      });

  }




  $(document).ready(function() {
    $('#sendmsg').on('submit', function(event) {
      event.preventDefault(); // prevent default form submission
      var formData = {
        msg: $('#msgcontentcon').val(),
        userid: user.user_id,
        sendto: $('#sendto').val(),
    
    }
        console.log(formData)
      $.ajax({
          url: `http://localhost/cscbyound/day1/php/savemassege.php`,
          type: "POST",
          data: formData,
          success: function(data) {
            console.log(data)
            getmsg();
              
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
          }
        });
        document.getElementById("msgcontentcon").value="";
    });})


    // -------------------------------------------------------
    function getmsg () {
      id = document.getElementById('sendto').defaultValue;
      console.log(id,"sendtoid")
      $(document).ready(function() {
        console.log()
        var formData = {
            userid: user.user_id,
            freindid :id }
        $.ajax({
          url: "http://localhost/cscbyound/day1/php/getmasseges.php",
          type: "GET",
          dataType: "json",
          data: formData,
          success: function(response) {
            let html = ``;
            response.map(e=>{
                if (e.sender_id == user.user_id) {
                    html += `<li class="clearfix">
                    <div class="message other-message float-right">${e.content}</div>
                </li>`
                } else {
                    html += `<li class="clearfix">
                    <div class="message-data">
                        <span class="message-data-time">${e.send_at}</span>
                    </div>
                    <div class="message my-message">${e.content}</div>                                    
                </li>  `
                }
            })
             document.getElementById("massegecontainer").innerHTML = html;
             
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
          }
        });
      });
    }


function logout() {
  sessionStorage.clear();
  location.reload();
}











// admin masseges 
if ((JSON.parse(sessionStorage.getItem("user"))).is_admin ==1 ){
  console.log*"admin"
  document.getElementById("homedashcon").innerHTML= `<a href="../pages/dashboard.html" class="btn btn-outline-secondary"><i class="fa-solid fa-gauge"></i> dash board</a>`

// get users to send masseges
var user= (JSON.parse(sessionStorage.getItem("user")));
$(document).ready(function() {
    var formData = {
        id: user.user_id,}
    $.ajax({
      url: "http://localhost/cscbyound/day1/php/getallusers.php",
      type: "GET",
      dataType: "json",
      data: formData,
      success: function(response) {
        let html = ``;
        response.map(e=>{
            html +=`<li class="clearfix border border-secondary" onclick="openmsg(${e.user_id },'${e.user_name}')">
            <div class="about">
                <div class="name">${e.user_name}</div>
            </div>
        </li>`
        })
         document.getElementById("freindscon").innerHTML = html;
         
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  });
}

function logout() {
  sessionStorage.clear();
  location.reload();
}
