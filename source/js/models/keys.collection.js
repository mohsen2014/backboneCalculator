import bb from 'backbone' ;
import key from './key.model' ;

export default bb.Collection.extend({
  model: key,
  comparator :function(model) {
    return model.get('order');
  }
});
