// Types
import type { ReactNode } from "react";

// Design
import { useBoolean } from "@chakra-ui/react";

// First party components
import UpdatesAvailable from "components/alerts/UpdatesAvailable";

// Settings
import { deleteFromStorage, useLocalStorage } from "@rehooks/local-storage";

import { useEffect } from "react";

// Begin component
export default function UpdateServices({ children }: { children: ReactNode }) {
  const [isUpdateAvailable, setUpdateAvailable] = useBoolean();

  const [updatePreference] = useLocalStorage("forceUpdate");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      // @ts-expect-error
      window.workbox !== undefined
    ) {
      // @ts-expect-error
      const wb = window.workbox;

      // Add event listeners to handle any of PWA lifecycle event
      // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
      wb.addEventListener("installed", (event: { type: any }) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });
      wb.addEventListener("controlling", (event: { type: any }) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });
      wb.addEventListener("activated", (event: { type: any }) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      // Prompt user to update if there is an update available
      const promptNewVersionAvailable = (event: any) => {
        setUpdateAvailable.on();
        if (updatePreference) {
          setUpdateAvailable.off;

          deleteFromStorage("forceUpdate");

          wb.addEventListener("controlling", (event: any) => {
            window.location.reload();
          });

          wb.messageSkipWaiting();
        }
      };
      wb.addEventListener("waiting", promptNewVersionAvailable);

      // Register the service worker
      wb.register();
    }
  }),
    [updatePreference];
  return (
    <>
      {isUpdateAvailable && <UpdatesAvailable />}
      {children}
    </>
  );
}
