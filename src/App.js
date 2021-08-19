import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
	const [position, setPostion] = useState({
    coords : {
      longitude: "",
      latitude: ""
    }
  });

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setPostion(position)
		});
	},[]);

	return (
		<div>
			<h1>Trying Geo location Web API</h1>
			<p>Current Location {`latitude : ${position.coords.latitude}, longtitude : ${position.coords.longitude}`} </p>
		</div>
	);
}

export default App;
