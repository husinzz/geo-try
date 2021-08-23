import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	// const { isLoaded, loadError } = useJsApiLoader({
	// 	googleMapsApiKey: "AIzaSyC1Pv53mA0OEoPYMsJDtZidP1942DbMDQg",
	// });

	const [position, setPostion] = useState({
		coords: {
			longitude: "",
			latitude: "",
		},
	});

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setPostion(position);
		});

		initialize();
	}, []);

	var map;
	var service;
	var infowindow;

	function initialize() {
		var pyrmont = new window.google.maps.LatLng(
			position.coords.latitude,
			position.coords.longitude
		);

		map = new window.google.maps.Map(document.getElementById("map"), {
			center: pyrmont,
			zoom: 15,
		});

		var request = {
			location: pyrmont,
			radius: "500",
			type: ["restaurant"],
		};

		service = new window.google.maps.places.PlacesService(map);
		service.nearbySearch(request, callback);
	}

	function callback(results, status) {
		if (status == window.google.maps.places.PlacesServiceStatus.OK) {
			console.log(results);
		} else {
			console.log("not cool")
		}
	}

	return (
		<div>
			<h1>Trying Geo location Web API</h1>
			<p>
				Current Location
				{` latitude : ${position.coords.latitude}, longtitude : ${position.coords.longitude}`}
			</p>
			<div id="map"></div>
		</div>
	);
}

export default App;
