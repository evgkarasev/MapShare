(function() {
  'use strict';

  angular
    .module('mapshare')
    .controller('MainCtrl', MainCtrl)
    .controller('HeaderController', HeaderController)
    .controller('FooterController', FooterController)
    .controller('CountriesController', CountriesController)
    .controller('MapsController', MapsController)
    .controller('MapDetailsController', MapDetailsController)
    .controller('WishlistController', WishlistController)
    .controller('StatsController', StatsController)
    .controller('CountriesAddController', CountriesAddController)
    .controller('AddStyleController', AddStyleController)
    .controller('FinishController', FinishController)
    .controller('AboutController', AboutController)
    .controller('LoginController', LoginController)
    .controller('SettingsController', SettingsController)
    .controller('FeedbackController', FeedbackController);

  /* @ngInject */
  function MainCtrl($rootScope) {
    var vm = this;
    vm.countries = [];
    $rootScope.header = '';
    $rootScope.tabSelect(0);

    activate();

    function activate() {
      return null;
    }
  }

  /* @ngInject */
  function HeaderController($scope, $state, $localStorage, InitializeService) {

    // Initialize collapse button
    $(".button-collapse").sideNav({
        menuWidth: 240, // Default is 240
        closeOnClick: true // Closes side-nav on <a> clicks
      });

    //sideNav('hide');

    var vm = this;
    vm.setLang = setLang;
    vm.logout = logout;

    function setLang(lang) {
      $scope.init.language = lang;
      $localStorage.language = lang;
      InitializeService.initialize();
      $state.transitionTo(
        $state.current,
        $state.$current.params,
        { reload: true, inherit: true, notify: true });
    }

    function logout() {
      console.log('logged out');
    }
  }

  /* @ngInject */
  function FooterController($scope) {
    var vm = this;

    //vm.tab;
    //vm.select = select;
    //vm.isSelected = isSelected;
  }

  /* @ngInject */
  function CountriesController($rootScope, continents) {

    var vm = this;
    vm.continents = continents;
    vm.visited = $rootScope.user.visited;

    $rootScope.header = $rootScope.init.messages.menu_countries;
    $rootScope.tabSelect(1);


    vm.checkCountry = checkCountry;

    function checkCountry(cid) {

      if(vm.visited.indexOf(cid) != -1) {
        return true;
      }
    }

  }

  /* @ngInject */
  function CountriesAddController($rootScope, continents) {

    $rootScope.header = $rootScope.init.messages.header_addcountries;
    $rootScope.tabSelect(1);

    var vm = this;
    vm.show = [];
    vm.countries = {};
    vm.visited = [];


    var values = vm.visited = $rootScope.user.visited;
    angular.forEach(values, function(value, key) {
      this[value] = value;
    }, vm.countries);

    vm.continents = continents;
    vm.toggleContinent = toggleContinent;
    vm.addCountries = addCountries;

    function toggleContinent(cid) {
      vm.show[cid] = !vm.show[cid];
    }

    function addCountries(cid) {
      if (vm.visited.indexOf(cid) == -1) {
        vm.visited.push(cid);
      } else {
        var index = vm.visited.indexOf(cid); // TODO: remove double iSearch
        vm.visited.splice(index, 1);
      }

      $rootScope.user.visited = vm.visited;

      console.log(vm.visited);
    }

  }

  /* @ngInject */
  function AddStyleController($rootScope) {

    $rootScope.header = $rootScope.init.messages.header_addstyles;
    $rootScope.tabSelect(1);

    var vm = this;

    vm.setTheme = setTheme;
    //vm.countries = $rootScope.user.visited;
    //vm.wishlist = $rootScope.user.wishlist;

    //vm.continents = continents;

    var visitedLength =  $rootScope.user.visited.length;
    var visited =  $rootScope.user.visited;
    var visitedData = [];

    var wishlistLength = $rootScope.user.wishlist.length;
    var wishlist = $rootScope.user.wishlist;
    var wishlistData = [];

    for(var i = 0; i < visitedLength; ++i) {
      visitedData[i] = {
        "code": visited[i]
      }
    }

    for(var i = 0; i < wishlistLength; ++i) {
      wishlistData[i] = {
        "code": wishlist[i]
      }
    }

    function setTheme(theme) {
      console.log(theme);
    }

    Highcharts.theme1 = {
      colors: ["#1c85ee", "#41CD9e", "#DF5353", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    };

    Highcharts.theme2 = {
      colors: ["#DDDF0D", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    };

    Highcharts.theme3 = {
      colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
    };

    // Apply the theme
    //Highcharts.setOptions(Highcharts.theme);


    $('#container').highcharts('Map', {

      colors: ["#1c85ee", "#41CD9e"],

      title : {
          text : ''
      },

      credits: {
        enabled: false
      },

      legend: {
        enabled: false
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
      },

      plotOptions: {
        map: {
          joinBy: ['iso-a2', 'code'],
          dataLabels: {
            enabled: false
          },
          mapData: Highcharts.maps['custom/world-robinson'],
          tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b>: {series.name}'
          }

        }
      },

      series : [{
        name: 'Visited',
        data: visitedData
      }
               ]
    });

  }

  /* @ngInject */
  function FinishController($rootScope) {

    var vm = this;
    //vm.continents = continents;

    $rootScope.header = $rootScope.init.messages.header_finish;
    $rootScope.tabSelect(1);

    //console.log($rootScope.user.visited);
  }

  /* @ngInject */
  function MapsController($rootScope, continents) {
    $rootScope.header = $rootScope.init.messages.menu_maps;
    $rootScope.tabSelect(2);

    var vm = this;
    vm.continents = continents;
    //vm.user = user;

    //console.log(user);


  }

  /* @ngInject */
  function MapDetailsController($rootScope, $stateParams, continents) {
    $rootScope.header = $rootScope.init.messages.menu_maps;
    $rootScope.tabSelect(2);

    // TODO: change OG in header

    var vm = this;
    vm.continents = continents;
    // TODO: make variables local
    vm.id = $stateParams.id;
    vm.map = null;
    vm.maps = $rootScope.user.maps;
    vm.mapsLength = $rootScope.user.maps.length;

    for(var i = 0; i < vm.mapsLength; ++i) {
      if(vm.maps[i].id == vm.id) {
        vm.map = vm.maps[i];
        break;
      }
    }

    //console.log(vm.map.countries);

    var visitedLength = vm.map.countries.length;
    var visited = vm.map.countries;
    var data = [];

    for(var i = 0; i < visitedLength; ++i) {
      data[i] = {
        "hc-key": visited[i].toLowerCase(),
        "value" : 1
      }
    }

    /* sample data format

    var data = [
        {
            "hc-key": "fo",
            "value": 0
        }
    ]*/

    $('#container').highcharts('Map', {

      title : {
          text : ''
      },

      subtitle : {
      },

      legend: {
        enabled: false
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
      },

      colorAxis: {
        min: 0,
        max: 1
      },

      credits: {
        enabled: false
      },

      series : [{
        data : data,
        mapData: Highcharts.maps['custom/world-robinson-lowres'],
        joinBy: 'hc-key',
        name: 'Visited',
        states: {
          hover: {
            color: '#41CD9e'
          }
        },
        dataLabels: {
          enabled: false,
          format: '{point.name}'
        }
      }]
    });
  }

  /* @ngInject */
  function WishlistController($rootScope, continents) {
    $rootScope.header = $rootScope.init.messages.menu_wishlist;
    $rootScope.tabSelect(3);

    var vm = this;
    vm.wishlist = $rootScope.user.wishlist;
    vm.visited = $rootScope.user.visited;
    vm.continents = continents;
    vm.wish = [];

    console.log(vm.wishlist);

    vm.doVisited = doVisited;
    vm.justDelete = justDelete;
    vm.checkCountry = checkCountry;

    function doVisited(visited) {
      console.log('wish was released ' + visited);
      //vm.visited.push(visited);
      //vm.wishlist.splice(vm.wishlist.indexOf(visited),1);

      //...
      //$rootScope.user.wishlist = vm.wishlist;
      //$rootScope.user.visited = vm.visited;
      //currentUser.put($rootScope.user);
      vm.wish[visited] = true;
      toastr.info('Marked as visited', '', {positionClass: 'toast-bottom-center', timeOut: 1500});

    }

    function justDelete(deleted) {
      console.log('wish was deleted ' + deleted);
      //vm.wishlist.splice(vm.wishlist.indexOf(deleted),1);
      vm.wish[deleted] = true;
      toastr.info('Will be deleted, for sure', '', {positionClass: 'toast-bottom-center', timeOut: 1500});

    }

    function checkCountry(cid) {
      if(vm.wishlist.indexOf(cid) != -1) {
        return true;
      }
    }
  }

  /* @ngInject */
  function StatsController($rootScope, $scope) {

    var vm = this;
    // TODO fetch real data
    vm.worldPercent = 22;
    vm.europePercent = 56;
    vm.americaPercent = 0;
    vm.usersPercent = 100;
    //$scope.percent2 = 100;

    //$scope.percent = 65;
    $scope.options = {
      animate:{
        duration:100,
        enabled:true
      },
      barColor:'#41cd9e',
      scaleColor:false,
      lineWidth:4,
      lineCap:'circle'
    };

    $rootScope.header = $rootScope.init.messages.menu_stats;
    $rootScope.tabSelect(4);

  }


  /* @ngInject */
  function FeedbackController($rootScope, UsersService) {

    $rootScope.header = $rootScope.init.messages.side_feedback;
    $rootScope.tabSelect(0);

    var name = $rootScope.user.name || '';
    var email = $rootScope.user.email || '';

    var vm = this;
    vm.submitted = false;

    vm.feedbackData = {
      name: name,
      email: email,
      textarea: ''
    };

    vm.doFeedback = doFeedback;

    function doFeedback() {
      console.log(vm.feedbackData.textarea);

      $rootScope.user.feedback.push(vm.feedbackData);
      // save data
      UsersService.update({id: $rootScope.user.id}, $rootScope.user);
      // TODO: check if no error
      toastr.info('Feedback sent', '', {positionClass: 'toast-bottom-center', timeOut: 1500});

      vm.submitted = true;
    }
  }

  /* @ngInject */
  function LoginController($rootScope) {
    $rootScope.header = $rootScope.init.messages.side_login;
    $rootScope.tabSelect(0);

    var vm = this;
    vm.loginData = {
      email: '',
      password: ''
    };
    vm.rememberMe = true;
    vm.doLogin = doLogin;
    vm.openRegister = openRegister;

    function doLogin() {
      console.log('do login');
    }

    function openRegister() {
      console.log('open register');
    }

  }

  /* @ngInject */
  function SettingsController($rootScope,
                               $state,
                               $localStorage,
                               InitializeService,
                               UsersService) {
    $rootScope.header = $rootScope.init.messages.side_settings;
    $rootScope.tabSelect(0);

    var name = $rootScope.user.name || '';
    var country = $rootScope.user.home_country || '';
    var language = $rootScope.init.language;

    var vm = this;
    vm.settingsData = {
      name: name,
      country: country,
      language: language
    }

    vm.setLanguage = setLanguage;
    vm.doSettings = doSettings;

    function setLanguage(lang) {
      $rootScope.init.language = lang;
      $rootScope.user.language = lang;
      $localStorage.language = lang;
      InitializeService.initialize(lang);

      $state.go($state.current, {}, {reload: true});
      /*$state.transitionTo(
        $state.current,
        $state.$current.params,
        { reload: true, inherit: true, notify: true });*/
    }

    function doSettings() {
      console.log(vm.settingsData.language);
      $rootScope.user.name = vm.settingsData.name;
      // TODO: impement in next version
      //$rootScope.user.home_country = vm.settingsData.country;
      $rootScope.user.language = vm.settingsData.language;
      // save data
      UsersService.update({id: $rootScope.user.id}, $rootScope.user);
      // TODO: check if no error

      toastr.info('Settings saved', '', {positionClass: 'toast-bottom-center', timeOut: 1500});

      $state.go($state.current, {}, {reload: true});
    }
  }

  /* @ngInject */
  function AboutController($rootScope, CONFIG) {

    var vm = this;
    vm.version = CONFIG.APPVER;

    $rootScope.header = $rootScope.init.messages.side_about;
    $rootScope.tabSelect(0);

  }

})();
