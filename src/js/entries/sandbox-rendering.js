import Spy from "../components/sandbox/spy";
import Logger from "../components/sandbox/logger";

window.sandboxSpy = window.sandboxSpy || new Spy();

window.sandbox = new Logger();
