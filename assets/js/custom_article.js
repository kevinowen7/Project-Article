function selectPicture() {
	
	//trigger file browser when picture is clicked
	$("#fileButton").trigger("click");
	return false;
	
}

function removePhoto() {
    document.getElementById("prepiew1").src = "images/empty-photo.jpg";
    $("#fileName1").val("");
    $("#fileNameP1").html("");
    $("#removep1").hide();
    $("#uploadPic").hide();
    document.getElementById("fileButton").value = "";
}

function getFileExtension(filename) {

//get file extension such as .jpg .png .bmp etc
return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);

}

function uploadP() {
    //photo 1
    $("#progBared1").css('display', '');
    $("#removep1").hide();
    $("#uploadPic").hide();

    var photo1 = $("#prepiew1").attr("src");
    var filename1 = $("#fileName1").val();

    $("#fileName1").val(filename1);
    var storageRef1 = firebase.storage().ref('article').child(filename1);
    var task1 = storageRef1.putString(photo1, 'data_url');
    task1.on('state_changed',
        //progressbar animation
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            $("#progBar1").css("width",percentage+"%");
        },
        function error(err) {
            $("#removep1").css('display', '');
            $("#uploadPic").css('display', '');
            alert("Upload Failed")
        },
        function complete() {
            alert("Upload Success");
        }
    )
}

//file input listener
$("#fileButton").change(function() {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#prepiew1').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
        $("#fileName1").val(this.files[0].name);
        $("#fileNameP1").html(this.files[0].name);
        $("#uploadPic").css('display', '');
    }
})

$("#add_article").click(function() {
    if ($("#fileNameP1").html()!=""){
        firebase.storage().ref("article").child($("#fileNameP1").html()).getDownloadURL().then(function(url) {

            data = {
                "title":$("#title").val(),
                "content":$("#content").val(),
                "image_url":url
            };
            db.collection('article').add(data)
            .then(ref => {
                alert('Article berhasil ditambahkan');
                location.reload();
            });
        });
    } else {
        data = {
            "title":$("#title").val(),
            "content":$("#content").val()
        };
        db.collection('article').add(data)
        .then(ref => {
            alert('Article berhasil ditambahkan');
            location.reload();
        });
    }
});

