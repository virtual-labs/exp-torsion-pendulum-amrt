(function() {
	angular.module('users')
		.directive("experiment", directiveFunction)
})();

var torsion_pendulum_stage, exp_canvas, tick;

var circle_timer, startAngle, endAngle, clockWise, disc_diameter, wire_length, wire_radius, wire_color, disc_mass;

var right_arrow_flag, left_arrow_flag, weight_flag, D1_CONST, D2_CONST, moment_of_inertia_for_disc, moment_of_inertia_for_identical_mass;

var total_moment_of_inertia, time_period_for_oscillation, timer_check, right_arrow_count, left_arrow_count;

var suspension_wire_array = mass_position_array = suspension_wire_value_array = help_array = []; /** Help array and other all array declaration */

var circle = new createjs.Shape();
var circle_mask = new createjs.Shape();
var circle_down = new createjs.Shape();
var circle_arc = new createjs.Shape();
var pendulum_rope = new createjs.Shape();
var disc_middle_rect = new createjs.Shape();

function directiveFunction() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			/** Variable that decides if something should be drawn on mouse move */
			var experiment = true;
			if (element[0].width > element[0].height) {
				element[0].width = element[0].height;
				element[0].height = element[0].height;
			} else {
				element[0].width = element[0].width;
				element[0].height = element[0].width;
			}
			if (element[0].offsetWidth > element[0].offsetHeight) {
				element[0].offsetWidth = element[0].offsetHeight;
			} else {
				element[0].offsetWidth = element[0].offsetWidth;
				element[0].offsetHeight = element[0].offsetWidth;
			}
			exp_canvas = document.getElementById("demoCanvas");
			exp_canvas.width = element[0].width;
			exp_canvas.height = element[0].height;
			torsion_pendulum_stage = new createjs.Stage("demoCanvas");
			queue = new createjs.LoadQueue(true);
			queue.loadManifest([{
				id: "background",
				src: "././images/background.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "stand",
				src: "././images/stand.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "small_weight",
				src: "././images/small_weight.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "arrow",
				src: "././images/arrow.svg",
				type: createjs.LoadQueue.IMAGE
			}]);
			loadingProgress(queue, torsion_pendulum_stage, exp_canvas.width);			
			torsion_pendulum_stage.enableDOMEvents(true);
			torsion_pendulum_stage.enableMouseOver();
			createjs.Touch.enable(torsion_pendulum_stage);
			queue.on("complete", handleComplete, this);
			tick = setInterval(updateTimer, 5); /** Stage update function in a timer */
			function handleComplete() {				
				loadImages(queue.getResult("background"), "background", 0, 0, 1, "", 0, torsion_pendulum_stage);
				initialisationOfVariables(); /** Initializing the variables */	
				loadImages(queue.getResult("stand"), "stand", 10, 10, 1, "", 0, torsion_pendulum_stage);
				/** Adding the disc middle rect */
			    torsion_pendulum_stage.addChild(disc_middle_rect);
				/** Adding the circle shape for disc down */		
				torsion_pendulum_stage.addChild(circle_down);
				circle_down.x = 365;
			    circle_down.y = 375;
			    circle_down.graphics.beginStroke(0).beginRadialGradientFill(["black", "white", "black"], [ 0, 0.65, 0.85 ], 0, 0, 0, 0, 0, 100).drawEllipse(0, 0, 100, disc_diameter).command;
			    disc_middle_rect.x = circle_down.x;
			    disc_middle_rect.y = circle_down.y+2;
			    disc_middle_rect.graphics.beginStroke(0).beginRadialGradientFill(["black", "white", "black"], [ 0, 0.65, 0.85 ], 0, 0, 0, 0, 0, 100).drawRect(0, 0, 100, disc_diameter/3).command;
			    /** Adding the circle shape for disc */
				torsion_pendulum_stage.addChild(circle);
				circle.x = 365;
			    circle.y = 370;
			    circle.graphics.beginStroke(0).beginRadialGradientFill(["#414040", "#bbb9b9"],[ 0, 0.75, 1 ], 0, 0, 0, 0, 0, 100).drawEllipse(0, 0, 100, disc_diameter).command; 
			    circle.regX = circle.width/2;
			    /** Adding the circle shape for mask the disc */
			    torsion_pendulum_stage.addChild(circle_mask);
			    circle_mask.x = 365;
			    circle_mask.y = 370;			      
		       	circle_mask.graphics.beginStroke(0).beginFill("").drawEllipse(0, 0, 100, disc_diameter).command;
		       	/** Adding the suspension wire for hanging the disc */
		        pendulum_rope.graphics.beginStroke("#FFD9B2").setStrokeStyle(1).moveTo(414,185).lineTo(circle.x+50,circle.y+(disc_diameter/2));
		        torsion_pendulum_stage.addChild(pendulum_rope);
		        /** Adding disc marker as circle arc */
		        torsion_pendulum_stage.addChild(circle_arc);
				circle_arc.x = circle.x+50;
				circle_arc.y = circle.y+(disc_diameter+(wire_length/2))/2;
    			circle_arc.mask = circle_mask;
    			circle_arc.graphics.moveTo(0,0)
    			circle_arc.graphics.beginStroke(1).beginFill("black").arc(0,0,25,startAngle,endAngle);
		        
		        loadImages(queue.getResult("arrow"), "arrow_right", circle.x+75, circle.y-35, 1, "pointer", 0, torsion_pendulum_stage);
		        loadImages(queue.getResult("arrow"), "arrow_left", circle.x+25, circle.y-10, 1, "pointer", 180, torsion_pendulum_stage);
		        loadImages(queue.getResult("small_weight"), "small_weight_right", circle.x, 373, 0.6, "", 0, torsion_pendulum_stage);
		        loadImages(queue.getResult("small_weight"), "small_weight_left", circle.x, 373, 0.6, "", 0, torsion_pendulum_stage);
                createStopwatch(torsion_pendulum_stage, 430, 480, 1);

				translationLabels(); /** Translation of strings using gettext */				
				initialisationOfControls(scope); /** Initializing the controls */
				initialisationOfImages(scope); /** Function call for images used in the apparatus visibility */
				/** Click event of right side arrow placed upper position of the disc */
				getChild("arrow_right").addEventListener("click", function(evt){arrowRightClick(scope, evt)});
				/** Click event of left side arrow placed upper position of the disc */
                getChild("arrow_left").addEventListener("click", function(evt){arrowLeftClick(scope, evt)});
				torsion_pendulum_stage.update();
			}


			/** Add all the strings used for the language translation here. '_' is the short cut for calling the gettext function defined in the gettext-definition.js */
			function translationLabels() {
				/** This help array shows the hints for this experiment */
				help_array = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("help7"), _("help8"), _("help9"), _("Next"), _("Close")];
				scope.heading = _("Moment of Inertia of a Torsion Pendulum");
				scope.variables = _("Variables");
				scope.suspension_wire_lbl = _("Suspension Wire");
				scope.copper = _("Copper");
				scope.mass_position_lbl = _("Identical Mass Position");
				scope.no_cylinder = _("No Cylinder");
				scope.identical_mass_lbl = _("Identical Mass:");
				scope.g_unit = _("g");
				scope.kg_unit = _("kg");
				scope.cm_unit = _("cm");
				scope.disc_mass_lbl = _("Disc Mass:");
				scope.disc_radius_lbl = _("Disc Radius:");
				scope.wire_length_lbl = _("Suspension Wire Length:");
				scope.wire_radius_lbl = _("Suspension Wire Radius:");
				scope.show_stopwatch_lbl = _("Show Stopwatch");
				scope.show_time_period_lbl = _("Show Result");
				scope.result = _("Measurements");
				scope.stop = _("Stop");
				scope.moment_inertia_lbl = _("Moment of Inertia:");
				scope.time_period_lbl = _("Time Period:");
				scope.copyright = _("copyright");
				/** The suspension_wire_array contains the values, type and indexes of the choose suspension wire dropdown */
				scope.suspension_wire_array = [{
					Wire: _("Copper"),
					type: "#FFD9B2",
					index: 0
				}, {
					Wire: _("Brass"),
					type: "#F5D967",
					index: 1
				}, {
					Wire: _("Bronze"),
					type: "#CE9D6C",
					index: 2
				}, {
					Wire: _("Cast Iron"),
					type: "#C6C6C6",
					index: 3
				}, {
					Wire: _("Zinc"),
					type: "#CCCCCC",
					index: 4
				}, {
					Wire: _("Aluminium"),
					type: "#F7F7F7",
					index: 5
				}, {
					Wire: _("Cast Steel"),
					type: "#B3B3B3",
					index: 6
				}];
				/** The mass_position_array contains the values, type and indexes of the choose mass dropdown */
				scope.mass_position_array = [{
					Mass: _("No Cylinder"),
					type: 1,
					index: 0
				}, {
					Mass: _("At d1 position (1.5cm)"),
					type: 2,
					index: 1
				}, {
					Mass: _("At d2 position (4cm)"),
					type: 3,
					index: 2
				}];
				scope.$apply();
				torsion_pendulum_stage.update();
			}			
		}
	}
}

/** Createjs stage updation happens in every interval */
function updateTimer() {
    torsion_pendulum_stage.update();
}

/** All the images loading and added to the stage */
function loadImages(image, name, xPos, yPos, scale, cursor, rot, container) {
	var _bitmap = new createjs.Bitmap(image).set({});    
	_bitmap.x = xPos;
	_bitmap.y = yPos;
	_bitmap.scaleX = _bitmap.scaleY = scale;
	_bitmap.name = name;
	_bitmap.alpha = 1;
	if ( name == "small_weight_left" || name == "small_weight_right" ) {
		_bitmap.regX = _bitmap.image.width / 2;
		_bitmap.regY = _bitmap.image.height / 2;
	}
	_bitmap.rotation = rot;
	_bitmap.cursor = cursor;
	container.addChild(_bitmap); /** Adding bitmap to the container */
}

/** Function to return child element of stage */
function getChild(child_name) {
    return torsion_pendulum_stage.getChildByName(child_name); /** Returns the child element of stage */
}

/** All variables initialising in this function */
function initialisationOfVariables() {
	document.getElementById("site-sidenav").style.display = "block";
	startAngle = 1.5;
	endAngle = 1.6;
	disc_diameter = 15;
	wire_length = 0;
	wire_radius = 1;
	wire_color = "#FFD9B2";
	disc_mass = 1;
	D1_CONST = 1.5;
	D2_CONST = 4;
	right_arrow_count = 0;
	left_arrow_count = 0;
	clockWise = true;
	right_arrow_flag = false;
	left_arrow_flag = false;
	weight_flag = false;
	suspension_wire_value_array = [45.4, 40.02, 44.85, 40.71, 42.09, 26.9, 77.83]; /** Each suspension wire values */
}

/** Set the initial status of the bitmap and text depends on its visibility and initial values */
function initialisationOfImages(scope) {
	getChild("small_weight_left").alpha = 0;
	getChild("small_weight_right").alpha = 0;
}

/** All controls initialising in this function */
function initialisationOfControls(scope) {
	scope.suspension_wire = 0;
	scope.mass_position = 1;
	scope.identical_mass = 5;
	scope.disc_mass = 1;
	scope.disc_radius = 5;
	scope.wire_length = 30;
	scope.wire_radius = 0.04;
	scope.string_length = 0.3;
	scope.string_radius = 0.0004;
	scope.moment_inertia = 0.001250;
	scope.d1_value = 1.5;
	scope.d2_value = 4.0;
	scope.time_period = 2.8596;
	scope.identical_mass_disable = true;
	scope.time_period_hide = true;
	scope.stop_btn_disable = true;
	scope.control_disable = false; 
	scope.show_time_period = false;
}

function discMaking() {
	/** Adding the disc middle rect */
    torsion_pendulum_stage.addChild(disc_middle_rect);
	/** Adding the circle shape for disc down */		
	torsion_pendulum_stage.addChild(circle_down);
	circle_down.x = 365;
    circle_down.y = 375;
    circle_down.graphics.beginStroke(0).beginRadialGradientFill(["black", "white", "black"], [ 0, 0.65, 0.85 ], 0, 0, 0, 0, 0, 100).drawEllipse(0, 0, 100, disc_diameter).command;
    disc_middle_rect.x = circle_down.x;
    disc_middle_rect.y = circle_down.y+2;
    disc_middle_rect.graphics.beginStroke(0).beginRadialGradientFill(["black", "white", "black"], [ 0, 0.65, 0.85 ], 0, 0, 0, 0, 0, 100).drawRect(0, 0, 100, disc_diameter/3).command;
    /** Adding the circle shape for disc */
	torsion_pendulum_stage.addChild(circle);
	circle.x = 365;
    circle.y = 370;
    circle.graphics.beginStroke(0).beginRadialGradientFill(["#414040", "#bbb9b9"],[ 0, 0.75, 1 ], 0, 0, 0, 0, 0, 100).drawEllipse(0, 0, 100, disc_diameter).command;		    
}