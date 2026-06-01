user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send()
{
    let msg = document.getElementById("msg").value;

    fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            room: room_name,
            name: user_name,
            message: msg
        })
    })
    .then(response => response.json())
    .then(data => {

        document.getElementById("msg").value = "";

        getData();

    })
    .catch(error => console.error(error));
}

function getData()
{
    fetch("http://localhost:3000/messages/" + room_name)
    .then(response => response.json())
    .then(data => {

        document.getElementById("output").innerHTML = "";

        data.forEach(message_data => {

            let message_id = message_data._id;

            let name = message_data.name;
            let message = message_data.message;
            let like = message_data.like;

            let name_with_tag =
            "<h4>" + name +
            "<img class='user_tick' src='tick.png'></h4>";

            let message_with_tag =
            "<h4 class='message_h4'>" +
            message +
            "</h4>";

            let like_button =
            "<button class='btn btn-warning' id='" +
            message_id +
            "' value='" +
            like +
            "' onclick='updateLike(this.id)'>";

            let span_with_tag =
            "<span class='glyphicon glyphicon-thumbs-up'>Like: "
            + like +
            "</span></button><hr>";

            let row =
            name_with_tag +
            message_with_tag +
            like_button +
            span_with_tag;

            document.getElementById("output").innerHTML += row;

        });

    })
    .catch(error => console.error(error));
}

getData();

function updateLike(message_id)
{
    fetch(
        "http://localhost:3000/messages/" +
        message_id +
        "/like",
        {
            method: "PUT"
        }
    )
    .then(response => response.json())
    .then(data => {

        getData();

    })
    .catch(error => console.error(error));
}

function logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");

    window.location.replace("index.html");
}