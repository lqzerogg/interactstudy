requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '/javascripts/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../index'
    },
    shim: {
        // 'underscore': {
        //     exports: '_'
        // },
        // 'backbone': {
        //     deps: ['underscore', 'jquery'],
        //     exports: 'Backbone'
        // },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'modernizr': {
            exports: 'Modernizr'
        }
    }
});

define(['modernizr', 'jquery'], function(M, $) {
    (function ($) {

      // DROPDOWN CLASS DEFINITION
      // =========================
      var toggle   = '[data-toggle=dropdown]';
      var Dropdown = function (element) {
        var $el = $(element).on('click.dropdown', this.toggle);
      }

      Dropdown.prototype.toggle = function (e) {
        var $this = $(this);

        if ($this.is('.disabled, :disabled')) {
            return;
        }

        var $parent  = getParent($this);
        var isActive = $parent.hasClass('open');

        clearMenus();

        if (!isActive) {
          $parent.trigger(e = $.Event('show.dropdown'));

          if (e.isDefaultPrevented()) {
            return;
          }

          $parent
            .toggleClass('open')
            .trigger('shown.dropdown');

          $this.focus();
        }

        return false;
      }

      function clearMenus() {
        $(toggle).each(function (e) {
          var $parent = getParent($(this));
          if (!$parent.hasClass('open')) {
            return;
          }
          $parent.trigger(e = $.Event('hide.dropdown'));
          if (e.isDefaultPrevented()) {
            return
          }
          $parent.removeClass('open').trigger('hidden.dropdown');
        })
      }

      function getParent($this) {
        var selector = $this.attr('data-target');

        if (!selector) {
          selector = $this.attr('href');
        }

        var $parent = selector && $(selector);

        return $parent && $parent.length ? $parent : $this.parent();
      }


      // DROPDOWN PLUGIN DEFINITION
      // ==========================

      $.fn.dropdown = function (option) {
        return this.each(function () {
          var $this = $(this)
          var data  = $this.data('dropdown')

          if (!data) $this.data('dropdown', (data = new Dropdown(this)))
          if (typeof option == 'string') data[option].call($this)
        })
      }

      $.fn.dropdown.Constructor = Dropdown

      // APPLY TO STANDARD DROPDOWN ELEMENTS
      // ===================================

      $(document)
        .on('click.dropdown.data-api', clearMenus)
        .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
        .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle);

    })(jQuery);
    
    $(function() {        
        console.log(M);
        console.log($);
    })
});
