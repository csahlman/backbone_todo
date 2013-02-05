// $(document).ready(function() {

  Failboat.Routers.Tasks = Backbone.Router.extend({
    routes: {
      "": "index",
      "tasks/:id": "show"
    },

    initialize: function() {
      this.collection = new Failboat.Collections.Tasks();
      this.collection.fetch();
      view = new Failboat.Views.TasksIndex({collection: this.collection});
      $('#container').html(view.render().el);
    },

    index: function() {

    },

    show: function(id) {
      if(show_model = this.collection.get(id)) {
        view = new Failboat.Views.TaskShow({model: show_model});
        $('#sidebar').detach();
        $('#container').append(view.render().el);
      } else {
        this.collection.on('reset', function(collection, response) {
          show_model = collection.get(id);
          view = new Failboat.Views.TaskShow({model: show_model});
          $('#sidebar').detach();
          $('#container').append(view.render().el);
        });
      }
    }

  });
// });