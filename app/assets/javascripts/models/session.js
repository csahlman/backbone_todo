Failboat.Models.Session = Backbone.Model.extend({

  defaults: {
    "remember_token": null,
    "user_id": null
  },

  initialize: function() {
    this.load();
  },

  authenticated: function() {
    return this.get('remember_token');
  },

  save: function(auth_hash) {
    $.cookie('user_id', auth_hash.id, { expires: 7 });
    $.cookie('remember_token', auth_hash.remember_token, { expires: 7 });
    this.load();
  },

  load: function() {
    this.set({
      'user_id': $.cookie('user_id'),
      'remember_token': $.cookie('remember_token')
    });
  }

});