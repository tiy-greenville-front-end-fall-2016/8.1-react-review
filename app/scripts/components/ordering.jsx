var React = require('react');

var menuModels = require('../models/menu');
var orderModels = require('../models/orders');


var Order = React.createClass({
  render: function(){
    var self = this;

    var order = this.props.orderCollection.map(function(orderItem){
      return(
        <li key={orderItem.cid}>
          {orderItem.get('title')} :: {orderItem.get('price')}
          <button className="btn btn-danger" onClick={function(){self.props.removeItem(orderItem)}}>Remove</button>
        </li>
      );
    });

    return (
      <div className="col-md-6">
        <h1>Your Order</h1>
        <ul>
          {order}
        </ul>
        <strong>Total:</strong> {this.props.orderCollection.total()}
        <div className="row">
          <button onClick={this.props.placeOrder} className="btn btn-warning">Place Order</button>
        </div>
      </div>
    )
  }
});


var Menu = React.createClass({
  render: function(){
    var self = this;
    var menu = this.props.menuItems.map(function(menuItem){
      return(
        <li key={menuItem.get('title')}>
          {menuItem.get('title')} :: {menuItem.get('price')}
          <button className="btn btn-success" onClick={function(){self.props.addToOrder(menuItem)}}>Add to Order</button>
        </li>
      );
    });

    return (
      <div className="col-md-6">
        <h1>Menu Items</h1>
        <ul>
          {menu}
        </ul>
      </div>
    );
  }
});

var OrderingContainer = React.createClass({
  getInitialState: function(){
    var menuItems  = new menuModels.MenuCollection();
    var orderCollection = new orderModels.OrderItemCollection();

    var orderData = JSON.parse(localStorage.getItem('order'));
    orderCollection.add(orderData);
    // orderCollection.fetch();

    menuItems.add([
      {title: 'Pad Thai', price: '6.75'},
      {title: 'Spring Roll', price: '1.50'},
      {title: 'Tako', price: '10.75'},
    ]);

    return {
      menuItems: menuItems,
      orderCollection: orderCollection
    }
  },
  addToOrder: function(menuItem){
    var orderCollection = this.state.orderCollection;
    var orderItemData = menuItem.toJSON();

    delete orderItemData.cid;
    // orderCollection.create(orderItemData);
    orderCollection.add([orderItemData]);
    this.updateOrder();

    this.setState({orderCollection: orderCollection});
  },
  removeItem: function(itemToRemove){
    var orderCollection = this.state.orderCollection;
    // itemToRemove.destroy();
    orderCollection.remove(itemToRemove);
    this.updateOrder();
    this.setState({'orderCollection': orderCollection});
  },
  updateOrder: function(){
    var orderCollection = this.state.orderCollection;
    var orderData = JSON.stringify(orderCollection.toJSON());
    localStorage.setItem('order', orderData);
  },
  placeOrder: function(){
    var newOrder = new orderModels.Order();
    var orderCollection = this.state.orderCollection;

    newOrder.set({items: orderCollection.toJSON()});
    // newOrder.save();

    // orderCollection.reset([]);
    this.setState({orderCollection: new orderModels.OrderItemCollection});
  },
  render: function(){
    return (
      <div className="row">
        <Menu addToOrder={this.addToOrder} menuItems={this.state.menuItems}/>
        <Order placeOrder={this.placeOrder} removeItem={this.removeItem} orderCollection={this.state.orderCollection}/>
      </div>
    )
  }
});

module.exports = {
  OrderingContainer: OrderingContainer
};
