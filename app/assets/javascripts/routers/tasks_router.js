Failboat.Routers.Tasks = Backbone.Router.extend({

  routes: {
    "": "index",
    "tasks/:id": "show",
    "sign_in": "signIn",
    'log_in': 'logIn'
  },

  initialize: function() {
    console.log('app initiated');
  },

  signIn: function() {
    var view = new Failboat.Views.Signup({});
    $('#container').html(view.render().el);
  },

  logIn: function() {
    var view = new Failboat.Views.Login({});
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
      this.collection.fetch({add: true}); 
    }    
    if($('#main').length === 0) {
      var view = new Failboat.Views.TasksIndex({model: Failboat.currentUser, collection: this.collection});
      $('#container').html(view.render().el);
    }
    if(this.collection.get(id)) {
      var show_model = this.collection.get(id);
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
    // var show_model = new Failboat.Models.Task({id: id});
    // show_model.fetch();
    // var view = new Failboat.Views.TaskShow({model: show_model});
    // $('#container').append(view.render().el);
  //   this.collection.add(show_model);
  }

});
