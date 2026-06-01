const API_KEY = "AIzaSyA-P3EVgCGz25BdhgkR0kJPebhPFpQ1_xk";

window.onload = function()
{
   let user_name = localStorage.getItem("user_name");

    if(!user_name){
        alert("Debes iniciar sesión");

        window.location =
        "kwitter.html";
    }

    document.getElementById(
    "user_name"
    ).innerHTML =
    "¡Hola " + user_name + "!";
}

function buscarVideos()
{
    let texto =
        document.getElementById("search").value;

    fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${texto}&maxResults=10&type=video&key=${API_KEY}`
    )

    .then(response => response.json())

    .then(data => {

        document.getElementById("videos").innerHTML = "";

        data.items.forEach(video => {

            let videoId =
                video.id.videoId;

            let titulo =
                video.snippet.title;

            let html =

            `
            <div class="video-card">

                <h3>${titulo}</h3>

                <iframe
                src="https://www.youtube.com/embed/${videoId}"
                allowfullscreen>
                </iframe>

                <br><br>

                <button
                onclick="guardarFavorito(
                '${videoId}',
                '${titulo}'
                )">

                ❤️ Guardar

                </button>

            </div>
            `;

            document.getElementById("videos")
            .innerHTML += html;

        });

    });

}

function guardarFavorito(
    videoId,
    title
)
{
    let user_name =
    localStorage.getItem(
        "user_name"
    );

    fetch(
    "http://localhost:3000/favorites",
    {
        method:"POST",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

            videoId:videoId,

            title:title,

            user:user_name

        })
    })

    .then(response =>
        response.json()
    )

    .then(data => {

        alert(
        "Video guardado"
        );

    });

}

function verFavoritos()
{
    let user =
    localStorage.getItem(
        "user_name"
    );

    fetch(
    "http://localhost:3000/favorites/"
    + user
    )

    .then(response =>
        response.json()
    )

    .then(data => {

        document
        .getElementById(
        "videos"
        ).innerHTML = "";

        data.forEach(video=>{

            document
            .getElementById(
            "videos"
            ).innerHTML +=

            `
            <div class="video-card">

                <h3>
                ${video.title}
                </h3>

                <iframe
                src=
                "https://www.youtube.com/embed/${video.videoId}">
                </iframe>

            </div>
            `;

        });

    });

}