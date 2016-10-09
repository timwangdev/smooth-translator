// import angular from 'angular';

transitApp
  .filter('html_safe', function($sce) {
    return $sce.trustAsHtml;
  });