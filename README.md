# Biblioteka Web

Biblioteka Web é a interface de front-end para o sistema de gerenciamento de bibliotecas Biblioteka. Ele fornece uma interface amigável para os usuários interagirem com a biblioteca, pesquisarem livros, gerenciarem seus empréstimos e muito mais.

## Funcionalidades

*   **Autenticação de Usuário:** Login e registro seguros para usuários.
*   **Navegação de Livros:** Navegue e pesquise livros no catálogo da biblioteca.
*   **Empréstimo de Livros:** Os usuários podem pegar livros emprestados e visualizar seu histórico de empréstimos.
*   **Perfis de Usuário:** Visualize e edite as informações do seu perfil.
*   **Painel de Administração:** Uma seção para administradores gerenciarem livros, usuários e empréstimos.

## Primeiros Passos

Siga estas instruções para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

*   [Node.js](https://nodejs.org/) (versão 14 ou superior)
*   [npm](https://www.npmjs.com/)

### Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/Biblioteka-Web.git
    ```

2.  Navegue até o diretório do projeto:

    ```bash
    cd Biblioteka-Web
    ```

3.  Instale as dependências:

    ```bash
    npm install
    ```

4.  Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

    ```
    NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
    NEXTAUTH_SECRET=6ZI3ZBeJiJrb8Hq+bucX8X9qBqX3VWOHkK/WG4cvoxA=
    NEXTAUTH_URL=http://localhost:3000
    ```

5.  Execute o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

6.  Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação em execução.

## Tecnologias Utilizadas

*   [Next.js](https://nextjs.org/) - O framework React para produção
*   [React](https://reactjs.org/) - Uma biblioteca JavaScript para construir interfaces de usuário
*   [TypeScript](https://www.typescriptlang.org/) - Um superconjunto de JavaScript que adiciona tipagem estática
*   [Tailwind CSS](https://tailwindcss.com/) - Um framework CSS utilitário
*   [NextAuth.js](https://next-auth.js.org/) - Autenticação para aplicações Next.js

## Licença

Distribuído sob a Licença MIT. Veja `LICENSE` para mais informações.
