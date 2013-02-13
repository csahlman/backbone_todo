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
    $('#content').html(view.render().el);
  },

  logIn: function() {
    var loginView = new Failboat.Views.Login({});
    $('#content').html(loginView.render().el);
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
    $('#content').html(boardView.render().el);

  },

  showBoard: function(id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    var self = this;
    if(this.board && this.board.get('id') == id) {
      this.board.fetch();
      this.boardShowView.delegateEvents();
      // seems necessary to delegateEvents if we're recyling a view, otherwise event handlers are not held
      $('#content').html(this.boardShowView.render().el);
    } else {
      if(!this.boardsCollection) this.boardsCollection = new Failboat.Collections.Boards();
      this.boardsCollection.fetch({
        success: function() {
          self.board = self.boardsCollection.get(id);
          if(self.boardShowView) self.boardShowView.remove();
          self.boardShowView = new Failboat.Views.BoardShow({
            model: self.board, 
            board: id
          });
          $('#content').html(self.boardShowView.render().el);
          if(self.requestedId) self.showTask(id, self.requestedId);
        }
      });
    }
  },

  showTask: function(boardId, id) {
    this.requestedId = null;
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    var self = this;
    if(this.taskView && this.taskView.model.get('id') == id) {
      this.task.fetch();
      this.taskView.delegateEvents();
      $('#content').html(this.taskView.render().el);
    } else if(this.board) {
      var tasks = this.board.get('tasks')
      tasks.each(function(task) {
        if(task.get('id') == id) {
          self.task = task;
        }
      });
      if(this.task) {
        this.task.fetch();
        if(this.taskView) this.taskView.remove();
        this.taskView = new Failboat.Views.TaskShow({model: this.task});
        $('#content').html(this.taskView.render().el);
      }
    } else if (this.board && !this.task) {
        console.log('found the board, not the task');
    } else {
      this.requestedId = id;
      this.showBoard(boardId);
    }
    
    
  }

});
