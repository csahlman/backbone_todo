Failboat.Routers.Tasks = Support.SwappingRouter.extend({

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
    // $('#content').html(signInView.render().el);
    this.swap(signInView);
  },

  logIn: function() {
    var loginView = new Failboat.Views.Login({});
    this.swap(loginView);
    // .html(loginView.render().el);
  },

  signOut: function() {
    Failboat.session.destroy();
  },

  index: function() {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    var boardView = new Failboat.Views.BoardsIndex({
      model: Failboat.currentUser, 
      collection: this.boardsCollection
    });
    this.swap(boardView);
    // this.boardsCollection.trigger('reset');
  },

  showBoard: function(id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    this.board = this.boardsCollection.get(id);
    var boardShowView = new Failboat.Views.BoardShow({
      model: this.board
    });
    this.swap(boardShowView);
    this.board.fetch();
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
        self.swap(taskView);
        self.task.fetch();
      }
    });
  }
});
