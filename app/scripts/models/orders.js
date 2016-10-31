var Backbone = require('backbone');

var OrderItem = Backbone.Model.extend({
    idAttribute: '_id'
});

var OrderItemCollection = Backbone.Collection.extend({
  model: OrderItem,
  //url: 'https://...'
  total: function(){
    return this.reduce(function(sum, model){
      return sum + parseFloat(model.get('price'));
    }, 0);
  }
});

var Order = Backbone.Model.extend({
    idAttribute: '_id',
    //urlRoot: 'https://...'
});

var OrderCollection = Backbone.Collection.extend({
  model: Order,
  //url: 'https://...'
});

module.exports = {
  OrderItem: OrderItem,
  OrderItemCollection: OrderItemCollection,
  Order: Order,
  OrderCollection: OrderCollection
};
