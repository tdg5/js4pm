import App from "./framework/app";
import appConfig from "./app/config";

let app = new App(appConfig);
app.boot();

export default app;
