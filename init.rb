Redmine::Plugin.register :redmine_select2 do
  name        'Redmine Select2'
  author      'Junior Andrade'
  description 'Aplica o Select2 em todos os campos <select> do Redmine.'
  version     '1.0.0'
  url         'https://github.com/kenshin6x/redmine-select2'
  requires_redmine version_or_higher: '4.0.0'
end

# Injeta os arquivos CSS/JS do Select2 no <head> de todas as páginas.
class RedmineSelect2Hook < Redmine::Hook::ViewListener
  def view_layouts_base_html_head(_context = {})
    stylesheet_link_tag('select2.min', 'redmine_select2', plugin: 'redmine_select2') +
      javascript_include_tag('select2.min', 'select2.pt-BR', 'redmine_select2', plugin: 'redmine_select2')
  end
end
