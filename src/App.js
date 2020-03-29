import React from 'react';
import GoogleMap from './components/GoogleMap';
import Header from './components/Header';
import LeftNavContainer from './containers/LeftNavContainer'

function App() {
	return (
		<div className="App">
			<div className="container">
				{/* <div className="row">
					<Header />
				</div> */}
				<div className="row">
					<LeftNavContainer />
					{/* <GoogleMap /> */}
				</div>
			</div>
		</div>
	)
}

export default App;