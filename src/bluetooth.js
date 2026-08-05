const SERVICE_UUID = '7e400001-b5a3-f393-e0a9-e50e24dcca9e';
const CONTROL_UUID = '7e400002-b5a3-f393-e0a9-e50e24dcca9e';

export class GlowBluetooth {
  constructor() { this.device=null; this.characteristic=null; this.test=false; }

  async connect() {
    if (!navigator.bluetooth) throw new Error('Web Bluetooth wird von diesem Browser nicht unterstützt.');
    this.device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }],
      optionalServices: [SERVICE_UUID]
    });
    const server = await this.device.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    this.characteristic = await service.getCharacteristic(CONTROL_UUID);
    return this.device.name || 'SoundMix Glow';
  }

  async send(payload) {
    const data = new TextEncoder().encode(JSON.stringify(payload));
    if (this.test) return;
    if (!this.characteristic) throw new Error('Nicht verbunden.');
    await this.characteristic.writeValue(data);
  }

  enableTest() {
    this.test = true;
    this.device = {name:'SoundMix Glow TEST'};
  }

  disableTest() {
    this.test = false;
    this.device = null;
    this.characteristic = null;
  }
}
