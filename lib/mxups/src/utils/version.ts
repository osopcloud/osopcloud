/**
 * Returns the MXUPS package version and logs it to the browser console.
 */
export const version = (): string => {
  // In the future, a mechanism will be added to collect the version from package.json
  const versionInPackageManifest = "1.0.0-alpha.3";

  // Log the version
  console.debug(
    `Hikium MXUPS version ${versionInPackageManifest} https://github.com/hikium/mxups`
  );

  // Return the version
  return versionInPackageManifest;
};
