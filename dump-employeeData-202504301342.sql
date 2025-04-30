-- MySQL dump 10.13  Distrib 9.3.0, for macos14.7 (x86_64)
--
-- Host: localhost    Database: employeeData
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `empid` int NOT NULL,
  `street` varchar(255) NOT NULL,
  `city_id` int NOT NULL,
  `state_id` int NOT NULL,
  `zip` varchar(10) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `race` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`empid`),
  KEY `city_id` (`city_id`),
  KEY `state_id` (`state_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`empid`) REFERENCES `employees` (`empid`),
  CONSTRAINT `address_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`),
  CONSTRAINT `address_ibfk_3` FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `division`
--

DROP TABLE IF EXISTS `division`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `division` (
  `ID` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `postalCode` varchar(15) NOT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `division`
--

LOCK TABLES `division` WRITE;
/*!40000 ALTER TABLE `division` DISABLE KEYS */;
INSERT INTO `division` VALUES (1,'Technology Engineering','Atlanta','30363',NULL),(2,'Marketing','Atlanta','30363',NULL),(3,'Human Resources','New York','00034',NULL),(999,'HQ','New York','00034',NULL);
/*!40000 ALTER TABLE `division` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `empid` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `hire_date` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `salary` double NOT NULL,
  `ssn` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_division`
--

DROP TABLE IF EXISTS `employee_division`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_division` (
  `empid` int NOT NULL,
  `div_ID` int NOT NULL,
  PRIMARY KEY (`empid`),
  KEY `fk_employee_division_div_ID` (`div_ID`),
  CONSTRAINT `fk_employee_division_div_ID` FOREIGN KEY (`div_ID`) REFERENCES `division` (`ID`),
  CONSTRAINT `fk_employee_division_empid` FOREIGN KEY (`empid`) REFERENCES `employees` (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_division`
--

LOCK TABLES `employee_division` WRITE;
/*!40000 ALTER TABLE `employee_division` DISABLE KEYS */;
INSERT INTO `employee_division` VALUES (7,1),(10,1),(1,999),(2,999),(3,999);
/*!40000 ALTER TABLE `employee_division` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_job_titles`
--

DROP TABLE IF EXISTS `employee_job_titles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_job_titles` (
  `empid` int NOT NULL,
  `job_title_id` int NOT NULL,
  KEY `fk_employee_job_titles_empid` (`empid`),
  KEY `fk_employee_job_titles_job_title_id` (`job_title_id`),
  CONSTRAINT `fk_employee_job_titles_empid` FOREIGN KEY (`empid`) REFERENCES `employees` (`empid`),
  CONSTRAINT `fk_employee_job_titles_job_title_id` FOREIGN KEY (`job_title_id`) REFERENCES `job_titles` (`job_title_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_job_titles`
--

LOCK TABLES `employee_job_titles` WRITE;
/*!40000 ALTER TABLE `employee_job_titles` DISABLE KEYS */;
INSERT INTO `employee_job_titles` VALUES (1,902),(2,900),(3,901),(4,102),(5,101),(6,201),(7,100),(8,102),(9,102),(10,102),(11,200),(12,201),(13,202),(14,103),(15,103);
/*!40000 ALTER TABLE `employee_job_titles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `empid` int NOT NULL,
  `Fname` varchar(65) NOT NULL,
  `Lname` varchar(65) NOT NULL,
  `email` varchar(65) NOT NULL,
  `HireDate` date DEFAULT NULL,
  `Salary` decimal(10,2) NOT NULL,
  `SSN` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Snoopy','Beagle','Snoopy@example.com','2022-08-01',45000.00,'111-11-1111'),(2,'Charlie','Brown','Charlie@example.com','2022-07-01',48000.00,'111-22-1111'),(3,'Lucy','Doctor','Lucy@example.com','2022-07-03',55000.00,'111-33-1111'),(4,'Pepermint','Patti','Peppermint@example.com','2022-08-02',98000.00,'111-44-1111'),(5,'Linus','Blanket','Linus@example.com','2022-09-01',43000.00,'111-55-1111'),(6,'PigPin','Dusty','PigPin@example.com','2022-10-01',33000.00,'111-66-1111'),(7,'Scooby','Doo','Scooby@example.com','1973-07-03',78000.00,'111-77-1111'),(8,'Shaggy','Rodgers','Shaggy@example.com','1973-07-11',77000.00,'111-88-1111'),(9,'Velma','Dinkley','Velma@example.com','1973-07-21',82000.00,'111-99-1111'),(10,'Daphne','Blake','Daphne@example.com','1973-07-30',59000.00,'111-00-1111'),(11,'Bugs','Bunny','Bugs@example.com','1934-07-01',18000.00,'222-11-1111'),(12,'Daffy','Duck','Daffy@example.com','1935-04-01',16000.00,'333-11-1111'),(13,'Porky','Pig','Porky@example.com','1935-08-12',16550.00,'444-11-1111'),(14,'Elmer','Fudd','Elmer@example.com','1934-08-01',15500.00,'555-11-1111'),(15,'Marvin','Martian','Marvin@example.com','1937-05-01',28000.00,'777-11-1111');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_titles`
--

DROP TABLE IF EXISTS `job_titles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_titles` (
  `job_title_id` int NOT NULL,
  `job_title` varchar(125) NOT NULL,
  PRIMARY KEY (`job_title_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_titles`
--

LOCK TABLES `job_titles` WRITE;
/*!40000 ALTER TABLE `job_titles` DISABLE KEYS */;
INSERT INTO `job_titles` VALUES (100,'software manager'),(101,'software architect'),(102,'software engineer'),(103,'software developer'),(200,'marketing manager'),(201,'marketing associate'),(202,'marketing assistant'),(900,'Chief Exec. Officer'),(901,'Chief Finn. Officer'),(902,'Chief Info. Officer');
/*!40000 ALTER TABLE `job_titles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll`
--

DROP TABLE IF EXISTS `payroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll` (
  `payID` int DEFAULT NULL,
  `pay_date` varchar(255) DEFAULT NULL,
  `earnings` double NOT NULL,
  `fed_tax` double NOT NULL,
  `fed_med` double NOT NULL,
  `fed_SS` decimal(7,2) DEFAULT NULL,
  `state_tax` double NOT NULL,
  `retire_401k` decimal(7,2) DEFAULT NULL,
  `health_care` double NOT NULL,
  `empid` int DEFAULT NULL,
  `fedss` double NOT NULL,
  `retire401k` double NOT NULL,
  KEY `fk_employee_payroll_empid` (`empid`),
  CONSTRAINT `fk_employee_payroll_empid` FOREIGN KEY (`empid`) REFERENCES `employees` (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll`
--

LOCK TABLES `payroll` WRITE;
/*!40000 ALTER TABLE `payroll` DISABLE KEYS */;
INSERT INTO `payroll` VALUES (1,'2025-01-31',865.38,276.92,12.55,53.65,103.85,3.46,26.83,1,0,0),(2,'2025-02-28',865.38,276.92,12.55,53.65,103.85,3.46,26.83,1,0,0),(13,'2024-12-31',865.38,276.92,12.55,53.65,103.85,3.46,26.83,1,0,0),(14,'2024-11-30',865.38,276.92,12.55,53.65,103.85,3.46,26.83,1,0,0),(3,'2025-01-31',923.08,295.38,13.38,57.23,110.77,3.69,28.62,2,0,0),(4,'2025-02-28',923.08,295.38,13.38,57.23,110.77,3.69,28.62,2,0,0),(5,'2025-01-31',1057.69,338.46,15.34,65.58,126.92,4.23,32.79,3,0,0),(6,'2025-02-28',1057.69,338.46,15.34,65.58,126.92,4.23,32.79,3,0,0),(7,'2025-01-31',1884.62,603.08,27.33,116.85,226.15,7.54,58.42,4,0,0),(8,'2025-02-28',1884.62,603.08,27.33,116.85,226.15,7.54,58.42,4,0,0),(9,'2025-01-31',826.92,264.62,11.99,51.27,99.23,3.31,25.63,5,0,0),(10,'2025-02-28',826.92,264.62,11.99,51.27,99.23,3.31,25.63,5,0,0),(11,'2025-01-31',634.62,203.08,9.2,39.35,76.15,2.54,19.67,6,0,0),(12,'2025-02-28',634.62,203.08,9.2,39.35,76.15,2.54,19.67,6,0,0),(15,'2024-12-31',1500,480,21.75,93.00,180,6.00,46.5,7,0,0);
/*!40000 ALTER TABLE `payroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `state_id` int NOT NULL AUTO_INCREMENT,
  `state_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'employeeData'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-30 13:42:17
