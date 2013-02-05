window.Failboat = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Failboat.Routers.Tasks;
    Backbone.history.start();
  }
};

// OnResetCollection = Backbone.Collection.extend({
//   constructor: function(){
//     var args = slice(arguments);
//     Backbone.Collection.prototype.constructor.apply(this, args);
 
//     this.onResetCallbacks = [];
//     this.on("reset", this.collectionReset, this);
//   },
 
//   onReset: function(callback){
//     this.onResetCallbacks.push(callback);
//     this.collectionLoaded && this.fireResetCallbacks();
//   },
 
//   collectionReset: function(){
//     if (!this.collectionLoaded) {
//       this.collectionLoaded = true
//     }
//     this.fireResetCallbacks();
//   },
 
//   fireResetCallbacks: function(){
//     var callback = this.onResetCallbacks.pop();
//     if (callback){
//       callback(this);
//       this.fireResetCallbacks();
//     }
//   }
// });

$(document).ready(function(){
  Failboat.initialize();
});
