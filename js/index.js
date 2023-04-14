let counter = 1;
setInterval(function () {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 5) {
    counter = 1;
  }
}, 5000);

$(".search-btn").on("click", function () {
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=db45875a&s=" + $(".input-key").val(),
    success: (results) => {
      const movies = results.Search;
      let cards = "";
      console.log = "results";
      movies.forEach((m) => {
        cards += showCard(m);
      });
      $(".movie-container").html(cards);

      // tombol detail diklik
      $(".modal-button").on("click", function () {
        $.ajax({
          url: "http://www.omdbapi.com/?apikey=db45875a&i=" + $(this).data("imdbid"),
          success: (m) => {
            const movieDetail = showMovieDetail(m);
            $(".modal-body").html(movieDetail);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function showCard(m) {
  return `<div class="col-md-4 my-2">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="" />
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <p class="card-text text-muted">${m.Type}</p>
                    <a href="#" class="btn btn-primary modal-button" data-bs-toggle="modal" data-bs-target="#MovieButtonDetail" data-imdbid="${m.imdbID}">Show More</a>
                    </div>
                </div>
            </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Director: </strong> ${m.Director}</li>
                            <li class="list-group-item"><strong>Actors: </strong> ${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer: </strong> ${m.Writer}</li>
                            <li class="list-group-item">
                            <strong>Plot: </strong> <br/>
                            ${m.Plot}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`;
}
