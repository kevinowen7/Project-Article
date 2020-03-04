$("#submit").click(function(){
    //get email and password(encrypted sha256)
    var userEmail = $("#email").val();
    var userPass = $("#password").val();
    //login through firebase auth
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(result) {
      //jump to input page
      window.location = "article.html";
    }).catch(function(err) {
      var errorCode = err.code;
      if (errorCode == "auth/user-not-found" || errorCode == "auth/wrong-password") {
        //stop loading icon
        $(".cover-spin").fadeOut(300, function() {
          $(this).hide();
        })
        //unlock form
        $("input,button").prop("disabled",false);
        //add notification
        alert("Invalid email or password.")
      } else {
        //stop loading icon
        $(".cover-spin").fadeOut(300, function() {
          $(this).hide();
        })
        //unlock form
        $("input,button").prop("disabled",false);
        alert(err.message)
      }
    })
});
 