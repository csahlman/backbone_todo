Failboat.Views.CommentCollectionView = Backbone.Marionette.CollectionView.extend({

  tagName: 'ul',

  className: 'recent-comments',

  id: 'comments',

  itemView: Failboat.Views.Comment,

  events: {
    // 'click .delete_button': 'destroyComment'
  },

  appendHtml: function(collectionView, itemView, index){
    collectionView.$el.prepend(itemView.el);
  },

  initialize: function() {

  }
  
});
