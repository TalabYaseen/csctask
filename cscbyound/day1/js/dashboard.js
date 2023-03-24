var addmodal = document.getElementById("addModal");
var addcoursemodal = document.getElementById("addcourseModal");
var assignusertocoursemodal = document.getElementById("assignusertocourseModal");
var assignmarkmodal = document.getElementById("assignmarkModal");
//--------------------------------- check is the user is admin atart--------------------------------------------
if (!(JSON.parse(sessionStorage.getItem("user")))){
  window.location.assign("../pages/login.html")
}
if ((JSON.parse(sessionStorage.getItem("user"))).is_admin !=1){
  window.location.assign("../pages/login.html")
}
//--------------------------------- check is the user is admin end--------------------------------------------




// -----------------------------------function to read data starts ---------------------------------------------
function createuserstable (){
$(document).ready(function() {
    $.ajax({
      url: "http://localhost/cscbyound/day1/php/dashboard.php",
      type: "GET",
      dataType: "json",
      success: function(data) {
        let html = `<table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User Name</th>
            <th scope="col">User Email</th>
            <th scope="col">Status</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>`;
        html += `<tbody>`;
        data.map(e=>{
            html += `<tr>
            <td>${e.user_id }</td>
            <td>${e.user_name }</td>
            <td>${e.user_email }</td>`
            if (e.status){
                html += `<td>Active</td>`;
            }else {
                html += `<td><button type="button" class="btn btn-success" onclick="makeactive(${e.user_id})">Active</button></td>`
            }
            if (e.is_admin){
                html += `<td>Admin</td>`;
            }else {
                html += `<td>User</td>`
            }
            html += `<td><button type="button" class="btn btn-warning mx-2" onclick="openeditmodal(${e.user_id} , '${e.user_name}' , '${e.user_email}')" >edit</button>`;
            html += `<button type="button" class="btn btn-danger mx-2" onclick="confirmdelete(${e.user_id})">delete</button></td>`;
            html += `</tr>`
        })
        html += `</tbody></table>`;
        document.getElementById("data").innerHTML = html;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  });
}
createuserstable ()
// -----------------------------------function to read data ends ----------------------------------------------


//----------------------------------- change status function starts-------------------------------------------
  function makeactive(id){
    console.log(id)
    var formData = {
        id: id,}
    $.ajax({
        url: `http://localhost/cscbyound/day1/php/makeactive.php`,
        type: "POST",
        data: formData,
        success: function(data) {
          createuserstable ()
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        }
      });
  }
//------------------------------------ change status function ends-----------------------------------------------



// ------------------------------------------delete user start-----------------------------------------------------
// laststep delete start
$(document).ready(function() {
  $('#deleteform').on('submit', function(event) {
    event.preventDefault(); // prevent default form submission
    var formData = {
      id : $('#deleteid').val(),}
      console.log(formData)
    $.ajax({
        url: `http://localhost/cscbyound/day1/php/delete.php`,
        type: "POST",
        data: formData,
        success: function(data) {
            console.log();
            createuserstable ();
            modal.style.display = "none";

        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        }
      });
  });})
  //laststep delete end

  // delete modal open func starts
  function confirmdelete (id) {
    modal.style.display = "block";
    document.getElementById('deleteid').defaultValue = id ;
    
  }
  // delete modal open func ends


  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
  modal.style.display = "none";
  }
  // get the modal
  var modal = document.getElementById("myModal");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  editmodal = document.getElementById("EditModal");
  console.log(addcoursemodal)
  if (event.target == modal || event.target == editmodal || event.target == addmodal || event.target == addcoursemodal || event.target == assignusertocoursemodal || event.target ==assignmarkmodal) {
    modal.style.display = "none";
    editmodal.style.display = "none";
    addmodal.style.display = "none";
    addcoursemodal.style.display = "none";
    assignusertocoursemodal.style.display = "none";
    assignmarkmodal.style.display = "none";
    // clear add user modal start
    document.getElementById("addusername").value = "";
    document.getElementById("addemail").value = "";
    document.getElementById("addpassword").value = "";
    document.getElementById("addconpassword").value = "";
    document.getElementById("errormsgemail").innerHTML = "";
    document.getElementById("errormsgname").innerHTML = "";
    document.getElementById("errormsgconpassword").innerHTML = "";
    document.getElementById("errormsgpassword").innerHTML = "";
    // clear add user modal end
    // clear add course modal start
    document.getElementById("addcoursesuccess").innerHTML = "";
    document.getElementById("addcoursename").value = "";
    document.getElementById("addecoursemark").value = "";
    document.getElementById("addcourseerror").innerHTML = "";
    // clear add course modal end
    // clear assign user to course modal start
    document.getElementById("assignusertocoursesesuccess").innerHTML = "";  
    document.getElementById("useridtoassigncourse").style.display = "none";  
    document.getElementById("courseidtoassignuser").value = "";  
    // clear assign user to course modal end
    // clear assign mark to user modal start
    document.getElementById("usermark").value = "";
    document.getElementById("useridtoassignmark").innerHTML = "";
    document.getElementById("usermark").style.display = "none";
    document.getElementById("useridtoassignmark").style.display = "none";
    // clear assign mark to user modal end
  }
}

// ------------------------------------------delete user ends-----------------------------------------------------






//------------------------------------------- edit user start --------------------------------------------------

// function to open edit modal start 
function openeditmodal (id,name,email) {
  var editmodal = document.getElementById("EditModal");
    console.log(id,name,email);
    document.getElementById('editid').defaultValue = id ;
    document.getElementById('editusername').value = name ;
    document.getElementById('editemail').value = email ;
    editmodal.style.display = "block";
}
// function to open edit modal start 

// function to close modal start
function closeeditmodal() {
  editmodal = document.getElementById("EditModal");
  editmodal.style.display = "none";
  }
// function to close modal end



  $(document).ready(function() {
    $('#editform').on('submit', function(event) {
      event.preventDefault(); // prevent default form submission
  
      // gather form data
      var formData = {
        username: $('#editusername').val(),
        email: $('#editemail').val(),
        id: $('#editid').val(),
      };
  
      // send AJAX request
      $.ajax({
        type: 'POST',
        url: 'http://localhost/cscbyound/day1/php/edituser.php', // replace with your server-side script URL
        data: formData,
        success: function(response) {
          console.log(response)
          if (response.status == 1){
            document.getElementById("updatesuccessmsg").innerHTML = "update success";
            document.getElementById("erroreditemailmsg").innerHTML = "";
            document.getElementById("erroreditnamemsg").innerHTML = "";
            setTimeout(function(){
              closeeditmodal();
              createuserstable ();
              document.getElementById("updatesuccessmsg").innerHTML = "";
            },1000)

          }else {
            response.errors.map(e=>{
              switch (e) {
                case "User name is taken":
                  document.getElementById("erroreditnamemsg").innerHTML = "User name is taken";
                  break;
                case "Username must at least be 8 char":
                  document.getElementById("erroreditnamemsg").innerHTML = "Username must at least be 8 char";
                  break;
                case "email already exists":
                  document.getElementById("erroreditemailmsg").innerHTML = "email already exists";
                  break;
                default:
                  break;
              }
            })
          }

        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown); // handle AJAX errors
        }
      });
    });
  });

    // Get the <span> element that closes the modal
    var editspan = document.getElementsByClassName("closeedit")[0];

    // When the user clicks on <span> (x), close the modal
    editspan.onclick = function() {
      document.getElementById("EditModal").style.display = "none";
    }

//------------------------------------------- edit user end ----------------------------------------------------

// -------------------------------------------add user start----------------------------------------------------

// function to open add modal start 
function openaddmodal () {
  addModal.style.display = "block";
}
// function to open add modal end 


// request to add new user 
$(document).ready(function() {
  $('#adduserform').on('submit', function(event) {
    event.preventDefault(); // prevent default form submission
    var formData = {
      username: $('#addusername').val(),
      email: $('#addemail').val(),
      password: $('#addpassword').val(),
      conpassword: $('#addconpassword').val(),
    };
    $.ajax({
      type: 'POST',
      url: 'http://localhost/cscbyound/day1/php/adduser.php',
      data: formData,
      success: function(response) {
        console.log(response.errors);
        if (response.status ==1) {
          document.getElementById("success").innerHTML = "Account created successfuly" ;
          document.getElementById("addusername").value = "";
          document.getElementById("addemail").value = "";
          document.getElementById("addpassword").value = "";
          document.getElementById("addconpassword").value = "";
          document.getElementById("errormsgemail").innerHTML = "";
          document.getElementById("errormsgname").innerHTML = "";
          document.getElementById("errormsgconpassword").innerHTML = "";
          document.getElementById("errormsgpassword").innerHTML = "";
          createuserstable ();
          setTimeout(function (){
            document.getElementById("addModal").style.display = "none";
            document.getElementById("success").innerHTML = "";
            
          }, 2000);

        } else {
          document.getElementById("errormsgemail").innerHTML = "";
          document.getElementById("errormsgname").innerHTML = "";
          document.getElementById("errormsgconpassword").innerHTML = "";
          document.getElementById("errormsgpassword").innerHTML = "";
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
                break;
            }
          })
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown); 
      }
    });
  })})

// Get the <span> element that closes the modal
var addspan = document.getElementsByClassName("closeadd")[0];

// When the user clicks on <span> (x), close the modal
addspan.onclick = function() {
        document.getElementById("addModal").style.display = "none";
        document.getElementById("addusername").value = "";
        document.getElementById("addemail").value = "";
        document.getElementById("addpassword").value = "";
        document.getElementById("addconpassword").value = "";
        document.getElementById("errormsgemail").innerHTML = "";
        document.getElementById("errormsgname").innerHTML = "";
        document.getElementById("errormsgconpassword").innerHTML = "";
        document.getElementById("errormsgpassword").innerHTML = "";
      }


// -------------------------------------------add user end----------------------------------------------------




// -------------------------------------------add course start----------------------------------------------------

// function to open add modal start 
function openeaddcoursemodal () {
  addcoursemodal.style.display = "block";
}
// function to open add modal end 


// request to add new user 
$(document).ready(function() {
  $('#addcourseform').on('submit', function(event) {
    event.preventDefault(); // prevent default form submission
    var formData = {
      coursename: $('#addcoursename').val(),
      minmark: $('#addecoursemark').val(),

    };
    console.log(formData)
    $.ajax({
      type: 'POST',
      url: 'http://localhost/cscbyound/day1/php/addcourse.php',
      data: formData,
      success: function(response) {
        console.log(response.errors);
        if (response.status ==1) {
          document.getElementById("addcoursesuccess").innerHTML = "Course created successfuly" ;
          setTimeout(function (){
            addcoursemodal.style.display = "none";
            document.getElementById("addcoursesuccess").innerHTML = "";
            document.getElementById("addcoursename").value = "";
            document.getElementById("addecoursemark").value = "";
            document.getElementById("addcourseerror").innerHTML = "";
          }, 2000);

        } else {
          // display errors masseges
          document.getElementById("addcourseerror").innerHTML = "course already exist";
          
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown); 
      }
    });
  })})

// Get the <span> element that closes the modal
var addcoursespan = document.getElementsByClassName("closeaddcourse")[0];

// When the user clicks on <span> (x), close the modal
addcoursespan.onclick = function() {
        document.getElementById("addcourseModal").style.display = "none";
        document.getElementById("addcourseerror").innerHTML = "";
        document.getElementById("addcoursesuccess").innerHTML = "";
        document.getElementById("addcoursename").value = "";
        document.getElementById("addecoursemark").value = "";
        document.getElementById("addcourseerror").innerHTML = "";
      }

// -------------------------------------------add course end------------------------------------------------------





// -------------------------------------------Assign user to course start---------------------------------------

// function to open add modal start 
function openeassignusertocourseemodal () {
  assignusertocoursemodal.style.display = "block";

  // to get courses from database
  $(document).ready(function() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost/cscbyound/day1/php/getcourses.php',
      success: function(response) {
        console.log(response);
        html = `<select id="courseidtoassignuser" class="form-select" aria-label="Default select example" onchange="getstudenttoassign(value)">
        <option selected id="assigncourse">select course</option>`
        response.map(e=>{
          html += `<option value="${e.course_id }">${e.course_name}</option>`
        })
        html += `</select>`;
        document.getElementById("courselist").innerHTML = html;

      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown); 
      }
    });
  })}


  // get users to assign for course
function getstudenttoassign (courseid) {

  $(document).ready(function() {
    var formData = {
      courseid: courseid,
    };
    $.ajax({
      type: 'GET',
      url: 'http://localhost/cscbyound/day1/php/getuserstoassign.php',
      data: formData,
      success: function(response) {
        console.log(response);
        html = `<select id="useridtoassigncourse" class="form-select" aria-label="Default select example">`
        response.map(e=>{
          html += `<option value="${e.user_id }">${e.user_name}</option>`
        })
        html += `</select>`;
        document.getElementById("userslist").innerHTML = html;

      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown); 
      }
    });
  })}


// assign user to course 
$(document).ready(function() {
  $('#assignusertocourseform').on('submit', function(event) {
    event.preventDefault(); // prevent default form submission
    var formData = {
      courseid: $('#courseidtoassignuser').val(),
      userid: $('#useridtoassigncourse').val(),

    };
    console.log(formData)
    $.ajax({
      type: 'POST',
      url: 'http://localhost/cscbyound/day1/php/assignusertocourse.php',
      data: formData,
      success: function(response) {
        console.log(response)
        document.getElementById("assignusertocoursesesuccess").innerHTML = "User assigned successfuly";  
        setTimeout(function (){
          assignusertocoursemodal.style.display = "none";
          createuserstable ();
          document.getElementById("assignusertocoursesesuccess").innerHTML = "";  
          document.getElementById("useridtoassigncourse").value = "";  
          document.getElementById("courseidtoassignuser").value = "";  
          document.getElementById("useridtoassigncourse").style.display = "none";  
        }, 2000);      
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown); 
      }
    });
  })})
  // Get the <span> element that closes the modal
var assigncoursespan = document.getElementsByClassName("closeaassignusertocourse")[0];

// When the user clicks on <span> (x), close the modal
assigncoursespan.onclick = function() {
        document.getElementById("assignusertocourseModal").style.display = "none";
        document.getElementById("assignusertocoursesesuccess").innerHTML = "";  
        document.getElementById("useridtoassigncourse").value = "";  
        document.getElementById("courseidtoassignuser").value = ""; 
        document.getElementById("assignusertocoursesesuccess").innerHTML = "";  
        document.getElementById("useridtoassigncourse").style.display = "none";  
        document.getElementById("courseidtoassignuser").value = "";  
      }
// -------------------------------------------Assign user to course end------------------------------------------





// -------------------------------------------Assign mark to user ------------------------------------------------

// function to open add modal start 
function openeassignmarkemodal () {
  assignmarkmodal.style.display = "block";

  // to get courses from database
  $(document).ready(function() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost/cscbyound/day1/php/getcourses.php',
      success: function(response) {
        console.log(response);
        html = `<select id="courseidtoassignusermark" class="form-select" aria-label="Default select example" onchange="getstudenttoassignmark(value)">
        <option selected id="assigncourse">select course</option>`
        response.map(e=>{
          html += `<option value="${e.course_id }">${e.course_name}</option>`
        })
        html += `</select>`;
        document.getElementById("Mcourselist").innerHTML = html;

      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown); 
      }
    });
  })}


// get users to assign mark for course
function getstudenttoassignmark (courseid) {

  $(document).ready(function() {
    var formData = {
      courseid: courseid,
    };
    $.ajax({
      type: 'GET',
      url: 'http://localhost/cscbyound/day1/php/getuserstoassignmark.php',
      data: formData,
      success: function(response) {
        console.log(response);
        html = `<select id="useridtoassignmark" class="form-select" aria-label="Default select example" onchange="getstudenttoassign(value)">`
        response.map(e=>{
          html += `<option value="${e.user_id }">${e.user_name}</option>`
        })
        html += `</select>`;
        html += `<input style="width: 100%;" id="usermark" style="width: 100%;" type="number" placeholder="User mark" name="email" required>`
        document.getElementById("Muserslist").innerHTML = html;

      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown); 
      }
    });
  })}


// assign mark to user 
$(document).ready(function() {
  $('#assignmarkform').on('submit', function(event) {
    event.preventDefault(); // prevent default form submission
    var formData = {
      courseid: $('#courseidtoassignusermark').val(),
      userid: $('#useridtoassignmark').val(),
      mark: $('#usermark').val(),

    };
    console.log(formData)
    $.ajax({
      type: 'POST',
      url: 'http://localhost/cscbyound/day1/php/giveusermark.php',
      data: formData,
      success: function(response) {
        console.log(response)
        document.getElementById("assignmarksuccess").innerHTML = "Mark assigned successfuly";  
        setTimeout(function (){
          assignmarkmodal.style.display = "none";
          document.getElementById("assignmarksuccess").innerHTML = "";
          document.getElementById("usermark").value = "";
          document.getElementById("useridtoassignmark").innerHTML = "";
          document.getElementById("usermark").style.display = "none";
          document.getElementById("useridtoassignmark").style.display = "none";
          createuserstable ();
        }, 2000);      
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown); 
      }
    });
  })})
  
  var assignmarkspan = document.getElementsByClassName("closeaassignmark")[0];

// When the user clicks on <span> (x), close the modal
assignmarkspan.onclick = function() {
        document.getElementById("assignmarkModal").style.display = "none";
        document.getElementById("usermark").value = "";
        document.getElementById("useridtoassignmark").innerHTML = "";
        document.getElementById("usermark").style.display = "none";
        document.getElementById("useridtoassignmark").style.display = "none";
      }
      

// -------------------------------------------Assign mark to user end --------------------------------------------

function logout() {
  sessionStorage.clear();
  location.reload();
}