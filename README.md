##Comment initialiser la base de données :

Dans un dossier "Groupomania" préalablement créé sur votre ordinateur..

-> Clonez le repository "backend".
-> Accédez au dossier "backend" depuis la console : cd Groupomania/backend
-> Installez les dépendances : npm install
-> Dans le dossier "backend", créez un fichier ".env".
-> Dans ce fichier ".env", copiez et collez le code suivant :

DB_USER='*user*'
DB_PASSWORD='*password*'

-> Remplacez *user* et *password* par les identifiants qui vous seront fournis par l'entreprise (ou par vos identifiants locaux : root, etc..).

-> Lancez le server en utilisant la commande : node server.



##Si vous souhaitez accédez à une copie de la base de données présentée lors de la soutenance, un fichier gpmania.sql est disponible dans le dossier 'backend'.

-> Importez la base de données MySQL depuis phpMyAdmin (outil "Importer", choisir le fichier gpmania.sql, clicker sur "Exécuter").