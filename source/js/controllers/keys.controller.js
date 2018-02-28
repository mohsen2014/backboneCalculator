import mn from 'backbone.marionette';
import radio from 'backbone.radio';
import keyCollection from '../models/keys.collection';
import { keyCollectionView, KeyPadView } from '../views/keys.view';
import { calculator, addCommand, subCommand, divCommand, mulCommand } from './calculator';
import keysList from '../../keysList.js';

export default mn.Object.extend({
  channelName: 'channel1',
  radioEvents: {
    'click:key:num': 'clickFunc'
  },
  clickFunc: function (model) {
    let expressionModel = radio.channel('channel1').request('get:expression');
    if (model.get('type') === 'num') {
      expressionModel.set("value", expressionModel.get('value').toString() + model.get('value').toString());
    }
    else if (model.get('type') === 'operator') {
      expressionModel.set("value", expressionModel.get('value').toString() + ' ' + model.get('value').toString() + ' ');
    }
    else if (model.get('type') === 'equal') {
      let postfix = this.convertToPostfix(expressionModel.get('value'));
      let result = this.evaluationPostfix(postfix);
      expressionModel.set("temp" ,result);
    }
    
  },
  convertToPostfix(exp) {
    let postfix = [];
    let terms = exp.split(' ');
    let numList = _.filter(terms, (o) => {
      if (!_.isNaN(parseInt(o)))
        return true;
      else
        return false;
    }),
      revNumList = numList.reverse();
    let operatorList = _.filter(terms, function (o) { if (o === "+" || o === "-" || o === "*" || o === "/") return true; }),
      revOperatorList = operatorList.reverse();
    while (revNumList.length > 0) {
      if (postfix.length == 0) {
        postfix.push(parseInt(revNumList.pop()));
        postfix.push(parseInt(revNumList.pop()));
        postfix.push(revOperatorList.pop());
      }
      else {
        postfix.push(parseInt(revNumList.pop()));
        postfix.push(revOperatorList.pop());
      }
    };
    console.log(postfix);
    return postfix;
  },
  evaluationPostfix(postfix) {
    let stack = [];
    _.each(postfix, (term) => {
      if (!_.isNaN(parseInt(term))) {
        stack.push(term);
      }
      else {
        let op1, command;
        op1 = stack.pop();
        if (this.calc.getIsClear()) {
          let op2 = stack.pop();
          command = new addCommand(op2);
          this.calc.setClear();
          this.calc.execute(command)
          stack.push(this.calc.getCurrentValue());
        }
        switch (term) {
          case '+':
            command = new addCommand(op1);
            break;
          case '-':
            command = new subCommand(op1);
            break;
          case '*':
            command = new mulCommand(op1);
            break;
          case '/':
            command = new divCommand(op1);
            break;
        }
        this.calc.execute(command);
        stack.push(this.calc.getCurrentValue());
      }
    });
    this.calc = new calculator();
    return stack.pop();
  },
  initialize: function () {
    this.keys = new keyCollection(keysList);
    this.keys.sort();
    this.keyView = new KeyPadView({ model: this.keys });
    this.calc = new calculator();
  }
});