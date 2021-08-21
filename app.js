let addtodo=()=>{
    var todo= document.getElementById('text');
//     var list = document.getElementById('list');
//     list.innerHTML +=`
    
//   <li>
//   <div>
//   <input type="text" value=${text.value} disabled>
//   <button>Edit</button><button>Delete</button>
// </div>
//   </li>
  
//   `
firebase.database().ref('todos').push({todo:todo.value})

    todo.value=""
    
}
firebase.database().ref('todos').on('child_added',(data)=>{
    var list = document.getElementById('list');
    list.innerHTML +=`
    
  <li>
  <div>
  <input type="text" class=""makeinput" id="${data.key}" value=${data.val().todo} disabled>
  <button onclick=deletitem("${data.key}")>Delet</button><button onclick=edititem("${data.key}")>Edit</button>
</div>
  </li>
  
  `
})


let delet=()=>{
  firebase.database().ref("todos").remove()
  var list = document.getElementById('list');
  list.innerHTML=""
}

let deletitem=(key)=>{
firebase.database().ref(`todos/${key}`).remove()
window.location='index.html'
}


let edititem=(id)=>{
let input=document.getElementById(id);
var btn=input.nextSibling.nextSibling.nextSibling.innerText
if(btn == "Edit"){
input.disabled=false;

input.nextSibling.nextSibling.nextSibling.innerText="Update";

}else{
  input.disabled=true;
input.nextSibling.nextSibling.nextSibling.innerText="Edit";
}


firebase.database().ref(`todos/${id}`).update({todo:input.value})

firebase.database().ref(`todos/${id}`).on('child_added',(data)=>{
  input.value=data.val();
  })


}