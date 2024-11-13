// Reference to the canvas and context
const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");

const textPosition = { x: canvas.width / 2, y: canvas.height / 2 + 20 }; // Initial text position
let isDragging = false; // Track dragging state
let offsetX, offsetY; // Offset between mouse and text position
let nameText = "";

// Load the uploaded background image
const bgImage = new Image();
bgImage.src = "background.png"; // Update the path if necessary

// Draw the background image and text once the image loads
bgImage.onload = function() {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
};

// Generate certificate with user name
function generateCertificate() {
    nameText = document.getElementById("nameInput").value;
    if (!nameText) {
        alert("Please enter your name.");
        return;
    }
    drawText(nameText);
    canvas.style.display = "block";
}

// Draw text on the canvas
function drawText(text) {
    // Clear canvas and redraw background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    
    // Set text style and draw
    ctx.font = "40px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(text, textPosition.x, textPosition.y);
}

// Mouse events for dragging the text
canvas.addEventListener("mousedown", function (e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    if (mouseX >= textPosition.x - 50 && mouseX <= textPosition.x + 50 &&
        mouseY >= textPosition.y - 20 && mouseY <= textPosition.y + 20) {
        isDragging = true;
        offsetX = mouseX - textPosition.x;
        offsetY = mouseY - textPosition.y;
    }
});

canvas.addEventListener("mousemove", function (e) {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        textPosition.x = e.clientX - rect.left - offsetX;
        textPosition.y = e.clientY - rect.top - offsetY;
        drawText(nameText);
    }
});

canvas.addEventListener("mouseup", function () {
    isDragging = false;
});

canvas.addEventListener("mouseout", function () {
    isDragging = false;
});

// Download the generated certificate
function downloadCertificate() {
    const link = document.createElement("a");
    link.download = "certificate.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}
