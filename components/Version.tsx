// Import the app's package.json
import appPackage from "../package.json";

// The application version string, pulled from package.json
const version = appPackage.version;

// Make this the default export
export { version };
export default version;
