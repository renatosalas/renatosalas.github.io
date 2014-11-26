$(document).ready(function(){
	/*Desactivate contextmenu*/
	document.oncontextmenu = function() {return false;};

	/*Custom contextmenu*/
	$(function(){
	     $(document).contextMenu({
	        selector: '.clone', 
	        items: {
	            "delete": { 
	            	name: "Eliminar", 
	            	icon: "delete",
	            	callback: function(k, o){
	            		$(this).remove();
	            		verifyConnectivity("left");
	            	}
	            },
	            "sep1": "---------",
	            "viewProperties": { 
	            	name: "Propiedades", 
	            	icon: "properties",
	            	callback: function(k, o){
	            		$(this).trigger('dblclick');
	            	}
	            }
	        }
	    });
	});

	/*Activate tooltips*/
	var activateTooltips = function () {
        $("[rel='tooltip']").tooltip();
    };

    activateTooltips();

    var parentContainerClones = "#canvas",
    	containerClones = parentContainerClones + " .grid td";

    /*Grid*/
    var generateGrid = function(){
    	var dim = 50;

    	var grid = "<table class='grid'></table>";
    	$(parentContainerClones).append(grid);

    	var numCols = Math.round($(this).width() / dim),
    		numRows = Math.round($(this).height() / dim);

    	grid = $(parentContainerClones).find("table.grid");
    	grid.css("width", numCols*dim)
    		.css("height", numRows*dim);

    	var gridCells;
    	var ce = 0;

    	for(var r = 0; r < numRows; r++){
    		gridCells += "<tr>";
    		for(var c = 0; c < numCols; c++){
    			gridCells += "<td x='"+(c*dim)+"' y='"+(r*dim)+"' c='"+ce+"'></td>";
    			ce++;
    		}
    		gridCells += "</tr>";
    	}
    	grid.append(gridCells);
    	
    };
    generateGrid();

	/*Drag & Drop*/
    counter = 0;  //Counter
    //Make element draggable
    $(".drag").draggable({
        helper:'clone',
        containment: 'frame',

        //When first dragged
        stop:function(ev, ui) {
        	var pos=$(ui.helper).offset();
        	objName = "#clonediv"+counter;
        	$(objName).removeClass("drag");

           	//When an existiung object is dragged
            $(objName).draggable({
            	grid: [50, 50],
            	containment: 'parent'
            });
        }
    });
    //Make element droppable
    $(containerClones).droppable({
		drop: function(ev, ui) {
			if (ui.draggable.attr('id').search(/component[0-9]/) != -1){
				counter++;
				var element=$(ui.draggable).clone();
				$(parentContainerClones).append(element);
				element.attr("id","clonediv"+counter);
				element.addClass("clone");

				//Position Clone
				var hoverElement = $(this);
        		hoverElement.x = hoverElement.attr("x") + "px";
        		hoverElement.y = hoverElement.attr("y") + "px";
				element.css({"left":hoverElement.x,"top":hoverElement.y,"position":"absolute"});

				//Apply properties
				var type = element.attr("type");
				var t;
				if(type == "cable"){
					t = "cobre";
					element.attr("material", t)
						   .attr("title", t);
				}else if(type == "bateria"){
					t = "12";
					element.attr("voltaje", t)
						   .attr("resistenciaInterna", "1")
						   .attr("title", t + " Volts");
				}else if(type == "capacitor"){
					t = "0.152";
					element.attr("capacitancia", t)
						   .attr("title", t + " Ohms");
				}else if(type == "resistor"){
					t = "7";
					element.attr("resistencia", t)
						   .attr("title", t + " Ohms");
				}else if(type == "bombilla"){
					t = "75";
					element.attr("potencia", t)
						   .attr("color", "#fafa08")
						   .attr("title", t + " Watts");
				}else if(type == "led"){
					t = "14";
					element.attr("potencia", t)
						   .attr("color", "#faad08")
						   .attr("title", t + " Watts");
				}

				//Add tooltip
				element.attr("rel", "tooltip");
				activateTooltips();
			}

			//Verify Connectivity [new Elements && existing Elements] from left to Side
			verifyConnectivity("left");
    	}
    });

	/*Click on Component Clone*/
	$(parentContainerClones).on("dblclick", ".clone",function(){
		var type = $(this).attr("type");
		var t;
		var v;

		//Apply Title
		v = $(".propertiesElement .title");
		v.html(type);

		//Apply id of (to Title)
		t = $(this).attr("id");
		v.attr("source", t);

		//Apply Properties
		if(type == "cable"){
			v = $(".cable .material .value");
			t = $(this).attr("material");
			setValue(v, t);
		}else if(type == "bateria"){
			v = $(".bateria .voltaje .value");
			t = $(this).attr("voltaje");
			setValue(v, t);

			v = $(".bateria .resistenciaInterna .value");
			t = $(this).attr("resistenciaInterna");
			setValue(v, t);
		}else if(type == "capacitor"){
			v = $(".capacitor .capacitancia .value");
			t = $(this).attr("capacitancia");
			setValue(v, t);
		}else if(type == "resistor"){
			v = $(".resistor .resistencia .value");
			t = $(this).attr("resistencia");
			setValue(v, t);
		}else if(type == "bombilla"){
			v = $(".bombilla .potencia .value");
			t = $(this).attr("potencia");
			setValue(v, t);
		}else if(type == "led"){
			v = $(".led .potencia .value");
			t = $(this).attr("potencia");
			setValue(v, t);
		}

		//Show/Hide Properties Panel
		if($(".propertiesElement").is(":visible")){
			var p = $(".propertiesElement");
			//If .propertiesElement is visible && clicked on SAME element
			if(checkChildrenVisible(p).hasClass(type)){
				hideProperties(type);
			}else{
				showProperties(type);
			}
		}else{
			showProperties(type);
		}

	});

	/*Display subComponents of #component1*/
	$("#component1").click(function(){
		var e = $("#subComponents1");
		if(e.hasClass("hide"))
			e.removeClass("hide");
		else
			e.addClass("hide");
	});
	/*Display subComponents of #component2*/
	$("#component2").click(function(){
		var e = $("#subComponents2");
		if(e.hasClass("hide"))
			e.removeClass("hide");
		else
			e.addClass("hide");
	});
	/*Display subComponents of #component4*/
	$("#component4").click(function(){
		var e = $("#subComponents4");
		if(e.hasClass("hide"))
			e.removeClass("hide");
		else
			e.addClass("hide");
	});

	/*Update properties*/
	$(".updateButton").click(function(){
		var source = $(".propertiesElement .title").attr("source");
		var type;
		var v;
		var t;
		var not;

		source = $("#"+source);
		type = source.attr("type");
		not = $(".notification");

		//Apply Properties
		if(type == "cable"){
			v = $(".cable .material .value");
			t = getValue(v, "material");
			updateValue(source, "material", t, not, true);
		}else if(type == "bateria"){
			v = $(".bateria .voltaje .value");
			t = getValue(v, "voltaje");
			updateValue(source, "voltaje", t + " Volts", not, true);

			v = $(".bateria .resistenciaInterna .value");
			t = getValue(v, "resistenciaInterna");
			updateValue(source, "resistenciaInterna", t + " Ohms", not, false);
		}else if(type == "capacitor"){
			v = $(".capacitor .capacitancia .value");
			t = getValue(v, "capacitancia");
			updateValue(source, "capacitancia", t + " Farads", not, true);
		}else if(type == "resistor"){
			v = $(".resistor .resistencia .value");
			t = getValue(v, "resistencia");
			updateValue(source, "resistencia", t + " Ohms", not, true);
		}else if(type == "bombilla"){
			v = $(".bombilla .potencia .value");
			t = getValue(v, "potencia");
			updateValue(source, "potencia", t + " Watts", not, true);
		}else if(type == "led"){
			v = $(".led .potencia .value");
			t = getValue(v, "potencia");
			updateValue(source, "potencia", t + " Watts", not, true);
		}
	});

	/*Check connectivity*/
	var verifyConnectivity = function(side){
		//Update General Values
		var volT = 0,
			corrT = 0,
			capEq = 0,
			resEq = 0,
			cargaT = 0,
			energiaAl = 0;

		var elements = {
			array: obtenerElementos(),
			sim: {
				"cableHorizontal": "1",
				"cableVertical": "2",
				"cableDownRight": "3",
				"cableDownLeft": "4",
				"cableUpLeft": "5",
				"cableUpRight": "6",
				"cableTUp": "9",
				"cableTDown": "A",
				"cableTRight": "B",
				"cableTLeft": "C",
				"bateriaVerticalUp": "7",
				"bateriaHorizontalRight": "8",
				"resistorHorizontal": "R",
				"resistorVertical": "M",
				"capacitorVertical": "K" 
			}
		}

		var circuito = new CircuitoCorrecto(elements);
		var conectado = circuito.circuitoConectado(circuito.posBateria.y, circuito.posBateria.x);
		//console.log(circuito.resistenciasS);
		//console.log(circuito.resistenciasP);
		//console.log(circuito.capacitanciasS);
		//console.log(circuito.capacitanciasP);

		if(conectado){
			capEq = calcularCapacitanciaEquivalente(circuito.capacitanciasS, "serie");
			resEq = calcularResistenciaEquivalente(circuito.resistenciasS, "serie");
			volT = calcularVoltaje();
			corrT = calcularCorriente(volT, resEq);
			cargaT = calcularCargaTotal(volT, capEq);
			energiaAl = calcularEnergiaAlmacenadaTotal(volT, capEq);

			updateGeneralValues(volT, corrT, capEq, resEq, cargaT, energiaAl);
		}else{
			updateGeneralValues(0, 0, 0, 0, 0, 0);
		}
	};

	/*Hide Properties via Helper Button*/
	$(".helper").click(function(){
		hideProperties();
	});

	function show(element){
		element.removeClass("hidden");
		element.css("display", "none");
		element.fadeIn("fast");
	}
	function showProperties(elementType){
		var p = $(".propertiesElement"),
			c = p.find("."+elementType);
		p.removeClass("hidden");
		hideAllSubproperties(p);
		c.removeClass("hidden");
	}
	function hideProperties(elementType){
		var p = $(".propertiesElement");
		p.addClass("hidden");
		hideAllSubproperties(p);
	}
	function hideAllSubproperties(parent){
		parent.find(".properties").children().each(function(){
			$(this).addClass("hidden");
		});
	}
	function checkChildrenVisible(parent){
		var childVisible;
		parent.find(".properties").children().each(function(){
			if($(this).is(":visible")){
				childVisible = $(this);
				return false;
			}
		});

		return childVisible;
	}
	function setValue(toElement, value){
		if(toElement.attr("value")){
			$(toElement).val(value);
		}else{
			toElement.html(value);
		}
	}
	function getValue(fromElement, value){
		var r;
		
		if(fromElement.attr("value")){
			r = fromElement.val();
		}else{
			r = fromElement.html();
		}

		return r;
	}
	function updateTooltip(element, value){
		element.attr('data-original-title', value)
          	   .tooltip('fixTitle')
          	   .tooltip('show');
        setTimeout(function() {
			element.tooltip('hide');
		}, 900);
	}
	function updateValue(toElement, attr, value, notificationElement, mainValue){
		toElement.attr(attr, value);
		if(mainValue) updateTooltip(toElement, value);

		if(toElement.attr(attr) == value){
			show(notificationElement);
			setTimeout(function() {
			    notificationElement.fadeOut('slow');
			}, 1500);
		}
		var val = value.split(" ");
		val = val[0];
		toElement.attr(attr, val); //Asignar valor numerico en attr

		//UpdateGeneralValues
		var type = $(toElement).attr("type");
		//Apply Properties
		if(type == "bateria" && attr == "voltaje"){
			verifyConnectivity("left");
		}else if(type == "resistor" && attr == "resistencia"){
			verifyConnectivity("left");
		}else if(type == "capacitor" && attr == "capacitancia"){
			verifyConnectivity("left");
		}
	}

	function calcularResistenciaEquivalente(arrayResistencias, type){
		var result = 0;
		if(type == "paralelo"){
			//Not implemented
		}else if(type == "serie"){
			arrayResistencias.forEach(function(e){
				var element = getElementsAt(e.y, e.x)[0];
				var value = parseInt(getValueOf(element));
				result += value;
			});
		}

		return result;
	}

	function calcularCapacitanciaEquivalente(arrayCapacitadores, type){
		var result = 0;
		if(type == "paralelo"){
			//Not implemented
		}else if(type == "serie"){
			arrayCapacitadores.forEach(function(e){
				var element = getElementsAt(e.y, e.x)[0];
				var value = parseFloat(getValueOf(element));
				result += 1/value;
			});
		}

		result = 1/result;

		result = parseFloat(result).toFixed(4);

		return result;
	}

	function calcularResistenciaParalelo(res1, res2){ //Ohms
		var r = 1/(1/(res1) + 1/(res2));
		return r;
	}

	function calcularResistenciaSerie(res1, res2){ //Ohms
		var r = res1 + res2;
		return r;
	}

	function calcularCapacitanciaParalelo(cap1, cap2){ //Farads
		var c = cap1 + cap2;
		return c;
	}

	function calcularCapacitanciaSerie(cap1, cap2){ //Farads
		var c = 1/(1/(cap1) + 1/(cap2));
		return c;
	}

	function calcularCorriente(voltaje, resEq){ //Amperes
		if(resEq != 0){
			var i = voltaje / resEq;
			i = parseFloat(i).toFixed(4);
		}else i = 0;
		return i;
	}

	function calcularCargaTotal(voltaje, capEq){ //Coulombs
		var q = voltaje * capEq;
		q = parseFloat(q).toFixed(4);
		return q;
	}

	function calcularEnergiaAlmacenadaTotal(voltaje, capEq){ //Joules
		var e = (capEq * (voltaje*voltaje)) / 2;
		e = parseFloat(e).toFixed(4);
		return e;
	}

	function calcularVoltaje(){ //Volts
		return $(".component.clone[type='bateria']").attr("voltaje");
	}

	function updateGeneralValues(voltaje, corr, capEq, resEq, cargaT, energiaAl){
		var p = $("#properties .propertiesGeneral .properties");

		p.find(".voltaje").find(".value").html(voltaje);
		p.find(".corriente").find(".value").html(corr);
		p.find(".capacitancia").find(".value").html(capEq);
		p.find(".resistencia").find(".value").html(resEq);
		p.find(".carga").find(".value").html(cargaT);
		p.find(".energiaAlmacenada").find(".value").html(energiaAl);
	}

	/*Retrieve all elements*/
	function obtenerElementos(){
		var e;
		var grid,
			rows,
			cols;
		var result = [];

		e = $(".clone");

		grid = $(".grid");
		rows = grid.find("tr").size();
		cols = grid.find("tr").find("td").size() / rows;

		//Traverse col in each row searching elements
		var w = 50;
		var cElem;
		var cPosX,
			cPosY,
			posX,
			posY;
		for(var r=0; r<rows; r++){
			result[r] = [];
			for(var c=0; c<cols; c++){
				cPosX = c*w;
				cPosY = r*w;

				var elementAt = getElementsAt(cPosY, cPosX);
				if(elementAt[0] != undefined){
					result[r][c] = detectSubType($(elementAt[0]));
				}else{
					result[r][c] = 0;
				}
			}
		}

		return result;
	}

	function getElementsAt(top, left){
	    return $("#canvas")
	    		   .find(".clone")
	               .filter(function() {
	                           return $(this).position().top == top 
	                                    && $(this).position().left == left;
	               });
	}

	function getValueOf(element){
		var result = 0;
		var type = $(element).attr("type");

		//Detect Propertie of value
		if(type == "bateria"){
			result = $(element).attr("voltaje");
		}else if(type == "capacitor"){
			result = $(element).attr("capacitancia");
		}else if(type == "resistor"){
			result = $(element).attr("resistencia");
		}else if(type == "bombilla"){
			result = $(element).attr("potencia");
		}else if(type == "led"){
			result = $(element).attr("potencia");
		}

		return result;
	}

	function detectSubType(element){
		var n;
		var subtype = element.attr("subtype");

		if(subtype == "cableHorizontal"){
			n = "1";
		}else if(subtype == "cableVertical"){
			n = "2"
		}else if(subtype == "cableDownRight"){
			n = "3";
		}else if(subtype == "cableDownLeft"){
			n = "4";
		}else if(subtype == "cableUpLeft"){
			n = "5";
		}else if(subtype == "cableUpRight"){
			n = "6";
		}else if(subtype == "cableTUp"){
			n = "9";
		}else if(subtype == "cableTDown"){
			n = "A";
		}else if(subtype == "cableTRight"){
			n = "B";
		}else if(subtype == "cableTLeft"){
			n = "C";
		}else if(subtype == "bateriaVerticalUp"){
			n = "7";
		}else if(subtype == "bateriaHorizontalRight"){
			n = "8";
		}else if(subtype == "resistorHorizontal"){
			n = "R";
		}else if(subtype == "resistorVertical"){
			n = "M";
		}else if(subtype == "capacitorVertical"){
			n = "K";
		}

		return n;
	}

});