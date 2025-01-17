const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Building properties
const buildings = [];
const numBuildings = 20; // Number of buildings
const maxBuildingHeight = canvas.height * 0.6;
const minBuildingWidth = 40;
const maxBuildingWidth = 100;

// Create buildings
function createBuildings() {
    for (let i = 0; i < numBuildings; i++) {
        const width = Math.random() * (maxBuildingWidth - minBuildingWidth) + minBuildingWidth;
        buildings.push({
            x: (i / numBuildings) * canvas.width,
            y: canvas.height,
            width,
            currentHeight: 0, // Start with height 0
            targetHeight: Math.random() * maxBuildingHeight + 50,
            growthRate: Math.random() * 2 + 1,
            color: `rgba(100, 100, 100, ${Math.random() * 0.7 + 0.3})`, // Random gray tones
        });
    }
}

// Draw the city
function drawCity() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    buildings.forEach((building) => {
        // Draw the building
        ctx.fillStyle = building.color;
        ctx.fillRect(building.x, building.y - building.currentHeight, building.width, building.currentHeight);

        // Simulate growth
        if (building.currentHeight < building.targetHeight) {
            building.currentHeight += building.growthRate;
        }

        // Add scaffolding lines (development phase effect)
        ctx.strokeStyle = "rgba(200, 200, 200, 0.5)";
        for (let i = 10; i < building.currentHeight; i += 20) {
            ctx.beginPath();
            ctx.moveTo(building.x, building.y - i);
            ctx.lineTo(building.x + building.width, building.y - i);
            ctx.stroke();
        }
    });

    // Continue animation
    requestAnimationFrame(drawCity);
}

// Initialize and start animation
createBuildings();
drawCity();

// Adjust canvas size on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildings.length = 0; // Reset buildings
    createBuildings(); // Recreate buildings
});
