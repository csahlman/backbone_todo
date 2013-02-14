Failboat.Views.CommentCollectionView = Backbone.Marionette.ItemView.extend({
  tagName: 'ul',

  className: 'recent-comments',

  id: "comments",

  itemView: Failboat.Views.Comment,

  events: {
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
