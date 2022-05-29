// First party components
import DynamicMenu from "components/overlays/DynamicMenu";

// Start component
export default function ChangeApplicationFont() {
  // Change font settings
  function ApplyDefault() {
    localStorage.removeItem("settingsFontOverride");
    window.location.reload();
  }
  function ApplyHyperlegible() {
    localStorage.setItem("settingsFontOverride", "true");
    window.location.reload();
  }
  function ApplySystem() {
    localStorage.setItem("settingsFontOverride", "system");
    window.location.reload();
  }

  // Get current font settings
  const accessibleFonts =
    typeof window !== "undefined"
      ? localStorage.getItem("settingsFontOverride")
      : "";

  const buttonArray = [
    {
      name: "Osopcloud Default",
      onClick: ApplyDefault,
      // @ts-ignore
      isDisabled: accessibleFonts === false || accessibleFonts === null,
    },
    {
      name: "Atkinson Hyperlegible",
      onClick: ApplyHyperlegible,
      isDisabled: accessibleFonts === "true",
    },
    {
      name: "System Font",
      onClick: ApplySystem,
      isDisabled: accessibleFonts === "system",
    },
  ];

  return (
    <DynamicMenu
      // @ts-ignore
      options={buttonArray}
      buttonLabel="Change the Application Font"
      actionLabel="Select Application Font"
    />
  );
}
