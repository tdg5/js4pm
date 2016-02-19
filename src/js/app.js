import Boot from "./app/boot";
import BootConfig from "./app/boot-config";

let bootloader = new Boot(BootConfig);
bootloader.boot();
