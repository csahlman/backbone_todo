Failboat.Routers.Tasks = Backbone.Router.extend({
  routes: {
    "": "index",
    "tasks/:id": "show"
  },

  initialize: function() {
    this.collection = new Failboat.Collections.Tasks();
    this.collection.fetch();
  },

  index: function() {
    view = new Failboat.Views.TasksIndex({collection: this.collection});
    $('#container').html(view.render().el);
  },

  show: function(id) {
    $('#container').html('<h1>Show ' + id + '</h1>');
  }

});
