var Backbone = require('backbone');

var MenuItem = Backbone.Model.extend({
    idAttribute: '_id'
});

var MenuCollection = Backbone.Collection.extend({
  model: MenuItem,
  //url: 'https://...'
});

module.exports = {
  MenuItem: MenuItem,
  MenuCollection: MenuCollection
};
