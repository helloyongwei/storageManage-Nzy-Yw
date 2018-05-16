-- MySQL dump 10.13  Distrib 5.7.18, for macos10.12 (x86_64)
--
-- Host: localhost    Database: storagemanage
-- ------------------------------------------------------
-- Server version	5.7.18

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
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '部门名称',
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'人事管理'),(2,'财务'),(3,'人力资源'),(4,'后勤管理'),(5,'安全技术'),(6,'test');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material` (
  `materials_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '物资名称',
  `description` varchar(200) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`materials_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'书桌','电脑一体卓'),(2,'长椅',NULL),(3,'电脑','苹果, 联想, 雷神'),(4,'大灯',NULL),(5,'风扇','小功率'),(6,'空调','格力牌'),(7,'打印机',NULL),(8,'液晶显示屏',NULL),(9,'aaaa','aaaa'),(10,'test','test');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outboundorder`
--

DROP TABLE IF EXISTS `outboundorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `outboundorder` (
  `outboundOrder_id` int(11) NOT NULL AUTO_INCREMENT,
  `storeHouse_id` int(11) DEFAULT NULL COMMENT '库房编号',
  `department_id` int(11) DEFAULT NULL COMMENT '领用部门编码',
  PRIMARY KEY (`outboundOrder_id`),
  KEY `outboundOrder_storeHouse_idx` (`storeHouse_id`),
  KEY `outboundOrder_department_idx` (`department_id`),
  CONSTRAINT `outboundOrder_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `outboundOrder_storeHouse` FOREIGN KEY (`storeHouse_id`) REFERENCES `storehouse` (`storeHouse_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outboundorder`
--

LOCK TABLES `outboundorder` WRITE;
/*!40000 ALTER TABLE `outboundorder` DISABLE KEYS */;
INSERT INTO `outboundorder` VALUES (1,8,1),(2,1,2),(3,7,3),(4,2,4),(5,6,5),(6,3,4),(7,5,3),(8,4,2),(9,1,1),(10,2,2);
/*!40000 ALTER TABLE `outboundorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outboundorderdetail`
--

DROP TABLE IF EXISTS `outboundorderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `outboundorderdetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `outboundOrder_id` int(11) NOT NULL,
  `materials_id` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`outboundOrder_id`),
  KEY `outboundOrderDetail_material_idx` (`materials_id`),
  KEY `outboundOrderDetail_outboundOrder` (`outboundOrder_id`),
  CONSTRAINT `outboundOrderDetail_material` FOREIGN KEY (`materials_id`) REFERENCES `material` (`materials_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `outboundOrderDetail_outboundOrder` FOREIGN KEY (`outboundOrder_id`) REFERENCES `outboundorder` (`outboundOrder_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outboundorderdetail`
--

LOCK TABLES `outboundorderdetail` WRITE;
/*!40000 ALTER TABLE `outboundorderdetail` DISABLE KEYS */;
INSERT INTO `outboundorderdetail` VALUES (1,1,1,30),(2,2,5,40),(3,3,8,60),(4,4,8,25),(5,5,2,35),(6,6,6,10),(7,7,7,20),(8,8,3,10),(9,9,5,50),(10,10,4,30);
/*!40000 ALTER TABLE `outboundorderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockflowaccount`
--

DROP TABLE IF EXISTS `stockflowaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stockflowaccount` (
  `stockFlowAccount_id` int(11) NOT NULL AUTO_INCREMENT,
  `storeHouse_id` int(11) NOT NULL,
  `materials_id` int(11) DEFAULT NULL,
  `storageList_id` int(11) DEFAULT NULL,
  `outboundOrder_id` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL COMMENT '鍏?鍑哄簱鐨勭墿璧勬暟閲',
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`stockFlowAccount_id`,`storeHouse_id`),
  UNIQUE KEY `stockFlowAccount_id_UNIQUE` (`stockFlowAccount_id`),
  KEY `stockFlowAccount_storeHouse_idx` (`storeHouse_id`),
  KEY `stockFlowAccount_material_idx` (`materials_id`),
  KEY `stockFlowAccount_storageList_idx` (`storageList_id`),
  KEY `stockFlowAccout_outboundOrder_idx` (`outboundOrder_id`),
  CONSTRAINT `stockFlowAccount_material` FOREIGN KEY (`materials_id`) REFERENCES `material` (`materials_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `stockFlowAccount_storageList` FOREIGN KEY (`storageList_id`) REFERENCES `storagelist` (`storageList_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `stockFlowAccount_storeHouse` FOREIGN KEY (`storeHouse_id`) REFERENCES `storehouse` (`storeHouse_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `stockFlowAccout_outboundOrder` FOREIGN KEY (`outboundOrder_id`) REFERENCES `outboundorder` (`outboundOrder_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockflowaccount`
--

LOCK TABLES `stockflowaccount` WRITE;
/*!40000 ALTER TABLE `stockflowaccount` DISABLE KEYS */;
INSERT INTO `stockflowaccount` VALUES (1,8,1,1,NULL,240,NULL),(2,7,8,2,NULL,250,NULL),(3,6,2,3,NULL,600,NULL),(4,5,7,4,NULL,300,NULL),(5,4,3,5,NULL,320,NULL),(6,3,6,6,NULL,180,NULL),(7,2,4,7,NULL,190,NULL),(8,1,5,8,NULL,100,NULL),(9,2,8,9,NULL,200,NULL),(10,3,7,10,NULL,320,NULL),(11,4,6,11,NULL,90,NULL),(12,5,5,12,NULL,120,NULL),(13,8,1,NULL,1,30,NULL),(14,1,5,NULL,2,40,NULL),(15,7,8,NULL,3,60,NULL),(16,2,8,NULL,4,25,NULL),(17,6,2,NULL,5,35,NULL),(18,3,6,NULL,6,10,NULL),(19,5,7,NULL,7,20,NULL),(20,4,3,NULL,8,10,NULL),(21,1,5,NULL,9,50,NULL),(22,2,4,NULL,10,30,NULL);
/*!40000 ALTER TABLE `stockflowaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storagelist`
--

DROP TABLE IF EXISTS `storagelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storagelist` (
  `storageList_id` int(11) NOT NULL AUTO_INCREMENT,
  `storeHouse_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`storageList_id`),
  KEY `storageList_storeHouse_idx` (`storeHouse_id`),
  KEY `storageList_supplier_idx` (`supplier_id`),
  CONSTRAINT `storageList_storeHouse` FOREIGN KEY (`storeHouse_id`) REFERENCES `storehouse` (`storeHouse_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `storageList_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storagelist`
--

LOCK TABLES `storagelist` WRITE;
/*!40000 ALTER TABLE `storagelist` DISABLE KEYS */;
INSERT INTO `storagelist` VALUES (1,8,1),(2,7,2),(3,6,3),(4,5,4),(5,4,5),(6,3,6),(7,2,7),(8,1,6),(9,2,5),(10,3,4),(11,4,3),(12,5,2);
/*!40000 ALTER TABLE `storagelist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storagelistdetail`
--

DROP TABLE IF EXISTS `storagelistdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storagelistdetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `storageListDetail_id` int(11) NOT NULL,
  `materials_id` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL COMMENT '入库数量',
  PRIMARY KEY (`id`,`storageListDetail_id`),
  KEY `storageListDEtail_material_idx` (`materials_id`),
  KEY `storageListDetail_storageList` (`storageListDetail_id`),
  CONSTRAINT `storageListDEtail_material` FOREIGN KEY (`materials_id`) REFERENCES `material` (`materials_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `storageListDetail_storageList` FOREIGN KEY (`storageListDetail_id`) REFERENCES `storagelist` (`storageList_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storagelistdetail`
--

LOCK TABLES `storagelistdetail` WRITE;
/*!40000 ALTER TABLE `storagelistdetail` DISABLE KEYS */;
INSERT INTO `storagelistdetail` VALUES (1,1,1,240),(2,2,8,250),(3,3,2,600),(4,4,7,300),(5,5,3,320),(6,6,6,180),(7,7,4,190),(8,8,5,100),(9,9,8,200),(10,10,7,320),(11,11,6,90),(12,12,5,120);
/*!40000 ALTER TABLE `storagelistdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storegeneralledger`
--

DROP TABLE IF EXISTS `storegeneralledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storegeneralledger` (
  `storeHouse_id` int(11) NOT NULL,
  `materials_id` int(11) NOT NULL,
  `number` int(11) DEFAULT NULL COMMENT '库房中物资数量',
  PRIMARY KEY (`storeHouse_id`,`materials_id`),
  KEY `storeGeneralLedger_material_idx` (`materials_id`),
  CONSTRAINT `storeGeneralLedger_material` FOREIGN KEY (`materials_id`) REFERENCES `material` (`materials_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `storeGeneralLedger_storeHouse` FOREIGN KEY (`storeHouse_id`) REFERENCES `storehouse` (`storeHouse_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storegeneralledger`
--

LOCK TABLES `storegeneralledger` WRITE;
/*!40000 ALTER TABLE `storegeneralledger` DISABLE KEYS */;
INSERT INTO `storegeneralledger` VALUES (1,5,10),(2,4,145),(2,8,190),(3,6,170),(3,7,320),(4,3,90),(4,6,310),(5,5,120),(5,7,280),(6,2,565),(7,8,190),(8,1,210);
/*!40000 ALTER TABLE `storegeneralledger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storehouse`
--

DROP TABLE IF EXISTS `storehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storehouse` (
  `storeHouse_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '库房名字',
  `location` varchar(45) DEFAULT NULL COMMENT '地理位置',
  `size` varchar(45) DEFAULT NULL COMMENT '库房大小',
  PRIMARY KEY (`storeHouse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storehouse`
--

LOCK TABLES `storehouse` WRITE;
/*!40000 ALTER TABLE `storehouse` DISABLE KEYS */;
INSERT INTO `storehouse` VALUES (1,'北大山','北','800平方米'),(2,'教五楼','中心地带','400平方米'),(3,'香樟园','南','850平方米'),(4,'图书馆','东北','66600平方米'),(5,'南大山','南','230平方米'),(6,'科技馆','中心偏北','3460平方米'),(7,'逸夫楼','中心偏南','2355平方米'),(8,'报刊亭','西大门门口','20平方米'),(9,'test','test','test平方米');
/*!40000 ALTER TABLE `storehouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier` (
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '供应商编码',
  `name` varchar(45) DEFAULT NULL COMMENT '供应商名字',
  `tel` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'阿里巴巴','111111','杭州'),(2,'百度','222222','上海'),(3,'亚马逊','333333','纽约'),(4,'腾讯','444444','深圳'),(5,'谷歌','555555','华盛顿'),(6,'Facebook','66666','西雅图'),(7,'京东','777777','北京'),(8,'test','test','test');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `authLevel` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','aaa','aaa@aaa.com','admin'),(2,'manager1','bbb','bbb@bbb.com','manager'),(3,'manager2','ccc','ccc@ccc.com','manager'),(4,'ddd','ddd','ddd@ddd.com','manager');
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

-- Dump completed on 2017-12-28 22:34:08
