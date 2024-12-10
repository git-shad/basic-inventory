/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.8-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: micro
-- ------------------------------------------------------
-- Server version	10.11.8-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `micro`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `micro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `micro`;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material` (
  `materialId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`materialId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES
(1,'Extention wire'),
(4,'Power adapter'),
(5,'Power cable'),
(6,'Projector'),
(7,'speakers'),
(8,'TV'),
(11,'USB'),
(14,'HDMI'),
(15,'Room Key');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `roomId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`roomId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES
(2,'ICT2'),
(3,'ICT3'),
(4,'ICT4'),
(5,'ICT5'),
(6,'ICT6'),
(7,'ICT7'),
(8,'ICT8'),
(9,'CL1'),
(10,'CL2'),
(11,'CL3'),
(12,'CL4'),
(15,'ICT1');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `signin`
--

DROP TABLE IF EXISTS `signin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `signin` (
  `siginId` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`siginId`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signin`
--

LOCK TABLES `signin` WRITE;
/*!40000 ALTER TABLE `signin` DISABLE KEYS */;
INSERT INTO `signin` VALUES
(1000,'user@example.com','5f4dcc3b5aa765d61d8327deb882cf99');
/*!40000 ALTER TABLE `signin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usageItem`
--

DROP TABLE IF EXISTS `usageItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usageItem` (
  `usageId` int(11) NOT NULL AUTO_INCREMENT,
  `borrower` varchar(255) DEFAULT NULL,
  `educator` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `room` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`usageId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usageItem`
--

LOCK TABLES `usageItem` WRITE;
/*!40000 ALTER TABLE `usageItem` DISABLE KEYS */;
INSERT INTO `usageItem` VALUES
(1,'isaac','arjay','[\"USB\",\"speakers\"]','ICT8',0,'2024-12-05 17:51:02','2024-12-05 17:51:02'),
(2,'isaac','meow','[\"Projector\",\"HDMI\",\"Power adapter\"]','ICT2',1,'2024-12-05 18:11:18','2024-12-09 10:28:52'),
(3,'steven','elaine','[\"USB\",\"TV\"]','',0,'2024-12-05 18:54:52','2024-12-10 04:34:48'),
(4,'isaac','anthony','[\"USB\"]','CL2',0,'2024-12-06 07:26:17','2024-12-10 04:34:58'),
(5,'isaac','james','[\"Projector\",\"Extention wire\",\"HDMI\"]','CL4',0,'2024-12-06 07:57:15','2024-12-10 04:35:11'),
(6,'TEST','TEST','[\"Extention wire\"]','ICT7',0,'2024-12-06 12:09:19','2024-12-10 04:35:32'),
(7,'meow','isaac','[\"TV\",\"speakers\"]','CL4',1,'2024-12-07 00:25:26','2024-12-07 14:57:13'),
(8,'meow','anthony','[\"USB\"]','ICT7',1,'2024-12-07 00:44:31','2024-12-07 14:58:14'),
(9,'isaac','sofia','[\"Projector\",\"HDMI\",\"Power cable\"]','ICT5',1,'2024-12-08 02:33:27','2024-12-08 16:12:26'),
(10,'steven','vian','[\"speakers\",\"TV\"]','CL4',1,'2024-12-08 10:38:28','2024-12-08 10:38:57'),
(11,'steven','isaac','[\"Projector\",\"USB\",\"HDMI\",\"Power cable\",\"Power adapter\",\"Extention wire\"]','ICT5',1,'2024-12-09 04:30:38','2024-12-09 04:30:53'),
(12,'steven','isaac','[\"Room Key\",\"HDMI\",\"USB\",\"speakers\",\"TV\"]','CL4',0,'2024-12-09 04:43:24','2024-12-10 04:33:29'),
(13,'mark','kenneth','[\"Room Key\",\"HDMI\",\"Power cable\",\"Projector\",\"Power adapter\",\"Extention wire\"]','ICT8',NULL,'2024-12-10 04:39:24','2024-12-10 04:39:24'),
(14,'princess','mystee','[\"Room Key\"]','CL3',NULL,'2024-12-10 04:40:09','2024-12-10 04:40:09'),
(15,'roman','miggi','[\"TV\",\"HDMI\"]','ICT2',NULL,'2024-12-10 04:41:09','2024-12-10 04:41:09'),
(16,'Vian','Juego','[\"HDMI\",\"Projector\",\"Power cable\",\"Power adapter\"]','ICT2',NULL,'2024-12-10 04:41:38','2024-12-10 04:41:38'),
(17,'Kevin','Elyn','[\"Room Key\"]','ICT7',NULL,'2024-12-10 04:42:27','2024-12-10 04:42:27');
/*!40000 ALTER TABLE `usageItem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-10  5:00:50
