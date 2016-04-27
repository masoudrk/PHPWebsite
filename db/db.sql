-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2016 at 07:32 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=33 ;

--
-- Triggers `comment`
--
DROP TRIGGER IF EXISTS `MentionComment`;
DELIMITER //
CREATE TRIGGER `MentionComment` AFTER INSERT ON `comment`
 FOR EACH ROW Begin
  DECLARE cursor_ID INT;
  DECLARE AdminID Bigint;
  DECLARE done INT DEFAULT FALSE;
  DECLARE cursor_i CURSOR FOR SELECT ID FROM admin;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
  
  OPEN cursor_i;
  read_loop: LOOP
    FETCH cursor_i INTO AdminID;
    IF done THEN
      LEAVE read_loop;
    END IF;
    INSERT INTO comment_read(AdminID, CommentID) VALUES(AdminID, New.ID);
  END LOOP;
  CLOSE cursor_i;
  
End
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `comment_read`
--

CREATE TABLE IF NOT EXISTS `comment_read` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `AdminID` bigint(20) NOT NULL,
  `CommentID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=35 ;

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE IF NOT EXISTS `contact_us` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserID` bigint(20) DEFAULT NULL,
  `Identity` text COLLATE utf8_persian_ci,
  `Name` varchar(100) COLLATE utf8_persian_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8_persian_ci DEFAULT NULL,
  `PhoneNumber` varchar(50) COLLATE utf8_persian_ci DEFAULT NULL,
  `Message` varchar(4000) COLLATE utf8_persian_ci DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=7 ;

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

-- --------------------------------------------------------

--
-- Table structure for table `global_settings`
--

CREATE TABLE IF NOT EXISTS `global_settings` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `AboutPageID` bigint(20) NOT NULL,
  `FooterPageID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=34 ;

-- --------------------------------------------------------

--
-- Table structure for table `module_position`
--

CREATE TABLE IF NOT EXISTS `module_position` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Position` varchar(40) COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=4 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=15 ;

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

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Title` text CHARACTER SET latin1 NOT NULL,
  `TitleEN` text NOT NULL,
  `BriefContent` text CHARACTER SET latin1,
  `BriefContentEN` text NOT NULL,
  `Content` text CHARACTER SET latin1 NOT NULL,
  `ContentEN` text NOT NULL,
  `WriteDate` datetime NOT NULL,
  `ReleaseDate` datetime DEFAULT NULL,
  `ImageID` bigint(20) DEFAULT NULL,
  `Hidden` tinyint(1) NOT NULL DEFAULT '0',
  `EnableComment` tinyint(1) NOT NULL DEFAULT '1',
  `EnableEnglish` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=124 ;

-- --------------------------------------------------------

--
-- Table structure for table `post_author`
--

CREATE TABLE IF NOT EXISTS `post_author` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `AdminID` bigint(20) NOT NULL,
  `PostID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=207 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=35 ;

-- --------------------------------------------------------

--
-- Table structure for table `post_subject`
--

CREATE TABLE IF NOT EXISTS `post_subject` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PostID` bigint(20) NOT NULL,
  `SubjectID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=461 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=66 ;

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

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE IF NOT EXISTS `subject` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Title` text NOT NULL,
  `TitleEN` text NOT NULL,
  `ParentID` bigint(20) DEFAULT '-1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=41 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(100) NOT NULL,
  `FirstNameEN` varchar(100) DEFAULT NULL,
  `LastName` varchar(200) NOT NULL,
  `LastNameEN` varchar(100) DEFAULT NULL,
  `Username` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(200) NOT NULL,
  `AvatarID` bigint(20) DEFAULT NULL,
  `IP` varchar(70) NOT NULL,
  `SessionID` varchar(100) NOT NULL,
  `SessionValid` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
