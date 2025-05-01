# 🎬 API Biblioteca de Filmes

API RESTful criada com Node.js, Express e PostgreSQL para gerenciar um catálogo de filmes, incluindo envio de imagens, relacionamento com gêneros e operações CRUD completas.

---

## 🚀 Tecnologias utilizadas

- Node.js
- Express.js
- PostgreSQL
- Multer (upload de imagens)
- Dotenv (variáveis de ambiente)
- Railway (banco de dados)
- Nodemon (ambiente de desenvolvimento)

---

## 📂 Estrutura do projeto

```
backend-filmes/
├── controllers/
├── routes/
├── db/
├── uploads/
├── .env
├── app.js
└── README.md
```

---

## 🔧 Como rodar o projeto localmente

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/backend-filmes.git
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure o arquivo `.env`**

```env
PORT=3000
DATABASE_URL=postgresql://<usuario>:<senha>@<host>:<porta>/<database>
```

4. **Inicie o servidor em modo desenvolvimento**

```bash
npm run dev
```

---

## 📦 Endpoints da API

### 🎥 Filmes

| Método   | Rota         | Descrição                                     |
| -------- | ------------ | --------------------------------------------- |
| `GET`    | `/filme`     | Listar todos os filmes                        |
| `GET`    | `/filme/:id` | Obter um filme pelo ID                        |
| `POST`   | `/filme`     | Criar um novo filme (com upload de imagem)    |
| `PUT`    | `/filme/:id` | Atualizar um filme (com nova imagem opcional) |
| `DELETE` | `/filme/:id` | Deletar um filme                              |

> 📌 `POST` e `PUT` esperam `multipart/form-data` com os campos:  
> `nome`, `avaliacao`, `sinopse`, `genero_id`, `imagem` (file)

---

### 🎞️ Gêneros

| Método | Rota      | Descrição               |
| ------ | --------- | ----------------------- |
| `GET`  | `/genero` | Listar todos os gêneros |

---

## 🖼️ Upload de imagens

As imagens são salvas na pasta `/uploads`.  
A URL gerada é relativa, por exemplo:

```
imagem: "uploads/matrix.jpg"
```

---

## 📌 Exemplo de uso com Postman (POST /filme)

**POST** `http://localhost:3000/filme`  
**Body (form-data):**

| Campo     | Tipo | Valor                           |
| --------- | ---- | ------------------------------- |
| nome      | text | Matrix                          |
| avaliacao | text | 4.5                             |
| sinopse   | text | Um hacker descobre a verdade... |
| genero_id | text | 45                              |
| imagem    | file | _(arquivo da capa)_             |

---

## 📁 Futuras melhorias

- Autenticação (JWT)
- Busca por nome
- Filtros por avaliação ou gênero
- Paginação de resultados
- Deploy completo do backend com frontend

---

## 👤 Autor

Adriano Maximiano  
[LinkedIn](https://www.linkedin.com/in/adriano-maximiano/)  
[GitHub](https://github.com/Xomano)
