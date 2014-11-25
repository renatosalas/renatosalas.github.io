function CircuitoCorrecto(circuitoPackage){
	this.posBateria;

	this.circuitoB = []; //boolean[][]
	this.pasado = []; //boolean[][]
	this.filas = 0;
	this.columnas = 0;
	this.circuitoN = []; //char[][]
	this.resistencias = []; //objects {x: x, y: y}[]
	this.capacitancias = []; //objects {x: x, y:y}[]
	this.flag = 0;

	this.filas = circuitoPackage.array.length;
	this.columnas = circuitoPackage.array[0].length;
	this.circuitoN = circuitoPackage.array;

	//CircuitoCorrecto
	//Search for a bateria element
	var xBat, yBat;
	for(var r=0; r<circuitoPackage.array.length; r++){
		for(var c=0; c<circuitoPackage.array[r].length; c++){
			if(circuitoPackage.array[r][c] == circuitoPackage.sim["bateriaVerticalUp"] ||
			   circuitoPackage.array[r][c] == circuitoPackage.sim["bateriaHorizontalRight"]){
				xBat = c;
				yBat = r;
				break;
			}
		}
	}

	this.posBateria = { x: xBat, y: yBat};

	this.inicializarPasado = function(filas, columnas){
		for(var f=0; f<filas; f++){
			this.pasado[f] = [];
			for(var c=0; c<columnas; c++){
				this.pasado[f][c] = false;
			}
		}
	}

	this.arregloBi = function(numFilas){ //[][]
		var circuitoB = [];
		for(var i=0; i<numFilas.length; i++){
			circuitoB[i] = [];
			for(var j=0; j<numFilas[i].length; j++){
				if(numFilas[i][j] != "0"){
					circuitoB[i][j] = true;
				}else{
					circuitoB[i][j] = false;
				}
			}
		}

		return circuitoB;
	}

	this.validar = function(fila, columna){
		if(fila<0 || columna<0 || fila>this.filas-1 || 
		   columna>this.columnas-1 || !this.circuitoB[fila][columna]){
			return false;
		}else if(this.pasado[fila][columna]){
			if(fila == this.posBateria.y && columna == this.posBateria.x){
				return true;
			}else{
				return false;
			}
		}else{
			return true;
		}
	}

	this.movimiento = function(fila, columna, fila2, columna2){
		var mov = "";

		if(fila-fila2 < 0){
			mov = "abajo";
		}else if(fila-fila2 > 0){
			mov = "arriba";
		}

		if(columna-columna2 < 0){
			mov = "derecha";
		}else if(columna-columna2 > 0){
			mov = "izquierda";
		}

		return mov;
	}

	this.compararFig = function(fila, columna, fila2, columna2){
		if(!this.validar(fila2, columna2)){
			return false;
		}

		var mov = this.movimiento(fila, columna, fila2, columna2);
		var figuraAct = this.circuitoN[fila][columna];
		var figuraSig = this.circuitoN[fila2][columna2];

		if(figuraAct=="7" && mov=="arriba" && (figuraSig=="2" || figuraSig=="5" || figuraSig=="6" || figuraSig=="C" || figuraSig=="B" || figuraSig=="A")){
			return true;
		}

		if(figuraAct=="8" && mov=="derecha" && (figuraSig=="1" || figuraSig=="3" || figuraSig=="6" || figuraSig=="C" || figuraSig=="9" || figuraSig=="A")){	
			return true;
		}

		if(figuraAct=="1" && ((mov=="derecha") && (figuraSig=="1" || figuraSig=="3" || figuraSig=="6" || figuraSig=="8" || figuraSig=="9" || figuraSig=="A" || figuraSig=="C" || figuraSig=="R" || figuraSig=="K")) ||
		   (mov=="izquierda" && (figuraSig=="1" || figuraSig=="4" || figuraSig=="5" || figuraSig=="9" || figuraSig=="A" || figuraSig=="B" || figuraSig=="R" || figuraSig=="K"))){
			return true;
		}

		if(figuraAct=="2" && ((mov=="arriba" && (figuraSig=="2" || figuraSig=="5" || figuraSig=="6" || figuraSig=="7" || figuraSig=="A" || figuraSig=="B" || figuraSig=="C" || figuraSig=="M" || figuraSig=="K")) ||
		   (mov=="abajo" && (figuraSig=="2" || figuraSig=="4" || figuraSig=="3" || figuraSig=="9" || figuraSig=="B" || figuraSig=="C" || figuraSig=="M" || figuraSig=="K")))){
			return true;
		}	

		if(figuraAct=="3" && ((mov=="arriba" && (figuraSig=="2" || figuraSig=="7" || figuraSig=="A" || figuraSig=="B" || figuraSig=="C" || figuraSig=="M" || figuraSig=="K" || figuraSig=="6" || figuraSig=="5")) ||
		   (mov=="izquierda" && (figuraSig=="1" || figuraSig=="B" || figuraSig=="4" || figuraSig=="A" || figuraSig=="9" || figuraSig=="R" || figuraSig=="K" || figuraSig=="5")))){
			return true;	
		}

		if(figuraAct=="4" && ((mov=="arriba" && (figuraSig=="2" || figuraSig=="7" || figuraSig=="A" || figuraSig=="B" || figuraSig=="C" || figuraSig=="M" || figuraSig=="K" || figuraSig=="5" || figuraSig=="6")) ||
		   (mov=="derecha" && (figuraSig=="1" || figuraSig=="3" || figuraSig=="8" || figuraSig=="9" || figuraSig=="A" || figuraSig=="C" || figuraSig=="R" || figuraSig=="K" || figuraSig=="6")))){
			return true;
		}

		if(figuraAct=="5" && ((mov=="derecha" && (figuraSig=="1" || figuraSig=="8" || figuraSig=="9" || figuraSig=="A" || figuraSig=="C" || figuraSig=="R" || figuraSig=="K" || figuraSig=="6" || figuraSig=="3")) || 
		   (mov=="abajo" && (figuraSig=="2" || figuraSig=="9" || figuraSig=="B" || figuraSig=="C" || figuraSig=="M" || figuraSig=="K" || figuraSig=="4" || figuraSig=="3")))){
			return true;
		}

		if(figuraAct=="6" && ((mov=="abajo" && (figuraSig=="2" || figuraSig=="3" || figuraSig=="9" || figuraSig=="B" || figuraSig=="C" || figuraSig=="M" || figuraSig=="K" || figuraSig=="4")) ||
		   (mov=="izquierda" && (figuraSig=="1" || figuraSig=="9" || figuraSig=="B" || figuraSig=="A" || figuraSig=="R" || figuraSig=="K" || figuraSig=="5" || figuraSig=="4")))){
			return true;
		}

		if(figuraAct=="9" && ((mov=="arriba" && (figuraSig=="2" || figuraSig=="B" || figuraSig=="C" || figuraSig=="A" || figuraSig=="5" || figuraSig=="6" || figuraSig=="M" || figuraSig=="K" || figuraSig=="7")) ||
		   (mov=="derecha" && (figuraSig=="1" || figuraSig=="3" || figuraSig=="6" || figuraSig=="9" || figuraSig=="A" || figuraSig=="C" || figuraSig=="R" || figuraSig=="K" || figuraSig=="8")) ||
		   (mov=="izquierda" && (figuraSig=="1" || figuraSig=="4" || figuraSig=="5" || figuraSig=="9" || figuraSig=="A" || figuraSig=="B" || figuraSig=="R" || figuraSig=="K")))){
			return true;
		}	

		if(figuraAct=="A" && ((mov=="derecha" && (figuraSig=="1" || figuraSig=="3" || figuraSig=="6" || figuraSig=="9" || figuraSig=="A" || figuraSig=="C" || figuraSig=="R" || figuraSig=="K" || figuraSig=="8")) ||
		   (mov=="abajo" && (figuraSig=="2" || figuraSig=="9" || figuraSig=="3" || figuraSig=="4" || figuraSig=="B" || figuraSig=="C" || figuraSig=="M" || figuraSig=="K")) ||
		   (mov=="izquierda" && (figuraSig=="1" || figuraSig=="4" || figuraSig=="5" || figuraSig=="9" || figuraSig=="A" || figuraSig=="B" || figuraSig=="R" || figuraSig=="K")))){
			return true;
		}

		if(figuraAct=="B" && ((mov=="derecha" && (figuraSig=="1" || figuraSig=="3" || figuraSig=="6" || figuraSig=="9" || figuraSig=="A" || figuraSig=="C" || figuraSig=="R" || figuraSig=="K" || figuraSig=="8")) ||
		   (mov=="abajo" && (figuraSig=="2" || figuraSig=="9" || figuraSig=="3" || figuraSig=="4" || figuraSig=="B" || figuraSig=="C" || figuraSig=="M" || figuraSig=="K")) ||
		   (mov=="arriba" && (figuraSig=="2" || figuraSig=="B" || figuraSig=="C" || figuraSig=="A" || figuraSig=="5" || figuraSig=="6" || figuraSig=="M" || figuraSig=="K" || figuraSig=="7")))){
			return true;
		}

		if(figuraAct=="C" && ((mov=="izquierda" && (figuraSig=="1" || figuraSig=="4" || figuraSig=="5" || figuraSig=="9" || figuraSig=="A" || figuraSig=="B" || figuraSig=="R" || figuraSig=="K")) ||
		   (mov=="abajo" && (figuraSig=="2" || figuraSig=="9" || figuraSig=="3" || figuraSig=="4" || figuraSig=="B" || figuraSig=="C" || figuraSig=="M" || figuraSig=="K")) ||
		   (mov=="arriba" && (figuraSig=="2" || figuraSig=="B" || figuraSig=="C" || figuraSig=="A" || figuraSig=="5" || figuraSig=="6" || figuraSig=="M" || figuraSig=="K" || figuraSig=="7")))){
			return true;
		}

		if(figuraAct=="R" && ((mov=="derecha" && (figuraSig=="1" || figuraSig=="3" || figuraSig=="6" || figuraSig=="9" || figuraSig=="A" || figuraSig=="C" || figuraSig=="R" || figuraSig=="K")) ||
		   (mov=="izquierda" && (figuraSig=="1" || figuraSig=="4" || figuraSig=="5" || figuraSig=="9" || figuraSig=="A" || figuraSig=="B" || figuraSig=="R" || figuraSig=="K")))){
			return true;
		}

		if(figuraAct=="M" && ((mov=="abajo" && (figuraSig=="2" || figuraSig=="9" || figuraSig=="3" || figuraSig=="4" || figuraSig=="B" || figuraSig=="C" || figuraSig=="M" || figuraSig=="K")) ||
		   (mov=="arriba" && (figuraSig=="2" || figuraSig=="B" || figuraSig=="C" || figuraSig=="A" || figuraSig=="5" || figuraSig=="6" || figuraSig=="M" || figuraSig=="K")))){
			return true;
		}

		if(figuraAct=="K" && ((mov=="derecha" && (figuraSig=="1" || figuraSig=="3" || figuraSig=="6" || figuraSig=="9" || figuraSig=="A" || figuraSig=="C" || figuraSig=="R" || figuraSig=="K")) ||
		   (mov=="abajo" && (figuraSig=="2" || figuraSig=="9" || figuraSig=="3" || figuraSig=="4" || figuraSig=="B" || figuraSig=="C" || figuraSig=="M" || figuraSig=="K")) ||
		   (mov=="arriba" && (figuraSig=="2" || figuraSig=="B" || figuraSig=="C" || figuraSig=="A" || figuraSig=="5" || figuraSig=="6" || figuraSig=="M" || figuraSig=="K")) ||
		   (mov=="izquierda" && (figuraSig=="1" || figuraSig=="4" || figuraSig=="5" || figuraSig=="9" || figuraSig=="A" || figuraSig=="B" || figuraSig=="R" || figuraSig=="K")))){
			return true;
		}

		return false;
	}

	this.circuitoConectado = function(fila, columna){ //Cambie orden parametros
		var completo = false;

		console.log("Columna: " + columna + "    Fila: " + fila);
		console.log("Fig: " + this.circuitoN[fila][columna]);

		this.pasado[fila][columna] = true;

		if( (fila==this.posBateria.y && columna==this.posBateria.x)){ 
			this.flag++;

			console.log("1RA BATERIA");
			console.log("Flag: " + this.flag);

			if(this.flag>1 && this.pasado[fila][columna]){
				console.log("REGRESAMOS A BATERIA");
				return true;
			}
		}

		var comparar = this.compararFig(fila, columna, fila-1, columna);

		if(comparar && this.circuitoConectado(fila-1, columna)){
			completo = true;
		}

		comparar = this.compararFig(fila, columna, fila, columna+1);
		if(comparar && this.circuitoConectado(fila, columna+1)){
			completo = true;
		}

		comparar = this.compararFig(fila, columna, fila+1, columna);
		if(comparar && this.circuitoConectado(fila+1, columna)){
			completo = true;
		}

		comparar = this.compararFig(fila, columna, fila, columna-1);
		if(comparar && this.circuitoConectado(fila, columna-1)){
			completo = true;
		}

		return completo;
	}

	this.inicializarPasado(this.filas, this.columnas);
	this.circuitoB = this.arregloBi(this.circuitoN);
}


