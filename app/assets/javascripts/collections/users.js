Failboat.Collections.Users = Backbone.Collection.extend({
  
  model: Failboat.Models.User,

  initialize: function(models, options) {
    if(options) this.board_id = options.board_id
  },

  url: function() {
    var base = "/users"
    // if(this.board_id) return base + '?board_id=' + this.board_id
    return base;
  },

  search: function(letters) {
    if(letters == "") return this;
    var pattern = new RegExp(letters, 'gi');
    return _(this.filter(function(data) {
      return pattern.test(data.get('email'));
    }));
  }

});
