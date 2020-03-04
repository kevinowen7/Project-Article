firebase.auth().onAuthStateChanged(function(user) {
    if (user) { // User signed in
      //stop loading icon
      $(".cover-spin").fadeOut(300, function() {
        $(this).hide();
      })
    } else {
      window.location = "index.html"
    }
});