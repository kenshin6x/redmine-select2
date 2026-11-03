/* Redmine Select2 - aplica o Select2 nos campos <select> do Redmine */
(function ($) {
  if (!$ || !$.fn.select2) return;

  // Seletores ignorados (adicione data-no-select2 em um <select> para não aplicar)
  var IGNORE = '[data-no-select2], .select2-hidden-accessible';

  function language() {
    var lang = (document.documentElement.lang || '').toLowerCase();
    return lang.indexOf('pt') === 0 ? 'pt-BR' : 'en';
  }

  function apply(root) {
    $(root || document).find('select').not(IGNORE).filter(':visible').each(function () {
      var $el = $(this);
      $el.select2({
        width: 'resolve',
        dropdownAutoWidth: true,
        language: language(),
        allowClear: false
      });
    });
  }

  $(function () { apply(); });

  // Reaplica após requisições AJAX (ex.: formulário de tarefa, filtros)
  $(document).ajaxComplete(function () { setTimeout(apply, 0); });

  // Campos que aparecem após uma mudança (ex.: adicionar filtro)
  $(document).on('change', 'select', function () { setTimeout(apply, 0); });

  // Botão "+" de multi-seleção dos filtros do Redmine
  $(document).on('click', '.toggle-multiselect', function () {
    var $select = $(this).siblings('select');
    if ($select.hasClass('select2-hidden-accessible')) $select.select2('destroy');
    setTimeout(apply, 0);
  });
})(window.jQuery);
