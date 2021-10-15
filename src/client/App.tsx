import * as React from 'react';
//import { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Create from './views/Create';
import Edit from './views/Edit';
import NotFound from './views/NotFound';
import Overview from './views/Overview';
import OverviewDetails from './views/OverviewDetails';


const App = () => {

	return (

		
		<BrowserRouter>
			<Navbar/>
		{/* <div className="bg-dark">
			<Link type="button" className="m-2 btn btn-outline-danger" to ="/">
				 Create Order
			</Link>
			<Link type="button" className="m-2 btn btn-outline-danger" to ="/overview">
				All Orders
			</Link>
			
		</div> */}

		<div className="container">
			<Switch>

				<Route exact path = "/">
					<Create/>
				</Route>
				
				<Route exact path = "/overview">
					<Overview/>

				</Route>

				<Route exact path ="/overview/:order_id">
					<OverviewDetails />
				</Route>

				<Route exact path ="/overview/:order_id/edit">
				 	<Edit />
				</Route>



				<Route  path = "*">
					<NotFound/>
									
				</Route>

			</Switch>
		</div>
	</BrowserRouter>
		);
};


export default App;
