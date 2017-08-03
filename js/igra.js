// Get the canvas element from our HTML above
var canvas = document.getElementById("renderCanvas");
// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);
// Now, call the createScene function that you just finished creating
var scene = createScene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function() {
	scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function() {
	console.log("resize");
	engine.resize();
});

function createScene() {
	// Now create a basic Babylon Scene object 
	var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(1, 1, 1);

	createCameras(scene);
	createLights(scene);

	createElements(scene);

	//var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
	createGround(scene);

	return scene;
}

function createCameras(scene) {
	// This creates and positions a free camera
	//var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
	// This targets the camera to scene origin
	camera.setTarget(BABYLON.Vector3.Zero());
	// This attaches the camera to the canvas
	camera.attachControl(canvas, false);
}

function createLights(scene) {
	// This creates a light, aiming 0,1,0 - to the sky.
	//var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
	// Dim the light a small amount
	light.intensity = 0.5;
}

function createElements(scene) {
	var sphere = BABYLON.Mesh.CreateSphere("sphere1", 2, 2, scene);
	//Creation of spheres
    var sphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 10.0, 6.0, scene);
    var sphere2 = BABYLON.Mesh.CreateSphere("Sphere2", 2.0, 7.0, scene);
    var sphere3 = BABYLON.Mesh.CreateSphere("Sphere3", 10.0, 8.0, scene);

    var box1 = BABYLON.Mesh.CreateBox("Box1", 10.0, scene);
  	box1.position.x = -20;
  	var animationBox = new BABYLON.Animation("myAnimation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
  	animationBox.setKeys(createAnimationKeys(box1));
  	box1.animations = [];
	box1.animations.push(animationBox);
	scene.beginAnimation(box1, 0, 100, true);
	/*
	var plane = BABYLON.Mesh.CreatePlane("plane", 10.0, scene);
	var disc = BABYLON.Mesh.CreateDisc("disc", 5, 30, scene);
	var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, scene);
	var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene);
	var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene);
	*/
	var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene);
	sphere1.material = materialSphere1;
	sphere.position.y = 12;
	sphere1.position.x = -40;
    sphere2.position.x = -30;

    var animationSphere1 = new BABYLON.Animation("myAnimation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    animationSphere1.setKeys(createAnimationKeys(sphere1));

    sphere1.animations = [];
	sphere1.animations.push(animationSphere1);
	scene.beginAnimation(sphere1, 0, 100, true);
}

function createGround(scene) {

	var precision = {
	    "w" : 2,
	    "h" : 2
	};
	var subdivisions = {
	    'h' : 8,
	    'w' : 8
	};
	//var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
	var tiledGround = BABYLON.Mesh.CreateTiledGround("Tiled Ground", -12, -12, 12, 12, subdivisions, precision, scene, true);

	var whiteMaterial = new BABYLON.StandardMaterial("White", scene);
	whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
	 
	var blackMaterial = new BABYLON.StandardMaterial("Black", scene);
	blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

	var multimat = new BABYLON.MultiMaterial("multi", scene);
	multimat.subMaterials.push(whiteMaterial);
	multimat.subMaterials.push(blackMaterial);

	tiledGround.material = multimat;

	var verticesCount = tiledGround.getTotalVertices();
	var tileIndicesLength = tiledGround.getIndices().length / (subdivisions.w * subdivisions.h);

	tiledGround.subMeshes = [];
	var base = 0;
	for (var row = 0; row < subdivisions.h; row++) {
	    for (var col = 0; col < subdivisions.w; col++) {
	         tiledGround.subMeshes.push(new BABYLON.SubMesh(row % 2 ^ col % 2, 0, verticesCount, base, tileIndicesLength, tiledGround));
	         base += tileIndicesLength;
	     }
	}
}

function createAnimationKeys(sphere1) {
	var keys = []; 

	// An array with all animation keys
	var keys = []; 

	//At the animation key 0, the value of scaling is "1"
	keys.push({
		frame: 0,
		value: 1
	});

	//At the animation key 20, the value of scaling is "0.2"
	keys.push({
		frame: 20,
		value: 0.2
	});

	//At the animation key 100, the value of scaling is "1"
	keys.push({
		frame: 100,
		value: 1
	});

	return keys;
}