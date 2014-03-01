PONG.EntityCollection = function () {
  var categories = {
      'default': []
  },
  
  push = function (item, category) {
      if(arguments.length == 1){
          categories['default'].push(item);          
      } else {
          
          if(!categories.hasOwnProperty(category)){
              categories[category] = [];
          }
          categories[category].push(item);
      }
  },
  
  pull = function (category) {
      if(category === undefined){
          var arr = [];
          for(var i in categories){
              if(categories.hasOwnProperty(i)) {
                  arr = arr.concat(categories[i]);
              }
          }
          
          return arr;
      }
      
      return categories[category];
  };
  
  return{
      push: push,
      pull: pull
  };
  
}();
