Failboat.Views.CommentCollectionView = Backbone.Marionette.ItemView.extend({

  itemView: Failboat.Views.Comment,

  events: {
    // 'click .delete_button': 'destroyComment'
  },

  initialize: function() {

  },

  render: function() {
    var self = this;
    this.$el.html('');
    this.collection.each(function(comment) {
      var commentView = new Failboat.Views.Comment({model: comment});
      self.$el.prepend(commentView.render().el);
    });
    return this;
  }
  
});
