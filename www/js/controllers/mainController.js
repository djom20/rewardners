angular.module('rewardners')
    .controller('MainController', function($scope, $rootScope, $state, CurrentSession) {

      
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
        { title: "Coupons taken", href: "#/home/promos_taken"},
        { title: "Favorites", href: "#/home/promos_favorites"},
        { title: "Stars", href: "#/home/stars"},
        // { title: "Redeems", href: "#"},
        { title: "Settings", href: "#/home/settings"}
        // { title: "Categories", href: "#"}
      ];
      if ($scope.user.hasBussinessRole()){ 
        $scope.menuItems = $scope.menuItems.concat([
          { title: "Places", href: "#/home/places"},
          { title: "Coupons status", href: "#/home/pending_promos"},
          { title: "Redeems", href: "#/home/pending_redeems"}
        ]);
      }

    }

  });
