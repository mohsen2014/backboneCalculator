import mn from 'backbone.marionette';
import resultView from '../views/result.view';
import resultModel from '../models/result.model';
import { calculator, addCommand, subCommand, divCommand, mulCommand } from './calculator';

export default mn.Object.extend({
  channelName: 'channel1',
  radioEvents: {
    'click:key:num': 'clickFunc'
  },
  radioRequests: {
    "get:expression": "onGetExpression"
  },
  onGetExpression(){
    return this.expressionModel;
  }
  ,
  clickFunc(model) {
    
    //   let command;
    //   switch (model.get('value')) {
    //     case '+':
    //       command = new addCommand(this.input.model.get("value"));
    //       break;
    //     case '-':
    //       command = new subCommand(this.input.model.get("value"));
    //       break;
    //     case '*':
    //       command = new mulCommand(this.input.model.get("value"));
    //       break;
    //     case '/':
    //       command = new divCommand(this.input.model.get("value"));
    //       break;
    //     default:
    //       break;
    //   }
    //   console.log(command);
    //   this.input.model.set("value", '');
    //   this.calc.execute(command);
    //   this.input.model.set('temp', this.calc.getCurrentValue());
    //   console.log(this.input.model.get('temp'));
    // }
  },
  initialize: function () {
    // this.calc = new calculator();
    this.expressionModel = new resultModel({
      "value": '',
      'temp': 0
    });
    this.input = new resultView({
      model: this.expressionModel
    });
  }
});

// export {inputController}
// this.keysCollection = new KeyCollection([{value: "1"},{value: "2"},{value: "3"},{value: "4"},{value: "5"},{value: "6"},{value: "7"},{value: "8"}]);    