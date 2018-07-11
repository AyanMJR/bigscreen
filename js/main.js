const generateUrl = (title, imdbID, releaseDate) => {
    let searchUrl = 'http://www.omdbapi.com/?apikey=91c96f78';
    if(title !== '') {
        searchUrl = searchUrl + '&t=' + title;
    }
    if(imdbID !== '') {
        searchUrl = searchUrl + '&i=' + imdbID;
    }
    if(releaseDate !== '') {
        searchUrl = searchUrl + '&y=' + releaseDate; 
    }
    return searchUrl;
}

const result = (data) => {
    $('#display').empty();
    $('.alert').hide();
    if(data.Response === 'False') {
        $('.alert').html(data.Error).show();
    } else if(data.Response === 'True') {
        if(data.Poster === 'N/A') {
            data.Poster = 'img/dummy.jpg';
        }
        let searchResult = 
        `<div class="d-flex flex-sm-column flex-md-row card w-100 border-dark">
            <img src=${data.Poster} alt="">
            <div class="card-body">
                <div class="card-header">
                    <h2 class="card-title">${data.Title} (${data.Year})</h2>
                    <small>${data.Rated} | ${data.Runtime} | ${data.Genre} |  ${data.Released} </small>
                </div>
            <div>
                <h6 class="py-2">
                    ${data.Plot}
                </h6>
                <h6 class="font-weight-bold">Director: ${data.Director}</h6>
                <h6 class="font-weight-bold">Writers: ${data.Writer}</h6>
                <h6 class="font-weight-bold">Stars: ${data.Actors}</h6>
            </div>
            <div class="d-flex flex-row justify-content-around card-footer">
                <div class="mx-3 d-flex flex-column align-items-center">
                    <h5>${data.imdbRating}/10</h5>
                    <h5>IMDB</h5>
                </div>
                <div class="mx-3 d-flex flex-column align-items-center">
                    <h5>${data.imdbVotes}</h5>
                    <h5>IMDB Votes</h5>
                </div>
            </div>
        </div>`;
        $('#display').append(searchResult);
    }
}

const requestFailed = (xhr, status, error) => {
    $('.alert').html(status).show();
}

const showLoader = () => {
    $('#loader').show();
}

const hideLoader = () => {
    $('#loader').hide();
}

$(document).ready(function() {

    $('#search').click(() => {
        let title = $('#title').val();
        let imdbID = $('#imdbID').val();
        let releaseDate = $('#year').val();
        if(title === "" && imdbID === "") {
            $('#display').empty();
            $('.alert').html('Please enter the movie title or IMDb Id to search').show();
        } else {
            let url = generateUrl(title, imdbID, releaseDate);
            $.ajax({
                url: url,
                method: 'GET',
                datatype: 'json',
                beforeSend: showLoader,
                success: result,
                error: requestFailed,
                complete: hideLoader
            })
        }                
    })
})