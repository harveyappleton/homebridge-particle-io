const ActorAccessory = require('./ActorAccessory.js');

class LightbulbAccessory extends ActorAccessory {

  constructor(log, url, accessToken, device, homebridge) {
    const Service = homebridge.hap.Service;
    const Characteristic = homebridge.hap.Characteristic;
    super(log, url, accessToken, device, homebridge, Service.Lightbulb, Characteristic.On);
    this.lightbulbFunctionName = device.function_name;
  }

  setState(value, callback) {
    super.setState(this.lightbulbFunctionName+"PWR", value ? '1' : '0', callback);
  }
  
  getState(callback) {
  	super.getState(this.lightbulbFunctionName+"PWR", callback);
  }

}

module.exports = LightbulbAccessory;
