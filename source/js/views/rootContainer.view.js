import mn from 'backbone.marionette'
import inputController from '../controllers/input.controller'
import keyController from '../controllers/keys.controller'

var rootContainer =  mn.View.extend({
  template: "#rootContainer-template",
  regions:{
    result: '#result-container',
    keys: "#keys-container"
  },
  onRender: function () {
    let resultController = new inputController();
    let input = resultController.input;
    this.showChildView('result', input);
    let keyConrtoller = new keyController();
    let keyView = keyConrtoller.keyView
    this.showChildView('keys', keyView);
  }
}); 

export { rootContainer};