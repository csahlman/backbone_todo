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
    var signInView = new Failboat.Views.Signup({});
    $(this.el).append(signInView.render().el);
    this.closeViews();
    this.currentViews = [signInView];
  },

  logIn: function() {
    var loginView = new Failboat.Views.Login({});
    $(this.el).append(loginView.render().el);
    this.closeViews();
    this.currentViews = [loginView];
  },

  signOut: function() {
    Failboat.session.destroy();
    var loginView = new Failboat.Views.Login({});
    $(this.el).append(loginView.render().el);
    this.closeViews();
    this.currentViews = [loginView];
    this.navigate('log_in', false);
  },

  index: function() {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    var self = this;
    this.boardsCollection.fetch();
    var boardView = new Failboat.Views.BoardsIndex({
      model: Failboat.currentUser, 
      collection: this.boardsCollection
    });
    if(Failboat.currentUser.get('email')) {
      $(this.el).html(boardView.render().el)
      this.closeViews();
      this.currentViews = [boardView];
    } else {
      Failboat.currentUser.fetch({
        success: function() {
          $(self.el).html(boardView.render().el);
          self.closeViews();
          self.currentViews = [boardView];
        }
      });
    }
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
          collection: self.board.users,
          model: self.board
        });
        $(self.el).html(boardShowView.render().el);
        boardShowView.list.show(tasksCollectionView);
        boardShowView.users.show(usersCollectionView);
        self.closeViews();
        self.currentViews = [usersCollectionView, tasksCollectionView, boardShowView];
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
            $(self.el).html(taskView.render().el);
            taskView.comments.show(commentsCollectionView);
            self.closeViews();
            self.currentViews = [taskView, commentsCollectionView];
          }
        });
      }
    });
  }
});
