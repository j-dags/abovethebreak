import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Table from './Table';
import Navbar from './Navbar';
import LeagueCharts from './LeagueCharts';

function App() {
	const [data, setData] = useState({ players: [] });
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get('/stats/2020-21');
			setData(data.sort((a, b) => a.nbaFantasyPtsRank - b.nbaFantasyPtsRank));
			setLoaded(true);
		};
		fetchData();
	}, []);

	return (
		<Router>
			<Navbar />
			<Switch>
				<Route
					exact
					path="/"
					render={() => <Table data={data} loaded={loaded} />}
				/>
				<Route
					path="/stat-charts"
					render={() => <LeagueCharts loaded={loaded} />}
				/>
			</Switch>
		</Router>
	);
}

export default App;
