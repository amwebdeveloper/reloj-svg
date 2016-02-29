/**
 * Demo Clock SVG by Andrés Moreno  
 */

(function () {	
	/**
	 * Clase para obtener una Fecha (día y hora)
	 */
	var Fecha = function () {
		/* Propiedades privadas */
		var fecha = new Date();
		var mes = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
		var dia = ["dom", "lun", "mar", "mi&eacute;", "jue", "vie", "s&aacute;b"];			

		/* Métodos privados */		
		/**
		 * Obtener el mes como String
		 * El método getMonth devuelve un número que no sirve como índice del array
		 */
		var getMes = function () {
			return mes[fecha.getMonth()];
		};

		/**
		 * Obtener el día como String
		 * El método getDay devuelve un número que no sirve como índice del array
		 */
		var getDia = function () {
			return dia[fecha.getDay()];
		};

		/* Métodos publicos */
		/**
		 * Obtener la fecha completa.
		 */
		this.getFecha = function () {
			return fecha;
		};
		
		/**
		 * Método para obtener la cadena de la fecha formateada
		 */
		this.getFechaToString = function () {
			return ""+getDia()+" "+fecha.getDate()+" "+getMes()+" "+fecha.getFullYear();
		};
		
		/**
		 * Método para obtener la hora como String 
		 */
		this.getHoraToString = function () {
			var hora = "";
			fecha.getHours() < 10 ? hora += "0"+fecha.getHours()+":" : hora += fecha.getHours()+":";
			fecha.getMinutes() < 10 ? hora += "0"+fecha.getMinutes()+":" : hora += fecha.getMinutes()+":";
			fecha.getSeconds() < 10 ? hora += "0"+fecha.getSeconds() : hora += fecha.getSeconds();
			return hora;
		};
	};
	
	/**
	 * Clase para coordenadas manecillas del reloj
	 * Le pasamos el objeto fecha como parámetro.
	 */	
	var Manecillas = function (laFecha) {
		var fecha = laFecha.getFecha() || new Date();
		
		/**
		 *  Métodos públicos para la rotación de cada elemento del reloj svg
		 *  En todos los casos recibirán como parámetro los atributos "x1" e "y1"
		 *  que corresponden con los atributos de cada manecilla.
		 */
		this.rotateHora = function (x1, y1) {
			return ""+((fecha.getHours()*30)+(fecha.getMinutes()/2))+" "+x1+" "+y1;
		};
		
		this.rotateMinutos = function (x1, y1) {
			return ""+(fecha.getMinutes()*6)+" "+x1+" "+y1;
		};
		
		this.rotateSegundos = function (x1, y1) {
			return ""+(fecha.getSeconds()*6)+" "+x1+" "+y1;
		};
	};

	setInterval (
		function () {
			var fecha = new Fecha();
			var manecillas = new Manecillas(fecha);
			/* Comprobamos si la fecha impresa en pantalla es distinta */
			if ($("#dia").html() !== fecha.getFechaToString()) {
				$("#dia").html(fecha.getFechaToString());
			}
			/* Aplicar el atributo rotate a cada elemento */
			$("#hour").attr("transform", "rotate("+manecillas.rotateHora($("#hour").attr("x1"), $("#hour").attr("y1"))+")");
			$("#minutes").attr("transform", "rotate("+manecillas.rotateMinutos($("#minutes").attr("x1"), $("#minutes").attr("y1"))+")");
			$("#seconds").attr("transform", "rotate("+manecillas.rotateSegundos($("#seconds").attr("x1"), $("#seconds").attr("y1"))+")");
		}
	, 1000);
})();