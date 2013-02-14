Failboat.Views.Comment = Support.CompositeView.extend({
  tagName: 'li',

  template: JST['comments/show'],

  events: {
    'click .delete_button': 'destroyComment'
  },

  initialize: function() {
    // this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },

  render: function() {
    this.$el.html(this.template({
      poster_name: this.model.escape('poster_name'),
      content: this.model.escape('content'),
      created_at: this.model.get('created_at')
    }));
    return this;
  },
  
  destroyComment: function(event) {
    event.preventDefault();
    var confirmation = confirm("Are you sure?");
    if(confirmation) this.model.destroy();
  }

});
