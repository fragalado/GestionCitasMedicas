/**
 * 
 */

class Cita {
	// Constructor
	constructor(id, usuario, medico, consulta, fecha) {
		this.id = id;
		this.usuario = usuario;
		this.medico = medico;
		this.consulta = consulta;
		this.fecha = fecha;
	}
	// Métodos
	crearCita(listaCitas) {
		// Primero vamos a pedir los datos del usuario
		let nombreUsu = prompt("Introduzca el nombre del usuario: ")
		let apellUsu = prompt("Introduzca los apellidos del usuario: ");
		let telfUsu = prompt("Introduzca el telefono del usuario: ");
		let objUsu = new Usuario(nombreUsu, apellUsu, telfUsu);

		// Ahora pedimos los datos del medico
		let nombreMedico = prompt("Introduzca el nombre del medico: ");
		let apellMedico = prompt("Introduzca los apellidos del medico: ");
		let telfMedico = prompt("Introduzca el telefono del medico: ");
		let objMedico = new Medico(nombreMedico, apellMedico, telfMedico);

		// Ahora pedimos los datos de la consulta
		let nombreCentroMedico = prompt("Introduzca el nombre del centro medico: ")
		let ciudadCentroMedico = prompt("Introduzca la ciudad del centro medico: ")
		let objCentroMedico = new CentroMedico(nombreCentroMedico, ciudadCentroMedico);
		let numConsulta = prompt("Introduzca el numero de la consulta: ");
		let objConsulta = new Consulta(numConsulta, objCentroMedico);

		// Pedimos la fecha
		let fechaString = prompt("Introduzca la fecha [DD/MM/AAAA]: ");
		let vector = fechaString.split('/');
		let fecha = new Date(Number(vector[2].trim()), Number(vector[1].trim()) - 1, Number(vector[0].trim()))

		// Creamos el objeto cita
		let objCita = new Cita(calculaId(listaCitas), objUsu, objMedico, objConsulta, fecha);

		return objCita;
	}

	calculaId(listaCitas) {
		let maxId = 0;
		for (let i = 0; i < listaCitas.length; i++) {
			if (listaCitas[i].id > maxId) {
				maxId = listaCitas[i].id;
			}
		}

		return maxId + 1;
	}
}

class Usuario {
	// Constructor
	constructor(nombre, apellidos, telefono) {
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.telefono = telefono;
	}
	// Métodos
}

class Medico {
	// Constructor
	constructor(nombre, apellidos, telefono) {
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.telefono = telefono;
	}
	// Métodos
}

class CentroMedico {
	// Constructor
	constructor(nombreCentro, ciudad) {
		this.nombreCentro = nombreCentro;
		this.ciudad = ciudad;
	}
	// Métodos
}

class Consulta {
	// Constructor
	constructor(numConsulta, centroMedico) {
		this.numConsulta = numConsulta;
		this.centroMedico = centroMedico;
	}
}

function calculaId(listaCitas) {
	let maxId = 0;
	for (let i = 0; i < listaCitas.length; i++) {
		if (listaCitas[i].id > maxId) {
			maxId = listaCitas[i].id;
		}
	}

	return maxId + 1;
}



// Lista para guardar las citas Medicas
let listaCitas = [];

// Pedimos una opcion
let opcion = Number(prompt("1. Crear cita medica\n2. Borrar cita medica\n 3. Listar por usuario\n 0. Salir"))
let cita = new Cita();
while (opcion != 0) {
	switch (opcion) {
		case 1:
			// Crear cita medica
			listaCitas.push(cita.crearCita(listaCitas));
			break;
		case 2:
			// Borrar cita médica
			// Borraremos una cita por el id
			break;
		case 3:
			// Listar citas por usuario
			break;
	}

	opcion = Number(prompt("1. Crear cita medica\n2. Borrar cita medica\n 3. Listar por usuario\n 0. Salir"))
}
console.log(listaCitas[0]);
console.log(listaCitas[1]);