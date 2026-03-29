# Portfólio Paulo Kondani

## Funcionalidades da Mini Base de Dados

### Como Acessar o Painel Administrativo

1. **Clique 3 vezes rapidamente** no logo "Paulo Kondani" no header do site
2. O painel administrativo será aberto mostrando todas as mensagens recebidas

### Funcionalidades do Painel

- **Visualizar Mensagens**: Todas as mensagens enviadas através do formulário de contato são armazenadas localmente
- **Estatísticas**: Mostra o número total de mensagens recebidas
- **Detalhes das Mensagens**:
  - Nome do remetente
  - Email de contato
  - Telefone (se fornecido)
  - Assunto da mensagem
  - Conteúdo completo da mensagem
  - Data e hora do envio
- **Limpar Mensagens**: Botão para remover todas as mensagens armazenadas

### Como Funciona o Armazenamento

- As mensagens são armazenadas no **LocalStorage** do navegador
- Os dados persistem mesmo após fechar o navegador
- Cada mensagem inclui timestamp automático
- Interface responsiva para desktop e mobile

### Segurança

- Os dados ficam armazenados apenas no navegador do usuário
- Não há transmissão para servidores externos
- Perfeito para demonstração e desenvolvimento

### Teste a Funcionalidade

1. Preencha o formulário de contato na seção "Contato"
2. Clique em "Enviar Mensagem"
3. Clique 3 vezes no logo para acessar o painel
4. Visualize a mensagem enviada