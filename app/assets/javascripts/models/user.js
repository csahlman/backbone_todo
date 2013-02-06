Failboat.Models.User = Backbone.Model.extend({
  url: function() {
    var base = "users"
    return base + '/' + this.id;
  }
});