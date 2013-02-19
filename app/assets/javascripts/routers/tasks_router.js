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
    this.currentViews = [];
  },

  signIn: function() {
    this.closeViews();
    var signInView = new Failboat.Views.Signup({});
    this.currentViews = [signInView];
    $(this.el).append(signInView.render().el);
  },

  logIn: function() {
    this.closeViews();
    var loginView = new Failboat.Views.Login({});
    this.currentViews = [loginView];
    $(this.el).append(loginView.render().el);
  },

  signOut: function() {
    Failboat.session.destroy();
    this.closeViews();
    var loginView = new Failboat.Views.Login({});
    this.currentViews = [loginView];
    $(this.el).append(loginView.render().el);
    this.navigate('log_in', false);
  },

  index: function() {
    this.closeViews();
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    var self = this;
    var boardView = new Failboat.Views.BoardsIndex({
      model: Failboat.currentUser, 
      collection: this.boardsCollection
    });
    this.currentViews = [boardView];
    if(Failboat.currentUser.get('email')) {
      $(this.el).empty().append(boardView.render().el)
    } else {
      Failboat.currentUser.fetch({
        success: function() {
          $(self.el).empty().append(boardView.render().el);
        }
      });
    }
  },

  showBoard: function(id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    this.closeViews();
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
          collection: self.board.users,
          model: self.board
        });
        $(self.el).empty().append(boardShowView.render().el);
        boardShowView.list.show(tasksCollectionView);
        boardShowView.users.show(usersCollectionView);
        self.currentViews = [usersCollectionView, tasksCollectionView, boardShowView];
      }
    });
  },

  showTask: function(boardId, id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    this.closeViews();
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
            $(self.el).empty().append(taskView.render().el);
            taskView.comments.show(commentsCollectionView);
            self.currentViews = [taskView, commentsCollectionView];
          }
        });
      }
    });
  }
});
