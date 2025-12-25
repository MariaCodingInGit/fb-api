export function showLoading(show) {
  document.getElementById("loading").classList.toggle("hidden", !show);
}

export function showError(message) {
  document.getElementById("error").textContent = message;
}

export function clearError() {
  document.getElementById("error").textContent = "";
}

export function displayUserData(user) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card";

  let html = `<h2>${user.name || "User"}</h2>`;

  if (user.picture?.data?.url) {
    html += `<img src="${user.picture.data.url}" alt="Profile Photo" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 15px;">`;
  }

  if (user.email) html += `<p><strong>Email:</strong> ${user.email}</p>`;
  if (user.birthday) html += `<p><strong>Birthday:</strong> ${user.birthday}</p>`;
  if (user.gender) html += `<p><strong>Gender:</strong> ${user.gender}</p>`;
  if (user.age_range) html += `<p><strong>Age Range:</strong> ${user.age_range.min}-${user.age_range.max || '+'}</p>`;
  if (user.hometown) html += `<p><strong>Hometown:</strong> ${user.hometown.name}</p>`;
  if (user.location) html += `<p><strong>Location:</strong> ${user.location.name}</p>`;
  if (user.link) html += `<p><strong>Profile:</strong> <a href="${user.link}" target="_blank">View Profile</a></p>`;
  
  if (user.likes?.data) html += `<p><strong>Likes:</strong> ${user.likes.data.length} items</p>`;
  if (user.events?.data) html += `<p><strong>Events:</strong> ${user.events.data.length} events</p>`;
  if (user.photos?.data) html += `<p><strong>Photos:</strong> ${user.photos.data.length} photos</p>`;
  if (user.videos?.data) html += `<p><strong>Videos:</strong> ${user.videos.data.length} videos</p>`;
  if (user.friends?.data) html += `<p><strong>Friends:</strong> ${user.friends.data.length} friends</p>`;
  if (user.posts?.data) html += `<p><strong>Posts:</strong> ${user.posts.data.length} posts</p>`;

  card.innerHTML = html;
  container.appendChild(card);
}
