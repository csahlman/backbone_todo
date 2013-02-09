Failboat.Routers.Tasks = Backbone.Router.extend({

  routes: {
    "": "index",
    "boards/:id": "showBoard",
    "boards/:showId/tasks/:id": "showTask",
    "sign_in": "signIn",
    'log_in': 'logIn',
    "sign_out": "signOut"
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
    this.collection = new Failboat.Collections.Boards();
    this.collection.fetch();
    var boardView = new Failboat.Views.BoardsIndex({
      model: Failboat.currentUser, 
      collection: this.collection
    });
    $('#container').html(boardView.render().el);
  },

  showBoard: function(id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    var self = this;
    this.collection = new Failboat.Collections.Tasks();
    this.collection.fetch();
    this.boardView = new Failboat.Views.TasksIndex({collection: this.collection});
    $('#container').html(this.boardView.render().el);
    if(this.requestedId) this.showTask(id, this.requestedId);
    // var view = new Failboat.Views.TasksIndex({model: Failboat.currentUser, collection: this.collection});
    // $('#container').html(view.render().el);
  },

  showTask: function(boardId, id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    if(this.collection) {
      console.log(this.collection.get(id));
      this.task = this.collection.get(id);
      if(this.taskView) this.taskView.remove();
      this.taskView = new Failboat.Views.TaskShow({model: this.task});
      $('#container').append(this.taskView.render().el);
    } else {
      this.requestedId = id;
      this.showBoard(boardId);
    }


    // if(!this.collection) {
    //   this.collection = new Failboat.Collections.Tasks();
    //   this.collection.fetch(); 
    // }    
    // if($('#main').length === 0) {
    //   var view = new Failboat.Views.TasksIndex({model: Failboat.currentUser, collection: this.collection});
    //   $('#container').html(view.render().el);
    // }
    // if(this.collection.get(id)) {
    //   var show_model = this.collection.get(id);
    //   var view = new Failboat.Views.TaskShow({model: show_model});
    //   $('#sidebar').detach();
    //   $('#container').append(view.render().el);
    // } 
    // else {
    //   this.collection.on('reset', function(collection, response) {
    //     var show_model = collection.get(id);
    //     var view = new Failboat.Views.TaskShow({model: show_model});
    //     $('#sidebar').detach();
    //     $('#container').append(view.render().el);
    //   });
    // }

  }

});
