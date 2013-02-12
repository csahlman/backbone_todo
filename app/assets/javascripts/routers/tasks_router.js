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
    $('#main').html(view.render().el);
  },

  logIn: function() {
    var loginView = new Failboat.Views.Login({});
    $('#main').html(loginView.render().el);
  },

  signOut: function() {
    Failboat.session.destroy();
  },

  index: function() {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    if(!this.boardsCollection) this.boardsCollection = new Failboat.Collections.Boards();
    this.boardsCollection.fetch();    
    var boardView = new Failboat.Views.BoardsIndex({
      model: Failboat.currentUser, 
      collection: this.boardsCollection
    });
    $('#main').html(boardView.render().el);

  },

  showBoard: function(id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    var self = this;
    if(!this.boardsCollection) this.boardsCollection = new Failboat.Collections.Boards();
    this.boardsCollection.fetch({
      success: function() {
        self.board = self.boardsCollection.get(id);
        if(self.boardShowView) self.boardShowView.remove();
        self.boardShowView = new Failboat.Views.BoardShow({
          model: self.board, 
          board: id
        });
        $('#main').html(self.boardShowView.render().el);
        if(self.requestedId) self.showTask(id, self.requestedId);
      }
    });
    // var sidebarView = new Failboat.Views.Sidebar({model: Failboat.currentUser});
    // $('#sidebar').html(sidebarView.render().el);
  },

  showTask: function(boardId, id) {
    this.requestedId = null;
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    var self = this;
    if(this.board) {
      var tasks = this.board.get('tasks')
      tasks.each(function(task) {
        if(task.get('id') == id) {
          self.task = task;
        }
      });
      if(this.task) {
        this.task.fetch();
        var taskView = new Failboat.Views.TaskShow({model: this.task});
        $('#main').html(taskView.render().el);
      }
    } else if (this.board && !this.task) {
        console.log('found the board, not the task');
    } else {
      this.requestedId = id;
      this.showBoard(boardId);
    }
  }

});
