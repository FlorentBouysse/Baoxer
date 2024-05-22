# Baoxers


## Guides de mises en route

### Projet
1. Git clone le projet
2. Switch sur la branch develop avec la commande : ```git checkout origin/develop```
3. Ajouter à la racine du projet ".env.local" et y mettre :```DATABASE_URL="mysql://"UserAdminer":"passwordAdminer"@127.0.0.1:3306/"nameServer"?serverVersion=mariadb-10.3.25&charset=utf8mb4"```
4. Faire un ```composer install```, et si nécessaire un ```composer update```

### Base de données

1. Créer la base de données : ```php bin/console doctrine:database:create```
2. Préparer les migrations : ```php bin/console make:migration```
3. Faire la migration : ```php bin/console doctrine:migrations:migrate```

### En cas d'erreur lors des migrations

1. Supprimer la base de données avec : ```php bin/console doctrine:database:drop --force```
2. Créer la base de données : ```php bin/console doctrine:database:create```
3. Supprimer les migrations : ```rm -rf migrations/*.php```
4. Préparer la migration : ```php bin/console make:migration```
5. Faire la migration : ```php bin/console doctrine:migrations:migrate```

### Données fictives

Il vous faut juste entrer cette commande : ```php bin/console doctrine:fixtures:load``` et les données fictives iront dans la base de données directement.
