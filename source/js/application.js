import 'backbone.marionette' ;
import {rootContainer} from './views/rootContainer.view';
$(
  function(){
    var App = Marionette.Application.extend({
      region: '#root',

      onStart: function() {
        let root = new rootContainer()
        this.showView(root);
      },
      initialize: function(option){
      }
    });


    var app = new App();
    app.start();
  }
)