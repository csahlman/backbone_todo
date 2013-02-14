Failboat.Views.BoardsIndex = Support.CompositeView.extend({
  tagName: 'span',

  id: "main",

  template: JST['boards/index'],

  events: {
    'submit #new_board': 'createBoard'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'renderBoards', 'addOne');
    this.model.on('change', this.render, this);
    this.collection.on('reset', this.render, this);
    this.collection.on('change', this.render, this);
    this.collection.on('add', this.addOne, this);
    this.collection.on('remove', this.render, this);
    // this.collection.on('remove', this.remove, this);
    this.model.on('change', this.render, this);
  },

  render: function() {
    this.renderTemplate();
    this.renderBoards();
    return this;
  },

  renderTemplate: function() {
    if(Failboat.currentUser && Failboat.currentUser.get('email')) {
      this.$el.html(this.template({
        email: Failboat.currentUser.get('email'),
        length: this.collection.length 
      }));
    }
  },

  renderBoards: function() {
    this.collection.each(this.addOne);
  },

  addOne: function(board) {
    var boardView = new Failboat.Views.Board({model: board});
    // this.$('#boards').append(boardView.render().el);
    //     var boardView = new Failboat.Views.Board({model: board});
    var boardContainer = this.$('#boards');
    this.appendChildTo(boardView, boardContainer);
  },

  createBoard: function() {
    event.preventDefault();
    this.collection.create({
      name: $('#new_board_name').val()
    }, {
      success: function() {
        $('#new_board')[0].reset();
      }
    });
  }



});
