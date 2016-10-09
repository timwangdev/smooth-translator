// import app from '../../config/application';
// import angular from 'angular';

transitApp
  .controller('OptionsCtrl', function($scope) {
    $scope.openExtensionPage = function() {
      crxkit.openExtensionPage('options.html');
      window.close();
    };

    $scope.nextTranslator = function() {
      const translators = ['baidu', 'youdao', 'bing'];
      
      let index = translators.indexOf($scope.options.translator) + 1;
      $scope.options.translator = translators[index % translators.length];
    };

    // crxkit.initOptions(function() {
    //   $scope.options = app.options;
    //   app.log('Options Loaded:', app.options);

    //   function saveOptions() {
    //     chrome.storage.sync.set($scope.options);
    //   }

    //   $scope.$apply();

    //   for (var name in app.options) {
    //     $scope.$watch("options." + name, saveOptions);
    //   }
    // });
  });
