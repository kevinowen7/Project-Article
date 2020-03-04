firebase.auth().onAuthStateChanged(function(user) {
    if (user) { // User signed in
        window.location="article.html"
      } else {
          //stop loading icon
          $(".cover-spin").fadeOut(300, function() {
            $(this).hide();
          })
      }
});