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
    var infoView = new Failboat.Views.Info();
    $('#container').html(view.render().el);
    $('#sidebar').html(infoView.render().el);
  },

  logIn: function() {
    var loginView = new Failboat.Views.Login({});
    var infoView = new Failboat.Views.Info();
    $('#container').html(loginView.render().el);
    $('#sidebar').html(infoView.render().el);
  },

  signOut: function() {
    Failboat.session.destroy();
  },

  index: function() {
    this.collection = new Failboat.Collections.Boards();
    this.collection.fetch();
    var boardView = new Failboat.Views.BoardsIndex({
      model: Failboat.currentUser, 
      collection: this.collection
    });
    $('#container').html(boardView.render().el);
    var sidebarView = new Failboat.Views.Sidebar({model: Failboat.currentUser});
    $('#sidebar').html(sidebarView.render().el);
  },

  showBoard: function(id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    this.collection = new Failboat.Collections.Tasks({'id': id});
    this.collection.fetch();
    this.boardsCollection = new Failboat.Collections.Boards();
    this.boardsCollection.fetch();
    this.boardsCollectionView = new Failboat.Views.BoardsIndex({
      model: Failboat.currentUser,
      collection: this.boardsCollection
    });
    this.boardView = new Failboat.Views.TasksIndex({collection: this.collection});
    $('#container').html(this.boardView.render().el);
    if(this.requestedId) this.showTask(id, this.requestedId);
    var sidebarView = new Failboat.Views.Sidebar({model: Failboat.currentUser});
    $('#sidebar').html(sidebarView.render().el);
  },

  showTask: function(boardId, id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    if(this.collection) {
      console.log(this.collection.get(id));
      this.task = this.collection.get(id);
      this.task.fetch();
      if(this.taskView) this.taskView.remove();
      this.taskView = new Failboat.Views.TaskShow({model: this.task});
      $('#container').append(this.taskView.render().el);
    } else {
      this.requestedId = id;
      this.showBoard(boardId);
    }
    var sidebarView = new Failboat.Views.Sidebar({model: Failboat.currentUser});
    $('#sidebar').html(sidebarView.render().el);  
  }

});
