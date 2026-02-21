document.addEventListener("DOMContentLoaded", () => {
  const btnStudents = document.getElementById("btnStudents");
  if (btnStudents) btnStudents.addEventListener("click", () => { window.location.href = "addStudent.html"; });

  const btnEvents = document.getElementById("btnEvents");
  if (btnEvents) btnEvents.addEventListener("click", () => { window.location.href = "addEvent.html"; });

  const btnRegistration = document.getElementById("btnRegistration");
  if (btnRegistration) btnRegistration.addEventListener("click", () => { window.location.href = "registration.html"; });
});
