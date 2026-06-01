//Añade los enlaces de Firebase
/*const firebaseConfig = {
  apiKey: "AIzaSyDA4gAFeWcYE2_w3N-7Os8TXzXMyljDak8",
  authDomain: "kwitter-247d6.firebaseapp.com",
  databaseURL: "https://kwitter-247d6-default-rtdb.firebaseio.com",
  projectId: "kwitter-247d6",
  storageBucket: "kwitter-247d6.firebasestorage.app",
  messagingSenderId: "599266540979",
  appId: "1:599266540979:web:03ba14e476e0e2f9961fc6"
};*/

//firebase.initializeApp(firebaseConfig);
  user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "¡Hola " + user_name + "!";

//mongodb+srv://admin:1AbDMZSnJsGpoqjv@cluster0.kn45jip.mongodb.net/?appName=Cluster0
function addRoom()
{
    room_name = document.getElementById("room_name").value;

    fetch("http://localhost:3000/rooms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            room_name: room_name
        })
    })
    .then(response => response.json())
    .then(data => {

        localStorage.setItem("room_name", room_name);

        window.location = "kwitter_page.html";

    })
    .catch(error => console.error(error));
}

/*function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}
*/

/*function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}*/

//MongoDB
function getData()
{
    fetch("http://localhost:3000/rooms")
    .then(response => response.json())
    .then(data => {

        document.getElementById("output").innerHTML = "";

        data.forEach(room => {

            let row =
            "<div class='room_name' id='" +
            room.room_name +
            "' onclick='redirectToRoomName(this.id)'>#" +
            room.room_name +
            "</div><hr>";

            document.getElementById("output").innerHTML += row;

        });

    })
    .catch(error => console.error(error));
}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "index.html";
}
