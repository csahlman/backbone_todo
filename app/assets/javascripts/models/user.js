Failboat.Models.User = Backbone.Model.extend({
  url: function() {
    var base = "users"
    // if(this.isNew()) return base;
    return base + '/' + this.get('remember_token');
  }
});