import React from "react";
import { Main } from "./pages/Main";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useState } from 'react';
import { MoviePage } from "./pages/MoviePage";
import { EditComment } from "./pages/EditComment";


const App = () => {

	const [id, setId] = useState("bode");
	const [poster, setPoster] = useState("");

	var routeMoviePage = `${id}`

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Main setId={setId} setPoster={setPoster} />} />
				<Route path={routeMoviePage} element={<MoviePage id={id} poster={poster} />}/>
				<Route path="*" element={<Navigate to="/"/>}/>
				<Route path=":filme/:id" element={<EditComment/>}/>
			</Routes>
    	</Router>

	);
};

export default App;
