import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Table from './Table';
import Navbar from './Navbar';
import StatCharts from './StatCharts';

function App() {
	const [data, setData] = useState({ players: [] });
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get('/stats');
			setData(data);
			setLoaded(true);
		};
		fetchData();
	}, []);

	return (
		<Router>
			<div>
				<Navbar />
				<Switch>
					<Route
						exact
						path="/"
						render={() => <Table data={data} loaded={loaded} />}
					/>
					<Route
						path="/stat-charts"
						render={() => <StatCharts data={data} loaded={loaded} />}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
