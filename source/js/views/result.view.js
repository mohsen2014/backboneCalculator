import mn from 'backbone.marionette' ;

export default mn.View.extend({
  template: "#result-container-template",
  modelEvents: {
    "change": "modelChanged"
  },
  modelChanged: function () {
    // console.log("change");
    this.render();
  }
});