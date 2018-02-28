import mn from 'backbone.marionette' ;
import radio from 'backbone.radio' ;

// import KeysCollection from 'models/keys.collection.js' ;

var KeyPadView = mn.View.extend({
  template: "#keypad-template",
  regions: {
    keys: "#keys",
    operator: "#operator"
  },
  onRender: function (param) {
    let numberKey = _.filter(this.model.models ,function(o) {
      if(o.attributes.type === "num"){
        return true
      };
    });
    var tempModel = _.clone(this.model);

    let opratorKey = _.filter(this.model.models ,function(o) {
      if(o.attributes.type === "operator" || o.attributes.type === "equal"){
        return true
      };
    });

    tempModel.models = numberKey;
    this.showChildView('keys' ,new keyCollectionView({
      collection: tempModel
    }));

    tempModel.models = opratorKey;
    this.showChildView('operator' ,new keyCollectionView({
      collection: tempModel
    }));
    // let region = 'keys';
    // if(param.model.attributes.type === "operator"){
    //   region = 'operator'
    // }
    // this.showChildView(region ,new key({model: param.model}))
  }
});
// console.log("asdsad");
let key = mn.View.extend({
  template:'#key-template',
  className: 'col-md-4',
  events: {
    'click': 'clickKey'
  },
  clickKey: function (params) {
    radio.trigger("channel1" ,"click:key:num",this.model);
  }
})


let keyCollectionView = mn.CollectionView.extend({
  childView: key,
  className: 'row'
});

export {
  KeyPadView,
  keyCollectionView
}