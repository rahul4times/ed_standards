// app.factory('StandardsFactory', function($resource) {
//   return $resource('http://localhost:3000/standards/:id');
// });

app.factory("UsersFactory", ['$http', function($http, $location){
  var UsersFactory = {}
  UsersFactory.loginUser =  function(data){
     return $http.post("http://localhost:3000/users/login", data );
  }
  return UsersFactory;
}]);

app.factory("TokenFactory", function(){
    var TokenFactory  =  {};

    TokenFactory.setToken = function(token){
      localStorage.setItem("token", token);
      console.log("setting token: "+token);
    }

    TokenFactory.setUser= function(username){
      localStorage.setItem("username", username);
      console.log("setting user "+username);
    }

    TokenFactory.getToken = function(){
      the_token = localStorage.getItem("token");
      console.log("getting local storage item: "+the_token);
      return the_token;
    }

    TokenFactory.getUser = function(){
      the_user = localStorage.getItem("username");
      console.log("getting user : "+the_user);
      return the_user;
    }

    TokenFactory.clearToken = function(){
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      console.log("clearing local storage items");
    }

    return TokenFactory;
});

app.factory("AuthInterceptor",  function(TokenFactory){

    var AuthInterceptor = {request: addToken};

    function addToken(config){

       var token = TokenFactory.getToken();
       if (token){
         config.headers = config.headers || {};
         config.headers.Authorization = "Bearer: "+token;
       }
       return config;
    };

    return AuthInterceptor;
});


app.factory('StandardsFactory', ['$http', function($http, $location) {

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
