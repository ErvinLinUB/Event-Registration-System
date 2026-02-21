document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");

  if (!form) return;
  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const firstname = document.getElementById("fname").value.trim();
    const lastname = document.getElementById("lname").value.trim();
    const department = document.getElementById("department").value;

    if (!firstname || !lastname || !department) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, department })
      });

      const data = await response.json();

      const id = data.studentid || data.studentID;
      if (id) {
        document.getElementById("studentId").value = id;
      }

      document.getElementById("message").innerText = data.message || `Student added with ID: ${id}`;
    } catch (err) {
      console.error(err);
      document.getElementById("message").innerText = "Error adding student";
    }
  });
});
