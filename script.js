import { getUserData } from "./api.js";
import { 
  showLoading, 
  showError, 
  clearError, 
  displayUserData
} from "./dom.js";

const input = document.getElementById("pageIdInput");
const button = document.getElementById("fetchBtn");

button.addEventListener("click", async () => {
  clearError();
  const userId = input.value.trim();

  if (!userId) {
    showError("User ID cannot be empty");
    return;
  }

  button.disabled = true;
  showLoading(true);

  try {
    const data = await getUserData(userId);

    if (!data || Object.keys(data).length === 0) {
      showError("No user data found");
    } else {
      displayUserData(data);
    }
  } catch (error) {
    showError(error.message);
  } finally {
    showLoading(false);
    button.disabled = false;
  }
});
