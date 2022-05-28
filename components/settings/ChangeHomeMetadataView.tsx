// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// First party components
import DynamicMenu from "components/overlays/DynamicMenu";

// Start component
export default function ChangeHomeMetadataView() {
  // Get settings
  const [metadataView] = useLocalStorage("settingsHomeMetadataView");

  const buttonArray = [
    {
      name: "Show Package Management",
      onClick: (_: any) => {
        writeStorage("settingsHomeMetadataView", false);
      },
      // @ts-ignore
      isDisabled: metadataView === false || metadataView === null,
    },
    {
      name: "Show Startup Framework",
      onClick: (_: any) => {
        writeStorage("settingsHomeMetadataView", "startupManagement");
      },
      isDisabled: metadataView === "startupManagement",
    },
    {
      name: "Show All Tags",
      onClick: (_: any) => {
        writeStorage("settingsHomeMetadataView", "allTags");
      },
      isDisabled: metadataView === "allTags",
    },
  ];

  return (
    <DynamicMenu
      // @ts-ignore
      options={buttonArray}
      buttonLabel="Change Home Metadata View"
      actionLabel="Select Metadata View"
    />
  );
}
