function minify(data){
    return data.split("/o/").join("/o/<br/>");
}

function addNewlines(str) {
  var result = '';
  while (str.length > 0) {
    result += str.substring(0, 50) + '</br>';
    str = str.substring(50);
  }
  return result;
}

function textAbstract(text, length) {
  if (text == null) {
      return "";
  }
  if (text.length <= length) {
      return text;
  }
  text = text.substring(0, length);
  last = text.lastIndexOf(" ");
  text = text.substring(0, last);
  return text + "...";
}

//select table to work with jquery datatables
var table = $('#articleList').DataTable({
    "aLengthMenu": [[10, 20, -1], [10, 20, "All"]],
    "iDisplayLength": -1,
    "sPaginationType": "full_numbers",
    "fixedHeader": true,
    "order": [[ 0, "asc" ]],
    "columnDefs": [
    {
        targets: 0,
        width: "10%",
        
    },
    { 
        targets: -1,
        width: "10%",
        orderable: false
    }
]
})


//get data from firebase
const articleRef = db.collection('article');
const allArticle = articleRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
        table.row.add([doc.data().title,"<a style='color:black' href='#' id='content-"+doc.id+"' ondblclick='showAll("+doc.id+")'>"+textAbstract(addNewlines(doc.data().content),100)+"</a>","<a target='blank_' href='"+doc.data().image_url+"'>"+addNewlines(doc.data().image_url)+"</a>","<button id='editbutt' class='btn btn-xs btn-warning' title='Edit' onclick='editBuild("+doc.id+")'><i class='fa fa-pencil'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Remove' onclick='removeBuild("+doc.id+")'><i class='fa fa-times'></i></button>"]).node().id = doc.id;
        table.draw();
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });