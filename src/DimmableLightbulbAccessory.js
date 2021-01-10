const LightbulbAccessory = require('./LightbulbAccessory.js');

class DimmableLightbulbAccessory extends LightbulbAccessory {

  constructor(log, url, accessToken, device, homebridge) {
    const Characteristic = homebridge.hap.Characteristic;
    super(log, url, accessToken, device, homebridge);

    this.actorService.getCharacteristic(Characteristic.Brightness)
                     .on('set', this.setBrightness.bind(this))
                     .on('get', this.getBrightness.bind(this));
    this.brightnessFunctionName = device.function_name	//"brightness"
  }

  setBrightness(value, callback) {
    this.brightness = value;
    this.callParticleFunction(this.brightnessFunctionName+"DIM", value, (error, response, body) => this.callbackHelper(error, response, body, callback), true);
  }

  getBrightness(callback) {
    this.callParticleFunction(this.brightnessFunctionName+"DIM", '?', (error, response, body) => {
      this.brightness = parseInt(body);
      try {
        callback(null, this.brightness);
      } catch (error) {
        this.log('Caught error '+ error + ' when calling homebridge callback.');
      }
    },
    true);
  }

}

module.exports = DimmableLightbulbAccessory;
