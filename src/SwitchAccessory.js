const ActorAccessory = require('./ActorAccessory.js');

class SwitchAccessory extends ActorAccessory {

  constructor(log, url, accessToken, device, homebridge) {
    const Service = homebridge.hap.Service;
    const Characteristic = homebridge.hap.Characteristic;
    super(log, url, accessToken, device, homebridge, Service.Switch, Characteristic.On);
    this.switchFunctionName = device.function_name;
  }

  setState(value, callback) {
    super.setState(this.switchFunctionName+"PWR", value ? '1' : '0', callback);
  }

  getState(callback) {
  	super.getState(this.switchFunctionName+"PWR", callback);
  }

}

module.exports = SwitchAccessory;
