// ------------------------------------register form starts --------------------------------------------------
$(document).ready(function() {
    $('#registerform').on('submit', function(event) {
      event.preventDefault(); // prevent default form submission
  
      // gather form data
      var formData = {
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        conpassword: $('#conpassword').val(),
      };
      console.log(formData)
  
      // send AJAX request
      $.ajax({
        type: 'POST',
        url: 'http://localhost/cscbyound/day1/php/registration.php',
        data: formData,
        success: function(response) {
          console.log(response.errors);
          if (response.status ==1) {
            document.getElementById("success").innerHTML = "Account created wait until admin active it for you" ;
            document.getElementById("errormsgemail").innerHTML = "";
            document.getElementById("errormsgname").innerHTML = "";
            document.getElementById("errormsgconpassword").innerHTML = "";
            document.getElementById("errormsgpassword").innerHTML = "";
          } else {
            document.getElementById("errormsgpassword").innerHTML = "";
            document.getElementById("errormsgconpassword").innerHTML = "";
            document.getElementById("errormsgemail").innerHTML = "";
            document.getElementById("errormsgname").innerHTML = "";
            // display errors masseges
            response.errors.map(e=>{
              switch (e) {
                case "Invalid Email":
                  document.getElementById("errormsgemail").innerHTML = "Invalid Email";
                  break;
                case "email already exists":
                  document.getElementById("errormsgemail").innerHTML = "email already exists";
                  break;
                case "Username must at least be 8 char":
                  document.getElementById("errormsgname").innerHTML = "Username must at least be 8 char";
                  break;
                case "User name is taken":
                  document.getElementById("errormsgname").innerHTML = "User name is taken";
                  break;
                case "your pssword didn't match":
                  document.getElementById("errormsgconpassword").innerHTML = "your pssword didn't match";
                  break;
                case "Invalid pssword make it stronger":
                  document.getElementById("errormsgpassword").innerHTML = "Invalid pssword make it stronger";
                  break;
                default:
                  document.getElementById("errormsgpassword").innerHTML = "";
                  document.getElementById("errormsgconpassword").innerHTML = "";
                  document.getElementById("errormsgemail").innerHTML = "";
                  document.getElementById("errormsgname").innerHTML = "";
                  break;
              }
            })
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown); 
        }
      });
    });
  });
// ------------------------------------register form ends ------------------------------------------------------




// ------------------------------------login form starts --------------------------------------------------
  $(document).ready(function() {
    $('#loginform').on('submit', function(event) {
      event.preventDefault(); // prevent default form submission
  
      // gather form data
      var formData = {
        email: $('#email').val(),
        password: $('#password').val(),
      };
      console.log(formData)
  
      // send AJAX request
      $.ajax({
        type: 'GET',
        url: 'http://localhost/cscbyound/day1/php/registration.php', 
        data: formData,
        success: function(response) {
          switch (response.is_admin) {
            case 0:
              window.location.assign("../pages/home.html")
              sessionStorage.setItem("user",JSON.stringify(response));
              break;
              case 1:
              window.location.assign("../pages/dashboard.html")
              sessionStorage.setItem("user",JSON.stringify(response));
              break;
            default:
              document.getElementById("error").innerHTML = response ;
              break;
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown); 
        }
      });
    });
  });
  // ------------------------------------login form ends ------------------------------------------------------
