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

    crxkit.onReady(function() {
      $scope.options = crxkit.options;

      function saveOptions() {
        crxkit.setOptions($scope.options);
      }

      $scope.$apply();

      for (var name in crxkit.options) {
        $scope.$watch("options." + name, saveOptions);
      }
    });
  });
