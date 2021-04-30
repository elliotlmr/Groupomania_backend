-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 30 avr. 2021 à 17:15
-- Version du serveur :  10.4.17-MariaDB
-- Version de PHP : 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gpmania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `text`, `createdAt`, `updatedAt`, `postId`, `userId`) VALUES
(22, 'Wow ! ', '2021-04-20 14:47:47', '2021-04-20 14:47:47', NULL, 1),
(26, 'Test commentaire !', '2021-04-21 15:48:34', '2021-04-21 15:48:34', 16, 1),
(27, 'Commentaire !', '2021-04-22 09:47:29', '2021-04-22 09:47:29', 23, 1),
(32, 'Wow !', '2021-04-29 13:58:49', '2021-04-29 13:58:49', 25, 1);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `mediaUrl` varchar(255) DEFAULT NULL,
  `likes` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `description`, `mediaUrl`, `likes`, `createdAt`, `updatedAt`, `userId`) VALUES
(13, 'Test !', 'http://localhost:1331/medias/173567854_499495171461921_4713703789531744090_n.jpg1618751458174.jpg', 3, '2021-04-18 13:10:58', '2021-04-27 16:57:37', 1),
(14, 'Test 2 !', 'http://localhost:1331/medias/173454540_1116791688794323_1173536189679175181_n.jpg1618751469555.jpg', 2, '2021-04-18 13:11:09', '2021-04-30 13:18:46', 1),
(15, 'Test 3 !', 'http://localhost:1331/medias/173239180_468328667555600_5578821862115259073_n.jpg1618751479033.jpg', 1, '2021-04-18 13:11:19', '2021-04-23 10:17:03', 1),
(16, 'Test 4 !', 'http://localhost:1331/medias/173201105_214482103781701_3631838330227462051_n.jpg1618751492337.jpg', 1, '2021-04-18 13:11:32', '2021-04-23 10:16:13', 1),
(23, 'Test GIF !', 'http://localhost:1331/medias/170152273_932025034263560_8505528939969037951_n.gif1619082343740.gif', 2, '2021-04-22 09:05:43', '2021-04-30 13:26:21', 1),
(24, 'Voici mon premier post !', 'http://localhost:1331/medias/173454540_1116791688794323_1173536189679175181_n.jpg1619542647343.jpg', 1, '2021-04-27 16:57:27', '2021-04-30 13:17:16', 6),
(25, 'Modification !', 'http://localhost:1331/medias/174045145_784750438816839_8767222211786700937_n.jpg1619542680816.jpg', 2, '2021-04-27 16:58:00', '2021-04-30 13:17:11', 6);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `company_role` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT 'http://localhost:1331/medias/default_picture.jpg',
  `user_role` varchar(255) NOT NULL DEFAULT 'guest'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstname`, `lastname`, `company_role`, `profile_picture`, `user_role`) VALUES
(1, 'adminTest@gmail.com', '$2b$12$i0TxAEQ2NaXOEONQGuxUku6Ys4Pzfvyta7aR6rXpf.2UnVWXfuOeO', 'Admin', 'User', 'Administrateur', 'http://localhost:1331/medias/174039552_487529148953751_1159904828082402994_n.jpg1618752263261.jpg', 'admin'),
(6, 'test@gmail.com', '$2b$12$M1Y5H7D7spNFvy.2XIQqkuguo/AnuA9yJw9He24wGOnIbVUGFulfS', 'Elliot', 'Lemaire', 'Designer UX', 'http://localhost:1331/medias/173454540_1116791688794323_1173536189679175181_n.jpg1619788764398.jpg', 'guest');

-- --------------------------------------------------------

--
-- Structure de la table `usersliked`
--

CREATE TABLE `usersliked` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `usersliked`
--

INSERT INTO `usersliked` (`createdAt`, `updatedAt`, `userId`, `postId`) VALUES
('2021-04-23 14:07:16', '2021-04-23 14:07:16', 1, 13),
('2021-04-23 10:17:07', '2021-04-23 10:17:07', 1, 14),
('2021-04-23 10:17:03', '2021-04-23 10:17:03', 1, 15),
('2021-04-23 10:16:13', '2021-04-23 10:16:13', 1, 16),
('2021-04-30 13:26:21', '2021-04-30 13:26:21', 1, 23),
('2021-04-29 13:58:37', '2021-04-29 13:58:37', 1, 25),
('2021-04-27 16:57:37', '2021-04-27 16:57:37', 6, 13),
('2021-04-30 13:18:46', '2021-04-30 13:18:46', 6, 14),
('2021-04-27 16:57:43', '2021-04-27 16:57:43', 6, 23),
('2021-04-30 13:17:16', '2021-04-30 13:17:16', 6, 24),
('2021-04-30 13:17:11', '2021-04-30 13:17:11', 6, 25);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `usersliked`
--
ALTER TABLE `usersliked`
  ADD PRIMARY KEY (`userId`,`postId`),
  ADD KEY `postId` (`postId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `usersliked`
--
ALTER TABLE `usersliked`
  ADD CONSTRAINT `usersliked_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usersliked_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
