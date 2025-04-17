/** Suspension wire dropdown change event */
function changeSuspensionFn(scope) {
	wire_color = scope.suspension_wire_array[scope.suspension_wire].type; /** Wire color with respect to dropdown */
	pendulum_rope.graphics.clear().beginStroke(wire_color).setStrokeStyle(wire_radius).moveTo(414,185).lineTo(circle.x+50, circle.y+((disc_diameter+(wire_length/2))/2));
    torsion_pendulum_stage.addChild(pendulum_rope);
    calculation(scope); /** Calculation function */
    torsion_pendulum_stage.update();
}
/** Change event of dropdown identical mass position */
function changeMassPositionFn(scope) {
	switch (scope.mass_position) {
		case "1": /** If no cylinder */
			getChild("small_weight_left").alpha = 0;
			getChild("small_weight_right").alpha = 0;
			scope.identical_mass_disable = true;
			weight_flag = false;
		break;
		case "2": /** At d1 position */
			getChild("small_weight_left").alpha = 1;
			getChild("small_weight_right").alpha = 1;
			getChild("small_weight_left").x = circle.x+34;
			getChild("small_weight_right").x = circle.x+66;
			scope.identical_mass_disable = false;
			weight_flag = true;
		break;
		case "3": /** At d2 position */
			getChild("small_weight_left").alpha = 1;
			getChild("small_weight_right").alpha = 1;
			getChild("small_weight_left").x = circle.x+14;
			getChild("small_weight_right").x = circle.x+85;
			scope.identical_mass_disable = false;
			weight_flag = true;
		break;
	}
	calculation(scope); /** Calculation function */
	torsion_pendulum_stage.update();
}
/** Identical mass slider change event */
function changeIdenticalMassFn(scope) {	
	/** Increasing / Decreasing weight mass */
	getChild("small_weight_left").scaleY = 0.9+(scope.identical_mass/200);
	getChild("small_weight_right").scaleY = 0.9+(scope.identical_mass/200);
	calculation(scope); /** Calculation function */
	torsion_pendulum_stage.update();
}
/** Disc mass slider change event */
function changeDiscMassFn(scope) {
	/** Increasing / Decreasing disc mass */
	disc_mass = scope.disc_mass-1;
	var circle_down_initial_y = circle.y+5;
	circle_down.y = circle_down_initial_y+disc_mass;
    disc_middle_rect.graphics.clear().beginStroke(0).beginRadialGradientFill(["black", "white", "black"], [ 0, 0.65, 0.85 ], 0, 0, 0, 0, 0, 100).drawRect(0-(scope.disc_radius-5)/2, 0, (100+scope.disc_radius)-5, (disc_diameter/3)+disc_mass).command;
	calculation(scope); /** Calculation function */
	torsion_pendulum_stage.update();
}
/** Disc radius slider change event */
function changeDiscRadiusFn(scope) {
	/** Increasing / Decreasing disc radius */
    var _rad = scope.disc_radius-5;
    _rad = _rad * 10;
    disc_middle_rect.graphics.clear().beginStroke(0).beginRadialGradientFill(["black", "white", "black"], [ 0, 0.65, 0.85 ], 0, 0, 0, 0, 0, 100).drawRect(0-_rad/2, 0, (100+_rad), (disc_diameter/3)).command;
    circle.graphics.clear().beginStroke(0).beginRadialGradientFill(["#414040", "#bbb9b9"],[ 0, 0.75, 1 ], 0, 0, 0, 0, 0, 100).drawEllipse(0-_rad/2, 0, (100+_rad), disc_diameter+(wire_length/2)).command; 
   	circle_mask.graphics.clear().beginStroke(0).beginFill("").drawEllipse(0-_rad/2, 0, (100+_rad), disc_diameter+(wire_length/2)).command; 
	circle_down.graphics.clear().beginStroke(0).beginRadialGradientFill(["black", "white", "black"], [ (wire_length/200), 0.65+(wire_length/1000), 0.85+(wire_length/1000) ], 0, 0, 0, 0, 0, 100).drawEllipse(0-_rad/2, 0, (100+_rad), disc_diameter+(wire_length/2)).command;
	calculation(scope); /** Calculation function */
	torsion_pendulum_stage.update();
}
/** Suspension wire length slider change event */
function changeWireLengthFn(scope) {
	wire_length = scope.wire_length-30;
	/** Increasing / Decreasing the wire length and disc radius */
    var _rad = scope.disc_radius-5;
    _rad = _rad * 10;
	circle.graphics.clear().beginStroke(0).beginRadialGradientFill(["#414040", "#bbb9b9"],[ 0, 0.75, 1 ], 0, 0, 0, 0, 0, 100).drawEllipse(0-_rad/2, 0, (100+_rad), disc_diameter+(wire_length/2)).command; 
   	circle_mask.graphics.clear().beginStroke(0).beginFill("").drawEllipse(0, 0, (100+_rad), disc_diameter+(wire_length/2)).command; 
   	var val1 = 0+(wire_length/200);
   	var val2 = 0.65+(wire_length/1000);
   	var val3 = 0.85+(wire_length/1000);
    circle_down.graphics.clear().beginStroke(0).beginRadialGradientFill(["black", "white", "black"], [ val1, val2, val3 ], 0, 0, 0, 0, 0, 100).drawEllipse(0-_rad/2, 0, (100+_rad), disc_diameter+(wire_length/2)).command;
    circle.y = 370+wire_length;
    disc_middle_rect.y = 377+(wire_length*1.25);
   	pendulum_rope.graphics.clear().beginStroke(wire_color).setStrokeStyle(wire_radius).moveTo(414,185).lineTo(circle.x+50, circle.y+((disc_diameter+(wire_length/2))/2));
    circle_mask.y = circle.y;
    circle_down.y = circle.y+5;
    getChild("arrow_right").y = circle.y-35;
    getChild("arrow_left").y = circle.y-10;
    getChild("small_weight_right").y = 370+(wire_length*1.2);
	getChild("small_weight_left").y = 370+(wire_length*1.2);
	circle_arc.y = circle.y+(disc_diameter+(wire_length/2))/2;
	calculation(scope); /** Calculation function */
    torsion_pendulum_stage.update();
}
/** Suspension wire radius slider change event */
function changeWireRadiusFn(scope) {
	wire_radius = (scope.wire_radius*100)-3;
	pendulum_rope.graphics.clear().beginStroke(wire_color).setStrokeStyle(wire_radius).moveTo(414,185).lineTo(circle.x+50, circle.y+((disc_diameter+(wire_length/2))/2));
	calculation(scope); /** Calculation function */
	torsion_pendulum_stage.update();
}
/** Show time period check box function */
function showTimePeriodFn(scope) {
	scope.show_time_period ? scope.time_period_hide = false : scope.time_period_hide = true;
	torsion_pendulum_stage.update();
}
/** Stop button click event */
function stopBtnFn(scope) {
	scope.stop_btn_disable = true;
	scope.control_disable = false;
	if ( scope.mass_position == 2 || scope.mass_position == 3 ) { /** If weight is there in disc */
		scope.identical_mass_disable = false;
	}
	getChild("arrow_left").mouseEnabled = true;
	getChild("arrow_right").mouseEnabled = true;
	scope.show_stopwatch_disable = false;
	left_arrow_count = 0;
	right_arrow_count = 0;
	clearInterval(circle_timer);
	createjs.Tween.removeAllTweens();
	pause_flag = true;	
}
/** Right side arrow click function */
function arrowRightClick(scope, evt) {
	if ( right_arrow_count > 0 ) {
		resetWatch(); /** Reset the stopwatch */
	}	
	calculation(scope); /** Calculation function */
	pause_flag = false;	
	/** Disc rotating animation */
	circle_timer = setInterval(function() {
        drawingCircle(scope)
    }, time_period_for_oscillation*11.5);
	right_arrow_flag = true;
	startAngle = 0.4;
	endAngle = 0.5;
	right_arrow_count++;
	torsion_pendulum_stage.update();
}
/** Left side arrow click function */
function arrowLeftClick(scope, evt) {
	if ( left_arrow_count > 0 ) {
		resetWatch(); /** Reset the stopwatch */
	}	
	calculation(scope); /** Calculation function */
	pause_flag = false;
	/** Disc rotating animation */
	circle_timer = setInterval(function() {
        drawingCircle(scope)
    }, time_period_for_oscillation*11.5);
	right_arrow_flag = false;
	startAngle = 2.8;
	endAngle = 2.9;
	left_arrow_count++;
	clockWise = false;
	torsion_pendulum_stage.update();
}
/** Disc rotating animation function */
function drawingCircle(scope) {
    var _interval = 0.05;
	getChild("arrow_left").mouseEnabled = false;
	getChild("arrow_right").mouseEnabled = false;
	if ( !pause_flag ) {
        showWatch(torsion_pendulum_stage); /** Show stop watch */
    }
	scope.stop_btn_disable = false;
	scope.show_stopwatch_disable = true;
	scope.control_disable = true;
	if ( weight_flag ) {
		scope.identical_mass_disable = true;
	}
	circle_arc.graphics.clear();
	//circle_arc.mask = circle_mask;
	torsion_pendulum_stage.addChild(circle_arc);
	circle_arc.x = circle.x+50;
	circle_arc.y = circle.y+(disc_diameter+(wire_length/2))/2;
	if ( right_arrow_flag ) { /** If right arrow is clicked */
		if ( startAngle < 2.7 && clockWise == true ) {
            if(startAngle > 2.5){
                //_interval = 0.02;
            }else{
                _interval = 0.05;
            }
			startAngle = startAngle+_interval;
	        endAngle = endAngle+_interval;
	    } else {
	    	clockWise = false;
	    	if ( startAngle >= 0.5 ) {
                if(startAngle < 0.7){
                   // _interval = 0.03;
                }else{
                    _interval = 0.05;
                }
	    		startAngle = startAngle-_interval;
				endAngle = endAngle-_interval;
	    	} else {
	    		clockWise = true;	
	    	}
	    }
	} else { /** Else left arrow is clicked */
		if (startAngle > 0.5 && clockWise == false ) {
            if(startAngle < 0.7){
                //_interval = 0.03;
            }else{
                _interval = 0.05;
            }
			startAngle = startAngle-_interval;
	        endAngle = endAngle-_interval;
		} else {
	    	clockWise = true;
	    	if ( startAngle < 2.7 ) {
                if(startAngle > 2.5){
                    //_interval = 0.02;
                }else{
                    _interval = 0.05;
                }
	    		startAngle = startAngle+_interval;
				endAngle = endAngle+_interval;
	    	} else {
	    		clockWise = false;
	    	}
	    }
	}

	/** In identical mass position slider weight is added second and third option, that  weight movement function */
	if(scope.mass_position == "3"){
    	var _yFactor = wire_length / 10;
    	if(parseFloat(startAngle.toFixed(1)) == 0.5){
	    	weightAnimRight(circle.x+82, 373+(wire_length*1.2)+3+_yFactor,89);
	    	weightAnimLeftt(circle.x+18, 373+(wire_length*1.2)-3-_yFactor,14);
	    }else if(parseFloat(startAngle.toFixed(1)) == 2.6){
	    	weightAnimRight(circle.x+82, 373+(wire_length*1.2)-3-_yFactor,89);
	    	weightAnimLeftt(circle.x+18, 373+(wire_length*1.2)+3+_yFactor,14);
	    }
    }else if(scope.mass_position == "2"){
    	var _yFactor = wire_length / 20;
    	if(parseFloat(startAngle.toFixed(1)) == 0.5){
	    	weightAnimRight(circle.x+64, 373+(wire_length*1.2)+1+_yFactor,66);
	    	weightAnimLeftt(circle.x+36, 373+(wire_length*1.2)-1-_yFactor,34);
	    }else if(parseFloat(startAngle.toFixed(1)) == 2.6){
	    	weightAnimRight(circle.x+64, 373+(wire_length*1.2)-1-_yFactor,66);
	    	weightAnimLeftt(circle.x+36, 373+(wire_length*1.2)+1+_yFactor,34);
	    }
    }
    
    circle_arc.graphics.moveTo(0, 0)
    circle_arc.graphics.beginStroke(1).beginFill("black").arc(0,0,42,startAngle,endAngle);
    scope.$apply();
	torsion_pendulum_stage.update();
}
/** In identical mass position slider weight is added second and third option, that  weight movement function */
function weightAnimRight(x,y,xFactor){
	var rotating_tween = createjs.Tween.get(getChild("small_weight_right"), {override:true}).to({
        x: circle.x+xFactor, y: 373+(wire_length*1.2)
    }, (time_period_for_oscillation*534.75)/2).to({x:x,y:y},(time_period_for_oscillation*534.75)/2);
}
/** In identical mass position slider weight is added second and third option, that  weight movement function */
function weightAnimLeftt(x,y,xFactor){
	var rotating_tween = createjs.Tween.get(getChild("small_weight_left"), {override:true}).to({
        x: circle.x+xFactor, y: 373+(wire_length*1.2)
    }, (time_period_for_oscillation*534.75)/2).to({x:x,y:y},(time_period_for_oscillation*534.75)/2);
}


/** Calculation function */
function calculation(scope) {
	/** Reduced mass = m2/(2*m) */
	reduced_mass = Math.pow(scope.identical_mass, 2)*Math.pow(10, -3)/(2*scope.identical_mass);
	/** I0 = MR2/2 */
	moment_of_inertia_for_disc = (scope.disc_mass*Math.pow((scope.disc_radius*Math.pow(10, -2)), 2)/2).toFixed(5);
	/** I1 = m2*d2/(2*m) */
	if ( scope.mass_position == 1 ) {
		moment_of_inertia_for_identical_mass = 0;
	} else if ( scope.mass_position == 2 ) {
		moment_of_inertia_for_identical_mass = reduced_mass*Math.pow(D1_CONST*Math.pow(10, -2), 2);
	} else {
		moment_of_inertia_for_identical_mass = (reduced_mass*Math.pow(D2_CONST*Math.pow(10, -2), 2)).toFixed(6);
	}
	/** T = 2/r² sqrt(2*3.14*Il/n) */
	total_moment_of_inertia = parseFloat(moment_of_inertia_for_disc+parseFloat(moment_of_inertia_for_identical_mass));
	var val1 = Math.pow((scope.wire_radius*Math.pow(10, -2)), 2);
	var val2 = 2*3.14*total_moment_of_inertia*scope.wire_length*Math.pow(10, -2);
	var val3 = suspension_wire_value_array[scope.suspension_wire]*Math.pow(10, 9);
	var val4 = Math.sqrt(val2/val3);
	time_period_for_oscillation = (2/val1*val4).toFixed(6);
	/** Result display */
	scope.string_length = scope.wire_length/100;
	scope.string_radius = (scope.wire_radius/100).toFixed(4);
	scope.moment_inertia = total_moment_of_inertia;
	scope.time_period = time_period_for_oscillation;
}