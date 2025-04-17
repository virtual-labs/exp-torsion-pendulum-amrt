if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('./.././Moment_of_Inertia_of_a_Torsion_Pendulum/service_worker_Moment_of_Inertia_of_a_Torsion_Pendulum.js')
		.then(function(r) {
			console.log('NW  App now available offline');
		})
		.catch(function(e) {
			console.log('NW App NOT available offline');
			console.log(e);
		});
} else {
	console.log('Service workers are not supported');
}
