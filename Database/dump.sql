CREATE DATABASE market_cubos

CREATE TABLE usuarios (
	ID SERIAL PRIMARY KEY,
  nome_loja TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

CREATE TABLE categorias (
	ID SERIAL PRIMARY KEY,
  nome TEXT NOT NULL
);

CREATE TABLE produtos (
	ID SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  estoque INTEGER NOT NULL,
  preco INTEGER NOT NULL,
  categoria_id INTEGER NOT NULL,
  descricao TEXT NOT NULL,
  url TEXT NOT NULL,
  path TEXT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios (ID),
  FOREIGN KEY (categoria_id) REFERENCES categorias (ID)
);

INSERT INTO categorias
(nome)
VALUES
('Acessórios'),
('Alimentos'),
('Beleza'),
('Blusas'),
('Calçados'),
('Cama e mesa'),
('Celulares'),
('Decoração'),
('Esporte'),
('Games'),
('Informática'),
('Livros'),
('Papelaria'),
('Pets')

