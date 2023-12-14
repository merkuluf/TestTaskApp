import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/main.css'
import Home from './routes/Home';
import Profile from './routes/Profile';
import People from './routes/People';


function App() {

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/account' element={<Profile />} />
				<Route path='/people' element={<People />} />
			</Routes>
		</Router>
	)
}

export default App
