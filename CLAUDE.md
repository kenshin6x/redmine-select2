# CLAUDE.md

Plugin do Redmine que aplica o Select2 em todos os `<select>`. A ideia é que continue simples: sem settings, sem migrations, sem gems.

## Regras do projeto

- **Sem CDN.** Todo JS/CSS (Select2 e traduções) fica versionado em `assets/`. O CDN só pode ser usado para *baixar* uma nova versão para o repositório, nunca para carregar em tempo de execução.
- A pasta do plugin dentro do Redmine **precisa** se chamar `redmine_select2`, porque o hook usa `plugin: 'redmine_select2'`.
- O hook fica definido direto no `init.rb` e não em `lib/`, para evitar problemas de autoload (Zeitwerk) no Redmine 6/7.
- Compatibilidade alvo: Redmine 4.x a 7.x. O plugin depende do jQuery fornecido pelo core do Redmine.
- Documentação e comentários em português (pt-BR).

## Estrutura

| Arquivo | Função |
|---|---|
| `init.rb` | Registro do plugin + hook `view_layouts_base_html_head`, que inclui CSS/JS |
| `assets/javascripts/select2.min.js` | Biblioteca Select2 (não editar) |
| `assets/javascripts/select2.pt-BR.js` | Tradução pt-BR do Select2 (não editar) |
| `assets/javascripts/redmine_select2.js` | Inicialização: no carregamento, após AJAX, após `change` e no botão `.toggle-multiselect` |
| `assets/stylesheets/select2.min.css` | CSS do Select2 (não editar) |
| `assets/stylesheets/redmine_select2.css` | Ajustes visuais para o tema do Redmine |
| `README.md` | Passo a passo de instalação para o usuário final |

## Tarefas comuns

### Atualizar o Select2

```bash
V=4.1.0-rc.0   # nova versão
curl -fL -o assets/javascripts/select2.min.js   https://cdnjs.cloudflare.com/ajax/libs/select2/$V/js/select2.min.js
curl -fL -o assets/stylesheets/select2.min.css  https://cdnjs.cloudflare.com/ajax/libs/select2/$V/css/select2.min.css
curl -fL -o assets/javascripts/select2.pt-BR.js https://cdnjs.cloudflare.com/ajax/libs/select2/$V/js/i18n/pt-BR.min.js
head -c 80 assets/javascripts/select2.min.js   # confirmar a versão no cabeçalho
```

Depois de atualizar, mude a versão do Select2 citada no `README.md`.

### Adicionar uma tradução

Baixe `js/i18n/<lang>.min.js` para `assets/javascripts/select2.<lang>.js`, inclua o arquivo no `javascript_include_tag` do `init.rb` e ajuste a função `language()` em `redmine_select2.js`.

### Ignorar um tipo de `<select>`

Acrescente o seletor à constante `IGNORE` em `redmine_select2.js`. O usuário também pode marcar um campo com `data-no-select2`.

### Nova versão do plugin

Atualize `version` no `init.rb`. Se a compatibilidade mudar, atualize também o `README.md`.

## Validação

Antes de commitar:

```bash
ruby -c init.rb
node --check assets/javascripts/redmine_select2.js
```

Não há testes automatizados. Teste manualmente num Redmine rodando (reinicie o Redmine depois de cada mudança):

1. **Administração → Plugins** deve listar o "Redmine Select2".
2. No console do navegador, `typeof jQuery.fn.select2` deve retornar `"function"`.
3. Em **Nova tarefa**, troque tipo e status. O formulário é recarregado via AJAX e o Select2 precisa ser reaplicado.
4. Na lista de tarefas, adicione um filtro e use o botão "+" de multi-seleção.
5. Abra um select dentro de um modal e confira se o dropdown aparece por cima.
