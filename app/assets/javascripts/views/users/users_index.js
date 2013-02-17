Failboat.Views.UsersIndex = Backbone.Marionette.CompositeView.extend({
  tagName: 'span',

  itemViewContainer: "#user-list",

  template: JST['users/user_list'],

  itemView: Failboat.Views.User,

  events: {
    // 'click .delete_button': 'destroyComment'
  },

  // appendHtml: function(collectionView, itemView, index){
  //   collectionView.$el.append(itemView.el);
  // },

  initialize: function() {

  }
  
});
