app.factory('TopicsFactory', function($resource) {
  console.log("boss");
   return $resource('http://localhost:3000/topics/:id', {id: '@id'},
      {
        'update': { method:'POST' }
      }

 );
});

app.factory("UsersFactory", ['$http', function($http, $location, TokenFactory){
  var UsersFactory = {};

  UsersFactory.adminCheck = function(){
    //  var user_id = TokenFactory.getUserId();
    //  return $http.post("http://localhost:3000/users/login", data );
  }


  UsersFactory.loginUser =  function(data){
     return $http.post("http://localhost:3000/users/login", data );
  }

  UsersFactory.logoutUser =  function(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("admin");
  }
  return UsersFactory;
}]);

app.factory("TokenFactory", function(){
    var TokenFactory  =  {};

    TokenFactory.setToken = function(token){
      localStorage.setItem("token", token);
    }

    TokenFactory.setUser= function(username){
      localStorage.setItem("username", username);
    }

    TokenFactory.setAdmin= function(is_admin){
      localStorage.setItem("admin", is_admin);
    }

    TokenFactory.getToken = function(){
      the_token = localStorage.getItem("token");
      return the_token;
    }

    TokenFactory.getUser = function(){
      username = localStorage.getItem("username");
      return username;
    }

    TokenFactory.getAdmin = function(){
      is_admin = localStorage.getItem("admin");
      return is_admin ==="true";
    }

    TokenFactory.clearToken = function(){
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      console.log("clearing local storage items");
    }

    return TokenFactory;
});

app.factory("AuthInterceptor",  function(TokenFactory){
  // 4 magic keys https://docs.angularjs.org/api/ng/service/$http
  return {
    request: function (config){
       var token = TokenFactory.getToken();
       if (token){
         config.headers = config.headers || {};
         config.headers.Authorization = "Bearer "+token;
       }
       return config; // not the best??  I think you should return a promise here
    },
    // requestError
    // response - check for unauthorized, and redirect to login
        // on a 500 show an error message by doing a $rootScope.$emit...
    // responseError
  };
});


app.factory('StandardsFactory', ['$http', '$location', function($http, $location) {

  var StandardsFactory = {};

  StandardsFactory.getIndex = function () {
        return $http.get('http://localhost:3000/standards/');
  }

  StandardsFactory.getShow = function (id) {
        return $http.get('http://localhost:3000/standards/'+id);
  }

  StandardsFactory.postNew = function (params) {
      return $http.post('http://localhost:3000/standards', params);
  }

  return StandardsFactory;

}]);
