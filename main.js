const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer({ antialias: true})

// Array of colours for cube to change into
const hexes = [
  0x00cc00,
  0x0000ff,
  0xffff00,
  0xff0051,
  0xffffff,
];

renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setClearColor("#222222")
document.body.appendChild( renderer.domElement )
camera.position.z = 5

window.addEventListener( 'resize', () => {
	let width = window.innerWidth
	let height = window.innerHeight
	renderer.setSize( width, height )
	camera.aspect = width / height
	camera.updateProjectionMatrix()
})

// Creates the cube
let geometry = new THREE.BoxGeometry( 1, 1, 1)
let material = new THREE.MeshStandardMaterial( { color: 0xff0051, flatShading: true, metalness: 0, roughness: 1 })
let cube = new THREE.Mesh ( geometry, material )
scene.add( cube )

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// When the letter C is pressed, the cube changes to a random colour
let onKeyDown = function(event){
  if (event.keyCode == 67) {
    randomHex = getRandomInt(hexes.length - 1);
    cube.material.color.setHex(hexes[randomHex]);
  }
};
document.addEventListener('keydown', onKeyDown, false);

// Creates shading
let ambientLight = new THREE.AmbientLight ( 0xffffff, 0.2)
scene.add( ambientLight )

let pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.set( 25, 50, 25 );
scene.add( pointLight );

// Animates cube to rotate
function animate() {
	requestAnimationFrame( animate )
	cube.rotation.x += 0.04;
	cube.rotation.y += 0.04;
	renderer.render( scene, camera )
}
animate()
