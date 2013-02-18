Failboat.Views.UsersIndex = Backbone.Marionette.CompositeView.extend({
  tagName: 'div',

  className: "widget-box",

  id: "user-box",

  itemViewContainer: "#user-list",

  template: JST['users/user_list'],

  itemView: Failboat.Views.User,

  events: {
    "submit #add_users_form": "addUserToBoard"
  },

  // appendHtml: function(collectionView, itemView, index){
  //   collectionView.$('#user-list').append(itemView.el);
  // },

  initialize: function() {

  },

  addUserToBoard: function(event) {
    event.preventDefault();
    var email = $('#user_email').val().toLowerCase();
    var user = Failboat.users.where({email: email})[0];
    if(user && !this.collection.get(user.id)) {
      this.model.users.add(user);
      this.model.save();
    } else if (user) {
      console.log('user is already assigned to this board');
    } else {
      console.log('creating new user');
    }

  }
  
});
