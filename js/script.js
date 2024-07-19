const global = {
	currentPage: window.location.pathname,
};

// get url id
function getMovieTVShowId() {
	// Get the full URL including the query parameters
	const currentURL = window.location.href;

	// Parse the URL using the URL object
	const url = new URL(currentURL);

	// Extract the query parameters using URLSearchParams
	const params = new URLSearchParams(url.search);

	// Get the value of the 'id' parameter
	const movieId = params.get('id');

	return movieId;
}

// display popular movies
async function displayPopularMovies() {
	const { results } = await fetchAPIData('movie/popular');

	results.forEach(movie => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
			<a href="movie-details.html?id=${movie.id}">
				${
					movie.poster_path
						? `
			<img
					src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
					class="card-img-top"
					alt="${movie.title}"
				/>
			`
						: `
			<img
					src="images/no-image.jpg"
					class="card-img-top"
					alt="${movie.title}"
				/>
			`
				}
			</a>
			<div class="card-body">
				<h5 class="card-title">${movie.title}</h5>
				<p class="card-text">
					<small class="text-muted">${movie.release_date}</small>
				</p>
			</div>
		`;

		document.querySelector('#popular-movies').appendChild(div);
	});
}

// display popular TV shows
async function displayPopularTVShows() {
	const { results } = await fetchAPIData('tv/popular');

	results.forEach(tvShow => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
			<a href="tv-details.html?id=${tvShow.id}">
				${
					tvShow.poster_path
						? `
			<img
					src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}"
					class="card-img-top"
					alt="${tvShow.name}"
				/>
			`
						: `
			<img
					src="images/no-image.jpg"
					class="card-img-top"
					alt="${tvShow.name}"
				/>
			`
				}
			</a>
			<div class="card-body">
				<h5 class="card-title">${tvShow.name}</h5>
				<p class="card-text">
					<small class="text-muted">${tvShow.first_air_date}</small>
				</p>
			</div>
		`;

		document.querySelector('#popular-shows').appendChild(div);
	});
}

// Fetch Movie, TV Show by ID
async function fetchMovieTVShow(format) {
	// get the movie ID
	const itemId = getMovieTVShowId();

	// fetch the movie by ID
	const result = await fetchAPIData(`${format}/${itemId}`);

	// movie data
	const item = await result;

	return item;
}

// Display movie details
async function displayMovieDetails() {
	// get movie or tv show object
	const movie = await fetchMovieTVShow('movie');

	// Overlay for background image
	displayBackgroundImage('movie', movie.backdrop_path);

	const div = document.createElement('div');
	div.innerHTML = `
		<div class="details-top">
          <div>
					${
						movie.poster_path
							? `
					<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />
					`
							: `
					<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />
					`
					}
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
						${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
				movie.homepage
			}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
				movie.budget
			)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
				movie.revenue
			)}</li>
            <li><span class="text-secondary">Runtime:</span> ${
				movie.runtime
			}</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map(
				prod_company => ` ${prod_company.name}`
			)}</div>
        </div>
	`;

	document.querySelector('#movie-details').appendChild(div);
}

// Display show details
async function displayShowDetails() {
	// get movie or tv show object
	const show = await fetchMovieTVShow('tv');

	// Overlay for background image
	displayBackgroundImage('tv', show.backdrop_path);

	const div = document.createElement('div');
	div.innerHTML = `
		<div class="details-top">
          <div>
					${
						show.poster_path
							? `
					<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />
					`
							: `
					<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />
					`
					}
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.first_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
						${show.genres.map(genre => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
				show.homepage
			}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number of episodes:</span> ${
				show.number_of_episodes
			}</li>
            <li><span class="text-secondary">Last Episode to Air:</span> ${
				show.last_episode_to_air.name
			}</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map(
				prod_company => ` ${prod_company.name}`
			)}</div>
        </div>
	`;

	document.querySelector('#show-details').appendChild(div);
}

// display backdrop on details page
function displayBackgroundImage(type, background_path) {
	const overlayDiv = document.createElement('div');

	overlayDiv.style.background = `url(https://image.tmdb.org/t/p/original/${background_path})`;
	overlayDiv.style.backgroundSize = 'cover';
	overlayDiv.style.backgroundPosition = 'center';
	overlayDiv.style.backgroundRepeat = 'no-repeat';
	overlayDiv.style.height = '100vh';
	overlayDiv.style.width = '100vw';
	overlayDiv.style.position = 'absolute';
	overlayDiv.style.top = '0';
	overlayDiv.style.left = '0';
	overlayDiv.style.zIndex = '-1';
	overlayDiv.style.opacity = '0.1';

	if (type === 'movie') {
		document.querySelector('#movie-details').appendChild(overlayDiv);
	} else {
		document.querySelector('#show-details').appendChild(overlayDiv);
	}
}

// fetch data from TMDB API
async function fetchAPIData(endpoint) {
	const API_KEY = 'd7cc800b22646e0dddd06a84a99aa8a0';
	const API_URL = 'https://api.themoviedb.org/3/';

	// show the spinner before the request
	showSpinner();

	const response = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	);

	const data = await response.json();

	// hide spinner once data is fetched
	hideSpinner();

	return data;
}

// show a spinner while fetching data
function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

// hide the spinner once data is fetched
function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show');
}

// highlight active link
function highlightActiveLink() {
	const navLinks = document.querySelectorAll('.nav-link');
	navLinks.forEach(link => {
		if (link.getAttribute('href') === global.currentPage) {
			link.classList.add('active');
		}
	});
}

// add commas to string
function addCommasToNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Init app
// building a routing system
function init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displayPopularMovies();
			break;
		case '/shows.html':
			displayPopularTVShows();
			break;
		case '/movie-details.html':
			displayMovieDetails();
			break;
		case '/tv-details.html':
			displayShowDetails();
			break;
		case '/search.html':
			console.log('Search');
			break;

		default:
			break;
	}

	// switch active link
	highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
