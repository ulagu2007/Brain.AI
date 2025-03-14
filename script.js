document.getElementById("pptForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    let topic = document.getElementById("topic").value;
    let result = document.getElementById("result");
    let loader = document.getElementById("loader");

    result.textContent = "";
    loader.style.display = "block"; // Show loader

    try {
        let response = await fetch("/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic })
        });

        if (!response.ok) {
            throw new Error("Failed to generate PPT");
        }

        // Hide loader and show download link
        loader.style.display = "none";
        let blob = await response.blob();
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = `${topic.replace(' ', '_')}.pptx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        result.textContent = "Download complete!";
    } catch (error) {
        loader.style.display = "none";
        result.textContent = "Error generating PPT.";
    }
});
