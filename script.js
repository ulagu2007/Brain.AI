document.getElementById("pptForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    let topic = document.getElementById("topic").value;
    let result = document.getElementById("result");

    result.textContent = "Generating...";

    try {
        let response = await fetch("/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic })
        });

        if (!response.ok) {
            throw new Error("Failed to generate PPT");
        }

        // Create a temporary download link
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
        result.textContent = "Error generating PPT.";
    }
});
