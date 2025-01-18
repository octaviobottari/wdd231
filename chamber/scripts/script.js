document.addEventListener("DOMContentLoaded", () => {
    const memberContainer = document.getElementById("memberContainer");
    const toggleViewButton = document.getElementById("toggleView");
  
    // Fetch member data
    async function fetchMembers() {
      try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
          throw new Error("Failed to fetch members data");
        }
        const members = await response.json();
        displayMembers(members);
      } catch (error) {
        console.error("Error loading members:", error);
        memberContainer.innerHTML = "<p>Unable to load members at this time.</p>";
      }
    }
  
    // Display members
function displayMembers(members) {
  memberContainer.innerHTML = members
    .map(
      (member) => `
        <div class="member-card">
          <img src="images/${member.image}" alt="${member.name}" class="logo">
          <h2>${member.name}</h2>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        </div>
      `
    )
    .join("");
}

  
    // Toggle view
    toggleViewButton.addEventListener("click", () => {
      memberContainer.classList.toggle("grid-view");
      memberContainer.classList.toggle("list-view");
    });
  
    // Set footer info
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
  
    fetchMembers();
  });
  