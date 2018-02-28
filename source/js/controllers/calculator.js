import mn from 'backbone.marionette';
import radio from 'backbone.radio';
import bb from 'backbone';

let BaseModel = bb.Model.extend({
});

var baseModel = new BaseModel({
	result: 0
}); ;

let reciverObj = mn.Object.extend({
	initialize() {
		this.result = baseModel.get('result');
	},
	add: (x) => { return parseInt(x) + parseInt(baseModel.get('result'));},
	sub: (x) => { return parseInt(baseModel.get('result')) - parseInt(x); },
	mul: (x) => { return parseInt(x) * parseInt(baseModel.get('result')); },
	div: (x) => { return parseInt(baseModel.get('result')) / parseInt(x); },
});

let commandObj = mn.Object.extend({
	initialize(option) {
		this.execute = option.execute;
		this.undo = option.undo;
		this.value = option.value;
	}
});


let addCommand = commandObj.extend({
	initialize(value) {
		let reciver = new reciverObj();
		this.execut = reciver.add;
		this.undo = reciver.sub;
		this.value = value
	}
});

let subCommand = commandObj.extend({
	initialize(value) {
		let reciver = new reciverObj();
		this.execut = reciver.sub;
		this.undo = reciver.add;
		this.value = value
	}
});

let mulCommand = commandObj.extend({
	initialize(value) {
		let reciver = new reciverObj();
		this.execut = reciver.mul;
		this.undo = reciver.div;
		this.value = value
		// return new commandObj({ execute: reciver.mul, undo: reciver.div, value: value });
	},
	// model: baseModel
});

let divCommand = commandObj.extend({
	initialize(value) {
		let reciver = new reciverObj();
		this.execut = reciver.div;
		this.undo = reciver.mul;
		this.value = value
		// return new commandObj({ execut: reciver.div, undo: reciver.mul, value: value });
	},
	// model: baseModel
});


let calculator = mn.Object.extend({
	initialize() {
		this.commandList = [];
		this.isClear = true;
		baseModel = new BaseModel({
			result: 0
		});
	},
	execute(command) {
		baseModel.set('result' ,command.execut(command.value));
		this.commandList.push(command);
		console.log(this.commandList)
	},
	getCurrentValue() {console.log("baseModel " + JSON.stringify(baseModel))
		return baseModel.get('result');
	},
	getIsClear(){
		return this.isClear
	},
	setClear(){
		this.isClear = false;
	}
})


export {
	calculator,
	addCommand,
	mulCommand,
	subCommand,
	divCommand
};
