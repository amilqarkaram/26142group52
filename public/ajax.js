console.log("hello");
document.querySelector("button").addEventListener("click",function(){
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let register = document.querySelector("#register").checked;
  let login = document.querySelector("#login").checked;
  let authorization = "";
  if(register){
    authorization = "register";
  }
  else if(login){
    authorization = "login";
  }
  console.log("register: " + register);
  console.log("login: " + login);
    $.post("/auth", {
      username: username,
      password: password,
      authorization: authorization
  }, function(data, status) {
      let errorMessage = data.errorMessage;
      if(errorMessage){
        console.log(data);
        let url = "/";
        var f = document.createElement("form");
        f.setAttribute('method',"post");
        f.setAttribute('action',url);
        var i = document.createElement("input");
        i.type = "text";
        i.name = "errorMessage";
        i.value = data.errorMessage;
        i.style.display = 'none';
        f.appendChild(i);
        $("body").append(f);
        f.submit();
      }
      else{
        console.log("Successful! Redirect to game")
        let url = "/game/" + data.username;
        var f = document.createElement("form");
        f.setAttribute('method',"get");
        f.setAttribute('action',url);
        $("body").append(f);
        f.submit();
      }
  });

})
