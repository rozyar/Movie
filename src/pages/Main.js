import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import MovieList from '../components/MovieList';
import MovieListHeading from '../components/MovieListHeading';
import SearchBox from '../components/SearchBox';
import AddFavourites from '../components/AddFavourites';
import RemoveFavourites from '../components/RemoveFavourites';
//up
//up
export function Main(props) {
	//primeiro useState segura o resultado que voltam da search search
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

//o getMovieRequest pega o nosso SearchValue e pede para a api e nos pegamos a respota convertemos para json e se nos tivemos algum resultado de pesquisa nos ficaremos coma função if 
	const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=d3f77329`;
		
		//quando o fetch acontecer ele vai guardar no var response, e responder um objeto que criamos com a busca
		const response = await fetch(url);
		//aqui ele converte o http para json 
		const responseJson = await response.json();

		//criamos a função if para não dar bug e chamar o useState só quando tiver um valor na searchBox
		//.Search é a array onde contem os filmes quando pesquisamos na API
		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	//Para chamarmos a função getMovieRequest nós criamos um useEffect
	//quando o app inicia o useEffect é iniciado
	//chama o getMovierequest passando nosso valor do SearchValue que é uma string vazia
	
	//quando o usuario escreve o SetSerachValue é chamado
	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	//os filmes que nos temos são mandados para o coimponente da MovieList
	//container-fluid é so um container od bootstrap
	//criamos a classe movie-app pois os filmes não continuavam na mesma linha e quando diminuiamos a pagina ele ia pra baixo 
	//Oque temos que fazer com o valor dentro da serch é, guardar ele dentro do searchValue State e toda vez que isso mudar nós iremos chamar o getmovierequest, a primeira coisa que temos que fazer é passar o searchValue e o SetSearchValue para nossa searchBox e puxar ele para a area do input
	return (
		<div>
			<div className="hero-image">
				<div className="hero-text">
					<h1>THE MOVIE BIBLE</h1>
					<p>Deixe seu comentário</p>
				</div>
			</div>
			<div className='container-fluid movie-app bg'>
				<div className='row d-flex align-items-center mt-4 mb-4 text'>
					<MovieListHeading heading='Movies' />
					<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
				</div>
				<div className='row'>
					<MovieList
						movies={movies}
						handleFavouritesClick={addFavouriteMovie}
						favouriteComponent={AddFavourites}
						setPoster={props.setPoster}
						setId={props.setId}
					/>
				</div>
				<div className='row d-flex align-items-center mt-4 mb-4 text'>
					<MovieListHeading heading='Favorites' />
				</div>
				<div className='row'>
					<MovieList
						movies={favourites}
						handleFavouritesClick={removeFavouriteMovie}
						favouriteComponent={RemoveFavourites}
						setPoster={props.setPoster}
						setId={props.setId}
					/>
				</div>
			</div>
		</div>
	);
};


