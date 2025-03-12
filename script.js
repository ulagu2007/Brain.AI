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

        let data = await response.json();
        result.textContent = data.message;
    } catch (error) {
        result.textContent = "Error generating PPT.";
    }
});
