# Redmine Select2

Plugin simples para o Redmine que aplica o [Select2](https://select2.org/) em todos os campos `<select>` (busca, rolagem e multi-seleção mais amigáveis).

- Compatível com Redmine 4.x, 5.x e 6.x
- Select2 4.1.0-rc.0 já incluído no plugin (não depende de CDN)
- Tradução pt-BR automática quando o Redmine está em português
- Funciona em formulários carregados via AJAX (ex.: troca de tipo/status da tarefa, filtros)

## Instalação

1. Acesse a pasta de plugins do Redmine e clone o repositório **com o nome `redmine_select2`** (o nome da pasta é obrigatório):

   ```bash
   cd /caminho/do/redmine/plugins
   git clone https://github.com/kenshin6x/redmine-select2.git redmine_select2
   ```

2. Reinicie o Redmine (o plugin não tem migrations nem gems):

   ```bash
   # Passenger
   touch /caminho/do/redmine/tmp/restart.txt

   # Puma / servidor embutido: pare e inicie novamente
   # Docker: docker restart <container_do_redmine>
   ```

   > Em produção com Redmine 4.x/5.x, se os arquivos CSS/JS não carregarem, rode
   > `bundle exec rake redmine:plugins:assets RAILS_ENV=production` antes de reiniciar.

3. Verifique a ativação em **Administração → Plugins**: o item **Redmine Select2** deve aparecer na lista.

Pronto. Não há configuração: o Select2 é aplicado automaticamente em todas as páginas.

## Ignorar um campo específico

Adicione o atributo `data-no-select2` ao `<select>` que não deve usar o Select2:

```html
<select data-no-select2>...</select>
```

## Desinstalação

```bash
rm -rf /caminho/do/redmine/plugins/redmine_select2
rm -rf /caminho/do/redmine/public/plugin_assets/redmine_select2   # se existir
```

Depois reinicie o Redmine.

## Estrutura

```
init.rb                               # registro do plugin + hook que injeta CSS/JS
assets/javascripts/select2.min.js     # biblioteca Select2
assets/javascripts/select2.pt-BR.js   # tradução pt-BR
assets/javascripts/redmine_select2.js # inicialização nos <select>
assets/stylesheets/select2.min.css
assets/stylesheets/redmine_select2.css # ajustes visuais para o tema do Redmine
```
