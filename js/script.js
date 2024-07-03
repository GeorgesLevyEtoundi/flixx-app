const global = {
	currentPage: window.location.pathname,
};

// display popular movies
async function displayPopularMovies() {
	const { results } = await fetchAPIData('movie/popular');

	console.log('popular movies results ||| ', results);

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

// display popular movies
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
			console.log('Movie details');
			break;
		case '/tv-details.html':
			console.log('Tv details');
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
