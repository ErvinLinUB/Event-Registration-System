document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentId = document.getElementById("studentId").value.trim();
    const eventId = document.getElementById("eventId").value.trim();

    if (!studentId || !eventId) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: Number(studentId),
          eventId: Number(eventId)
        })
      });

      const data = await response.json();

      document.getElementById("message").innerText = data.message || data.error || "Registration completed";
    } catch (err) {
      console.error(err);
      document.getElementById("message").innerText = "Error registering student";
    }
  });
});
