import { useEffect, useState } from "react";

function App() {
	const [position, setPostion] = useState({
		coords: {
			longitude: "",
			latitude: "",
		},
	});
	const [API, setAPI] = useState("");
	const [res, setRes] = useState([])


	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setPostion(position);
		});
	}, []);

	var map;
	var service;

	function initialize(query) {
		var coords = new window.google.maps.LatLng(
			position.coords.latitude,
			position.coords.longitude
		);

		map = new window.google.maps.Map(document.getElementById("map"), {
			center: coords,
			zoom: 15,
		});

		var request = {
			location: coords,
			radius: "500",
			query: query,
		};

		service = new window.google.maps.places.PlacesService(map);
		service.textSearch(request, callback);
	}

	function callback(results, status) {
		if (status === window.google.maps.places.PlacesServiceStatus.OK) {
			console.log(results);
			setRes(results)
		} else {
			console.log("not cool");
		}
	}

	return (
		<div className="">
			<Navigation />
			<div className=" my-3">
				<h1 className="text-center">
					Google Place API + GeoLocation Web API demo
				</h1>
				<form onSubmit={(e) => {
					e.preventDefault()

					initialize(API)
				}} className="flex">
					<input className="border-2 border-black mx-auto" type="text" name="api" onChange={(event) => setAPI(event.target.value)} />
				</form>
				<p className=" text-center">
					Current Location
					{` latitude : ${position.coords.latitude}, longtitude : ${position.coords.longitude}`}
				</p>
			</div>
			<div id="map"></div>
			<div className="grid md:grid-cols-3 sm:grid-cols-1 container mx-auto p-3">
				{res.map((current) => (
					<PlaceCard
						image="https://placeholder.pics/svg/200"
						name={current.name}
						rating={current.rating}
						key={current.place_id}
					/>
				))}
			</div>
		</div>
	);
}

function Navigation() {
	return (
		<nav className="flex justify-between items-center bg-gray-800">
			<h1 className="text-4xl text-white p-3">Geo-Try</h1>
			<a
				className="text-2xl text-white p-3"
				href="https://urdreamboi.github.io"
			>
				backhome
			</a>
		</nav>
	);
}

function PlaceCard(props) {
	return (
		<div
			className="flex bg-white border-2 border-black m-3"
			style={{ maxHeight: "150px", height: "200px", width: "400px" }}
		>
			<img src={props.image} className="h-full" alt="restraunt_icon" />
			<div className="flex-row px-2">
				<h1 className="text-2xl">{props.name}</h1>
				<p className="">{props.rating}</p>
			</div>
		</div>
	);
}

export default App;
