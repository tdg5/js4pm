import Bootloader from "./bootloader";

class App {
  constructor(config = {}) {
    this.config = config;
  }

  boot() {
    let bootloader = new Bootloader(this.config);
    bootloader.boot();
  }
}

export default App;
