import AnalisarQualidadeAmbiental from "./src/engine/analysis.js";

const reading = {
    id: 1828,
    created_at: "2026-06-13 21:31:42.007815+00",
    deviceId: "10",
    apiKey: "ESP32-CLI1-DEV1-A9K2X7M4P1",
    temperature: "28",
    humidity: "66",
    battery: 100,
    signalStrength: -43,
    co2: "505",
    co: null,
    pm1_0: "4.457979",
    pm25: "4.793948",
    pm4_0: "4.892601",
    pm10: "4.942044",
    nc0_5: "29.31986",
    nc1_0: "34.69774",
    nc2_5: "35.0145",
    nc4_0: "35.04469",
    nc10_0: "35.05463",
    vocIndex: null,
    noxIndex: null,
    typicalSize: "0.609235",
    luminosity: null,
    noise: null
};

const response = AnalisarQualidadeAmbiental({
    reading,
    environment: "residential"
});

console.log(JSON.stringify(response, null, 2));
