Failboat.Models.Session = Backbone.Model.extend({

  defaults: {
    "remember_token": null,
    "user_id": null
  },

  initialize: function() {
    this.load();
    this.on('destroy', this.signOut, this);
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
  },

  signOut: function() {
    $.removeCookie('user_id');
    $.removeCookie('remember_token');
    $('#sign_out_nav').remove();
    Failboat.currentUser = null;
    Failboat.appRouter.navigate('log_in', true);
    $('#sidebar_ul').html('<li><a href="#"><span>Dashboard</span> <i class="icon icon-home"></i></a></li>');
  }

});