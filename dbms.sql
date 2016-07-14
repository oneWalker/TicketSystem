/*
Navicat MySQL Data Transfer

Source Server         : 刘坤
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : dbms

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2016-07-14 01:29:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for commentsinfo
-- ----------------------------
DROP TABLE IF EXISTS `commentsinfo`;
CREATE TABLE `commentsinfo` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uid` bigint(20) NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 NOT NULL,
  `mname` varchar(20) CHARACTER SET utf8 NOT NULL,
  `comments` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of commentsinfo
-- ----------------------------
INSERT INTO `commentsinfo` VALUES ('1', '2', 'admin', '唐人街侦探', '很精彩很刺激');
INSERT INTO `commentsinfo` VALUES ('2', '1', 'admin', '唐人街侦探', '真的是十分喜欢呢');
INSERT INTO `commentsinfo` VALUES ('3', '1', 'admin', '唐人街侦探', '');
INSERT INTO `commentsinfo` VALUES ('4', '1', 'admin', '唐人街侦探', '真的是十分喜欢呢');
INSERT INTO `commentsinfo` VALUES ('5', '1', 'admin', '老炮儿', '是否');
INSERT INTO `commentsinfo` VALUES ('6', '1', 'admin', '老炮儿', '是否');
INSERT INTO `commentsinfo` VALUES ('7', '1', 'admin', '老炮儿', '是否');
INSERT INTO `commentsinfo` VALUES ('8', '1', 'admin', '老炮儿', 'pretty good');
INSERT INTO `commentsinfo` VALUES ('9', '1', 'admin', '星球大战', '好想看');
INSERT INTO `commentsinfo` VALUES ('10', '1', 'admin', '老炮儿', 'hhahh');

-- ----------------------------
-- Table structure for movieinfo
-- ----------------------------
DROP TABLE IF EXISTS `movieinfo`;
CREATE TABLE `movieinfo` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `mname` varchar(20) CHARACTER SET utf8 NOT NULL,
  `startTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `endTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `publisher` varchar(20) CHARACTER SET utf8 NOT NULL,
  `language` varchar(20) CHARACTER SET utf8 NOT NULL,
  `cinema` varchar(20) CHARACTER SET utf8 NOT NULL,
  `price` double NOT NULL,
  `number` int(11) NOT NULL,
  `mvalue` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of movieinfo
-- ----------------------------
INSERT INTO `movieinfo` VALUES ('1', '星球大战', '2016-01-16 22:30:12', '2016-01-03 22:31:49', '农业大学', '英文', '曾宪梓报告厅', '15', '97', '1');
INSERT INTO `movieinfo` VALUES ('2', '唐人街侦探', '2016-01-15 22:27:46', '2016-01-03 22:33:24', '农业大学', '普通话', '嘉华国际影城', '30', '49', '2');
INSERT INTO `movieinfo` VALUES ('8', '唐人街侦探', '2016-01-14 22:33:10', '2016-01-03 22:34:00', '农大', '普通话', '嘉华', '30', '48', '2');
INSERT INTO `movieinfo` VALUES ('10', '老炮儿', '2016-01-08 23:24:00', '2016-01-08 20:14:00', 'hhh', '中文', '嘉华', '80', '65', '65');

-- ----------------------------
-- Table structure for orderinfo
-- ----------------------------
DROP TABLE IF EXISTS `orderinfo`;
CREATE TABLE `orderinfo` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `mid` bigint(20) NOT NULL,
  `uid` bigint(20) NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 NOT NULL,
  `mname` varchar(20) CHARACTER SET utf8 NOT NULL,
  `price` int(10) NOT NULL,
  `mvalue` varchar(20) CHARACTER SET utf8 NOT NULL,
  `cinema` varchar(20) CHARACTER SET utf8 NOT NULL,
  `startTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `value` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of orderinfo
-- ----------------------------
INSERT INTO `orderinfo` VALUES ('1', '2', '1', 'admin', '唐人街侦探', '30', '2', '嘉华国际影城', '2016-01-05 00:56:14', '1');
INSERT INTO `orderinfo` VALUES ('2', '2', '1', 'admin', '唐人街侦探', '30', '2', '嘉华国际影城', '2016-01-04 00:23:41', '1');
INSERT INTO `orderinfo` VALUES ('3', '1', '1', 'admin', '星球大战', '15', '1', '曾宪梓报告厅', '2016-01-08 14:34:40', '0');
INSERT INTO `orderinfo` VALUES ('4', '1', '1', 'admin', '星球大战', '15', '1', '曾宪梓报告厅', '2016-01-08 14:34:40', '0');
INSERT INTO `orderinfo` VALUES ('5', '2', '1', 'admin', '唐人街侦探', '30', '2', '嘉华国际影城', '2016-01-04 13:25:17', '1');
INSERT INTO `orderinfo` VALUES ('6', '2', '1', 'admin', '唐人街侦探', '30', '2', '嘉华国际影城', '2016-01-04 13:25:59', '1');
INSERT INTO `orderinfo` VALUES ('7', '1', '1', 'admin', '星球大战', '15', '1', '曾宪梓报告厅', '2016-01-03 22:19:47', '0');
INSERT INTO `orderinfo` VALUES ('8', '8', '1', 'admin', '唐人街侦探', '30', '2', '嘉华', '2016-01-09 22:22:31', '0');
INSERT INTO `orderinfo` VALUES ('9', '2', '1', 'admin', '唐人街侦探', '30', '2', '嘉华国际影城', '2016-01-03 22:27:46', '0');
INSERT INTO `orderinfo` VALUES ('10', '1', '1', 'admin', '星球大战', '15', '1', '曾宪梓报告厅', '2016-01-03 22:27:55', '0');
INSERT INTO `orderinfo` VALUES ('11', '1', '1', 'admin', '星球大战', '15', '1', '曾宪梓报告厅', '2016-01-03 22:30:12', '0');
INSERT INTO `orderinfo` VALUES ('12', '2', '1', 'admin', '唐人街侦探', '30', '2', '嘉华国际影城', '2016-01-15 22:27:46', '0');
INSERT INTO `orderinfo` VALUES ('13', '8', '1', 'admin', '唐人街侦探', '30', '2', '嘉华', '2016-01-16 22:27:38', '0');
INSERT INTO `orderinfo` VALUES ('14', '9', '1', 'admin', '老炮儿', '80', '65', '嘉华', '2016-01-08 23:24:00', '0');
INSERT INTO `orderinfo` VALUES ('15', '10', '1', 'admin', '老炮儿', '80', '65', '嘉华', '2016-01-08 23:24:00', '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(10) unsigned NOT NULL AUTO_INCREMENT,
  `usergroup` int(10) NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 NOT NULL,
  `password` char(32) CHARACTER SET utf8 NOT NULL,
  `email` varchar(60) NOT NULL,
  `gender` int(2) DEFAULT NULL,
  `tel` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `createTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `loginCount` varchar(60) CHARACTER SET utf8 NOT NULL,
  `cinema` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `realname` char(20) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '1', 'admin', '123456', '', '1', null, '2016-01-05 00:56:05', '150', '0', null);
INSERT INTO `user` VALUES ('2', '3', 'filmer', '123456', '120377843@qq.com', '2', '13668193903', '2016-01-05 11:26:37', '10', '嘉华国际影城', '农大');
INSERT INTO `user` VALUES ('5', '2', 'WolfgangKLiu', '666666', 'briankenliu@gmail.com', null, null, '2016-01-03 02:22:42', '0', '0', null);
INSERT INTO `user` VALUES ('12', '2', '农大578', '111111', '', null, null, '2016-01-05 11:22:37', '2', '0', null);
INSERT INTO `user` VALUES ('16', '3', '96587', '111111', '', null, null, '2016-01-03 14:13:40', '0', '嘉华国际影城', '刘坤');
