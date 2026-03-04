document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.querySelector("#studentsTable tbody");
  if (!tbody) return;

  try {
    const res = await fetch("http://localhost:3000/api/students");
    const students = await res.json();

    if (Array.isArray(students)) {
      if (students.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td colspan="4" style="text-align:center;">No students found</td>`;
        tbody.appendChild(tr);
      } else {
        students.forEach((s) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${s.studentid ?? s.studentID ?? ''}</td>
            <td>${s.firstname || ''}</td>
            <td>${s.lastname || ''}</td>
            <td>${s.department || ''}</td>
          `;
          tbody.appendChild(tr);
        });
      }
    } else {
      console.warn("Unexpected students response", students);
    }
  } catch (err) {
    console.error("Failed to load students", err);
  }
});