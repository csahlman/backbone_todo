Failboat.Views.BoardsIndex = Backbone.View.extend({
  id: "main",

  template: JST['boards/index'],

  events: {
    'submit #new_board': 'createBoard'
  },

  initialize: function() {
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.addOne, this);
    this.collection.on('change', this.render, this);
    // this.model.on('reset', this.render, this);
    // this.model.on('change', this.render, this);
  },

  render: function() {
    if(Failboat.currentUser) {
      this.$el.html(this.template({
        email: Failboat.currentUser.get('email'),
        length: this.collection.length 
      }));
    }
    this.collection.each(this.addOne);
    return this;
  },

  addOne: function(board) {
    var boardView = new Failboat.Views.Board({model: board});
    $('#boards').append(boardView.render().el);
  },

  createBoard: function(event) {
    event.preventDefault();
    this.collection.create({
      name: $('#new_board_name').val()
    });
  }



});
