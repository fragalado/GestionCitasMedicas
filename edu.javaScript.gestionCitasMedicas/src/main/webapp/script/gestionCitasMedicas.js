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
		let dniUsu = prompt("Introduzca el DNI del usuario: ")
		let nombreUsu = prompt("Introduzca el nombre del usuario: ")
		let apellUsu = prompt("Introduzca los apellidos del usuario: ");
		let telfUsu = prompt("Introduzca el telefono del usuario: ");
		let objUsu = new Usuario(dniUsu, nombreUsu, apellUsu, telfUsu);

		// Ahora pedimos los datos del medico
		let nombreMedico = prompt("Introduzca el nombre del medico: ");
		let apellMedico = prompt("Introduzca los apellidos del medico: ");
		let telfMedico = prompt("Introduzca el telefono del medico: ");
		let objMedico = new Medico(nombreMedico, apellMedico, telfMedico);

		// Ahora pedimos los datos de la consulta y centro medico
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
	
	mostrar(){
		return "[ID cita: "+ this.id+ "; " + this.usuario.mostrar() + "; "+ this.medico.mostrar() +"; " + this.consulta.mostrar() + "; Fecha: " + this.fecha.toLocaleDateString() +"]";
	}
}

class Usuario {
	// Constructor
	constructor(dniUsu, nombre, apellidos, telefono) {
		this.dniUsu = dniUsu;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.telefono = telefono;
	}
	
	// Metodos
	mostrar(){
		return "DNI Usu: "+ this.dniUsu +"; Nombre Usu: " + this.nombre + "; Apellidos Usu: " + this.apellidos + "; Telf Usu: "+this.telefono;
	}
}

class Medico {
	// Constructor
	constructor(nombre, apellidos, telefono) {
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.telefono = telefono;
	}
	
	// Metodos
	mostrar(){
		return "Nombre Med: " + this.nombre + "; Apellidos Med: " + this.apellidos + "; Telf Med: "+this.telefono;
	}
}

class CentroMedico {
	// Constructor
	constructor(nombreCentro, ciudad) {
		this.nombreCentro = nombreCentro;
		this.ciudad = ciudad;
	}
	
	// Metodos
	mostrar(){
		return "Nombre Centro: "+ this.nombreCentro +"; Ciudad Centro: " + this.ciudad;
	}
}

class Consulta {
	// Constructor
	constructor(numConsulta, centroMedico) {
		this.numConsulta = numConsulta;
		this.centroMedico = centroMedico;
	}
	
	// Metodos
	mostrar(){
		return "Numero Consulta: "+ this.numConsulta +"; " + this.centroMedico.mostrar();
	}
}

/**
 * Funcion que comprueba cual es el mayor id añadido a la lista y le suma 1
 */
function calculaId(listaCitas){
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
let listaAuxiliar = []; // Lista auxiliar

// Instanciamos un objeto Cita
let cita = new Cita();

/**
 * Funcion para crear cita medica
 */
function crearCita(){
	listaCitas.push(cita.crearCita(listaCitas));
}

/**
 * Funcion para borrar cita medica
 * Se borrara la cita segun el id de la cita medica
 */
function borrarCita(){
	// Pedimos el id de la cita medica a borrar
	let idCita = prompt("Introduzca el id de la cita medica a borrar: ");
	
	// Comprobamos si esta la cita en la lista
	// Si no esta mostraremos una alerta
	let borrado = false;
	for(let i=0; i < listaCitas.length; i++){
		if(listaCitas[i].id == idCita){
			listaCitas.splice(i,1);
			borrado = true;
			break;
		}
	}
	
	if(!borrado)
		alert("No existe ninguna cita medica con el ID: " + idCita);
}

/**
 * Funcion para listar por el usuario pedido
 */
function listarPorUsuario(){
	// Pedimos el DNI del usuario
	let dniListar = prompt("Introduzca el DNI del usuario a listar: ")
	// Buscamos el DNI pedido en la lista
	for(let i =0; i < listaCitas.length; i++){
		if(listaCitas[i].usuario.dniUsu == dniListar){
			// Cuando encuentre al usuario guardaremos en una lista auxiliar el registro
			listaAuxiliar.push(listaCitas[i]);
		}
	}
	
	// Una vez que termine el bucle solo tendríamos que mostrar por pantalla la lista auxiliar
	document.getElementById("contenedor").innerHTML = "";
	for(let i = 0; i < listaAuxiliar.length; i++){
		document.getElementById("contenedor").innerHTML += "<br>"+listaAuxiliar[i].mostrar();
	}
	
	// Vaciamos la lista auxiliar
	listaAuxiliar = [];
}