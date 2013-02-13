Failboat.Routers.Tasks = Backbone.Router.extend({

  routes: {
    "": "index",
    "boards/:id": "showBoard",
    "boards/:showId/tasks/:id": "showTask",
    "sign_in": "signIn",
    'log_in': 'logIn',
    "sign_out": "signOut"
  },

  initialize: function(options) {
    console.log('app initiated');
    this.boardsCollection = options.boards;
    this.users = options.users;
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
    if(this.boardView) {
      this.boardView.delegateEvents();
    } else {
      this.boardView = new Failboat.Views.BoardsIndex({
        model: Failboat.currentUser, 
        collection: this.boardsCollection
      });
    }
    $('#content').html(this.boardView.render().el);
    this.boardsCollection.trigger('reset');
  },

  showBoard: function(id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    var self = this;
    if(this.board && this.board.get('id') == id && this.boardShowView) {
      this.board.fetch();
      this.boardShowView.delegateEvents();
      // seems necessary to delegateEvents if we're recyling a view, otherwise event handlers are not held
      $('#content').html(this.boardShowView.render().el);
    } else {
      if(!this.board) this.board = this.boardsCollection.get(id);
      if(this.boardShowView && this.boardShowView.model.get('id') == id) {
        this.boardShowView.delegateEvents();
        $('#content').html(this.boardShowView.render().el);
      } else {
        this.boardShowView = new Failboat.Views.BoardShow({
          model: this.board,
          board: id
        });
        $('#content').html(this.boardShowView.render().el);
      }
    }
  },

  showTask: function(boardId, id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    var self = this;
    if(this.taskView && this.taskView.model.get('id') == id) {
      this.taskView.delegateEvents();
      this.task.fetch();
      $('#content').html(this.taskView.render().el);   
    } else {
      if(!this.board) this.board = this.boardsCollection.get(boardId);
      this.board.fetch({
        success: function() {
          var tasks = self.board.get('tasks')
          console.log(self.board);
          tasks.each(function(task) {
            if(task.get('id') == id) {
              console.log(task);
              self.task = task;
            }
          });
          console.log(self.task);
          self.task.fetch();
          self.taskView = new Failboat.Views.TaskShow({model: self.task});
          $('#content').html(self.taskView.render().el);   
        }
      });
    }
  }
});
