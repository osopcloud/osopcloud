// Start component
export default function DeleteSettings() {
  // Wipe localStorage
  localStorage.clear();
  console.info("LocalStorage cleared. Using default settings.");
}
