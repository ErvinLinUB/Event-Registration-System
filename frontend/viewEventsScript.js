document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.querySelector("#eventsTable tbody");
  if (!tbody) return;

  try {
    const res = await fetch("http://localhost:3000/api/events");
    const events = await res.json();

    if (Array.isArray(events)) {
      if (events.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td colspan="4" style="text-align:center;">No events found</td>`;
        tbody.appendChild(tr);
      } else {
        events.forEach((ev) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${ev.eventid ?? ev.eventID ?? ''}</td>
            <td>${ev.name || ev.eventname || ''}</td>
            <td>${ev.date || ev.eventdate || ''}</td>
            <td>${ev.numofparticipantsregistered ?? 0}</td>
            <td>${ev.maxparticipants ?? ev.maxParticipants ?? ''}</td>
          `;
          tbody.appendChild(tr);
        });
      }
    } else {
      console.warn("Unexpected events response", events);
    }
  } catch (err) {
    console.error("Failed to load events", err);
  }
});