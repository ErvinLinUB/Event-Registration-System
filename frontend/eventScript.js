document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("eventForm");

  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const eventname = document.getElementById("eventname").value.trim();
    const eventdate = document.getElementById("eventdate").value;
    const maxparticipants = document.getElementById("maxparticipants").value.trim();

    if (!eventname || !eventdate || !maxparticipants) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventname: eventname,
          eventdate: eventdate,
          maxparticipants: Number(maxparticipants)
        })
      });

      const data = await response.json();
      const id = data.eventid || data.eventID;
      if (id) {
        document.getElementById("message").innerText = `Event added with ID: ${id}`;
      } else {
        document.getElementById("message").innerText = data.error || "Event created";
      }
    } catch (err) {
      console.error(err);
      document.getElementById("message").innerText = "Error adding event";
    }
  });
});
