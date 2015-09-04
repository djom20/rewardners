angular.module('rewardners')
    .controller('MainController', function($scope, $rootScope, $state,
                                           CurrentSession) {
    // sanity check
    if (!CurrentSession.session.isAuthenticated())
      $state.go('login');

    // application start time
    var session;

    initialize();


    $scope.fullname = (session.user) ? session.user.full_name : '';

    $scope.logout = function () {
      session.clearSession();
      $state.go('login');
    };

    function initialize(){
      session = CurrentSession.session;
      $scope.user = session.user;
      $scope.title = session.appName;
      $scope.sideMenu = 'Menu';
      setMenuItems();
    }

    function setMenuItems(){
      $scope.menuItems = [
        { title: "Coupons", href: "#/home/promos"},
        { title: "Favorites", href: "#/home/favorites"},
        { title: "Stars", href: "#"},
        { title: "Redeems", href: "#"},
        { title: "Settings", href: "#"}
      ];
      if ($scope.user.hasBussinessRole()){ 
        $scope.menuItems = $scope.menuItems.concat([
          { title: "Places", href: "#/home/places"},
          { title: "Coupons status", href: "#/home/pending_promos"}
        ]);
      }

    }

  });
