import React from 'react';
import GoogleMap from './components/GoogleMap';
import Header from './pages/Header';
import LeftNavContainer from './containers/LeftNavContainer'

function App() {
	return (
		<div className="App">
			<Header />
			<div className="container">
				<div className="row">
					<LeftNavContainer />
					{/* <GoogleMap /> */}
				</div>
			</div>
		</div>
	)
}

export default App;