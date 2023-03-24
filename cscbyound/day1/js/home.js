var user= (JSON.parse(sessionStorage.getItem("user")));
document.getElementById("wellcome").innerHTML = `Wellcome ${user.user_name}`; 
let usertabel = `<table class="table">
        <thead>
          <tr>
            <th scope="col">User Name</th>
            <th scope="col">User email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>`;
  usertabel += `<tbody>`;
  usertabel += `<tr>
            <td>${user.user_name}</td>
            <td>${user.user_email}</td>
            <td> Active</td>
            `   
  usertabel += `</tr>`
  usertabel += `</tbody></table>`;
  document.getElementById("userdata").innerHTML = usertabel;
$(document).ready(function() {
    var formData = {
        id: user.user_id}
        console.log(formData)
    $.ajax({
      url: "http://localhost/cscbyound/day1/php/getusermarks.php",
      type: "GET",
      data: formData,
      dataType: "json",
      success: function(response) {
        console.log(response)
        let html = `<table class="table">
        <thead>
          <tr>
            <th scope="col">Course Name</th>
            <th scope="col">Minumum Mark</th>
            <th scope="col">Your Mark</th>
          </tr>
        </thead>`;
        html += `<tbody>`;
        response.map(e=>{
            html += `<tr>
            <td>${e.course_name}</td>
            <td>${e.course_min_mark}</td>
            <td> ${e.user_mark ==null ? "Not assigned yet":e.user_mark}</td>
            `
           
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

  function logout() {
    sessionStorage.clear();
    window.location.href = "../pages/login.html";
  }