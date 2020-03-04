function minify(data){
    return data.split("/o/").join("/o/<br/>");
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
        targets: 1,
        width: "30%",
        
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
        table.row.add([doc.data().title,doc.data().content,"<a target='blank_' href='"+doc.data().image_url+"'>"+minify(doc.data().image_url)+"</a>","<button id='editbutt' class='btn btn-xs btn-warning' title='Edit' onclick='editBuild("+doc.id+")'><i class='fa fa-pencil'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Remove' onclick='removeBuild("+doc.id+")'><i class='fa fa-times'></i></button>"]).node().id = doc.id;
        table.draw();
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });