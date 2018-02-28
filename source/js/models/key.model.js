import bb from 'backbone' ;

export default bb.Model.extend({
  default:{
    value: '',
    type: '',
    order: ''
  }
});

// export {key}