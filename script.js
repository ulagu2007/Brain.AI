const API_BASE_URL = "https://brainai-backend.onrender.com"; // Replace with your Render backend URL

document.getElementById("pptForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const topic = document.getElementById("topic").value;

    const response = await fetch(`${API_BASE_URL}/generate`, { // Fix API route
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic: topic })
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${topic}.pptx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert("Error generating PPT");
    }
});

// Function to toggle dropdown
function toggleDropdown() {
    var menu = document.getElementById("dropdownMenu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// Function to toggle history panel
function toggleHistory() {
    var panel = document.getElementById("historyPanel");
    panel.style.right = (panel.style.right === "0px") ? "-250px" : "0px";
}
