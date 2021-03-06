<h1 align="center">
  <p>🚀 Navedex API 🛸</p>
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/HigorSnt/navedex?style=flat-square">
  <img alt="GitHub" src="https://img.shields.io/github/license/HigorSnt/navedex?style=flat-square">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/HigorSnt/navedex?style=flat-square"></br>
  <a href="todo" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## :bookmark: Sobre

Esta é uma API, onde ao se cadastrar, com `email` e `senha`, será possível cadastrar navers e projetos que os navers participam.
  
Este projeto é fruto do desafio proposto pela [`Nave.rs`](https://nave.rs/)

## :boom: Utilização

1. Esta API utiliza o `Postgres` como banco de dados, portanto é necessário [instalá-lo](https://www.postgresql.org/download/). Após isso, é necessário indicar o banco de dados, o username e o password definido na instalação no arquivo `knexfile.ts`.

2. Em seguida, é necessário realizar o clone do repositório:

```bash
  git clone https://github.com/HigorSnt/navedex.git
```

3. Em seguida, entre na pasta gerada pelo passo anterior e execute os seguintes comandos:

```bash
  # Antes de tudo é necessário baixar as dependências descritas no package.json
  $ yarn
  # Antes de iniciar a aplicação gere o banco de dados e as tabelas
  $ yarn knex:latest
  # Se desejar excluir as tabelas, basta rodar o comando
  $ yarn knex:rollback
  # Para executar a aplicação:
  $ yarn dev
```

## 🛣 Rotas

As rotas presentes na aplicação serão descritas abaixo:

### 🚏 `/users`

<ul>
  <li>
    <strong>POST</strong>: rota responsável por criar um usuário no banco de dados.
    Exemplo de execução:</br></br>
    <pre>
    <code>
    {
      "email": "teste@gmail.com",
      "password": "123456"
    }
    </code>
    </pre>
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        {
          "email": "teste@gmail.com"
        }
      </code>
      </pre>
    </details>
  </li>


### 🚏 `/login`

<ul>
  <li>
    <strong>POST</strong>: rota responsável por autenticar um usuário.
    Exemplo de execução:</br></br>
    <pre>
    <code>
    {
      "email": "teste@gmail.com",
      "password": "123456"
    }
    </code>
    </pre>
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        {
          "token": string
        }
      </code>
      </pre>
    </details>
  </li>
</ul>

<br>

> **⚠️ Todas as próximas rotas fazem uso do token jwt originado da rota de login. 
> Portanto, é necessário colocar o token no cabeçalho da requisição http.**


### 🚏 `/navers`

<ul>
  <li>
    <strong>POST</strong>: rota responsável por criar um naver no banco de dados. Para criar um naver é opcional enviar os projetos que ele participa e quando se deseja enviar basta juntar os id's em um array, por exemplo <code>projects: [1, 2]</code>.
    Exemplo de execução:</br></br>
    <pre>
    <code>
      {
        "name": "Teste",
        "birthdate": "1995-06-04",
        "admission_date": "2019-07-06",
        "job_role": "Desenvolvedor"
      }
    </code>
    </pre>
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        {
          "id": 1,
          "name": "Teste",
          "birthdate": "1995-06-04",
          "admission_date": "2019-07-06",
          "job_role": "Desenvolvedor",
          "user": "teste@gmail.com",
          "projects": []
        }
      </code>
      </pre>
    </details>
  </li>
  <li>
    <strong>GET</strong>: esta rota retorna todos os navers cadastrados pelo usuário logado, podendo ser filtrado pelo nome e o cargo, sendo necessário apenas trechos da string e não o texto completo. Além disso, é possível filtrar pela quantidade de meses que está na empresa. Por exemplo, enviar <code>navers?admission_months=10</code> irá retornar todos os navers que possuem <strong>10 ou menos</strong> meses de empresa. <br/> A rota completa pode ser composta da seguinte forma: <code>navers?admission_months=10&name=tes&job_role=des</code>
    </br></br>
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        [
          {
            "id": 2,
            "name": "Savanna Zulauf",
            "birthdate": "1999-05-15T03:00:00.000Z",
            "job_role": "Desenvolvedor",
            "admission_date": "2019-06-12T03:00:00.000Z",
            "months_admission": 20
          },
          {
            "id": 4,
            "name": "Kristin Wilkinson",
            "birthdate": "1999-05-15T03:00:00.000Z",
            "job_role": "Desenvolvedor",
            "admission_date": "2019-06-12T03:00:00.000Z",
            "months_admission": 20
          }
        ]
      </code>
      </pre>
    </details>
  </li>
</ul>


### 🚏 `/navers/:id`

<ul>
  <li>
    <strong>PUT</strong>: rota responsável por atualizar um naver no banco de dados. Para criar um naver é opcional enviar os projetos que ele participa e quando se deseja enviar basta juntar os id's em um array, por exemplo <code>projects: [1, 2]</code>.
    Exemplo de execução:</br></br>
    <pre>
    <code>
      {
        "name": "Teste",
        "birthdate": "1995-06-04",
        "admission_date": "2019-07-06",
        "job_role": "Desenvolvedor",
        "projects": [1, 2]
      }
    </code>
    </pre>
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        {
          "id": 1,
          "name": "Teste",
          "birthdate": "1995-06-04",
          "admission_date": "2019-07-06",
          "job_role": "Desenvolvedor",
          "user": "teste@gmail.com",
          "projects": [1, 2]
        }
      </code>
      </pre>
    </details>
  </li>
  <li>
    <strong>GET</strong>: esta rota retorna o naver que possui o id passado como parâmetro na rota.
    </br></br>
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        {
          "id": 1,
          "name": "Teste",
          "birthdate": "1995-06-04",
          "admission_date": "2019-07-06",
          "job_role": "Desenvolvedor",
          "user": "teste@gmail.com",
          "months_admission": 20,
          "projects": [
            {
              "id": 1,
              "name": "Projeto 1"
            },
            {
              "id": 2,
              "name": "Projeto 2"
            }
          ]
        }
      </code>
      </pre>
    </details>
  </li>
  <li>
    <strong>DELETE</strong>: esta rota exclui o naver registrado com o id dado na rota.
  </li>
</ul>


### 🚏 `/projects`

<ul>
  <li>
    <strong>POST</strong>: rota responsável por criar um projeto no banco de dados. Para criar um projeto é opcional enviar os navers que participam do projeto e quando se deseja enviar basta juntar os id's em um array, por exemplo <code>navers: [1, 2]</code>.
    Exemplo de execução:</br></br>
    <pre>
    <code>
      {
        "name": "Projeto 1",
      }
    </code>
    </pre>
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        {
          "id": 1,
          "name": "Projeto 1",
          "user": "teste@gmail.com",
          "navers": []
        }
      </code>
      </pre>
    </details>
  </li>
  <li>
    <strong>GET</strong>: esta rota retorna todos os projetos cadastrados pelo usuário logado, podendo ser filtrado pelo nome. <br/> A rota completa pode ser composta da seguinte forma: <code>projects?name=proj</code>
    </br></br>
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        [
          {
            "id": 3,
            "name": "Projeto 3",
            "user": "teste@gmail.com"
          },
          {
            "id": 4,
            "name": "Projeto 4",
            "user": "teste@gmail.com"
          }
        ]
      </code>
      </pre>
    </details>
  </li>
</ul>


### 🚏 `/projects/:id`

<ul>
  <li>
    <strong>PUT</strong>: rota responsável por atualizar um projeto no banco de dados. Para atualizar um projeto é opcional enviar os navers que participam dele e quando se deseja enviar basta juntar os id's em um array, por exemplo <code>navers: [1, 2]</code>.
    Exemplo de execução:</br></br>
    <pre>
    <code>
      {
        "name": "Projeto sensacional",
        "navers": [6,4]
      }
    </code>
    </pre>
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        {
          "id": 7,
          "name": "Projeto sensacional",
          "navers": [6, 4]
        }
      </code>
      </pre>
    </details>
  </li>
  <li>
    <strong>GET</strong>: esta rota retorna o projeto que possui o id passado como parâmetro na rota.
    </br></br>
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        {
          "id": 3,
          "name": "Projeto realmente muito bom",
          "navers": [
            {
              "id": 4,
              "name": "Kristin Wilkinson",
              "birthdate": "1999-05-15T03:00:00.000Z",
              "job_role": "Desenvolvedor",
              "admission_date": "2019-06-12T03:00:00.000Z"
            },
            {
              "id": 6,
              "name": "Higor",
              "birthdate": "1999-05-15T03:00:00.000Z",
              "job_role": "Analista",
              "admission_date": "2019-06-12T03:00:00.000Z"
            }
          ]
        }
      </code>
      </pre>
    </details>
  </li>
  <li>
    <strong>DELETE</strong>: esta rota exclui o projeto registrado com o id dado na rota.
  </li>
</ul>

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

