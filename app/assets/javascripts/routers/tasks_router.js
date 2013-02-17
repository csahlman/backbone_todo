Failboat.Routers.Tasks = Failboat.SwappingRouter.extend({

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
    this.el = $('#content');
    this.boardsCollection = options.boards;
    this.users = options.users;
  },

  signIn: function() {
    var signInView = new Failboat.Views.Signup({});
    this.swap(signInView);
  },

  logIn: function() {
    var loginView = new Failboat.Views.Login({});
    this.swap(loginView);
  },

  signOut: function() {
    Failboat.session.destroy();
  },

  index: function() {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    var self = this;
    var boardView = new Failboat.Views.BoardsIndex({
      model: Failboat.currentUser, 
      collection: this.boardsCollection
    });
    if(Failboat.currentUser.get('email')) {
      this.swap(boardView);
    } else {
      Failboat.currentUser.fetch({
        success: function() {
          self.swap(boardView);
        }
      });
    }
      
    // this.el.html(boardView.renderModel());
  },

  showBoard: function(id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    var self = this;
    this.board = this.boardsCollection.get(id);
    var boardShowView = new Failboat.Views.BoardShow({
      model: this.board
    });
    this.board.fetch({
      success: function() {
        var tasksCollectionView = new Failboat.Views.TasksIndex({
          collection: self.board.tasks
        });
        var usersCollectionView = new Failboat.Views.UsersIndex({
          collection: self.board.users
        });
        self.swap(boardShowView);
        boardShowView.list.show(tasksCollectionView);
        boardShowView.users.show(usersCollectionView);
      }
    });
  },

  showTask: function(boardId, id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    var self = this;
    this.board = this.boardsCollection.get(boardId);
    this.board.fetch({
      success: function() {
        var tasks = self.board.tasks;
        tasks.each(function(task) {
          if(task.get('id') == id) {
            self.task = task;
          }
        });
        var taskView = new Failboat.Views.TaskShow({model: self.task});
        self.task.fetch({
          success: function() {
            var commentsCollectionView = new Failboat.Views.CommentCollectionView({
              collection: self.task.comments
            });
            self.swap(taskView);
            taskView.comments.show(commentsCollectionView);
          }
        });
      }
    });
  }
});
