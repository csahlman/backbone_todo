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
    if($('#main').length === 0) {
      indexView = new Failboat.Views.TasksIndex({collection: this.collection});
      $('#container').append(indexView.render().el);
    }
    show_model = new Failboat.Models.Task({id: id});
    show_model.fetch().complete(function(){
      view = new Failboat.Views.TaskShow({model: show_model});
      $('#sidebar').detach();
      $('#container').append(view.render().el);
    });
  }

});
