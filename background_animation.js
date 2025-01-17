const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Building properties
const buildings = [];
const numBuildings = 15; // Number of buildings
const maxBuildingHeight = canvas.height * 0.7;
const minBuildingWidth = 60;
const maxBuildingWidth = 120;

// Flying vehicles properties
const vehicles = [];
const numVehicles = 10; // Number of flying vehicles
const vehicleColors = ["#ff007f", "#00ffff", "#ffcc00", "#00ff00"];

// Create buildings
function createBuildings() {
    for (let i = 0; i < numBuildings; i++) {
        const width = Math.random() * (maxBuildingWidth - minBuildingWidth) + minBuildingWidth;
        const x = (i / numBuildings) * canvas.width + Math.random() * 30; // Slight random offset
        buildings.push({
            x,
            y: canvas.height,
            width,
            currentHeight: 0, // Start with height 0
            targetHeight: Math.random() * maxBuildingHeight + 50,
            growthRate: Math.random() * 2 + 0.5,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`, // Random neon colors
            lightIntensity: Math.random() * 0.5 + 0.5, // Glow intensity
        });
    }
}

// Create flying vehicles
function createVehicles() {
    for (let i = 0; i < numVehicles; i++) {
        vehicles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height * 0.4), // Fly above buildings
            width: Math.random() * 20 + 30,
            height: Math.random() * 10 + 5,
            speed: Math.random() * 2 + 1,
            color: vehicleColors[Math.floor(Math.random() * vehicleColors.length)],
        });
    }
}

// Draw the city
function drawCity() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw buildings
    buildings.forEach((building) => {
        // Building fill gradient
        const gradient = ctx.createLinearGradient(
            building.x,
            building.y - building.currentHeight,
            building.x + building.width,
            building.y
        );
        gradient.addColorStop(0, "rgba(0, 255, 255, 0.8)");
        gradient.addColorStop(1, building.color);

        // Draw the building
        ctx.fillStyle = gradient;
        ctx.fillRect(building.x, building.y - building.currentHeight, building.width, building.currentHeight);

        // Neon glow effect
        ctx.shadowBlur = 20 * building.lightIntensity;
        ctx.shadowColor = building.color;

        // Building outline
        ctx.strokeStyle = building.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(building.x, building.y - building.currentHeight, building.width, building.currentHeight);

        // Simulate growth
        if (building.currentHeight < building.targetHeight) {
            building.currentHeight += building.growthRate;
        }

        // Windows with glow
        ctx.shadowBlur = 0; // Reset shadow for windows
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        for (let i = 10; i < building.currentHeight; i += 30) {
            for (let j = 10; j < building.width; j += 20) {
                ctx.fillRect(
                    building.x + j,
                    building.y - i,
                    10,
                    15 // Window size
                );
            }
        }
    });

    // Draw flying vehicles
    vehicles.forEach((vehicle) => {
        // Draw vehicle body
        ctx.fillStyle = vehicle.color;
        ctx.fillRect(vehicle.x, vehicle.y, vehicle.width, vehicle.height);

        // Draw vehicle glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = vehicle.color;

        // Simulate movement
        vehicle.x += vehicle.speed;
        if (vehicle.x > canvas.width) {
            vehicle.x = -vehicle.width; // Reset position to the left
        }
    });

    // Continue animation
    requestAnimationFrame(drawCity);
}

// Initialize and start animation
createBuildings();
createVehicles();
drawCity();

// Adjust canvas size on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildings.length = 0; // Reset buildings
    vehicles.length = 0; // Reset vehicles
    createBuildings(); // Recreate buildings
    createVehicles(); // Recreate vehicles
});
