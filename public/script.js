document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      console.log("delete is clicked");
      const noteId = event.target.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this note?")) {
        fetch(`/notes/delete/${noteId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              location.reload(); // Reload the page on successful deletion
            } else {
              alert("Failed to delete the note: " + data.message);
            }
          })
          .catch((error) => console.error("Error:", error));
      }
    });
  });
});

document.getElementById("editButton").addEventListener("click", function () {
  document.querySelector(".container").style.display = "none";
  document.querySelector(".edit-container").style.display = "block";
  fetch(`/notes/edit/${noteId}`, {
    method: "UPDATE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload(); // Reload the page on successful deletion
      } else {
        alert("Failed to Update the note: " + data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
});
