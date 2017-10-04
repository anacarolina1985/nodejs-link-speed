-- MySQL dump 10.13  Distrib 5.7.9, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: speedlink
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.10-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `agendamento`
--

LOCK TABLES `agendamento` WRITE;
/*!40000 ALTER TABLE `agendamento` DISABLE KEYS */;
INSERT INTO `agendamento` VALUES (1,'2016-04-16','2016-04-16','10',15,13,1,'Descrição da instalação',2,1,'Ana Alves',4,'111.111.111-11','3 Mega','(31) 1111-1111','ana.alves','123'),(6,'2016-04-16','2016-04-30','16',15,13,6,'',2,2,'Teste 2',2,'111.111.111-12','52 mega','(22) 2222-2223','teste 2','12321323125'),(7,'2016-03-31','2016-03-31','9',15,13,7,'',2,1,'Teste data',1,'111.111.111-11','345435345','(11) 1111-1111','34435345','345435435'),(8,'2016-03-04','0000-00-00','14',15,13,10,'',1,NULL,'Teste 2',4,'null','null','(11) 1111-1111','teste 2','123456 2'),(9,'2016-03-31','2016-03-31','9',15,13,11,'dfgdfgfdg',2,1,'Teste',1,'123.234.314-23','3 mg','(11) 1111-1111','rerwerew','rerrer');
/*!40000 ALTER TABLE `agendamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (29,'admin@speedlink.com.br','rG1Y43SeGhAYrCt/5BA2/g==','2016-03-21 22:13:53',1),(30,'atendente@speedlink.com.br','rG1Y43SeGhAYrCt/5BA2/g==','2016-03-21 22:14:29',2),(31,'tecnico@speedlink.com.br','rG1Y43SeGhAYrCt/5BA2/g==','2016-03-21 22:15:10',3),(32,'ana.karol1985@gmail.com','R3YZrF037N2Pjq4A1UJ2Zw==','2016-04-01 01:41:43',3);
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES (1,'Rua Chapecó','30411153','442','','Prado','Belo Horizonte','MG'),(6,'teste','30411115','443','apto 305','Prado 2','Belo Horizonte 2','DF'),(7,'Rua Chapecó','30411153','3432423432','423443543','Prado','Belo Horizonte','MG'),(8,'Rua Chapecó','30411153','13434','1342342','Prado','Belo Horizonte','MG'),(9,'Rua Chapecó','30411153','13434','1342342','Prado','Belo Horizonte','MG'),(10,'Rua Chapecó','30411155','13434','1342342','Prado','Belo Horizonte','MG'),(11,'Rua Chapecó','30411153','23434','343453','Prado','Belo Horizonte','MG');
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `periodo`
--

LOCK TABLES `periodo` WRITE;
/*!40000 ALTER TABLE `periodo` DISABLE KEYS */;
INSERT INTO `periodo` VALUES (1,'Manhã'),(2,'Tarde');
/*!40000 ALTER TABLE `periodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'Administrador'),(2,'Atendente'),(3,'Técnico');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `statusagendamento`
--

LOCK TABLES `statusagendamento` WRITE;
/*!40000 ALTER TABLE `statusagendamento` DISABLE KEYS */;
INSERT INTO `statusagendamento` VALUES (1,'Agendada','1'),(2,'Reagendada','1'),(3,'Em Execução','1'),(4,'Pronta','0'),(5,'Cancelada','0');
/*!40000 ALTER TABLE `statusagendamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tipoagendamento`
--

LOCK TABLES `tipoagendamento` WRITE;
/*!40000 ALTER TABLE `tipoagendamento` DISABLE KEYS */;
INSERT INTO `tipoagendamento` VALUES (1,'Manutenção'),(2,'Instalação');
/*!40000 ALTER TABLE `tipoagendamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (13,'ADMIN',29,'(31) 1111-1111','Belo Horizonte'),(14,'ATENDENTE',30,'(31) 1111-1111','Belo Horizonte'),(15,'TECNICO',31,'(31) 1111-1111','Belo Horizonte'),(16,'ana',32,'(11) 1111-1111','SP');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-05 14:41:39
