

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `locadora`
--
CREATE DATABASE IF NOT EXISTS `locadora` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `locadora`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `movies`
--

CREATE TABLE `movies` (
  `MovieId` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Director` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `movies`
--

INSERT INTO `movies` (`MovieId`, `Title`, `Director`) VALUES
(2, 'Star Wars: Episódio IV - Uma Nova Esperança', 'George Lucas'),
(3, 'Star Wars: Episódio V - O Império Contra-Ataca', 'Irvin Kershner'),
(4, 'Star Wars: Episódio VI - O Retorno de Jedi', 'Richard Marquand'),
(5, 'Star Wars: Episódio I - A Ameaça Fantasma', 'George Lucas'),
(6, 'Star Wars: Episódio II - Ataque dos Clones', 'George Lucas'),
(7, 'Star Wars: Episódio III - A Vingança dos Sith', 'George Lucas'),
(8, 'Star Wars: A Guerra dos Clones', 'Dave Filoni'),
(9, 'Star Wars: Episódio VII - O Despertar da Força', 'Jeffrey Jacob Abrams'),
(10, 'Rogue One: Uma História Star Wars', 'Gareth Edwards'),
(11, 'Star Wars: Episódio VIII - Os Últimos Jedi', 'Rian Johnson'),
(12, 'Han Solo: Uma História Star Wars', 'Ron Howard'),
(13, 'A Lagoa Azul', 'Randal Kleiser'),
(15, 'It: A Coisa', 'Andy Muschietti'),
(16, 'Cidade de Deus', 'Fernando Meirelles');

-- --------------------------------------------------------

--
-- Estrutura da tabela `rents`
--

CREATE TABLE `rents` (
  `RentId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `MovieId` int(11) NOT NULL,
  `RentDate` datetime NOT NULL,
  `ReturnDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `stock`
--

CREATE TABLE `stock` (
  `StockId` int(11) NOT NULL,
  `MovieId` int(11) NOT NULL,
  `TotalQuantity` int(11) NOT NULL,
  `StockQuantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `stock`
--

INSERT INTO `stock` (`StockId`, `MovieId`, `TotalQuantity`, `StockQuantity`) VALUES
(1, 2, 5, 5),
(2, 3, 3, 3),
(3, 4, 2, 2),
(4, 5, 5, 5),
(5, 6, 5, 5),
(6, 7, 3, 3),
(7, 8, 4, 4),
(8, 9, 5, 5),
(9, 10, 5, 5),
(10, 11, 1, 1),
(11, 12, 5, 5),
(12, 13, 10, 10),
(13, 15, 6, 6),
(14, 16, 2, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tokens_blacklist`
--

CREATE TABLE `tokens_blacklist` (
  `Id` int(11) NOT NULL,
  `Token` varchar(1000) NOT NULL,
  `InvalidatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `UserId` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`UserId`, `Email`, `Name`, `Password`) VALUES
(4, 'Teste4@teste4.com', 'Teste4', '$2b$10$vW/lYN7Z/h9LVIS68UyLN.HCnjsx7tfrru.hMd3dDYiOGx6hjZYuG'),
(5, 'Teste5@teste.com', 'Teste5', '$2b$10$Xx9RLmHfA0D8.EqcZO7J5uB4Jo1HKWFNNKWSEPKxvBlDROWp629Tq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`MovieId`);

--
-- Indexes for table `rents`
--
ALTER TABLE `rents`
  ADD PRIMARY KEY (`RentId`),
  ADD KEY `user_id_idx` (`UserId`),
  ADD KEY `movie_id_idx` (`MovieId`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`StockId`),
  ADD KEY `MovieId_idx` (`MovieId`);

--
-- Indexes for table `tokens_blacklist`
--
ALTER TABLE `tokens_blacklist`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`),
  ADD UNIQUE KEY `Email_UNIQUE` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `MovieId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `rents`
--
ALTER TABLE `rents`
  MODIFY `RentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `StockId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `tokens_blacklist`
--
ALTER TABLE `tokens_blacklist`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `rents`
--
ALTER TABLE `rents`
  ADD CONSTRAINT `fk_movie_rent` FOREIGN KEY (`MovieId`) REFERENCES `movies` (`MovieId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_rent` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `fk_movie_stock` FOREIGN KEY (`MovieId`) REFERENCES `movies` (`MovieId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
