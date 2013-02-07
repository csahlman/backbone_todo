Failboat.Routers.Tasks = Backbone.Router.extend({

  routes: {
    "": "index",
    "tasks/:id": "show",
    "sign_in": "signIn",
    'log_in': 'logIn'
  },

  initialize: function() {

  },

  signIn: function() {
    view = new Failboat.Views.Signup({});
    $('#container').html(view.render().el);
  },

  logIn: function() {
    view = new Failboat.Views.Login({});
    $('#container').html(view.render().el);
  },

  index: function() {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    this.collection = new Failboat.Collections.Tasks();
    this.collection.fetch();
    var view = new Failboat.Views.TasksIndex({model: Failboat.currentUser, collection: this.collection});
    $('#container').html(view.render().el);
  },

  show: function(id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    if(!this.collection) {
      this.collection = new Failboat.Collections.Tasks();
      this.collection.fetch(); 
    }    
    if($('#main').length === 0) {
      view = new Failboat.Views.TasksIndex({model: Failboat.currentUser, collection: this.collection});
      $('#container').html(view.render().el);
    }
    if(show_model = this.collection.get(id)) {
      var view = new Failboat.Views.TaskShow({model: show_model});
      $('#sidebar').detach();
      $('#container').append(view.render().el);
    } 
    else {
      this.collection.on('reset', function(collection, response) {
        var show_model = collection.get(id);
        var view = new Failboat.Views.TaskShow({model: show_model});
        $('#sidebar').detach();
        $('#container').append(view.render().el);
      });
    }
  }

});
