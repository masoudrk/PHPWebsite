-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2016 at 09:24 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `testdb`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `Proc_MarkAsRead`(IN `INAdminID` BIGINT, OUT `Status` BOOLEAN)
    NO SQL
BEGIN

INSERT INTO comment_read
(AdminID,CommentID) 
SELECT INAdminID, comment.ID as CommentID 
FROM comment 
WHERE not exists(SELECT * FROM comment_read 
WHERE comment_read.CommentID=comment.ID 
AND comment_read.AdminID=INAdminID);

SET Status = TRUE;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserID` bigint(20) NOT NULL,
  `PrivilegeID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `UserID`, `PrivilegeID`) VALUES
(1, 8, 1),
(7, 11, 3),
(10, 10, 2);

-- --------------------------------------------------------

--
-- Table structure for table `admin_privilege`
--

CREATE TABLE IF NOT EXISTS `admin_privilege` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Privilege` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `Description` text COLLATE utf8_persian_ci,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `admin_privilege`
--

INSERT INTO `admin_privilege` (`ID`, `Privilege`, `Description`) VALUES
(1, 'Manager', 'Manage all sections of site and can do anything.'),
(2, 'Author', 'Can put post on site and answer to comments.'),
(3, 'Viewer', 'Only can see admin panel and can not post or other work on site.');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PostID` bigint(20) DEFAULT NULL,
  `Content` text COLLATE utf8_persian_ci NOT NULL,
  `ParentID` int(11) NOT NULL DEFAULT '-1',
  `Identity` varchar(200) COLLATE utf8_persian_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8_persian_ci DEFAULT NULL,
  `UserID` bigint(20) DEFAULT NULL,
  `Date` datetime NOT NULL,
  `Accepted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=21 ;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`ID`, `PostID`, `Content`, `ParentID`, `Identity`, `Email`, `UserID`, `Date`, `Accepted`) VALUES
(11, 125, 'Ø¯Ø±ÙˆØ¯ Ù…Ù…Ù†ÙˆÙ† Ø§Ø² Ù…Ø·Ø§Ù„Ø¨ØªÙˆÙ†!', -1, 'Ù…Ø³Ø¹ÙˆØ¯', 'maoud@gmail.com', NULL, '2016-03-09 00:00:00', 1),
(12, 125, 'Ø³Ù„Ø§Ù… Ø¨Ù„Ù‡ Ø¯Ø±Ø³ØªÙ‡!', 11, 'ali', 'khanlo', NULL, '2016-04-11 23:50:47', 1),
(13, 125, 'Ø§ÛŒÙ† Ø¨Ø­Ø« Ù…Ø·Ø±Ø­ Ø´Ø¯Ù‡ Ø¯Ø± Ø§ÛŒÙ† Ù¾Ø³Øª Ø¨ÛŒØ´ØªØ± Ù…Ø±Ø¨ÙˆØ· Ù…ÛŒØ´Ù‡ Ø¨Ù‡ Ø§ØµÙˆÙ„ Ú†Ù‡Ø§Ø±Ú¯Ø§Ù†Ù‡ Ø¨Ø±Ù†Ø§Ù…Ù‡ Ù†ÙˆÛŒØ³ÛŒ Ú©Ù‡ Ø®ÙˆØ¯Ø´ Ù…Ù‚ÙˆÙ„Ù‡ Ø§ÛŒ Ø¬Ø¯Ø§Ø³Øª Ùˆ Ø¨Ø­Ø« Ø±Ø§Ø¬Ø¹ Ø¨Ù‡ Ø§ÙˆÙ† Ù‡Ù… Ø¨Ù‡ Ù†ÙˆØ¨Ù‡ Ø®ÙˆØ¯ Ø²Ù…Ø§Ù† Ø¨Ø± Ù‡Ø³Øª ØŒ Ø§Ø² Ø¯ÙˆØ³ØªØ§Ù† Ù…ÛŒ Ø®ÙˆØ§Ù… Ù‡Ù…Ø±Ø§Ù‡ÛŒ Ú©Ù†Ù†.', -1, 'ÙˆØ­ÛŒØ¯', 'Ø´Ø³Ø¨Ø´Ø³Ø¨', NULL, '2016-04-12 00:15:37', 1),
(14, 125, 'Ø³Ù„Ø§Ù… Ùˆ Ø³Ù¾Ø§Ø³ Ø§Ø² Ø²Ø­Ù…Ø§Øª Ø´Ù…Ø§!', 11, NULL, NULL, 8, '2016-04-12 00:53:53', 1),
(15, 125, 'Ø¨Ù„Ù‡ Ú©Ø§Ù…Ù„Ø§ Ù…ÙˆØ§ÙÙ‚Ù… Ø¨Ø§ Ù†Ø¸Ø± Ø´Ù…Ø§ Ø¯ÙˆØ³Øª Ø¹Ø²ÛŒØ².', 13, NULL, NULL, 8, '2016-04-12 01:00:10', 1),
(16, 125, 'Ø³Ù„Ø§Ù… Ù„Ø·ÙØ§ Ø®ÙˆØ¯ØªÙˆÙ† Ø±Ùˆ Ù…Ø¹Ø±ÙÛŒ Ú©Ù†ÛŒØ¯!', -1, NULL, NULL, 8, '2016-04-13 23:10:11', 1),
(17, 125, 'Ø¨Ø§Ø´Ù‡', -1, NULL, NULL, 8, '2016-04-13 23:43:44', 1),
(18, 125, 'Ø¨Ù„Ù‡ ØµØ­ÛŒØ­ Ù†ÛŒØ³Øª.', -1, NULL, NULL, 8, '2016-04-13 23:44:57', 1),
(19, 120, 'Ø³Ù„Ø§Ù… Ø¨Ù‡ Ù‡Ù…Ú¯ÛŒ!', -1, NULL, NULL, 8, '2016-04-13 23:53:25', 1),
(20, 120, 'Ù…Ù…Ù†ÙˆÙ† Ø§Ø² Ø´Ù…Ø§.', -1, 'Ù†Ù‚ÛŒ', 'Ø³Ø´Ø¨Ø´Ø³Ø¨ Ø³Ø´Ø¨Ø³Ø´ ÛŒ', NULL, '2016-04-13 23:54:24', 1);

-- --------------------------------------------------------

--
-- Table structure for table `comment_read`
--

CREATE TABLE IF NOT EXISTS `comment_read` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `AdminID` bigint(20) NOT NULL,
  `CommentID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `file_type`
--

CREATE TABLE IF NOT EXISTS `file_type` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Type` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `Explain` text COLLATE utf8_persian_ci,
  `GeneralType` varchar(30) COLLATE utf8_persian_ci NOT NULL,
  `SpecialFolder` varchar(30) COLLATE utf8_persian_ci NOT NULL,
  `NgClass` varchar(100) COLLATE utf8_persian_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=14 ;

--
-- Dumping data for table `file_type`
--

INSERT INTO `file_type` (`ID`, `Type`, `Explain`, `GeneralType`, `SpecialFolder`, `NgClass`) VALUES
(1, 'jpg/jpeg', 'JPG is a file extension for a lossy graphics file.', 'Image', 'img', NULL),
(3, 'png', 'Portable Network Graphics', 'Image', 'img', NULL),
(4, 'zip', NULL, 'Archive', 'archives', 'fa fa-4x fa-file-archive-o'),
(5, 'pdf', NULL, 'Document', 'docs', ' fa fa-4x fa-file-pdf-o'),
(6, 'rar', NULL, 'Archive', 'archives', ' fa fa-4x fa-file-archive-o'),
(7, 'exe', NULL, 'WindowsApp', 'files', ' fa fa-4x fa-windows'),
(8, 'mp3', NULL, 'Sound', 'sounds', ' fa fa-4x fa-music'),
(9, 'apk', NULL, 'AndroidApp', 'apks', ' fa fa-4x fa-android'),
(10, 'mp4', NULL, 'Video', 'videos', ' fa fa-4x fa-video-camera'),
(11, 'swf', NULL, 'Video', 'videos', ' fa fa-4x fa-video-camera'),
(12, 'avi', NULL, 'Video', 'videos', ' fa fa-4x fa-video-camera'),
(13, 'wave', NULL, 'Archive', 'videos', ' fa fa-4x fa-file-archive-o');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE IF NOT EXISTS `gallery` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `FileTypeID` bigint(20) NOT NULL,
  `UploadDate` datetime DEFAULT NULL,
  `Path` text COLLATE utf8_persian_ci NOT NULL,
  `FullPath` text COLLATE utf8_persian_ci NOT NULL,
  `Description` text COLLATE utf8_persian_ci,
  `Alt` text COLLATE utf8_persian_ci,
  `IsMedia` tinyint(1) NOT NULL DEFAULT '1',
  `UserID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=297 ;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`ID`, `FileTypeID`, `UploadDate`, `Path`, `FullPath`, `Description`, `Alt`, `IsMedia`, `UserID`) VALUES
(2, 1, '2016-03-01 00:00:00', 'content/img/', 'content/img/img2.jpg', 'gh', NULL, 1, 0),
(3, 1, '2016-03-01 00:00:00', 'content/img/', 'content/img/img3.jpg', 'ju', NULL, 1, 0),
(4, 1, NULL, 'content/img/', 'content/img/img1.jpg', 'a', NULL, 1, 0),
(5, 1, NULL, 'content/img/', 'content/img/avatar.jpg', 'b', NULL, 0, 0),
(6, 3, NULL, 'content/img/', 'content/img/faramarz.jpg', 'av', NULL, 0, 0),
(8, 1, NULL, 'content/img/', 'content/img/XN0Jx21mfR8RqHrqTx.jpg', 'u', NULL, 1, 0),
(9, 2, NULL, 'content/img/', 'content/img/dT4NDxIXRf6FElHZbG.jpg', 'hg', NULL, 1, 0),
(10, 1, NULL, 'content/img/', 'content/img/h4ViAR7rCuc8CN90h7.jpg', 'ju', NULL, 1, 0),
(278, 1, NULL, 'content/img/', 'content/img/1xxGE29rB40eB1z9RH.JPG', NULL, NULL, 0, 0),
(279, 1, NULL, 'content/img/', 'content/img/gjyrjendVoe1qhe6GR.jpg', NULL, NULL, 0, 0),
(280, 1, NULL, 'content/img/', 'content/img/f7MTZmFY6fKz3UcyOU.JPG', NULL, NULL, 0, 0),
(281, 1, NULL, 'content/img/', 'content/img/W90AtpgqpANRRUrRp5.jpg', NULL, NULL, 0, 0),
(282, 1, NULL, 'content/img/', 'content/img/PO6tfhyaMaV8UyqdB2.JPG', NULL, NULL, 0, 0),
(283, 1, NULL, 'content/img/', 'content/img/MKjIdB1bs5dwH4PlGS.jpg', NULL, NULL, 0, 0),
(284, 1, NULL, 'content/img/', 'content/img/H9ngm4gzGkSiCuTNEE.JPG', NULL, NULL, 0, 0),
(285, 1, NULL, 'content/img/', 'content/img/G5fKbl8HfIS7kgGQqB.png', NULL, NULL, 1, 0),
(287, 4, NULL, 'content/archives/', 'content/archives/6fQWRgUykRMG4KOLc9.jpg', NULL, NULL, 1, 0),
(288, 4, NULL, 'content/archives/', 'content/archives/VcxCjjdtzJKW1WefxT.png', NULL, NULL, 1, 0),
(289, 1, NULL, 'content/img/', 'content/img/w2.jpg', NULL, NULL, 0, 0),
(290, 1, NULL, 'content/img/', 'content/img/bicycle.jpg', 'sa', NULL, 0, 0),
(292, 1, NULL, 'content/img/', 'content/img/aayKmQyFqPocHBby26.PNG', NULL, NULL, 1, 0),
(293, 1, NULL, 'content/img/', 'content/img/d5tt5BDbkCLPzTeSRB.jpg', NULL, NULL, 1, 0),
(294, 4, NULL, 'content/archives/', 'content/archives/large_female_zombie_3d_model_fbx_max__724f199f-1dcc-43c2-b653-50cdff4b58f4.jpg', NULL, NULL, 1, 0),
(295, 6, NULL, 'content/archives/', 'content/archives/1.PNG', NULL, NULL, 1, 0),
(296, 6, NULL, 'content/archives/', 'content/archives/Algoritm-flocharts-www.sourceiran.com.rar', NULL, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `global_settings`
--

CREATE TABLE IF NOT EXISTS `global_settings` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `AboutPageID` bigint(20) NOT NULL,
  `FooterPageID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=25 ;

--
-- Dumping data for table `global_settings`
--

INSERT INTO `global_settings` (`ID`, `AboutPageID`, `FooterPageID`) VALUES
(1, 10, 1),
(2, 8, 1),
(3, 10, 1),
(4, 1, 1),
(5, 10, 1),
(6, 10, 10),
(7, 10, 11),
(8, 10, 11),
(9, 10, 11),
(10, 10, 11),
(11, 10, 11),
(12, 10, 11),
(13, 10, 11),
(14, 10, 11),
(15, 10, 11),
(16, 10, 11),
(17, 10, 11),
(18, 10, 11),
(19, 10, 11),
(20, 10, 11),
(21, 10, 11),
(22, 10, 11),
(23, 10, 11),
(24, 10, 11);

-- --------------------------------------------------------

--
-- Table structure for table `module_position`
--

CREATE TABLE IF NOT EXISTS `module_position` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Position` varchar(40) COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `module_position`
--

INSERT INTO `module_position` (`ID`, `Position`) VALUES
(1, 'Footer'),
(2, 'Header'),
(3, 'RightBar');

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE IF NOT EXISTS `page` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `HtmlContent` text COLLATE utf8_persian_ci NOT NULL,
  `Name` text COLLATE utf8_persian_ci NOT NULL,
  `NameEN` text COLLATE utf8_persian_ci NOT NULL,
  `HtmlContentEN` text COLLATE utf8_persian_ci NOT NULL,
  `PageTypeID` bigint(20) NOT NULL,
  `AdminID` bigint(20) NOT NULL,
  `IsStatic` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=14 ;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`ID`, `HtmlContent`, `Name`, `NameEN`, `HtmlContentEN`, `PageTypeID`, `AdminID`, `IsStatic`) VALUES
(1, '<p></p><p style="color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);"><b>مسعود هستم</b></p><p style="color: rgb(85, 85, 85);text-align: center;background-color: rgb(255, 255, 255);"><b><img src="http://localhost/xampp/website/content/img/img1.jpg" style="height: 373px;width: 596px;"/></b></p><div class="col-xs-12 text-center">heloooooo</div>', 'درباره', 'my about page', '<p>i am masoud</p>', 3, 1, 0),
(8, '<p>بیا</p>', 'بیابیا', 'aaaaaaaaaaa', '<p>ایبایا</p>', 2, 1, 0),
(10, '<p style="text-align: center;">Ø³Ù„Ø§Ù… Ù…Ù† Ù…Ø³Ø¹ÙˆØ¯ Ù‡Ø³ØªÙ… !</p><p></p><div style="text-align: center;"><b>Ø³Ù„Ø§Ù… Ù…Ù† Ù…Ø³Ø¹ÙˆØ¯ Ù‡Ø³ØªÙ… !</b></div><!--StartFragment--><!--StartFragment--><p><span style="color: rgb(85, 85, 85);float: none;background-color: rgb(255, 255, 255);"></span><div style="text-align: center;"><b>Ø³Ù„Ø§Ù… Ù…Ù† Ù…Ø³Ø¹ÙˆØ¯ Ù‡Ø³ØªÙ… !</b></div></p><!--StartFragment--><p><span style="color: rgb(85, 85, 85);float: none;background-color: rgb(255, 255, 255);"></span><div style="text-align: center;"><b>Ø³Ù„Ø§Ù… Ù…Ù† Ù…Ø³Ø¹ÙˆØ¯ Ù‡Ø³ØªÙ… !</b></div></p><p></p><p style="text-align: center;"><span style="color: rgb(85, 85, 85);float: none;background-color: rgb(255, 255, 255);"><img src="content/img/img1.jpg" style="height: 243px;width: 522px;"/><b><br/></b></span></p>', 'ØµÙØ­Ù‡ Ø¯Ø±Ø¨Ø§Ø±Ù‡', 'About', '<p>asf</p>', 2, 1, 0),
(11, '<div class="col-sm-12 yekan-font bottom-padding-20 top-padding-20">\n<div class="col-sm-4 text-center my-white"></div>\n\n<div class="col-sm-4 text-center my-white">\n<div class="col-sm-12 text-center">\n<div class="image-single-cover hvr-bounce-in"><img class="border-radius-500 image-mid my-link" src="content/img/1xxGE29rB40eB1z9RH.jpg" style="width:100%" /></div>\n</div>\n\n<div class="col-sm-4 text-center my-white">\n<div class="col-sm-12 text-center">\n<div class="image-single-cover hvr-bounce-out"><img class="border-radius-500 image-small my-link" src="content/img/XN0Jx21mfR8RqHrqTx.jpg" style="width:100%" /></div>\n</div>\n</div>\n\n<div class="col-sm-12 text-center my-peter top-padding-20" dir="rtl">Ø·Ø±Ø§Ø­ÛŒ Ø´Ø¯Ù‡ ØªÙˆØ³Ø· www.MagicCube.ir</div>\n</div>\n', 'Ù¾Ø§ÙˆØ±Ù‚ÛŒ Ø³Ø§ÛŒØª', 'Footer', '<p>&nbsp;</p>\n\n<div class="col-xs-12 yekan-font" style="height: 300px;">\n<div class="col-xs-4 text-center my-white">Ø³Ù„Ø§Ù…!</div>\n\n<div class="col-xs-4 text-center my-white">Ù¾Ø§ÙˆØ±Ù‚ÛŒ Ø³Ø§ÛŒØª</div>\n\n<div class="col-xs-4 text-center my-white">Ø§ÛŒÙ†Ù… Ø§Ø² Ø§ÛŒÙ†</div>\n</div>\n\n<p>&nbsp;</p>\n', 1, 1, 0),
(12, '<menu style="padding-left:0;margin-top: 0px;"></menu>', 'MenuBar', 'MenuBar', '<menu></menu>', 1, 1, 1),
(13, '<ul class="colorful-list yekan-font">    <div class="col-xs-12 text-center top-padding-20 bottom-padding-20" dir="rtl">Ø³Ù„Ø§Ù… Ù…Ù† Ù…Ø³Ø¹ÙˆØ¯ Ø±Ø¶Ø§Ø®Ø§Ù†Ù„Ùˆ Ù‡Ø³ØªÙ… !</div></ul>', 'ÛŒÛŒÛŒÛŒÛŒÛŒ', 'heyyyy', '<p>Ø´Ø³Ø¨Ø³Ø´</p>', 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `page_type`
--

CREATE TABLE IF NOT EXISTS `page_type` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Type` varchar(35) COLLATE utf8_persian_ci NOT NULL,
  `TypeNameEN` text COLLATE utf8_persian_ci NOT NULL,
  `TypeName` text COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `page_type`
--

INSERT INTO `page_type` (`ID`, `Type`, `TypeNameEN`, `TypeName`) VALUES
(1, 'About', 'About', 'درباره'),
(2, 'RightBar', 'Right SideBar', 'پنل سمت راست'),
(3, 'Other', 'Other Page Types', 'متفرقه');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Title` text CHARACTER SET latin1 NOT NULL,
  `BriefContent` text CHARACTER SET latin1,
  `Content` text CHARACTER SET latin1 NOT NULL,
  `WriteDate` datetime NOT NULL,
  `ReleaseDate` datetime DEFAULT NULL,
  `ImageID` bigint(20) DEFAULT NULL,
  `Hidden` tinyint(1) NOT NULL DEFAULT '0',
  `EnableComment` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=126 ;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`ID`, `Title`, `BriefContent`, `Content`, `WriteDate`, `ReleaseDate`, `ImageID`, `Hidden`, `EnableComment`) VALUES
(115, 'Ù¾Ø³Øª Ø¬Ø¯ÛŒØ¯ Ù…Ù†', '<p><span style="color: rgb(85, 85, 85);float: none;background-color: rgb(255, 255, 255);"><b><b><b>Ø§ÛŒÙ† Ù¾Ø³Øª Ø¨Ù‡ Ù…Ù†Ø¸ÙˆØ± Ù…Ø¹Ø±ÙÛŒ Ø¬Ø¯ÛŒØ¯ØªØ±ÛŒÙ† Ù‡Ø§ Ø¯Ø± Ù†ÙˆØ¹ Ø®ÙˆØ¯ Ù…ÛŒØ¨Ø§Ø´Ø¯ ØŒ Â Ùˆ Ø§Ø² Ø§ÛŒÙ† Ø­ÛŒØ« Ù…Ø´Ú©Ù„ÛŒ Ù†Ø®ÙˆØ§Ù‡Ø¯ Ø¯Ø§Ø´Øª Ú©Ù‡ Ú©Ø§Ø±Ø¨Ø±Ø§Ù† Ù…Ø§ Ø¨Ù‡ Ø³Ø§ÛŒØª Ø§Ø­ØªØ±Ø§Ù… Ú¯Ø°Ø§Ø´ØªÙ‡ Ùˆ Ù…Ø·Ø§Ù„Ø¨ Ø³Ø§ÛŒØª Ø±Ø§ Ú©Ù¾ÛŒ Ù†Ú©Ù†Ù†Ø¯.</b></b></b></span><br/><br/></p>', '<p><b style="color: rgb(85, 85, 85);"><b><b>Ø§ÛŒÙ† Ù¾Ø³Øª Ø¨Ù‡ Ù…Ù†Ø¸ÙˆØ± Ù…Ø¹Ø±ÙÛŒ Ø¬Ø¯ÛŒØ¯ØªØ±ÛŒÙ† Ù‡Ø§ Ø¯Ø± Ù†ÙˆØ¹ Ø®ÙˆØ¯ Ù…ÛŒØ¨Ø§Ø´Ø¯ ØŒ Â Ùˆ Ø§Ø² Ø§ÛŒÙ† Ø­ÛŒØ« Ù…Ø´Ú©Ù„ÛŒ Ù†Ø®ÙˆØ§Ù‡Ø¯ Ø¯Ø§Ø´Øª Ú©Ù‡ Ú©Ø§Ø±Ø¨Ø±Ø§Ù† Ù…Ø§ Ø¨Ù‡ Ø³Ø§ÛŒØª Ø§Ø­ØªØ±Ø§Ù… Ú¯Ø°Ø§Ø´ØªÙ‡ Ùˆ Ù…Ø·Ø§Ù„Ø¨ Ø³Ø§ÛŒØª Ø±Ø§ Ú©Ù¾ÛŒ Ù†Ú©Ù†Ù†Ø¯.</b></b></b><br/><br/></p>', '2016-04-07 19:30:00', '2016-04-07 19:30:00', 10, 0, 1),
(116, 'Ø¯Ø±Ø¨Ø§Ø±Ù‡ ÙˆØ¨ Ø³Ø§ÛŒØª', '<p dir="rtl">Ø³Ù„Ø§Ù… Ù…Ù† Ù…Ø³Ø¹ÙˆØ¯ Ø®Ø§Ù†Ù„Ùˆ Ù‡Ø³ØªÙ…! Ø¨Ø§ Ø§Ù†ÙˆØ§Ø¹ App Ø§Ø´Ù†Ø§ Ø´ÙˆÛŒØ¯!</p>\n', '<p dir="rtl">Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;</p>\n', '2016-04-09 19:30:00', '2016-04-09 19:30:00', 3, 0, 1),
(117, 'Ø¯Ø±Ø¨Ø§Ø±Ù‡ ÙˆØ¨ Ø³Ø§ÛŒØª', '<p dir="rtl">Ø³Ù„Ø§Ù… Ù…Ù† Ù…Ø³Ø¹ÙˆØ¯ Ø®Ø§Ù†Ù„Ùˆ Ù‡Ø³ØªÙ…! Ø¨Ø§ Ø§Ù†ÙˆØ§Ø¹ App Ø§Ø´Ù†Ø§ Ø´ÙˆÛŒØ¯!</p>\n', '<p dir="rtl">Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;</p>\n', '2016-04-09 19:30:00', '2016-04-09 19:30:00', 3, 0, 1),
(118, 'Ø¯Ø±Ø¨Ø§Ø±Ù‡ ÙˆØ¨ Ø³Ø§ÛŒØª', '<p dir="rtl">Ø³Ù„Ø§Ù… Ù…Ù† Ù…Ø³Ø¹ÙˆØ¯ Ø®Ø§Ù†Ù„Ùˆ Ù‡Ø³ØªÙ…! Ø¨Ø§ Ø§Ù†ÙˆØ§Ø¹ App Ø§Ø´Ù†Ø§ Ø´ÙˆÛŒØ¯!</p>\n', '<div dir="rtl" style="background:#eee;border:1px solid #ccc;padding:5px 10px;">Ø§Ø´Ø³Ø¨Ø³</div>\n\n<div dir="rtl" style="background:#eee;border:1px solid #ccc;padding:5px 10px;">&nbsp;</div>\n\n<p>&nbsp;</p>\n\n<div dir="rtl" style="background:#eee;border:1px solid #ccc;padding:5px 10px;">&nbsp;</div>\n\n<div dir="rtl" style="background:#eee;border:1px solid #ccc;padding:5px 10px;">Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;Ø§Ø´Ø³Ø¨Ø³Ø´Ø¨ Ø³Ø´Ø¨Ø³Ø´&nbsp;</div>\n', '2016-04-09 19:30:00', '2016-04-09 19:30:00', 3, 0, 1),
(119, 'Ù¾Ø³Øª Ø¬Ø¯ÛŒØ¯ Ù…Ù†', '<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n', '<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n', '2016-04-10 19:30:00', '2016-04-10 19:30:00', 10, 0, 1),
(120, 'Ù¾Ø³Øª Ø¬Ø¯ÛŒØ¯ Ù…Ù†', '<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n', '<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n\n<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ù‡ ØªÙ…Ø§Ù…ÛŒ Ø§Ø¹Ø¶Ø§ÛŒ Ø³Ø§ÛŒØª ØŒ Ù…Ù† Ø¨Ø¹Ø¯ Ù…Ø·Ø§Ù„Ø¨ Ù…ÙÛŒØ¯ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ø¯Ø± Ø§ÛŒÙ† ÙˆØ¨Ø³Ø§ÛŒØª Ù‚Ø±Ø§Ø± Ø®ÙˆØ§Ù‡Ø¯ Ú¯Ø±ÙØª!</p>\n', '2016-04-10 19:30:00', '2016-04-10 19:30:00', 10, 0, 1),
(121, 'afwq', '<p dir="rtl">Ø¯Ø±ÙˆØ¯ Ø¨Ø± Ø´Ù…Ø§ ØŒ Ø³Ø§ÛŒØª Ù…Ù† Ø´Ø±ÙˆØ¹ Ø¨Ù‡ Ú©Ø§Ø± Ú©Ø±Ø¯!<img alt="laugh" src="http://localhost/xampp/website/js/editor/ckeditor/plugins/smiley/images/teeth_smile.png" style="height:23px; width:23px" title="laugh" /></p>\n', '', '2016-04-10 19:30:00', '2016-04-10 19:30:00', 8, 0, 1),
(122, 'hellllll', '<p>safasf</p>\n', '<p>asfasf</p>\n', '2016-04-10 19:30:00', '2016-04-10 19:30:00', 8, 0, 1),
(123, 'gggg', '<p>dsfads</p>\n', '<p>asfsaf</p>\n', '2016-04-10 19:30:00', '2016-04-10 19:30:00', 4, 0, 1),
(125, 'asf', '<p>safasf</p>\n', '<p>saf</p>\n', '2016-04-10 19:30:00', '2016-04-10 19:30:00', 3, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `post_author`
--

CREATE TABLE IF NOT EXISTS `post_author` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `AdminID` bigint(20) NOT NULL,
  `PostID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=166 ;

--
-- Dumping data for table `post_author`
--

INSERT INTO `post_author` (`ID`, `AdminID`, `PostID`) VALUES
(4, 1, 35),
(5, 1, 36),
(6, 1, 37),
(7, 1, 38),
(8, 1, 39),
(9, 1, 40),
(10, 1, 41),
(11, 1, 42),
(12, 1, 43),
(13, 1, 44),
(14, 1, 45),
(15, 1, 46),
(16, 1, 47),
(17, 1, 49),
(18, 1, 48),
(19, 1, 50),
(20, 1, 51),
(21, 1, 52),
(22, 1, 53),
(23, 1, 54),
(24, 1, 55),
(25, 1, 56),
(26, 1, 57),
(27, 1, 58),
(28, 1, 59),
(29, 1, 60),
(30, 1, 61),
(31, 1, 62),
(32, 1, 63),
(33, 1, 64),
(34, 1, 65),
(35, 1, 66),
(36, 1, 67),
(37, 1, 68),
(38, 1, 69),
(39, 1, 70),
(40, 1, 71),
(41, 1, 72),
(42, 1, 73),
(43, 1, 74),
(44, 1, 75),
(45, 1, 76),
(46, 1, 77),
(47, 1, 78),
(48, 1, 79),
(49, 1, 80),
(50, 1, 81),
(51, 1, 82),
(52, 1, 83),
(53, 1, 84),
(54, 1, 85),
(55, 1, 86),
(56, 1, 87),
(57, 1, 88),
(58, 1, 89),
(59, 1, 90),
(60, 1, 91),
(61, 1, 92),
(62, 1, 93),
(63, 1, 94),
(64, 1, 95),
(65, 1, 96),
(67, 1, 1),
(68, 1, 1),
(69, 1, 1),
(70, 1, 98),
(71, 1, 99),
(72, 7, 99),
(73, 9, 99),
(74, 10, 99),
(75, 1, 100),
(76, 7, 100),
(77, 9, 100),
(78, 10, 100),
(79, 1, 101),
(80, 7, 101),
(81, 9, 101),
(82, 10, 101),
(83, 1, 102),
(84, 7, 102),
(85, 9, 102),
(86, 10, 102),
(87, 1, 103),
(88, 7, 103),
(89, 9, 103),
(90, 10, 103),
(91, 1, 104),
(92, 7, 104),
(93, 9, 104),
(94, 10, 104),
(95, 1, 105),
(96, 7, 105),
(97, 9, 105),
(98, 10, 105),
(99, 1, 106),
(100, 7, 106),
(101, 9, 106),
(102, 10, 106),
(105, 1, 1),
(106, 9, 1),
(107, 1, 1),
(108, 9, 1),
(109, 1, 1),
(110, 9, 1),
(111, 1, 1),
(112, 9, 1),
(113, 1, 1),
(114, 9, 1),
(148, 1, 107),
(149, 9, 107),
(150, 10, 107),
(151, 1, 115),
(153, 7, 121),
(154, 1, 122),
(155, 7, 122),
(156, 1, 123),
(157, 7, 123),
(158, 1, 124),
(159, 7, 124),
(165, 1, 125);

-- --------------------------------------------------------

--
-- Table structure for table `post_like`
--

CREATE TABLE IF NOT EXISTS `post_like` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PostID` bigint(20) NOT NULL,
  `Date` datetime NOT NULL,
  `Identity` varchar(60) COLLATE utf8_persian_ci NOT NULL,
  `UserID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=31 ;

--
-- Dumping data for table `post_like`
--

INSERT INTO `post_like` (`ID`, `PostID`, `Date`, `Identity`, `UserID`) VALUES
(2, 105, '2016-04-07 17:27:40', '127.0.0.1', 0),
(3, 102, '2016-04-07 18:48:06', '127.0.0.1', 0),
(4, 103, '2016-04-07 18:48:08', '127.0.0.1', 0),
(5, 92, '2016-04-07 21:19:05', '127.0.0.1', 8),
(6, 106, '2016-04-07 21:19:11', '127.0.0.1', 8),
(7, 97, '2016-04-07 21:21:51', '127.0.0.1', 8),
(8, 98, '2016-04-08 00:11:08', '127.0.0.1', 14),
(9, 96, '2016-04-08 19:32:33', '::1', 8),
(10, 100, '2016-04-08 19:32:53', '::1', 8),
(18, 125, '2016-04-14 20:25:13', '127.0.0.1', 8),
(19, 121, '2016-04-14 20:25:16', '127.0.0.1', 8),
(22, 123, '2016-04-14 20:37:06', '127.0.0.1', 8),
(23, 119, '2016-04-14 20:37:14', '127.0.0.1', 8),
(25, 122, '2016-04-14 23:35:41', '::1', 8),
(27, 117, '2016-04-16 19:46:38', '::1', 8),
(30, 120, '2016-04-18 22:30:21', '::1', 8);

-- --------------------------------------------------------

--
-- Table structure for table `post_subject`
--

CREATE TABLE IF NOT EXISTS `post_subject` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PostID` bigint(20) NOT NULL,
  `SubjectID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=391 ;

--
-- Dumping data for table `post_subject`
--

INSERT INTO `post_subject` (`ID`, `PostID`, `SubjectID`) VALUES
(44, 43, 6),
(45, 43, 10),
(46, 44, 3),
(47, 44, 6),
(48, 44, 10),
(49, 45, 3),
(50, 45, 6),
(51, 46, 3),
(52, 45, 10),
(53, 46, 6),
(54, 47, 3),
(55, 46, 10),
(56, 47, 6),
(57, 47, 10),
(58, 48, 3),
(59, 49, 3),
(60, 51, 3),
(61, 50, 3),
(62, 52, 3),
(63, 49, 6),
(64, 50, 6),
(65, 48, 6),
(66, 51, 6),
(67, 48, 10),
(68, 49, 10),
(69, 50, 10),
(70, 52, 6),
(71, 51, 10),
(72, 53, 3),
(73, 52, 10),
(74, 53, 6),
(75, 54, 3),
(76, 53, 10),
(77, 55, 3),
(78, 54, 6),
(79, 55, 6),
(80, 56, 3),
(81, 54, 10),
(82, 55, 10),
(83, 56, 6),
(84, 56, 10),
(85, 57, 3),
(86, 57, 6),
(87, 58, 3),
(88, 57, 10),
(89, 58, 6),
(90, 59, 3),
(91, 58, 10),
(92, 59, 6),
(93, 59, 10),
(94, 60, 3),
(95, 60, 6),
(96, 60, 10),
(97, 61, 3),
(98, 61, 6),
(99, 61, 10),
(100, 62, 3),
(101, 62, 6),
(102, 62, 10),
(103, 63, 3),
(104, 63, 6),
(105, 64, 3),
(106, 63, 10),
(107, 64, 6),
(108, 65, 3),
(109, 64, 10),
(110, 65, 6),
(111, 65, 10),
(112, 66, 3),
(113, 66, 6),
(114, 66, 10),
(115, 67, 3),
(116, 67, 6),
(117, 67, 10),
(118, 68, 3),
(119, 68, 6),
(120, 68, 10),
(121, 69, 3),
(122, 69, 6),
(123, 69, 10),
(124, 70, 3),
(125, 70, 6),
(126, 70, 10),
(127, 71, 3),
(128, 71, 6),
(129, 71, 10),
(130, 72, 3),
(131, 72, 6),
(132, 72, 10),
(133, 73, 3),
(134, 73, 6),
(135, 73, 10),
(136, 74, 3),
(137, 74, 6),
(138, 74, 10),
(139, 75, 3),
(140, 75, 6),
(141, 75, 10),
(142, 76, 3),
(143, 76, 6),
(144, 76, 10),
(145, 77, 3),
(146, 78, 3),
(147, 77, 6),
(148, 78, 6),
(149, 77, 10),
(150, 78, 10),
(151, 79, 3),
(152, 79, 6),
(153, 79, 10),
(154, 80, 3),
(155, 80, 6),
(156, 80, 10),
(157, 81, 3),
(158, 81, 6),
(159, 82, 3),
(160, 81, 10),
(161, 82, 6),
(162, 83, 3),
(163, 82, 10),
(164, 84, 3),
(165, 83, 6),
(166, 84, 6),
(167, 83, 10),
(168, 84, 10),
(169, 85, 3),
(170, 85, 6),
(171, 85, 10),
(172, 86, 3),
(173, 86, 6),
(174, 87, 3),
(175, 86, 10),
(176, 87, 6),
(177, 87, 10),
(178, 88, 3),
(179, 88, 6),
(180, 88, 10),
(181, 89, 3),
(182, 89, 6),
(183, 89, 10),
(184, 90, 3),
(185, 90, 6),
(186, 90, 10),
(187, 91, 3),
(188, 91, 6),
(189, 91, 10),
(190, 92, 3),
(191, 92, 6),
(192, 93, 3),
(193, 92, 10),
(194, 94, 3),
(195, 93, 6),
(196, 94, 6),
(197, 93, 10),
(198, 94, 10),
(199, 95, 3),
(200, 95, 6),
(201, 95, 10),
(202, 96, 3),
(203, 96, 6),
(204, 96, 10),
(208, 1, 3),
(209, 1, 6),
(210, 1, 10),
(211, 1, 3),
(212, 1, 6),
(213, 1, 10),
(214, 1, 3),
(215, 1, 6),
(216, 1, 10),
(217, 98, 3),
(218, 98, 6),
(219, 98, 10),
(220, 99, 3),
(221, 99, 6),
(222, 99, 10),
(223, 100, 3),
(224, 100, 6),
(225, 100, 10),
(226, 101, 3),
(227, 101, 6),
(228, 101, 10),
(229, 102, 3),
(230, 102, 4),
(231, 102, 5),
(232, 102, 6),
(233, 102, 7),
(234, 102, 8),
(235, 102, 9),
(236, 102, 10),
(237, 102, 11),
(238, 102, 12),
(239, 102, 20),
(240, 102, 21),
(241, 102, 23),
(242, 102, 24),
(243, 103, 3),
(244, 103, 4),
(245, 103, 5),
(246, 103, 6),
(247, 103, 7),
(248, 103, 8),
(249, 103, 9),
(250, 103, 10),
(251, 103, 11),
(252, 103, 12),
(253, 103, 20),
(254, 103, 21),
(255, 103, 23),
(256, 103, 24),
(257, 104, 3),
(258, 104, 4),
(259, 104, 5),
(260, 104, 6),
(261, 104, 7),
(262, 104, 8),
(263, 104, 9),
(264, 104, 10),
(265, 104, 11),
(266, 104, 12),
(267, 104, 20),
(268, 104, 21),
(269, 104, 23),
(270, 104, 24),
(271, 105, 3),
(272, 105, 4),
(273, 105, 5),
(274, 105, 6),
(275, 105, 7),
(276, 105, 8),
(277, 105, 9),
(278, 105, 10),
(279, 105, 11),
(280, 105, 12),
(281, 105, 20),
(282, 105, 21),
(283, 105, 23),
(284, 105, 24),
(285, 106, 3),
(286, 106, 4),
(287, 106, 5),
(288, 106, 6),
(289, 106, 7),
(290, 106, 8),
(291, 106, 9),
(292, 106, 10),
(293, 106, 11),
(294, 106, 12),
(295, 106, 20),
(296, 106, 21),
(297, 106, 23),
(298, 106, 24),
(301, 1, 3),
(302, 1, 4),
(303, 1, 5),
(304, 1, 6),
(305, 1, 3),
(306, 1, 4),
(307, 1, 5),
(308, 1, 6),
(309, 1, 3),
(310, 1, 4),
(311, 1, 5),
(312, 1, 3),
(313, 1, 4),
(314, 1, 5),
(315, 1, 3),
(316, 1, 4),
(317, 1, 5),
(357, 107, 3),
(358, 107, 5),
(359, 107, 6),
(360, 115, 3),
(361, 115, 4),
(364, 121, 3),
(365, 121, 4),
(366, 121, 6),
(367, 122, 3),
(368, 122, 4),
(369, 123, 3),
(370, 123, 4),
(371, 124, 3),
(372, 124, 4),
(388, 125, 3),
(389, 125, 4),
(390, 125, 5);

-- --------------------------------------------------------

--
-- Table structure for table `site_module`
--

CREATE TABLE IF NOT EXISTS `site_module` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` text COLLATE utf8_persian_ci NOT NULL,
  `NameEN` text COLLATE utf8_persian_ci NOT NULL,
  `PageID` text COLLATE utf8_persian_ci NOT NULL,
  `ModulePositionID` bigint(20) NOT NULL,
  `SortOrder` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=39 ;

--
-- Dumping data for table `site_module`
--

INSERT INTO `site_module` (`ID`, `Name`, `NameEN`, `PageID`, `ModulePositionID`, `SortOrder`) VALUES
(37, '', '', '13', 3, 1),
(38, '', '', '12', 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE IF NOT EXISTS `slider` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ImageID` bigint(20) NOT NULL,
  `Title` text COLLATE utf8_persian_ci NOT NULL,
  `Content` text COLLATE utf8_persian_ci NOT NULL,
  `Link` text COLLATE utf8_persian_ci NOT NULL,
  `ShowOrder` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=7 ;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`ID`, `ImageID`, `Title`, `Content`, `Link`, `ShowOrder`) VALUES
(5, 290, 'a', 'a', 'a', -1),
(6, 289, 'afsa', 'gadsg', 'ags', 1);

-- --------------------------------------------------------

--
-- Table structure for table `static_module`
--

CREATE TABLE IF NOT EXISTS `static_module` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `HtmlContent` text COLLATE utf8_persian_ci NOT NULL,
  `ModulePositionID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `static_module`
--

INSERT INTO `static_module` (`ID`, `Name`, `HtmlContent`, `ModulePositionID`) VALUES
(1, 'MenuBar', '<menu></menu>', 3);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE IF NOT EXISTS `subject` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Title` text NOT NULL,
  `ParentID` bigint(20) DEFAULT '-1',
  `TitleEN` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`ID`, `Title`, `ParentID`, `TitleEN`) VALUES
(3, 'Software', -1, ''),
(4, 'Player', 3, ''),
(5, 'Tools', 3, ''),
(6, 'OS', -1, ''),
(7, 'Windows', 6, ''),
(8, 'Linux', 6, ''),
(9, 'Mac', 6, ''),
(10, 'Media', -1, ''),
(11, 'Video', 10, ''),
(12, 'Sounds', 10, ''),
(21, 'feesc', 20, ''),
(24, 'hbkj', 6, ''),
(25, 'sdsds', -1, ''),
(26, 'safsa', -1, ''),
(27, 'aaaa', 26, '');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(200) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(200) NOT NULL,
  `AvatarID` bigint(20) DEFAULT NULL,
  `IP` varchar(70) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `FirstName`, `LastName`, `Username`, `Email`, `Password`, `AvatarID`, `IP`) VALUES
(8, 'masoud', 'khanlo', 'MasoudRK', 'masoud.n1374@gmail.com', '$2a$10$4b4cbfad13b3b59e29118u.UqNHMv3IiF0/kzivXiXhfU0KiXvM9u', 284, ''),
(9, 'aas', 'dds', 'aa', 'masoud.rk95@gmail.com', '$2a$10$2764956e317626d7e4452uIpu2KtkUitfpqTW1XSrIuPNb1WePorq', NULL, ''),
(10, 'aas', 'dds', 'aa2', 'masoud.rk95@gmail.com2', '$2a$10$9bcd0616fc0dd19cf4d5euHhY46l9yPcINCeRFbwKAXKarEj3ocHe', NULL, ''),
(11, 'sag', 'sag', 'saf', 'sdfasf', '$2a$10$23ad52ca2401fa7b9d9bae.SWzMNTfQe1ndE1SyVA7ysPf88u9Nqy', 6, ''),
(14, 'a', 'a', 'a', 'a', '$2a$10$afa5710c8a4028ea90edauAF1mukkZhTaKA.smPmkCJybfjEnddcW', NULL, '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
