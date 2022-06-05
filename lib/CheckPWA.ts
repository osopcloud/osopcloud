export default function CheckPWA() {
  const pwa =
    typeof window !== "undefined"
      ? window.matchMedia("(display-mode: standalone)").matches
      : "";
  if (pwa) {
    return true;
  }
}
