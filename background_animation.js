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

// Draw the city
function drawCity() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

        // Futuristic window effects
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
