const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Building properties
const buildings = [];
const numBuildings = 15;
const maxBuildingHeight = canvas.height * 0.7;
const minBuildingWidth = 80;
const maxBuildingWidth = 150;

// Flying vehicles properties
const vehicles = [];
const numVehicles = 10;
const vehicleColors = ["#ff007f", "#00ffff", "#ffcc00", "#00ff00"];

// Create buildings
function createBuildings() {
    for (let i = 0; i < numBuildings; i++) {
        const width = Math.random() * (maxBuildingWidth - minBuildingWidth) + minBuildingWidth;
        const x = (i / numBuildings) * canvas.width + Math.random() * 30;
        buildings.push({
            x,
            y: canvas.height,
            width,
            currentHeight: 0,
            targetHeight: Math.random() * maxBuildingHeight + 50,
            growthRate: Math.random() * 2 + 0.5,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        });
    }
}

// Create flying vehicles
function createVehicles() {
    for (let i = 0; i < numVehicles; i++) {
        vehicles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height * 0.4),
            width: Math.random() * 40 + 30,
            height: Math.random() * 15 + 10,
            speed: Math.random() * 2 + 1,
            color: vehicleColors[Math.floor(Math.random() * vehicleColors.length)],
        });
    }
}

// Draw buildings with details
function drawBuildings() {
    buildings.forEach((building) => {
        // Building gradient
        const gradient = ctx.createLinearGradient(
            building.x,
            building.y - building.currentHeight,
            building.x + building.width,
            building.y
        );
        gradient.addColorStop(0, "rgba(0, 255, 255, 0.8)");
        gradient.addColorStop(1, building.color);

        // Draw the building structure
        ctx.fillStyle = gradient;
        ctx.fillRect(building.x, building.y - building.currentHeight, building.width, building.currentHeight);

        // Draw details (antennas, lights, etc.)
        ctx.fillStyle = "#fff";
        for (let i = 0; i < 5; i++) {
            const lightX = building.x + Math.random() * building.width;
            const lightY = building.y - Math.random() * building.currentHeight;
            ctx.fillRect(lightX, lightY, 4, 4); // Lights as small squares
        }

        // Simulate growth
        if (building.currentHeight < building.targetHeight) {
            building.currentHeight += building.growthRate;
        }
    });
}

// Draw flying vehicles with details
function drawVehicles() {
    vehicles.forEach((vehicle) => {
        // Draw vehicle body
        ctx.fillStyle = vehicle.color;
        ctx.fillRect(vehicle.x, vehicle.y, vehicle.width, vehicle.height);

        // Add cockpit (a smaller rectangle)
        ctx.fillStyle = "#000";
        ctx.fillRect(vehicle.x + vehicle.width * 0.3, vehicle.y + vehicle.height * 0.2, vehicle.width * 0.4, vehicle.height * 0.6);

        // Add lights (small glowing dots)
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(vehicle.x + 5, vehicle.y + vehicle.height / 2, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.arc(vehicle.x + vehicle.width - 5, vehicle.y + vehicle.height / 2, 3, 0, Math.PI * 2);
        ctx.fill();

        // Simulate movement
        vehicle.x += vehicle.speed;
        if (vehicle.x > canvas.width) {
            vehicle.x = -vehicle.width;
        }
    });
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBuildings();
    drawVehicles();

    requestAnimationFrame(animate);
}

// Initialize the scene
createBuildings();
createVehicles();
animate();

// Adjust canvas size on resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildings.length = 0;
    vehicles.length = 0;
    createBuildings();
    createVehicles();
});
