# SoundMix Glow – DIY Controller

Self-hosted web app prototype for an ESP32 LED controller.

## Features
- Bluetooth LE connection via Web Bluetooth
- Test mode with a simulated device named `SoundMix Glow TEST`
- LED strip preview with individually addressable pixels
- Color, brightness, speed and effect controls
- Music-reactive simulation in test mode
- Presets
- No backend required

## Run
Because Web Bluetooth generally requires a secure context, use HTTPS when hosted remotely.
For local testing:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`. If your browser does not expose Web Bluetooth on localhost,
deploy the folder to GitHub Pages or another HTTPS host.

## ESP32 protocol
The app uses a simple BLE GATT protocol. Change the UUIDs in `src/bluetooth.js` to match your firmware.

Service:
`7e400001-b5a3-f393-e0a9-e50e24dcca9e`

Control characteristic:
`7e400002-b5a3-f393-e0a9-e50e24dcca9e`

The app sends JSON UTF-8 commands such as:
`{"cmd":"effect","name":"rainbow","speed":50,"brightness":180}`
