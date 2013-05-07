
CREATE TABLE `categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `price` INT DEFAULT NULL,
  `surprise` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);


insert into categories(name, created_at) values ('Revistas', now());
insert into categories(name, created_at) values ('Livros'  , now());
insert into categories(name, created_at) values ('Jornais' , now());
insert into categories(name, created_at) values ('Pessoa'  , now());

insert into products(category_id, name, description, price, created_at) values (1, 'Quatro Rodas',   'Comparativo dos populares 2009'  , 15, now());
insert into products(category_id, name, description, price, created_at) values (1, 'Quatro Rodas',   'Comparativo dos populares 2010'  , 15, now());
insert into products(category_id, name, description, price, created_at) values (1, 'Quatro Rodas',   'Comparativo dos populares 2011'  , 15, now());
insert into products(category_id, name, description, price, created_at) values (1, 'Quatro Rodas',   'Comparativo dos populares 2012'  , 13, now());
insert into products(category_id, name, description, price, created_at) values (1, 'Quatro Rodas',   'Comparativo dos populares 2013'  , 11, now());
insert into products(category_id, name, description, price, created_at) values (1, 'Quatro Rodas',   'Super carros 2009'  , 15, now());
insert into products(category_id, name, description, price, created_at) values (1, 'Quatro Rodas',   'Super carros 2010'  , 15, now());
insert into products(category_id, name, description, price, created_at) values (1, 'Quatro Rodas',   'Super carros 2011'  , 15, now());
insert into products(category_id, name, description, price, created_at) values (1, 'Quatro Rodas',   'Super carros 2012'  , 13, now());
insert into products(category_id, name, description, price, created_at) values (1, 'Quatro Rodas',   'Super carros 2013'  , 11, now());


insert into products(category_id, name, description, surprise, price, created_at) values (1, 'Mundo Estranho', 'Como é o comportamento do Danilo','Gay', 24, now());
insert into products(category_id, name, description, surprise, price, created_at) values (1, 'Mundo Estranho', 'Como é o comportamento do Johalf','Gay',  8, now());
insert into products(category_id, name, description, surprise, price, created_at) values (1, 'Mundo Estranho', 'Como é o comportamento do Eurico','Gay',  8, now());
insert into products(category_id, name, description, surprise, price, created_at) values (1, 'Mundo Estranho', 'Como é o comportamento do B2',    'Gay',  8, now());

insert into products(category_id, name, description, price, created_at) values (2, 'Aprenda Java em 21 dias', '5000 páginas sobre java para você aprender.', 71, now());
insert into products(category_id, name, description, price, created_at) values (2, 'Aprenda Ruby em 21 dias', '200 páginas sobre ruby para você aprender.' , 59, now());
insert into products(category_id, name, description, price, created_at) values (2, 'Ruby', 'É que tipo, todo dia maño!'                                    , 59, now());
insert into products(category_id, name, description, price, created_at) values (2, 'TDD na Prática ', 'Aprenda sobre Test Driven Development'              , 45, now());
insert into products(category_id, name, description, price, created_at) values (2, 'Android', 'Como desenvolver e como testar aplicativos com android 4'   , 45, now());
insert into products(category_id, name, description, price, created_at) values (2, 'PHP', 'Utilizando codeigniter-scaffold =)'                             , 45, now());
insert into products(category_id, name, description, price, created_at) values (2, 'Scrum', 'Como utilizar o retrospectiba.com'                            , 45, now());

insert into products(category_id, name, description, price, created_at) values (3, 'Folha'  , '3 de maio de 2013', 3, now());
insert into products(category_id, name, description, price, created_at) values (3, 'Estadão', '3 de maio de 2013', 3, now());
insert into products(category_id, name, description, price, created_at) values (3, 'Lance'  , '3 de maio de 2013', 3, now());
insert into products(category_id, name, description, price, created_at) values (3, 'Lance'  , '2 de maio de 2013', 3, now());
insert into products(category_id, name, description, price, created_at) values (3, 'Valor'  , '2 de maio de 2013', 3, now());

insert into products(category_id, name, description, surprise, price, created_at) values (4, 'Danilo'  , 'Todo dia, toda hora','Gay', 3, now());
insert into products(category_id, name, description, surprise, price, created_at) values (4, 'Eurico'  , 'Todo dia, toda hora','Gay', 3, now());
insert into products(category_id, name, description, surprise, price, created_at) values (4, 'Johalf'  , 'Todo dia, toda hora','Gay', 3, now());
