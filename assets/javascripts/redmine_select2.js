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

  // Campos que ficam visíveis sem AJAX/change (ex.: botão "Editar" da tarefa,
  // que apenas exibe o formulário #update). Agrupa as mutações em um único apply.
  var pending = null;
  function schedule() {
    if (pending) return;
    pending = setTimeout(function () { pending = null; apply(); }, 50);
  }
  if (window.MutationObserver) {
    $(function () {
      new MutationObserver(schedule).observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class', 'hidden']
      });
    });
  }

  // Garantia: se o usuário clicar num <select> nativo ainda sem Select2,
  // aplica na hora e abre o dropdown do Select2 no lugar do nativo.
  $(document).on('mousedown', 'select', function (e) {
    var $el = $(this);
    if ($el.is(IGNORE)) return;
    e.preventDefault();
    apply($el.parent());
    if ($el.hasClass('select2-hidden-accessible')) $el.select2('open');
  });

  // Botão "+" de multi-seleção dos filtros do Redmine
  $(document).on('click', '.toggle-multiselect', function () {
    var $select = $(this).siblings('select');
    if ($select.hasClass('select2-hidden-accessible')) $select.select2('destroy');
    setTimeout(apply, 0);
  });
})(window.jQuery);
