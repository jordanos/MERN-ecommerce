-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2022 at 07:41 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mina_shopping`
--

-- --------------------------------------------------------

--
-- Table structure for table `catagories`
--

CREATE TABLE `catagories` (
  `catagoryid` int(11) NOT NULL,
  `catagory` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `catagories` (`catagoryid`, `catagory`) VALUES
(1, 'shoes'),
(3, 'tree'),
(5, 'footwear'),
(6, 'bags'),
(7, 'accessories'),
(8, 'jewelry'),
(9, ' eyewear'),
(10, ' beaut'),
(11, ' beauty'),
(12, ' toys'),
(13, ' children’s clothing'),
(14, 'phone'),
(15, 'dress');

-- --------------------------------------------------------

--
-- Table structure for table `conversation`
--

CREATE TABLE `conversation` (
  `conversationid` int(11) NOT NULL,
  `senderid` int(11) NOT NULL,
  `reciverid` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `conversation`
--

INSERT INTO `conversation` (`conversationid`, `senderid`, `reciverid`, `time`) VALUES
(1, 1, 2, '2022-01-21 17:16:03'),
(2, 4, 3, '2022-01-21 17:16:03'),
(3, 1, 12, '2022-01-21 17:37:05'),
(12, 1, 3, '2022-01-28 13:03:06'),
(13, 11, 1, '2022-01-28 13:27:18'),
(19, 2, 11, '2022-01-28 13:29:20'),
(23, 11, 3, '2022-01-31 07:50:30'),
(31, 12, 11, '2022-01-31 11:52:31'),
(33, 12, 2, '2022-01-31 12:12:43'),
(34, 93, 11, '2022-02-09 14:11:17'),
(36, 12, 3, '2022-02-10 12:58:47'),
(38, 12, 93, '2022-02-14 07:05:53'),
(40, 12, 95, '2022-02-15 11:32:33'),
(42, 95, 1, '2022-02-15 11:34:22'),
(44, 95, 11, '2022-02-15 11:49:35'),
(46, 95, 2, '2022-02-15 12:01:31'),
(48, 95, 3, '2022-02-15 12:02:05'),
(50, 1, 75, '2022-02-28 11:35:54'),
(51, 1, 35, '2022-02-28 11:36:18'),
(52, 1, 89, '2022-02-28 11:36:34'),
(53, 12, 75, '2022-03-14 07:37:43'),
(54, 12, 85, '2022-03-22 07:53:23');

-- --------------------------------------------------------

--
-- Table structure for table `feedlikes`
--

CREATE TABLE `feedlikes` (
  `likeid` int(11) NOT NULL,
  `feedid` int(11) NOT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedlikes`
--

INSERT INTO `feedlikes` (`likeid`, `feedid`, `userid`) VALUES
(5, 1, 2),
(123, 1, 11),
(8, 1, 51),
(9, 1, 53),
(6, 1, 89),
(15, 2, 12),
(65, 5, 12),
(119, 6, 1),
(118, 8, 1),
(14, 8, 12),
(12, 9, 12),
(108, 11, 1),
(74, 11, 12),
(16, 33, 12),
(104, 35, 11),
(24, 37, 12),
(64, 38, 12),
(126, 39, 11),
(51, 39, 12),
(124, 40, 11),
(143, 40, 12),
(142, 40, 95),
(121, 43, 11),
(127, 45, 11),
(159, 47, 12),
(145, 49, 11),
(163, 49, 12);

-- --------------------------------------------------------

--
-- Table structure for table `feeds`
--

CREATE TABLE `feeds` (
  `feedid` int(11) NOT NULL,
  `text` longtext NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` varchar(200) NOT NULL,
  `postedby` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feeds`
--

INSERT INTO `feeds` (`feedid`, `text`, `date`, `image`, `postedby`) VALUES
(1, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-05 07:22:07', 'feed_image_1641373875189.jpg', 1),
(2, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-05 07:23:03', 'feed_image_1641373875189.jpg', 2),
(5, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-05 08:04:39', 'feed_image_1641373875189.jpg', 2),
(6, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-05 08:46:56', 'feed_image_1641373875189.jpg', 2),
(7, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-05 08:48:13', 'feed_image_1641373875189.jpg', 2),
(8, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-05 08:50:41', 'feed_image_1641373875189.jpg', 2),
(9, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-05 08:58:31', 'feed_image_1641373875189.jpg', 2),
(11, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-05 09:11:15', 'feed_image_1641373875189.jpg', 2),
(12, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-10 07:20:24', 'feed_image_1641799224501.webp', 1),
(13, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-13 06:10:55', 'feed_image_1642054255225.jpg', 1),
(14, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-13 07:25:32', 'feed_multi-files_1642058732839.jpg,feed_multi-files_1642058732840.jpg,', 1),
(24, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-27 14:19:27', 'feed_multi-files_1643293167207.jpg,', 1),
(33, '', '2022-01-28 09:27:05', 'feed_multi-files_1643362025316.jpg,', 11),
(34, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-02-01 08:06:32', 'feed_multi-files_1643702792690.jpg,', 1),
(35, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-02-01 08:06:47', 'feed_multi-files_1643702807877.jpg,', 1),
(36, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-02-01 08:41:01', 'feed_multi-files_1643704861227.jpg,', 1),
(37, 'woww', '2022-02-01 14:06:38', 'feed_multi-files_1643724397822.jpg,', 11),
(38, 'this is me', '2022-02-01 14:06:54', 'feed_multi-files_1643724413973.jpg,', 11),
(39, 'newwwww', '2022-02-01 14:21:08', 'feed_multi-files_1643725268120.jpg,', 11),
(40, 'New test to check like', '2022-02-02 08:44:07', '', 11),
(43, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-02-03 11:12:42', 'feed_multi-files_1643886762518.jpg,', 1),
(45, '', '2022-02-10 07:22:59', '', 1),
(46, 'asdfghjhhhhhhhjfcfy', '2022-02-10 08:04:11', '', 1),
(47, 'adasddads', '2022-02-10 08:23:49', '', 1),
(49, 'adasddads', '2022-02-10 08:24:48', '', 1),
(60, 'hdjhejejeuregnglkjg', '2022-03-22 09:25:17', '', 12),
(62, 'bbjhki8uhuii998u89', '2022-03-23 12:22:10', 'feed_multi-files_1648038129982.jpg,', 12);

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `followid` int(11) NOT NULL,
  `follower` int(11) NOT NULL,
  `following` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `follow`
--

INSERT INTO `follow` (`followid`, `follower`, `following`) VALUES
(1, 1, 2),
(97, 1, 12),
(3, 2, 1),
(2, 2, 11),
(94, 11, 1),
(71, 11, 2),
(52, 11, 3),
(88, 11, 12),
(79, 11, 93),
(96, 12, 1),
(85, 12, 11),
(69, 12, 51),
(67, 12, 75),
(66, 12, 85),
(64, 12, 89),
(86, 12, 93),
(90, 95, 1),
(91, 95, 11),
(89, 95, 12);

-- --------------------------------------------------------

--
-- Table structure for table `heroproducts`
--

CREATE TABLE `heroproducts` (
  `heroproductid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `heroproducts`
--

INSERT INTO `heroproducts` (`heroproductid`, `name`, `image`, `description`) VALUES
(28, 'hero1', 'image_1643636561296.jpg', 'hero'),
(29, 'hero2', 'image_1643636583242.jpg', 'hero');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `messageid` int(11) NOT NULL,
  `conversationid` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `text` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`messageid`, `conversationid`, `sender`, `text`, `time`, `status`) VALUES
(1, 1, 1, 'Hy bro', '2022-01-21 17:54:58', 0),
(2, 1, 2, 'sup my nigga', '2022-01-21 17:55:20', 1),
(3, 3, 12, 'hello i am aser', '2022-01-22 13:50:16', 1),
(4, 1, 1, 'helo from react', '2022-01-22 14:03:33', 0),
(37, 1, 1, 'its working man', '2022-01-22 14:37:41', 0),
(62, 1, 1, 'popo', '2022-01-22 18:46:25', 0),
(63, 1, 1, 'papa', '2022-01-22 18:47:28', 0),
(68, 1, 1, 'ajhd', '2022-01-22 18:49:24', 0),
(73, 3, 1, 'halo helo', '2022-01-24 07:11:27', 1),
(74, 3, 12, 'men lesaf', '2022-01-24 07:11:40', 1),
(75, 3, 1, 'kezi', '2022-01-24 07:11:58', 1),
(76, 1, 1, 'sasd', '2022-01-24 07:12:12', 0),
(77, 3, 12, 'f', '2022-01-24 07:39:01', 1),
(78, 3, 12, 'e', '2022-01-24 07:41:43', 1),
(79, 3, 12, 'h', '2022-01-24 07:43:28', 1),
(80, 3, 12, 'l', '2022-01-24 07:44:04', 1),
(81, 3, 12, 'f', '2022-01-24 07:44:40', 1),
(82, 3, 12, 'd', '2022-01-24 07:45:06', 1),
(83, 3, 12, 'f', '2022-01-24 07:45:28', 1),
(84, 3, 12, 'dff', '2022-01-24 07:50:31', 1),
(85, 3, 12, 'f', '2022-01-24 07:52:34', 1),
(86, 3, 12, 'f', '2022-01-24 07:53:48', 1),
(87, 3, 12, '', '2022-01-24 07:53:51', 1),
(88, 3, 12, 'h', '2022-01-24 07:54:41', 1),
(89, 3, 12, 'ad', '2022-01-24 07:54:58', 1),
(90, 3, 12, 'R', '2022-01-24 07:56:49', 1),
(91, 3, 12, 'JG', '2022-01-24 07:57:32', 1),
(92, 3, 12, 'ad', '2022-01-24 07:58:36', 1),
(93, 3, 1, 'da', '2022-01-24 08:00:04', 1),
(94, 3, 1, 'd', '2022-01-24 08:00:36', 1),
(95, 3, 12, 'fs', '2022-01-24 08:01:12', 1),
(96, 3, 12, 'da', '2022-01-24 08:04:06', 1),
(97, 3, 12, 'da', '2022-01-24 08:04:10', 1),
(98, 3, 12, 'da', '2022-01-24 08:04:19', 1),
(99, 3, 12, 'sasffda', '2022-01-24 08:07:10', 1),
(100, 3, 12, 'fds', '2022-01-24 08:07:24', 1),
(101, 3, 1, '', '2022-01-24 12:00:41', 1),
(102, 3, 1, 'g', '2022-01-24 12:01:34', 1),
(103, 3, 1, 'g', '2022-01-24 12:03:35', 1),
(104, 3, 1, '', '2022-01-24 12:13:34', 1),
(105, 3, 1, '', '2022-01-24 12:13:37', 1),
(106, 3, 1, 'fs', '2022-01-24 12:13:38', 1),
(107, 1, 2, 'hi', '2022-01-28 11:29:38', 1),
(108, 1, 2, '', '2022-01-28 11:38:25', 1),
(109, 1, 2, 'hy\n', '2022-01-28 11:59:50', 1),
(110, 1, 1, 'hy abeni', '2022-01-28 11:59:59', 0),
(111, 1, 1, '', '2022-01-28 12:01:36', 0),
(112, 3, 12, 'hello i am aser', '2022-01-28 13:17:32', 1),
(113, 3, 12, 'Msg from Phone test 1', '2022-01-28 13:27:21', 1),
(114, 3, 12, 'Msg from phone test 2', '2022-01-28 13:30:03', 1),
(115, 13, 11, 'hello', '2022-01-28 13:56:06', 1),
(116, 13, 11, 'hello', '2022-01-28 13:56:08', 1),
(117, 19, 11, 'Goodbye', '2022-01-28 13:56:33', 0),
(118, 19, 11, 'Hello', '2022-01-28 13:57:34', 0),
(119, 19, 11, 'Pis new', '2022-01-28 13:59:23', 0),
(120, 19, 11, 'ghfhjgf', '2022-01-28 13:59:48', 0),
(121, 13, 11, 'Todays text', '2022-01-31 06:40:22', 1),
(122, 19, 11, 'Yoooo', '2022-01-31 06:40:33', 0),
(123, 11, 11, 'Is th item still available??', '2022-01-31 06:49:58', 0),
(124, 22, 11, 'Hello biruk is this item still available?', '2022-01-31 07:29:09', 0),
(125, 13, 1, 'hy\n', '2022-01-31 07:39:39', 1),
(126, 13, 11, 'selam selam', '2022-01-31 07:41:41', 1),
(127, 23, 11, 'biruk sup', '2022-01-31 07:50:49', 0),
(128, 3, 12, 'hyyyyyyyyyyyyyyyyyyy\n', '2022-01-31 10:54:46', 1),
(129, 13, 11, 'gfdgfdxgf', '2022-01-31 11:32:56', 1),
(130, 13, 11, 'gfdgfdxgf', '2022-01-31 11:32:58', 1),
(131, 19, 11, 'u', '2022-01-31 11:33:42', 0),
(132, 13, 11, 'selam', '2022-01-31 11:34:39', 1),
(133, 24, 12, 'hy beke', '2022-01-31 11:35:25', 0),
(134, 3, 12, 'abe', '2022-01-31 11:35:41', 1),
(135, 24, 12, 'hy\n', '2022-01-31 11:36:35', 0),
(136, 13, 11, 'socket test', '2022-01-31 11:36:54', 1),
(137, 24, 12, 'hyyyyyyyyy', '2022-01-31 11:37:14', 0),
(138, 13, 11, 'test 2', '2022-01-31 11:38:19', 1),
(139, 25, 12, 'hyyyyyy\n', '2022-01-31 11:38:26', 0),
(140, 13, 11, 'test 3', '2022-01-31 11:40:55', 1),
(141, 13, 11, 'test4', '2022-01-31 11:42:01', 1),
(142, 13, 11, 'test 5', '2022-01-31 11:42:33', 1),
(143, 13, 11, 'text 6', '2022-01-31 11:43:56', 1),
(144, 13, 11, 'test 7', '2022-01-31 11:46:04', 1),
(145, 13, 11, 'test 8', '2022-01-31 11:46:17', 1),
(146, 13, 11, 'test 9', '2022-01-31 11:48:44', 1),
(147, 13, 11, 'test 10', '2022-01-31 11:49:12', 1),
(148, 13, 11, 'test 10', '2022-01-31 11:49:14', 1),
(149, 13, 11, 'test 11', '2022-01-31 11:49:45', 1),
(150, 13, 11, 'test 12', '2022-01-31 11:50:43', 1),
(151, 13, 11, 'test 13', '2022-01-31 11:51:02', 1),
(152, 3, 1, 'dada', '2022-01-31 11:51:25', 1),
(153, 3, 12, 'hhyy', '2022-01-31 11:51:36', 1),
(154, 24, 11, 'broo', '2022-01-31 11:51:57', 0),
(155, 3, 1, '', '2022-01-31 11:52:19', 1),
(156, 31, 12, 'hyy', '2022-01-31 11:53:03', 1),
(157, 31, 11, 'hjgfkjhg', '2022-01-31 11:53:45', 1),
(158, 31, 11, 'hgdffghd', '2022-01-31 11:54:09', 1),
(159, 31, 11, 'laku', '2022-01-31 11:57:10', 1),
(160, 3, 1, 'adaddada', '2022-01-31 11:58:11', 1),
(161, 31, 12, 'bruke\n', '2022-01-31 11:58:15', 1),
(162, 3, 1, '', '2022-01-31 11:58:26', 1),
(163, 3, 1, 'xzvzvz', '2022-01-31 11:58:35', 1),
(164, 3, 12, 'jusiot;uoer', '2022-01-31 11:58:47', 1),
(165, 13, 11, 'fsghd', '2022-01-31 11:58:53', 1),
(166, 13, 11, 'sdf', '2022-01-31 11:59:49', 1),
(167, 13, 11, 'ufyu', '2022-01-31 12:00:44', 1),
(168, 3, 12, 'abe', '2022-01-31 12:01:07', 1),
(169, 3, 1, 'dada', '2022-01-31 12:02:34', 1),
(170, 3, 12, 'mama', '2022-01-31 12:02:42', 1),
(171, 13, 11, 'sdfgdsf', '2022-01-31 12:03:21', 1),
(172, 3, 12, 'hkjdg', '2022-01-31 12:04:03', 1),
(173, 3, 12, 'rrty', '2022-01-31 12:04:15', 1),
(174, 13, 11, 'jhgdhkfhfyyku', '2022-01-31 12:05:28', 1),
(175, 13, 11, 'working?', '2022-01-31 12:06:03', 1),
(176, 33, 12, 'hyy abe', '2022-01-31 12:13:02', 0),
(177, 31, 11, 'bro', '2022-01-31 12:29:52', 1),
(178, 31, 11, 'bro', '2022-01-31 12:29:52', 1),
(179, 13, 1, 'sadadad', '2022-01-31 12:33:23', 1),
(180, 13, 1, 'daad', '2022-01-31 12:33:54', 1),
(181, 13, 11, 'hgdhf', '2022-01-31 12:34:39', 1),
(182, 13, 1, 'sss', '2022-01-31 12:34:46', 1),
(183, 31, 12, 'jkxhrj', '2022-01-31 12:35:01', 1),
(184, 13, 11, 'jhvjvjhvj', '2022-01-31 12:36:46', 1),
(185, 13, 1, 't', '2022-01-31 12:37:02', 1),
(186, 13, 11, 'jhvjvjhvj', '2022-01-31 12:37:11', 1),
(187, 13, 1, 'ghhhgg', '2022-01-31 12:37:27', 1),
(188, 13, 1, '', '2022-01-31 12:37:28', 1),
(189, 13, 1, 'i', '2022-01-31 12:37:59', 1),
(190, 13, 1, '', '2022-01-31 12:38:40', 1),
(191, 13, 1, '', '2022-01-31 12:38:59', 1),
(192, 3, 12, 'me llk', '2022-01-31 12:39:30', 1),
(193, 31, 11, 'iuguig', '2022-01-31 12:39:44', 1),
(194, 13, 11, 'fdhgdfh', '2022-01-31 12:43:09', 1),
(195, 13, 1, 'hhhhhhhhhhhhhhhhhh', '2022-01-31 12:43:30', 1),
(196, 31, 12, 'sera oooooooooooooooooooooooooooooooooooooooooooooooooo', '2022-01-31 12:44:08', 1),
(197, 31, 11, 'ghdghdgh', '2022-01-31 12:44:56', 1),
(198, 13, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nWhy do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n\n\nWhere does it come from?\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\n\nWhere can I get some?\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.', '2022-01-31 12:45:57', 1),
(199, 3, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nWhy do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n\n\nWhere does it come from?\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\n\nWhere can I get some?\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.', '2022-01-31 12:46:27', 1),
(200, 3, 12, 'm', '2022-01-31 12:49:30', 1),
(201, 3, 1, '', '2022-01-31 13:04:01', 1),
(202, 13, 1, 'hop\n', '2022-01-31 13:04:53', 1),
(203, 31, 12, 'bekele', '2022-01-31 13:13:04', 1),
(204, 31, 12, 'bekele', '2022-01-31 13:13:18', 1),
(205, 31, 12, 'jjgi', '2022-01-31 13:16:37', 1),
(206, 31, 12, ' jk  \nkfdgj\n\n', '2022-01-31 13:18:36', 1),
(207, 31, 12, 'hjkdflgiruerity', '2022-01-31 13:19:11', 1),
(208, 31, 12, '\n\nd\n', '2022-01-31 13:19:27', 1),
(209, 31, 12, 'bekelelele', '2022-01-31 13:43:20', 1),
(210, 31, 11, 'hello', '2022-01-31 13:53:05', 1),
(211, 31, 12, 'bekele\n', '2022-01-31 13:59:51', 1),
(212, 31, 12, '5 mb', '2022-01-31 14:00:46', 1),
(213, 31, 12, 'yefetene', '2022-01-31 14:01:00', 1),
(214, 31, 12, 'teecom', '2022-01-31 14:01:39', 1),
(215, 31, 12, 'lak', '2022-01-31 14:01:53', 1),
(216, 31, 12, 'kaslkasc', '2022-01-31 14:07:20', 1),
(217, 31, 12, 'grhakrkt', '2022-02-01 06:40:49', 1),
(218, 31, 12, 'hy', '2022-02-01 06:43:34', 1),
(219, 31, 12, 'beke', '2022-02-01 06:52:55', 1),
(220, 31, 12, 'bekeeeeeeeeeeeeeeeeeeee', '2022-02-01 06:54:27', 1),
(221, 31, 12, 'ghjk', '2022-02-01 06:59:36', 1),
(222, 31, 12, 'kjgldh', '2022-02-01 07:00:29', 1),
(223, 31, 12, 'ertyu', '2022-02-01 07:00:40', 1),
(224, 31, 12, 'ertyu', '2022-02-01 07:10:51', 1),
(225, 31, 12, 'trye', '2022-02-01 07:11:07', 1),
(226, 31, 12, 'dge', '2022-02-01 07:13:45', 1),
(227, 31, 12, 'face aza', '2022-02-01 07:15:26', 1),
(228, 31, 12, 'lak', '2022-02-01 07:17:14', 1),
(229, 31, 12, 'kjhgfds', '2022-02-01 07:21:13', 1),
(230, 31, 12, 'just now', '2022-02-01 07:23:30', 1),
(231, 31, 12, 'kjhgf', '2022-02-01 07:23:40', 1),
(232, 31, 12, 'jhgfdssertyuj', '2022-02-01 07:23:53', 1),
(233, 31, 11, 'ytdftyfuf', '2022-02-01 07:24:02', 1),
(234, 31, 11, 'ytdftyfuf', '2022-02-01 07:24:04', 1),
(235, 31, 11, 'ytdftyfuf', '2022-02-01 07:25:07', 1),
(236, 23, 3, 'birukeeeeeeee', '2022-02-01 07:25:54', 1),
(237, 23, 11, 'selamm', '2022-02-01 07:26:01', 0),
(238, 23, 11, 'pis new', '2022-02-01 07:27:10', 0),
(239, 23, 11, 'pis new', '2022-02-01 07:27:10', 0),
(240, 23, 11, 'pis new', '2022-02-01 07:27:12', 0),
(241, 23, 11, 'arrival message', '2022-02-01 07:28:13', 0),
(242, 23, 11, 'message 2', '2022-02-01 07:28:29', 0),
(243, 23, 11, 'Yooooooo', '2022-02-01 07:28:56', 0),
(244, 23, 11, 'pjolhli', '2022-02-01 07:30:03', 0),
(245, 23, 11, 'hjvjhgk', '2022-02-01 07:30:29', 0),
(246, 23, 11, 'ghjkuyi li8y8liu', '2022-02-01 07:31:47', 0),
(247, 23, 11, 'qwertyuiop', '2022-02-01 07:34:40', 0),
(248, 23, 11, 'hjgvjhbjh', '2022-02-01 07:35:47', 0),
(249, 23, 11, 'hfaweth', '2022-02-01 07:37:09', 0),
(250, 23, 11, '1', '2022-02-01 07:37:24', 0),
(251, 23, 11, '1', '2022-02-01 07:37:25', 0),
(252, 23, 11, '2', '2022-02-01 07:38:42', 0),
(253, 23, 11, '3', '2022-02-01 07:39:00', 0),
(254, 23, 3, 'jfah', '2022-02-01 07:39:07', 1),
(255, 31, 11, 'Broo', '2022-02-01 10:58:01', 1),
(256, 31, 11, 'Time sertoal', '2022-02-01 11:02:29', 1),
(257, 31, 12, 'time', '2022-02-01 11:02:53', 1),
(258, 31, 12, 'esh', '2022-02-01 11:03:19', 1),
(259, 31, 12, 'embi ae', '2022-02-01 11:03:30', 1),
(260, 31, 12, 'embi', '2022-02-01 11:05:56', 1),
(261, 31, 12, 'ekljf;', '2022-02-01 11:07:55', 1),
(262, 31, 12, 'laku eko', '2022-02-01 11:08:28', 1),
(263, 31, 12, 'esh', '2022-02-01 11:12:02', 1),
(264, 31, 11, 'laku bro', '2022-02-01 11:17:29', 1),
(265, 31, 11, 'test 2', '2022-02-01 11:21:20', 1),
(266, 31, 11, 'tdytfy', '2022-02-01 11:22:30', 1),
(267, 31, 11, 'tdytfy', '2022-02-01 11:22:30', 1),
(268, 31, 11, 'vfjhgv', '2022-02-01 11:23:04', 1),
(269, 31, 12, 'hfhf', '2022-02-01 11:23:22', 1),
(270, 31, 12, 'lakut', '2022-02-01 11:28:33', 1),
(271, 31, 12, 'wesaghi', '2022-02-01 11:30:06', 1),
(272, 31, 11, 'Sear ende?', '2022-02-01 11:35:58', 1),
(273, 31, 12, 'awo bakshi \n', '2022-02-01 11:36:12', 1),
(274, 31, 11, 'yemechesh', '2022-02-01 11:36:19', 1),
(275, 31, 11, 'Pis newa gn', '2022-02-01 12:46:28', 1),
(276, 31, 11, 'Dena aderk bro?', '2022-02-02 06:03:46', 1),
(277, 31, 11, 'Selam?', '2022-02-02 06:05:04', 1),
(278, 31, 11, 'bruh', '2022-02-02 11:06:15', 1),
(279, 31, 11, 'aserr', '2022-02-03 12:21:18', 1),
(280, 31, 11, 'leke neberz', '2022-02-03 12:38:29', 1),
(281, 31, 11, 'weha teta', '2022-02-03 12:42:22', 1),
(282, 31, 12, 'esh\n', '2022-02-03 12:42:36', 1),
(283, 31, 12, 'ayseram', '2022-02-03 12:43:01', 1),
(284, 31, 11, 'yeseral bro', '2022-02-03 12:43:08', 1),
(285, 13, 1, 'mn asebsh nw', '2022-02-07 05:50:20', 1),
(286, 13, 11, 'mnshe??', '2022-02-07 05:50:54', 1),
(287, 13, 1, 'mnm', '2022-02-07 05:51:17', 1),
(288, 13, 11, 'kemr?', '2022-02-07 05:51:26', 1),
(289, 13, 1, 'sup', '2022-02-07 07:47:42', 1),
(290, 13, 11, 'Wedet new bro', '2022-02-07 07:48:00', 1),
(291, 13, 1, 'beka endat neh', '2022-02-07 11:42:42', 1),
(292, 13, 1, 'gsjxbxbdj', '2022-02-07 11:43:02', 1),
(293, 13, 1, 'dhbjf', '2022-02-07 11:44:17', 1),
(294, 13, 1, 'hsvsjdb', '2022-02-07 11:45:10', 1),
(295, 13, 1, 'beke', '2022-02-07 11:47:03', 1),
(296, 13, 1, 'pis new', '2022-02-07 11:48:15', 1),
(297, 13, 1, 'pis new', '2022-02-07 11:48:15', 1),
(298, 13, 1, 'yooo', '2022-02-07 11:59:52', 1),
(299, 13, 1, 'egevdb', '2022-02-07 12:02:03', 1),
(300, 13, 1, 'sbsbge', '2022-02-07 12:02:19', 1),
(301, 13, 1, 'ffhh', '2022-02-07 12:02:28', 1),
(302, 13, 11, 'vhhdg', '2022-02-07 12:02:45', 1),
(303, 13, 1, 'gjg', '2022-02-07 12:03:00', 1),
(304, 13, 11, 'fgh', '2022-02-07 12:03:19', 1),
(305, 13, 1, 'fhh', '2022-02-07 12:05:05', 1),
(306, 13, 11, 'gjg', '2022-02-07 12:05:10', 1),
(307, 13, 1, 'dgvjfgh', '2022-02-07 12:06:21', 1),
(308, 13, 11, 'hfgjj', '2022-02-07 12:06:28', 1),
(309, 13, 1, 'hxhgg', '2022-02-07 12:07:13', 1),
(310, 13, 11, 'hfddhhj', '2022-02-07 12:07:27', 1),
(311, 13, 1, 'dfghh', '2022-02-07 12:07:40', 1),
(312, 13, 1, 'gghggh', '2022-02-07 12:07:44', 1),
(313, 13, 1, 'ggfhh', '2022-02-07 12:07:48', 1),
(314, 13, 1, 'ghghhh', '2022-02-07 12:07:52', 1),
(315, 13, 1, 'cghhjj', '2022-02-07 12:07:57', 1),
(316, 12, 1, 'hi', '2022-02-09 06:59:01', 0),
(317, 34, 93, 'pis new beke', '2022-02-09 14:11:35', 1),
(318, 34, 93, 'bekebekbekbekbekbek', '2022-02-09 14:12:27', 1),
(319, 34, 11, 'man lebel?', '2022-02-09 14:12:34', 1),
(320, 34, 93, 'bekebekebeke', '2022-02-09 14:12:44', 1),
(321, 34, 93, 'telake ', '2022-02-09 14:12:53', 1),
(322, 34, 93, 'eko', '2022-02-09 14:12:56', 1),
(323, 34, 93, 'bxbx', '2022-02-09 14:13:00', 1),
(324, 34, 93, 'nxndnf', '2022-02-09 14:13:03', 1),
(325, 34, 93, 'bdhhdjd', '2022-02-09 14:13:08', 1),
(326, 34, 93, 'bdnd', '2022-02-09 14:13:11', 1),
(327, 34, 93, 'bdhdhd', '2022-02-09 14:13:14', 1),
(328, 34, 93, 'bdbdbd', '2022-02-09 14:13:17', 1),
(329, 34, 93, 'ahun', '2022-02-09 14:13:29', 1),
(330, 34, 93, 'soket', '2022-02-09 14:13:37', 1),
(331, 34, 93, 'iop socket error', '2022-02-09 14:13:44', 1),
(332, 34, 93, 'flutter update must', '2022-02-09 14:14:00', 1),
(333, 34, 93, 'flutter update ', '2022-02-09 14:14:31', 1),
(334, 34, 93, 'gsgs', '2022-02-09 14:18:26', 1),
(335, 34, 93, 'hshsh', '2022-02-09 14:20:09', 1),
(336, 34, 93, 'rgj', '2022-02-09 14:20:17', 1),
(337, 34, 93, 'gsvdh', '2022-02-09 14:20:24', 1),
(338, 34, 93, 'gsvdg', '2022-02-09 14:21:16', 1),
(339, 34, 93, 'jjhvd', '2022-02-09 14:21:26', 1),
(340, 34, 93, 'mn', '2022-02-10 06:31:49', 1),
(341, 34, 11, 'sdfds', '2022-02-10 06:32:14', 1),
(342, 34, 93, 'fhf', '2022-02-10 06:32:50', 1),
(343, 34, 93, 'hcjgchg', '2022-02-10 06:38:18', 1),
(344, 34, 11, 'fdfd', '2022-02-10 06:38:37', 1),
(345, 34, 11, 'hkj', '2022-02-10 06:41:18', 1),
(346, 34, 11, 'CDU', '2022-02-10 06:42:57', 1),
(347, 34, 11, 'iuuyy', '2022-02-10 06:43:14', 1),
(348, 34, 11, 'dsfgsdfg', '2022-02-10 06:45:42', 1),
(349, 34, 11, 'jhgj', '2022-02-10 06:49:12', 1),
(350, 34, 11, 'gdfjj', '2022-02-10 06:50:20', 1),
(351, 34, 93, 'hdgdhd', '2022-02-10 06:50:39', 1),
(352, 34, 93, 'dbdgd', '2022-02-10 06:51:44', 1),
(353, 34, 11, 'supp', '2022-02-10 06:52:38', 1),
(354, 34, 11, 'pis new', '2022-02-10 06:52:50', 1),
(355, 34, 93, 'alew endet neh', '2022-02-10 06:53:41', 1),
(356, 34, 11, ' ', '2022-02-10 06:54:25', 1),
(357, 34, 93, '3d', '2022-02-10 07:15:29', 1),
(358, 34, 93, 'fjf', '2022-02-10 07:15:37', 1),
(359, 34, 93, 'hdhr', '2022-02-10 07:15:45', 1),
(360, 34, 93, 'hdhr', '2022-02-10 07:15:49', 1),
(361, 34, 93, 'hdhf', '2022-02-10 07:16:06', 1),
(362, 34, 11, 'fder', '2022-02-10 07:21:36', 1),
(363, 34, 11, 'wwww', '2022-02-10 07:21:53', 1),
(364, 34, 11, 'dfghdhg', '2022-02-10 07:22:20', 1),
(365, 34, 11, 'fghgf', '2022-02-10 07:22:40', 1),
(366, 34, 11, 'dffdg', '2022-02-10 07:23:51', 1),
(367, 34, 11, 'trfhdfg', '2022-02-10 07:23:57', 1),
(368, 34, 93, 'ghjjfry9jcetikbfrui', '2022-02-10 07:29:03', 1),
(369, 34, 93, 'hofgh', '2022-02-10 07:29:08', 1),
(370, 34, 93, 'fuid', '2022-02-10 07:29:11', 1),
(371, 34, 93, 'hy', '2022-02-10 07:29:13', 1),
(372, 34, 93, 'selam', '2022-02-10 07:29:14', 1),
(373, 34, 93, 'pis', '2022-02-10 07:29:15', 1),
(374, 34, 93, 'desyilal', '2022-02-10 07:29:19', 1),
(375, 13, 1, 'lallala', '2022-02-10 08:26:22', 1),
(376, 13, 1, 'valhalla\n', '2022-02-10 08:26:33', 1),
(377, 13, 11, 'Odinson', '2022-02-10 08:26:57', 1),
(378, 13, 11, 'mnshe', '2022-02-10 08:27:17', 1),
(379, 13, 11, 'sup', '2022-02-10 08:28:02', 1),
(380, 13, 1, 'yeseral\n', '2022-02-10 08:28:08', 1),
(381, 13, 11, 'pis', '2022-02-10 08:28:15', 1),
(382, 13, 11, 'endet new', '2022-02-10 08:33:40', 1),
(383, 13, 11, 'dfv', '2022-02-10 08:41:09', 1),
(384, 13, 11, 'Sera endet new', '2022-02-10 11:27:06', 1),
(385, 13, 11, 'abeni pis new', '2022-02-11 06:27:23', 1),
(386, 34, 11, 'awo bro', '2022-02-11 07:19:35', 0),
(387, 23, 11, 'sint new?', '2022-02-11 07:20:24', 0),
(388, 23, 11, 'selam new?', '2022-02-11 07:21:46', 0),
(389, 31, 12, 'selam new', '2022-02-11 08:39:53', 1),
(390, 31, 11, 'jhvhjvjhg', '2022-02-11 08:40:15', 1),
(391, 31, 12, 'endet neh', '2022-02-11 11:58:44', 1),
(392, 31, 12, 'beke', '2022-02-14 12:26:21', 1),
(393, 31, 11, 'hghg', '2022-02-14 12:26:39', 1),
(394, 31, 12, 'pis new', '2022-02-14 12:26:43', 1),
(395, 31, 12, 'bro', '2022-02-14 12:26:50', 1),
(396, 31, 11, 'jhvjhv', '2022-02-14 12:26:55', 1),
(397, 31, 12, 'endet new', '2022-02-14 12:28:28', 1),
(398, 31, 11, 'endet new', '2022-02-14 12:28:44', 1),
(399, 31, 11, 'gcgh', '2022-02-14 12:29:14', 1),
(400, 31, 12, 'sgafs', '2022-02-14 12:29:19', 1),
(401, 31, 12, 'gdvbnj', '2022-02-14 12:30:01', 1),
(402, 31, 12, 'gbjkkkk', '2022-02-14 12:30:04', 1),
(403, 31, 12, 'hjklll', '2022-02-14 12:30:12', 1),
(404, 31, 12, 'hshdhdhsg', '2022-02-14 12:30:19', 1),
(405, 31, 11, 'abcd', '2022-02-14 12:34:07', 1),
(406, 31, 11, 'efg', '2022-02-14 12:34:29', 1),
(407, 31, 11, 'hijk', '2022-02-14 12:34:44', 1),
(408, 31, 11, 'lmnop', '2022-02-14 12:34:53', 1),
(409, 31, 12, 'abcd', '2022-02-14 12:35:09', 1),
(410, 31, 12, 'efgh', '2022-02-14 12:35:34', 1),
(411, 31, 12, 'beke', '2022-02-15 08:48:54', 1),
(412, 31, 11, 'abet?', '2022-02-15 08:49:03', 1),
(413, 31, 11, 'aser negn eko', '2022-02-15 08:49:17', 1),
(414, 36, 12, 'hy', '2022-02-17 11:23:27', 0),
(415, 36, 12, 'hy', '2022-02-17 11:23:41', 0),
(416, 13, 11, 'hello abenezer', '2022-02-17 11:56:30', 1),
(417, 31, 12, 'hy\n', '2022-02-22 10:54:59', 0),
(418, 3, 12, '', '2022-02-22 11:26:54', 1),
(419, 3, 12, ' ', '2022-02-22 11:27:01', 1),
(420, 3, 12, 'hyhyhyhy', '2022-02-24 13:11:19', 1),
(421, 50, 1, 'adsd', '2022-02-28 11:35:57', 0),
(422, 42, 1, 'adaad', '2022-02-28 11:36:08', 0),
(423, 51, 1, 'agg', '2022-02-28 11:36:20', 0),
(424, 52, 1, 'afaf', '2022-02-28 11:36:37', 0),
(425, 3, 1, 'ada', '2022-02-28 11:36:59', 1),
(426, 3, 12, 'FGgghi', '2022-03-08 13:06:15', 0),
(427, 31, 12, 'yuiyetueyrtiuyoeriu', '2022-03-14 11:04:39', 0),
(428, 31, 12, 'uoierutiorutioeruyoitr rkjtheriuthsker gk.jertljer tertgelriuteriutyeriutyeiurtyiuretyoeiurtyoeiutoyeirutyeortiueryotiuery', '2022-03-14 11:04:54', 0),
(429, 54, 12, 'YDHdhd', '2022-03-22 07:53:33', 0),
(430, 54, 12, 'hf', '2022-03-22 07:53:45', 0),
(431, 31, 12, 'hjkklk', '2022-03-23 12:51:24', 0),
(432, 3, 12, '', '2022-03-24 12:21:46', 0),
(433, 3, 12, '', '2022-03-24 12:26:12', 0),
(434, 3, 12, '', '2022-03-24 12:26:13', 0),
(435, 31, 12, '', '2022-03-24 12:26:37', 0),
(436, 31, 12, '', '2022-03-24 12:27:10', 0),
(437, 31, 12, '', '2022-03-24 12:27:30', 0),
(438, 31, 12, '', '2022-03-24 12:27:31', 0);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notificationid` int(11) NOT NULL,
  `touser` int(11) NOT NULL,
  `sentfrom` int(11) NOT NULL,
  `text` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notificationid`, `touser`, `sentfrom`, `text`, `status`, `timestamp`) VALUES
(1, 1, 2, 'abnet started following you', 1, '2022-02-01 07:05:28'),
(41, 2, 11, 'posted a product', 0, '2022-02-01 08:33:31'),
(42, 12, 11, 'posted a product', 1, '2022-02-01 08:33:31'),
(43, 51, 12, 'start following you', 0, '2022-02-01 08:36:10'),
(44, 1, 53, 'liked your feed', 1, '2022-02-01 08:39:39'),
(45, 2, 1, 'posted a feed', 0, '2022-02-01 08:41:01'),
(46, 2, 11, 'liked your feed', 0, '2022-02-01 08:49:03'),
(47, 2, 12, 'liked your feed', 0, '2022-02-01 09:05:13'),
(48, 2, 12, 'liked your feed', 0, '2022-02-01 09:05:27'),
(49, 2, 12, 'liked your feed', 0, '2022-02-01 09:05:53'),
(50, 11, 12, 'liked your feed', 1, '2022-02-01 09:07:34'),
(51, 2, 11, 'liked your feed', 0, '2022-02-01 10:57:06'),
(52, 2, 11, 'liked your feed', 0, '2022-02-01 10:57:14'),
(53, 2, 11, 'liked your feed', 0, '2022-02-01 10:57:21'),
(54, 2, 11, 'liked your feed', 0, '2022-02-01 10:57:25'),
(55, 2, 11, 'liked your feed', 0, '2022-02-01 10:57:28'),
(56, 2, 11, 'liked your feed', 0, '2022-02-01 10:57:33'),
(57, 12, 11, 'start following you', 1, '2022-02-01 13:47:39'),
(58, 2, 11, 'posted a feed', 0, '2022-02-01 14:06:38'),
(59, 12, 11, 'posted a feed', 1, '2022-02-01 14:06:38'),
(60, 2, 11, 'posted a feed', 0, '2022-02-01 14:06:54'),
(61, 12, 11, 'posted a feed', 1, '2022-02-01 14:06:54'),
(62, 11, 12, 'liked your feed', 1, '2022-02-01 14:10:21'),
(63, 11, 12, 'liked your feed', 1, '2022-02-01 14:10:43'),
(64, 2, 11, 'posted a feed', 0, '2022-02-01 14:21:08'),
(65, 12, 11, 'posted a feed', 1, '2022-02-01 14:21:08'),
(66, 11, 12, 'liked your feed', 1, '2022-02-01 14:21:27'),
(67, 2, 11, 'start following you', 0, '2022-02-02 06:08:14'),
(68, 11, 11, 'liked your feed', 1, '2022-02-02 08:09:23'),
(69, 11, 11, 'liked your feed', 1, '2022-02-02 08:09:23'),
(70, 11, 11, 'liked your feed', 1, '2022-02-02 08:25:51'),
(71, 11, 11, 'liked your feed', 1, '2022-02-02 08:26:54'),
(72, 2, 11, 'posted a feed', 0, '2022-02-02 08:44:08'),
(73, 12, 11, 'posted a feed', 1, '2022-02-02 08:44:08'),
(74, 11, 12, 'liked your feed', 1, '2022-02-02 08:44:18'),
(75, 2, 11, 'posted a feed', 0, '2022-02-02 08:48:54'),
(76, 12, 11, 'posted a feed', 1, '2022-02-02 08:48:54'),
(77, 11, 91, 'your package request has been approved!', 1, '2022-02-02 09:13:08'),
(78, 11, 91, 'your package request has been denied!', 1, '2022-02-02 09:14:13'),
(79, 11, 91, 'your package request has been approved!', 1, '2022-02-02 09:14:39'),
(80, 11, 12, 'liked your feed', 1, '2022-02-02 09:16:27'),
(81, 2, 11, 'posted a product', 0, '2022-02-02 09:21:34'),
(82, 12, 11, 'posted a product', 1, '2022-02-02 09:21:34'),
(83, 11, 12, 'liked your feed', 1, '2022-02-02 09:22:04'),
(84, 11, 12, 'liked your feed', 1, '2022-02-02 09:30:07'),
(85, 1, 11, 'liked your feed', 1, '2022-02-02 09:31:49'),
(86, 1, 11, 'liked your feed', 1, '2022-02-02 09:32:53'),
(87, 1, 11, 'liked your feed', 1, '2022-02-02 09:33:20'),
(88, 11, 12, 'liked your feed', 1, '2022-02-02 10:55:35'),
(89, 11, 12, 'liked your feed', 1, '2022-02-02 11:08:26'),
(90, 2, 12, 'liked your feed', 0, '2022-02-02 11:08:57'),
(91, 2, 11, 'posted a product', 0, '2022-02-02 11:22:14'),
(92, 12, 11, 'posted a product', 1, '2022-02-02 11:22:14'),
(93, 11, 12, 'posted a feed', 0, '2022-02-02 11:23:40'),
(94, 1, 11, 'liked your feed', 1, '2022-02-02 12:00:18'),
(95, 12, 11, 'liked your feed', 1, '2022-02-02 12:01:11'),
(96, 12, 11, 'liked your feed', 1, '2022-02-02 12:09:20'),
(97, 2, 11, 'posted a product', 0, '2022-02-02 12:43:43'),
(98, 12, 11, 'posted a product', 1, '2022-02-02 12:43:43'),
(99, 12, 11, 'posted a product', 1, '2022-02-02 12:53:29'),
(100, 2, 11, 'posted a product', 0, '2022-02-02 12:53:29'),
(101, 12, 91, 'your package request has been approved!', 1, '2022-02-03 07:11:31'),
(102, 12, 91, 'your package request has been denied!', 1, '2022-02-03 07:20:14'),
(103, 12, 91, 'your package request has been approved!', 1, '2022-02-03 07:21:13'),
(104, 11, 91, 'your package request has been approved!', 0, '2022-02-03 07:54:12'),
(105, 12, 11, 'start following you', 1, '2022-02-03 08:42:34'),
(106, 1, 11, 'start following you', 1, '2022-02-03 08:47:21'),
(107, 2, 12, 'liked your feed', 0, '2022-02-03 08:56:31'),
(108, 12, 11, 'liked your feed', 1, '2022-02-03 08:58:36'),
(109, 1, 11, 'liked your feed', 1, '2022-02-03 08:58:39'),
(110, 1, 11, 'liked your feed', 1, '2022-02-03 09:00:03'),
(111, 1, 11, 'liked your feed', 1, '2022-02-03 09:00:19'),
(112, 12, 11, 'liked your feed', 1, '2022-02-03 09:07:19'),
(113, 1, 11, 'liked your feed', 1, '2022-02-03 09:07:31'),
(114, 1, 11, 'liked your feed', 1, '2022-02-03 09:07:48'),
(115, 1, 11, 'liked your feed', 1, '2022-02-03 09:15:05'),
(116, 1, 11, 'liked your feed', 1, '2022-02-03 09:15:55'),
(117, 1, 11, 'liked your feed', 1, '2022-02-03 09:16:03'),
(118, 1, 11, 'liked your feed', 1, '2022-02-03 09:20:58'),
(119, 1, 11, 'liked your feed', 1, '2022-02-03 09:25:22'),
(120, 1, 11, 'liked your feed', 1, '2022-02-03 09:36:02'),
(121, 11, 12, 'start following you', 0, '2022-02-03 09:43:41'),
(122, 11, 12, 'start following you', 0, '2022-02-03 09:43:58'),
(123, 2, 1, 'posted a feed', 0, '2022-02-03 11:12:43'),
(124, 11, 1, 'posted a feed', 0, '2022-02-03 11:12:43'),
(125, 11, 12, 'liked your feed', 0, '2022-02-03 11:19:48'),
(126, 1, 11, 'liked your feed', 1, '2022-02-03 11:41:51'),
(127, 1, 11, 'liked your feed', 1, '2022-02-03 11:57:37'),
(128, 1, 12, 'start following you', 1, '2022-02-03 12:34:25'),
(129, 11, 12, 'start following you', 0, '2022-02-03 12:37:38'),
(130, 11, 12, 'start following you', 0, '2022-02-03 13:45:11'),
(131, 12, 11, 'liked your feed', 1, '2022-02-04 08:16:04'),
(132, 1, 11, 'liked your feed', 1, '2022-02-04 11:53:57'),
(133, 1, 11, 'liked your feed', 1, '2022-02-04 13:11:06'),
(134, 1, 11, 'liked your feed', 1, '2022-02-04 13:12:18'),
(135, 1, 11, 'liked your feed', 1, '2022-02-04 13:17:52'),
(136, 12, 11, 'liked your feed', 1, '2022-02-04 13:18:34'),
(137, 12, 11, 'liked your feed', 1, '2022-02-04 13:18:41'),
(138, 1, 11, 'liked your feed', 1, '2022-02-04 13:23:58'),
(139, 1, 11, 'liked your feed', 1, '2022-02-04 13:24:09'),
(140, 1, 11, 'liked your feed', 1, '2022-02-04 13:25:07'),
(141, 1, 11, 'liked your feed', 1, '2022-02-04 13:25:48'),
(142, 1, 11, 'liked your feed', 1, '2022-02-07 05:43:45'),
(143, 12, 11, 'liked your feed', 1, '2022-02-07 05:49:02'),
(144, 1, 11, 'liked your feed', 1, '2022-02-07 05:49:35'),
(145, 2, 1, 'liked your feed', 0, '2022-02-07 05:54:17'),
(146, 1, 11, 'liked your feed', 1, '2022-02-07 06:17:03'),
(147, 1, 11, 'liked your feed', 1, '2022-02-07 06:17:49'),
(148, 1, 11, 'liked your feed', 1, '2022-02-07 06:20:48'),
(149, 1, 11, 'liked your feed', 1, '2022-02-07 06:43:17'),
(150, 1, 11, 'liked your feed', 1, '2022-02-07 06:43:46'),
(151, 12, 11, 'liked your feed', 1, '2022-02-07 07:21:17'),
(152, 11, 12, 'posted a product', 0, '2022-02-07 08:00:42'),
(153, 1, 11, 'liked your feed', 1, '2022-02-07 08:08:38'),
(154, 11, 12, 'posted a product', 1, '2022-02-07 08:20:11'),
(155, 12, 11, 'liked your feed', 1, '2022-02-07 08:45:47'),
(156, 11, 12, 'liked your feed', 0, '2022-02-07 09:27:16'),
(157, 2, 1, 'liked your feed', 0, '2022-02-07 12:13:28'),
(158, 2, 1, 'liked your feed', 0, '2022-02-07 12:13:33'),
(159, 12, 11, 'liked your feed', 1, '2022-02-07 13:44:12'),
(160, 1, 11, 'liked your feed', 1, '2022-02-07 14:07:19'),
(161, 12, 11, 'liked your feed', 1, '2022-02-09 06:12:06'),
(162, 1, 11, 'liked your feed', 1, '2022-02-09 06:12:14'),
(163, 11, 11, 'liked your feed', 0, '2022-02-09 12:12:36'),
(164, 11, 11, 'liked your feed', 0, '2022-02-09 12:12:37'),
(165, 11, 11, 'liked your feed', 0, '2022-02-09 12:12:46'),
(166, 11, 12, 'posted a feed', 0, '2022-02-09 12:18:20'),
(167, 2, 11, 'posted a product', 0, '2022-02-10 05:56:20'),
(168, 12, 11, 'posted a product', 1, '2022-02-10 05:56:20'),
(169, 2, 11, 'posted a product', 0, '2022-02-10 06:00:10'),
(170, 12, 11, 'posted a product', 1, '2022-02-10 06:00:10'),
(171, 2, 1, 'posted a feed', 0, '2022-02-10 07:22:59'),
(172, 11, 1, 'posted a feed', 0, '2022-02-10 07:22:59'),
(173, 1, 11, 'liked your feed', 1, '2022-02-10 08:03:50'),
(174, 2, 1, 'posted a feed', 0, '2022-02-10 08:04:11'),
(175, 11, 1, 'posted a feed', 0, '2022-02-10 08:04:11'),
(176, 2, 1, 'posted a feed', 0, '2022-02-10 08:23:49'),
(177, 11, 1, 'posted a feed', 0, '2022-02-10 08:23:49'),
(178, 2, 1, 'posted a feed', 0, '2022-02-10 08:23:58'),
(179, 11, 1, 'posted a feed', 0, '2022-02-10 08:23:58'),
(180, 2, 1, 'posted a feed', 0, '2022-02-10 08:24:48'),
(181, 11, 1, 'posted a feed', 0, '2022-02-10 08:24:48'),
(182, 1, 11, 'liked your feed', 1, '2022-02-10 11:26:20'),
(183, 1, 11, 'liked your feed', 1, '2022-02-10 11:26:23'),
(184, 1, 11, 'liked your feed', 1, '2022-02-10 11:26:25'),
(185, 1, 11, 'liked your feed', 1, '2022-02-10 11:26:28'),
(186, 1, 11, 'liked your feed', 1, '2022-02-11 06:27:02'),
(187, 93, 11, 'start following you', 0, '2022-02-11 07:19:17'),
(188, 1, 11, 'start following you', 1, '2022-02-11 07:20:13'),
(189, 1, 11, 'liked your feed', 1, '2022-02-11 07:20:52'),
(190, 2, 11, 'posted a feed', 0, '2022-02-11 07:25:27'),
(191, 12, 11, 'posted a feed', 1, '2022-02-11 07:25:27'),
(192, 12, 11, 'liked your feed', 1, '2022-02-11 08:45:33'),
(193, 12, 11, 'liked your feed', 1, '2022-02-11 08:47:47'),
(194, 11, 12, 'liked your feed', 0, '2022-02-11 11:57:53'),
(195, 11, 12, 'posted a product', 0, '2022-02-11 12:23:55'),
(196, 12, 91, 'your package request has been approved!', 1, '2022-02-14 06:51:16'),
(197, 12, 91, 'your package request has been approved!', 1, '2022-02-14 06:53:29'),
(198, 11, 11, 'liked your feed', 0, '2022-02-14 07:21:30'),
(199, 12, 12, 'start following you', 1, '2022-02-14 09:18:45'),
(200, 1, 12, 'start following you', 1, '2022-02-14 11:31:50'),
(201, 11, 12, 'start following you', 0, '2022-02-14 11:42:06'),
(202, 11, 12, 'start following you', 0, '2022-02-14 12:49:39'),
(203, 11, 12, 'start following you', 0, '2022-02-14 12:49:50'),
(204, 11, 12, 'posted a feed', 0, '2022-02-14 12:51:05'),
(205, 11, 12, 'posted a feed', 0, '2022-02-14 13:24:13'),
(206, 93, 12, 'start following you', 1, '2022-02-14 13:27:54'),
(207, 1, 91, 'your package request has been approved!', 1, '2022-02-15 08:41:26'),
(208, 1, 91, 'your package request has been approved!', 1, '2022-02-15 08:41:30'),
(209, 1, 91, 'your package request has been approved!', 1, '2022-02-15 08:43:22'),
(210, 1, 91, 'your package request has been approved!', 1, '2022-02-15 08:44:01'),
(211, 1, 91, 'your package request has been approved!', 1, '2022-02-15 08:44:17'),
(212, 12, 95, 'start following you', 1, '2022-02-15 12:31:32'),
(213, 12, 11, 'start following you', 1, '2022-02-15 13:16:56'),
(214, 12, 11, 'liked your feed', 1, '2022-02-15 13:17:02'),
(215, 12, 11, 'liked your feed', 1, '2022-02-15 13:17:03'),
(216, 12, 95, 'start following you', 1, '2022-02-15 13:20:43'),
(217, 12, 95, 'liked your feed', 1, '2022-02-15 13:20:54'),
(218, 12, 95, 'liked your feed', 1, '2022-02-15 13:20:56'),
(219, 12, 91, 'your package request has been approved!', 1, '2022-02-16 06:31:43'),
(220, 1, 95, 'start following you', 1, '2022-02-16 08:16:20'),
(221, 11, 95, 'start following you', 0, '2022-02-16 08:17:47'),
(222, 11, 95, 'liked your feed', 0, '2022-02-16 08:18:02'),
(223, 11, 12, 'liked your feed', 0, '2022-02-16 08:47:09'),
(224, 1, 12, 'start following you', 1, '2022-02-17 07:18:39'),
(225, 1, 12, 'start following you', 1, '2022-02-17 08:38:07'),
(226, 11, 12, 'posted a product', 0, '2022-02-17 11:27:39'),
(227, 95, 12, 'posted a product', 0, '2022-02-17 11:27:39'),
(228, 1, 11, 'start following you', 1, '2022-02-17 11:56:35'),
(229, 1, 11, 'liked your feed', 1, '2022-02-17 11:56:47'),
(230, 11, 12, 'posted a product', 0, '2022-02-18 09:08:30'),
(231, 95, 12, 'posted a product', 0, '2022-02-18 09:08:30'),
(232, 1, 11, 'liked your feed', 1, '2022-02-18 11:12:32'),
(233, 1, 11, 'liked your feed', 1, '2022-02-18 11:12:34'),
(234, 11, 12, 'posted a feed', 0, '2022-02-21 07:13:01'),
(235, 95, 12, 'posted a feed', 0, '2022-02-21 07:13:01'),
(236, 11, 12, 'posted a product', 0, '2022-02-21 07:16:11'),
(237, 95, 12, 'posted a product', 0, '2022-02-21 07:16:11'),
(238, 11, 12, 'posted a feed', 0, '2022-02-21 11:12:28'),
(239, 95, 12, 'posted a feed', 0, '2022-02-21 11:12:28'),
(240, 11, 12, 'posted a product', 0, '2022-02-21 11:17:03'),
(241, 95, 12, 'posted a product', 0, '2022-02-21 11:17:03'),
(242, 11, 12, 'posted a product', 0, '2022-02-21 11:18:04'),
(243, 95, 12, 'posted a product', 0, '2022-02-21 11:18:04'),
(244, 11, 12, 'posted a product', 0, '2022-02-21 11:19:59'),
(245, 95, 12, 'posted a product', 0, '2022-02-21 11:19:59'),
(246, 11, 12, 'posted a product', 0, '2022-02-21 11:21:01'),
(247, 95, 12, 'posted a product', 0, '2022-02-21 11:21:01'),
(248, 11, 12, 'posted a product', 0, '2022-02-21 11:21:51'),
(249, 95, 12, 'posted a product', 0, '2022-02-21 11:21:51'),
(250, 11, 12, 'posted a product', 0, '2022-02-24 13:13:29'),
(251, 95, 12, 'posted a product', 0, '2022-02-24 13:13:29'),
(252, 11, 12, 'posted a product', 0, '2022-02-24 13:13:40'),
(253, 95, 12, 'posted a product', 0, '2022-02-24 13:13:40'),
(254, 11, 12, 'posted a product', 0, '2022-02-24 13:13:42'),
(255, 95, 12, 'posted a product', 0, '2022-02-24 13:13:42'),
(256, 11, 12, 'posted a product', 0, '2022-02-25 07:38:44'),
(257, 95, 12, 'posted a product', 0, '2022-02-25 07:38:44'),
(258, 11, 12, 'posted a feed', 0, '2022-02-25 12:09:47'),
(259, 95, 12, 'posted a feed', 0, '2022-02-25 12:09:47'),
(260, 11, 12, 'posted a product', 0, '2022-02-25 12:13:02'),
(261, 95, 12, 'posted a product', 0, '2022-02-25 12:13:02'),
(262, 11, 12, 'posted a product', 0, '2022-02-25 12:20:27'),
(263, 95, 12, 'posted a product', 0, '2022-02-25 12:20:27'),
(264, 11, 1, 'posted a product', 0, '2022-02-28 06:05:49'),
(265, 12, 1, 'posted a product', 1, '2022-02-28 06:05:49'),
(266, 2, 1, 'posted a product', 0, '2022-02-28 06:05:49'),
(267, 95, 1, 'posted a product', 0, '2022-02-28 06:05:49'),
(268, 2, 1, 'posted a product', 0, '2022-02-28 06:10:34'),
(269, 95, 1, 'posted a product', 0, '2022-02-28 06:10:34'),
(270, 12, 1, 'posted a product', 1, '2022-02-28 06:10:34'),
(271, 11, 1, 'posted a product', 0, '2022-02-28 06:10:34'),
(272, 2, 1, 'posted a product', 0, '2022-02-28 06:17:16'),
(273, 95, 1, 'posted a product', 0, '2022-02-28 06:17:16'),
(274, 12, 1, 'posted a product', 1, '2022-02-28 06:17:16'),
(275, 11, 1, 'posted a product', 0, '2022-02-28 06:17:16'),
(276, 2, 1, 'posted a product', 0, '2022-02-28 06:26:18'),
(277, 95, 1, 'posted a product', 0, '2022-02-28 06:26:18'),
(278, 11, 1, 'posted a product', 0, '2022-02-28 06:26:18'),
(279, 12, 1, 'posted a product', 1, '2022-02-28 06:26:18'),
(280, 1, 12, 'liked your feed', 1, '2022-03-07 07:33:25'),
(281, 1, 12, 'liked your feed', 0, '2022-03-07 07:36:08'),
(282, 11, 12, 'posted a feed', 0, '2022-03-07 08:08:25'),
(283, 95, 12, 'posted a feed', 0, '2022-03-07 08:08:25'),
(284, 11, 12, 'posted a feed', 0, '2022-03-07 08:08:28'),
(285, 95, 12, 'posted a feed', 0, '2022-03-07 08:08:28'),
(286, 11, 12, 'posted a feed', 0, '2022-03-07 08:08:30'),
(287, 95, 12, 'posted a feed', 0, '2022-03-07 08:08:30'),
(288, 11, 12, 'posted a feed', 0, '2022-03-07 08:08:32'),
(289, 95, 12, 'posted a feed', 0, '2022-03-07 08:08:32'),
(290, 12, 1, 'start following you', 1, '2022-03-07 08:09:13'),
(291, 11, 12, 'posted a product', 0, '2022-03-07 09:15:29'),
(292, 95, 12, 'posted a product', 0, '2022-03-07 09:15:29'),
(293, 1, 12, 'posted a product', 0, '2022-03-07 09:15:29'),
(294, 11, 12, 'posted a product', 0, '2022-03-07 13:37:51'),
(295, 1, 12, 'posted a product', 0, '2022-03-07 13:37:51'),
(296, 95, 12, 'posted a product', 0, '2022-03-07 13:37:51'),
(297, 12, 1, 'liked your feed', 1, '2022-03-07 13:52:41'),
(298, 1, 12, 'posted a product', 0, '2022-03-08 05:59:11'),
(299, 95, 12, 'posted a product', 0, '2022-03-08 05:59:11'),
(300, 11, 12, 'posted a product', 0, '2022-03-08 05:59:11'),
(301, 1, 12, 'start following you', 0, '2022-03-08 13:15:49'),
(302, 12, 1, 'start following you', 1, '2022-03-09 07:20:32'),
(303, 95, 12, 'posted a product', 0, '2022-03-22 06:26:16'),
(304, 11, 12, 'posted a product', 0, '2022-03-22 06:26:16'),
(305, 1, 12, 'posted a product', 0, '2022-03-22 06:26:16'),
(306, 11, 12, 'posted a feed', 0, '2022-03-22 09:25:18'),
(307, 1, 12, 'posted a feed', 0, '2022-03-22 09:25:18'),
(308, 95, 12, 'posted a feed', 0, '2022-03-22 09:25:18'),
(309, 11, 12, 'posted a feed', 0, '2022-03-22 09:58:01'),
(310, 95, 12, 'posted a feed', 0, '2022-03-22 09:58:01'),
(311, 1, 12, 'posted a feed', 0, '2022-03-22 09:58:01'),
(312, 12, 12, 'start following you', 1, '2022-03-22 11:54:33'),
(313, 1, 12, 'liked your feed', 0, '2022-03-23 07:08:17'),
(314, 1, 12, 'liked your feed', 0, '2022-03-23 11:30:16'),
(315, 11, 12, 'posted a feed', 0, '2022-03-23 12:22:10'),
(316, 1, 12, 'posted a feed', 0, '2022-03-23 12:22:10'),
(317, 95, 12, 'posted a feed', 0, '2022-03-23 12:22:10'),
(318, 1, 12, 'liked your feed', 0, '2022-03-23 12:22:45'),
(319, 2, 12, 'start following you', 0, '2022-03-23 13:02:18');

-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `planid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `postsleft` float NOT NULL,
  `price` float NOT NULL,
  `expirationtime` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plan`
--

INSERT INTO `plan` (`planid`, `name`, `postsleft`, `price`, `expirationtime`) VALUES
(1, 'free', 10, 0, '1 MONTH'),
(2, 'basic', 76, 67, '3 MONTH'),
(3, 'premium', 50, 1000, '6 MONTH'),
(4, 'vip', 1000, 1000, '9 MONTH');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productid` int(11) NOT NULL,
  `postedby` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `productcondition` varchar(100) DEFAULT NULL,
  `brand` varchar(100) NOT NULL,
  `istrendingproduct` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productid`, `postedby`, `name`, `price`, `quantity`, `description`, `image`, `category`, `date`, `productcondition`, `brand`, `istrendingproduct`) VALUES
(1, 1, 'air mac', 1000, 1, 'kljgf', 'image_1641802989180.webp', 'shoes', '2022-01-05 06:06:04', 'new', 'nike', 0),
(2, 2, 'dress ', 1000, 1, 'bla', 'image_1641362813783.jpg', 'dress', '2022-01-05 06:06:53', 'new', 'none', 0),
(3, 1, 'air jordan 1 retro', 2500, 1, 'bla', 'image_1641799178601.webp', 'shoes', '2022-01-10 07:19:38', 'new', 'jordan', 1),
(4, 3, 'iphone', 12000, 5, 'bla', 'images_1642060749279.jpg,images_1642060749280.jpg,', 'phone', '2022-01-13 07:59:09', 'new', 'apple', 0),
(5, 3, 'iphone', 12000, 5, 'bla', 'images_1642060817790.jpg,images_1642060817791.jpg,', 'phone', '2022-01-13 08:00:17', 'new', 'apple', 1),
(6, 3, 'iphone', 12000, 5, 'bla', 'images_1642076848081.jpg,images_1642076848107.jpg,', 'phone', '2022-01-13 12:27:28', 'new', 'apple', 0),
(7, 3, 'iphone', 12000, 5, 'bla', 'images_1642076850868.jpg,images_1642076850868.jpg,', 'phone', '2022-01-13 12:27:30', 'new', 'apple', 0),
(8, 3, 'iphone', 12000, 5, 'bla', 'images_1642076851257.jpg,images_1642076851257.jpg,', 'phone', '2022-01-13 12:27:31', 'new', 'apple', 0),
(10, 3, 'iphone', 12000, 5, 'bla', 'images_1642076852411.jpg,images_1642076852412.jpg,', 'phone', '2022-01-13 12:27:32', 'new', 'apple', 0),
(11, 3, 'iphone', 12000, 5, 'bla', 'images_1642076852829.jpg,images_1642076852830.jpg,', 'phone', '2022-01-13 12:27:32', 'new', 'apple', 0),
(12, 3, 'iphone', 12000, 5, 'bla', 'images_1642076853228.jpg,images_1642076853277.jpg,', 'phone', '2022-01-13 12:27:33', 'new', 'apple', 0),
(13, 3, 'iphone', 12000, 5, 'bla', 'images_1642076853667.jpg,images_1642076853668.jpg,', 'phone', '2022-01-13 12:27:33', 'new', 'apple', 0),
(14, 3, 'iphone', 12000, 5, 'bla', 'images_1642076853983.jpg,images_1642076853984.jpg,', 'phone', '2022-01-13 12:27:34', 'new', 'apple', 0),
(46, 11, 'iphone', 12000, 5, 'bla', 'images_1643702569569.jpg,images_1643702569570.jpg,', 'phone', '2022-02-01 08:02:49', 'new', 'apple', 0),
(48, 11, 'iphone', 15555, 101, 'azaaa', 'images_1643704317519.jpg,images_1643704317520.jpg,', 'phone', '2022-02-01 08:31:57', 'new', 'apple', 0),
(50, 11, 'iphone', 12000, 5, 'bla', 'images_1643704411755.jpg,images_1643704411757.jpg,', 'phone', '2022-02-01 08:33:31', 'new', 'apple', 0),
(51, 11, 'New phone', 20000, 1, 'phonesdfdgsdgsdgsdgsdfgdsgsdfgsdfgdsfgdsfhjgusduygsfguedasjhfgdsvyuafvgjdhsbcvdsuyfgjhbdusjhgfbviudsjkgfbuvdjsgfbdsujhxzfgbdsujhgfdsujfgxvdsuyhjfxgvadsjhvbcuysdjhfzgxsdfgsfdgphonesdfdgsdgsdgsdgsdfgsfdg', 'images_1643793690914.jpg,', 'phone', '2022-02-02 09:21:33', 'used', 'bestesdfsduihfbhisdbibfhsfgdskbfjskbhfjdsbfjcbdsjhfbcdhjbfchdjsbfchjsdbfchjdsbhjcbdbfhdsbfhjdsbfhjds', 0),
(52, 11, 'BEst xiaomi phone', 20000, 5, 'xiaomi', 'images_1643800934332.jpg,images_1643800934339.jpg,', 'phone', '2022-02-02 11:22:14', 'slightly used', 'sdfdsgadsgdsgvfddsfgdgd', 0),
(53, 11, 'iphone', 12000, 5, 'bla', 'images_1643805823744.jpg,images_1643805823746.jpg,', 'phone', '2022-02-02 12:43:43', 'new', 'apple', 0),
(54, 11, 'iphone', 12000, 5, 'bla', 'images_1643806409372.jpg,images_1643806409373.jpg,', 'phone', '2022-02-02 12:53:29', 'new', 'apple', 0),
(57, 93, 'i', 8, 667, 'lkjljl', 'images_1644397974891.png,', 'lkj', '2022-02-09 09:12:57', 'klj', 'lkj', 0),
(161, 2, 'tincidunt, nunc', 493, 1, 'feugiat tellus lorem eu metus. In lorem. Donec elementum, lorem ut aliquam iaculis, lacus pede sagittis augue, eu tempor erat neque non quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac', 'images_1642076852829.jpg', 'Handbags', '2022-02-14 11:28:22', 'new', 'Convallis Est Vitae Incorporated', 0),
(162, 1, 'fames', 646, 2, 'velit justo nec ante. Maecenas mi felis, adipiscing fringilla, porttitor vulputate, posuere vulputate, lacus. Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse dui. Fusce diam', 'images_1642076852829.jpg', 'Jewelry', '2022-02-14 11:28:22', 'new', 'Fringilla Ornare Foundation', 0),
(163, 2, 'Cras vulputate', 357, 2, 'lacinia orci, consectetuer', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:22', 'new', 'Ac Mattis Limited', 0),
(164, 2, 'a', 33, 7, 'Donec non justo. Proin non massa non ante bibendum ullamcorper. Duis cursus, diam at pretium aliquet, metus urna convallis erat, eget', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:22', 'new', 'Sit LLC', 0),
(165, 3, 'facilisis non,', 185, 4, 'mauris sit amet lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In mi pede, nonummy ut, molestie in, tempus', 'images_1642076852829.jpg', 'Shoes', '2022-02-14 11:28:22', 'new', 'Dictum LLC', 0),
(166, 2, 'tincidunt nibh.', 665, 8, 'Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce aliquet magna a neque. Nullam ut nisi a odio semper cursus. Integer', 'images_1642076852829.jpg', 'Accessories', '2022-02-14 11:28:22', 'new', 'Sed LLP', 0),
(167, 1, 'mauris', 508, 4, 'placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla tincidunt, neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse', 'images_1642076852829.jpg', 'Shoes', '2022-02-14 11:28:22', 'new', 'Tellus Imperdiet Industries', 0),
(169, 2, 'et tristique pellentesque,', 800, 5, 'elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit erat vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:22', 'new', 'Aliquam Fringilla Cursus Associates', 0),
(170, 1, 'elementum at, egestas', 838, 8, 'laoreet ipsum. Curabitur consequat, lectus sit amet luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:22', 'new', 'Vulputate Posuere Foundation', 0),
(171, 2, 'ac', 809, 5, 'lacus. Aliquam rutrum lorem ac risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra.', 'images_1642076852829.jpg', 'Women\'s', '2022-02-14 11:28:22', 'new', 'Vulputate Risus Industries', 0),
(172, 2, 'commodo tincidunt', 357, 4, 'enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor dapibus gravida. Aliquam tincidunt, nunc ac mattis ornare, lectus ante dictum mi, ac mattis velit justo nec ante. Maecenas mi felis, adipiscing fringilla, porttitor vulputate, posuere vulputate, lacus.', 'images_1642076852829.jpg', 'Accessories', '2022-02-14 11:28:22', 'new', 'Mollis Integer LLC', 0),
(173, 1, 'Curabitur egestas nunc', 610, 4, 'Nulla tempor augue ac ipsum. Phasellus vitae', 'images_1642076852829.jpg', 'Teen', '2022-02-14 11:28:22', 'new', 'Sed Eu Institute', 0),
(174, 2, 'adipiscing', 11, 4, 'lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:22', 'new', 'Mattis Ornare Ltd', 0),
(175, 2, 'viverra.', 69, 4, 'sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum', 'images_1642076852829.jpg', 'Baby', '2022-02-14 11:28:22', 'new', 'Non Enim Inc.', 0),
(176, 2, 'erat volutpat.', 579, 7, 'nec tellus. Nunc lectus pede, ultrices a, auctor non, feugiat nec, diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis eget,', 'images_1642076852829.jpg', 'Scrubs', '2022-02-14 11:28:22', 'new', 'Integer Sem Associates', 0),
(177, 2, 'in, cursus et,', 27, 1, 'sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis.', 'images_1642076852829.jpg', 'Handbags', '2022-02-14 11:28:22', 'new', 'Sit Amet Corporation', 0),
(179, 2, 'Aliquam nec enim.', 27, 7, 'risus. Morbi', 'images_1642076852829.jpg', 'Women\'s', '2022-02-14 11:28:22', 'new', 'Nunc LLP', 0),
(180, 1, 'tincidunt adipiscing.', 257, 7, 'ornare lectus justo eu arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede,', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:22', 'new', 'Mauris Nulla PC', 0),
(181, 2, 'Morbi accumsan laoreet', 827, 8, 'adipiscing, enim mi tempor lorem, eget mollis lectus pede et risus. Quisque libero lacus, varius et, euismod et, commodo at, libero. Morbi accumsan laoreet ipsum. Curabitur consequat, lectus sit amet luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:22', 'new', 'Nisl Sem Industries', 0),
(182, 3, 'Proin velit. Sed', 133, 5, 'vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:22', 'new', 'Auctor Quis LLC', 0),
(183, 3, 'fermentum arcu.', 315, 6, 'vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:22', 'new', 'Pede Suspendisse Dui Corporation', 0),
(184, 3, 'sociis natoque penatibus', 969, 4, 'lectus sit amet luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque', 'images_1642076852829.jpg', 'Handbags', '2022-02-14 11:28:22', 'new', 'Placerat Eget Foundation', 0),
(185, 2, 'penatibus et', 1000, 8, 'nulla. Integer vulputate, risus a ultricies adipiscing, enim mi tempor lorem, eget mollis', 'images_1642076852829.jpg', 'Kids\'', '2022-02-14 11:28:22', 'new', 'Mi Tempor Incorporated', 0),
(186, 2, 'lacus. Quisque', 782, 6, 'auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In mi pede, nonummy ut, molestie in, tempus eu, ligula. Aenean euismod mauris eu elit. Nulla facilisi. Sed neque. Sed eget lacus. Mauris non dui nec urna suscipit nonummy. Fusce fermentum fermentum arcu. Vestibulum ante ipsum', 'images_1642076852829.jpg', 'Costumes', '2022-02-14 11:28:22', 'new', 'Metus Sit Amet PC', 0),
(187, 1, 'quis, pede.', 967, 3, 'Aenean eget metus.', 'images_1642076852829.jpg', 'Uniforms', '2022-02-14 11:28:22', 'new', 'Ultricies Ltd', 0),
(188, 2, 'vitae', 754, 5, 'porta elit, a feugiat tellus lorem eu metus. In lorem. Donec elementum, lorem ut aliquam iaculis, lacus pede sagittis augue, eu tempor erat neque non quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque sed sem egestas blandit.', 'images_1642076852829.jpg', 'Costumes', '2022-02-14 11:28:22', 'new', 'Ligula Incorporated', 0),
(189, 1, 'varius et,', 64, 9, 'amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit erat vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit elit fermentum', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:22', 'new', 'Vitae Purus Corp.', 0),
(190, 3, 'urna suscipit', 292, 9, 'Nullam scelerisque neque sed sem egestas', 'images_1642076852829.jpg', 'Baby', '2022-02-14 11:28:22', 'new', 'Sociosqu Ad Associates', 0),
(191, 1, 'pede.', 404, 5, 'enim, sit amet ornare lectus justo eu arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices a, auctor non, feugiat', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Adipiscing Company', 0),
(192, 1, 'lorem', 720, 4, 'conubia nostra, per inceptos hymenaeos. Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero', 'images_1642076852829.jpg', 'Scrubs', '2022-02-14 11:28:23', 'new', 'Felis Donec Company', 0),
(193, 3, 'porta elit,', 477, 9, 'Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh dolor, nonummy ac, feugiat', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Molestie Ltd', 0),
(194, 3, 'adipiscing elit. Curabitur', 894, 5, 'mi, ac mattis velit justo nec ante. Maecenas mi felis, adipiscing fringilla,', 'images_1642076852829.jpg', 'Kids\'', '2022-02-14 11:28:23', 'new', 'Ac Urna Limited', 0),
(195, 2, 'Mauris molestie pharetra', 706, 10, 'a felis ullamcorper viverra. Maecenas iaculis aliquet diam.', 'images_1642076852829.jpg', 'Baby', '2022-02-14 11:28:23', 'new', 'Integer PC', 0),
(196, 2, 'arcu. Sed', 87, 3, 'consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor dapibus', 'images_1642076852829.jpg', 'Women\'s', '2022-02-14 11:28:23', 'new', 'Eu Dolor Incorporated', 0),
(198, 1, 'convallis erat,', 349, 10, 'Nunc mauris sapien, cursus in,', 'images_1642076852829.jpg', 'Jewelry', '2022-02-14 11:28:23', 'new', 'Tempor PC', 0),
(199, 3, 'nunc sed pede.', 921, 1, 'est. Nunc', 'images_1642076852829.jpg', 'Uniforms', '2022-02-14 11:28:23', 'new', 'Cras Lorem LLC', 0),
(200, 2, 'non, sollicitudin', 465, 9, 'Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices a, auctor non, feugiat nec,', 'images_1642076852829.jpg', 'Baby', '2022-02-14 11:28:23', 'new', 'Porttitor Interdum LLC', 0),
(201, 2, 'non,', 392, 4, 'placerat. Cras dictum ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer', 'images_1642076852829.jpg', 'Scrubs', '2022-02-14 11:28:23', 'new', 'Suspendisse Dui Ltd', 0),
(202, 3, 'vel, faucibus', 727, 9, 'luctus ut, pellentesque eget, dictum placerat, augue. Sed', 'images_1642076852829.jpg', 'Handbags', '2022-02-14 11:28:23', 'new', 'Curabitur Institute', 0),
(203, 2, 'urna', 965, 8, 'iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices a, auctor non, feugiat nec, diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed', 'images_1642076852829.jpg', 'Shoes', '2022-02-14 11:28:23', 'new', 'Curae Limited', 0),
(204, 3, 'dui', 291, 1, 'adipiscing lobortis risus. In mi pede, nonummy ut, molestie in, tempus eu, ligula. Aenean euismod mauris eu elit. Nulla facilisi. Sed neque. Sed eget lacus. Mauris non dui nec urna suscipit nonummy. Fusce fermentum', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Dictum Eu Corporation', 0),
(205, 1, 'ultrices posuere cubilia', 583, 6, 'Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque', 'images_1642076852829.jpg', 'Handbags', '2022-02-14 11:28:23', 'new', 'Id Ante Nunc LLC', 0),
(206, 1, 'Nulla facilisis.', 393, 8, 'nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor dapibus gravida. Aliquam tincidunt, nunc ac mattis ornare, lectus', 'images_1642076852829.jpg', 'Shoes', '2022-02-14 11:28:23', 'new', 'Rhoncus Donec Institute', 0),
(207, 2, 'purus. Nullam', 501, 5, 'placerat, augue. Sed molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti', 'images_1642076852829.jpg', 'Watches', '2022-02-14 11:28:23', 'new', 'Mi Felis Adipiscing Associates', 0),
(209, 3, 'ultrices a,', 628, 2, 'sit amet, faucibus ut, nulla.', 'images_1642076852829.jpg', 'Uniforms', '2022-02-14 11:28:23', 'new', 'Accumsan LLP', 0),
(210, 2, 'Donec fringilla. Donec', 546, 2, 'ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean', 'images_1642076852829.jpg', 'Uniforms', '2022-02-14 11:28:23', 'new', 'Magna Tellus Faucibus Incorporated', 0),
(211, 2, 'nunc. In at', 42, 7, 'tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo. Proin non massa non ante bibendum ullamcorper. Duis cursus, diam at pretium aliquet, metus', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Vestibulum Mauris Magna Incorporated', 0),
(212, 2, 'natoque penatibus', 929, 6, 'dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla', 'images_1642076852829.jpg', 'Scrubs', '2022-02-14 11:28:23', 'new', 'Ac Mattis LLC', 0),
(213, 2, 'convallis', 759, 10, 'tellus justo sit amet nulla. Donec non justo. Proin non massa non ante bibendum ullamcorper. Duis cursus, diam at pretium aliquet, metus urna convallis erat, eget tincidunt dui', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Id Sapien Ltd', 0),
(214, 2, 'nisi a odio', 315, 2, 'sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In', 'images_1642076852829.jpg', 'Costumes', '2022-02-14 11:28:23', 'new', 'Ac Turpis Institute', 0),
(215, 3, 'consequat auctor, nunc', 927, 5, 'dictum. Phasellus in felis. Nulla tempor augue ac ipsum. Phasellus vitae mauris sit amet lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In mi pede, nonummy ut, molestie in, tempus eu, ligula. Aenean euismod mauris eu elit. Nulla', 'images_1642076852829.jpg', 'Accessories', '2022-02-14 11:28:23', 'new', 'Gravida Non Consulting', 0),
(216, 2, 'lobortis ultrices.', 848, 5, 'luctus sit amet, faucibus ut, nulla. Cras eu tellus eu augue porttitor interdum. Sed auctor odio a purus. Duis elementum, dui quis accumsan convallis, ante lectus convallis est, vitae sodales nisi', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Tellus Nunc Associates', 0),
(217, 2, 'non lorem vitae', 123, 9, 'Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dignissim magna a', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Tempor PC', 0),
(218, 2, 'Morbi non', 253, 10, 'gravida. Aliquam', 'images_1642076852829.jpg', 'Jewelry', '2022-02-14 11:28:23', 'new', 'Mauris Elit Industries', 0),
(219, 3, 'Proin ultrices.', 495, 7, 'nunc sed pede. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel arcu eu odio tristique pharetra. Quisque ac libero nec ligula consectetuer', 'images_1642076852829.jpg', 'Costumes', '2022-02-14 11:28:23', 'new', 'Tellus Inc.', 0),
(220, 2, 'vulputate,', 155, 10, 'Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas', 'images_1642076852829.jpg', 'Women\'s', '2022-02-14 11:28:23', 'new', 'Nullam Lobortis Quam Company', 0),
(221, 2, 'sem magna', 228, 9, 'viverra. Maecenas iaculis aliquet diam. Sed diam', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Nullam Ut Foundation', 0),
(222, 1, 'est arcu', 388, 7, 'nulla ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas', 'images_1642076852829.jpg', 'Scrubs', '2022-02-14 11:28:23', 'new', 'Vehicula Corporation', 0),
(223, 2, 'semper cursus. Integer', 659, 8, 'Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus.', 'images_1642076852829.jpg', 'Accessories', '2022-02-14 11:28:23', 'new', 'Porttitor Scelerisque Neque LLC', 0),
(224, 2, 'Sed nulla', 859, 3, 'dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec nibh enim, gravida sit amet, dapibus id, blandit at, nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl.', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Rutrum Incorporated', 0),
(225, 1, 'dui, semper', 804, 3, 'non nisi. Aenean eget metus. In nec orci. Donec nibh. Quisque nonummy ipsum non arcu. Vivamus sit amet risus.', 'images_1642076852829.jpg', 'Jewelry', '2022-02-14 11:28:23', 'new', 'Mauris Vestibulum Foundation', 0),
(226, 1, 'hendrerit. Donec', 29, 2, 'torquent per conubia nostra, per inceptos hymenaeos. Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt', 'images_1642076852829.jpg', 'Watches', '2022-02-14 11:28:23', 'new', 'Donec Egestas Corporation', 0),
(227, 1, 'orci, consectetuer', 159, 10, 'fringilla ornare placerat, orci lacus', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Sed Dui Fusce LLC', 0),
(228, 2, 'mattis semper,', 736, 8, 'porttitor eros nec tellus. Nunc lectus pede,', 'images_1642076852829.jpg', 'Baby', '2022-02-14 11:28:23', 'new', 'Nisi Dictum Augue LLP', 0),
(229, 2, 'pellentesque. Sed', 587, 2, 'et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor dapibus gravida. Aliquam tincidunt, nunc ac mattis ornare, lectus', 'images_1642076852829.jpg', 'Accessories', '2022-02-14 11:28:23', 'new', 'Quis Foundation', 0),
(230, 1, 'Curabitur egestas', 812, 3, 'nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor dapibus gravida. Aliquam tincidunt, nunc ac mattis ornare, lectus ante dictum mi, ac mattis velit justo nec ante.', 'images_1642076852829.jpg', 'Kids\'', '2022-02-14 11:28:23', 'new', 'Dui Augue LLC', 0),
(231, 1, 'cursus. Nunc', 739, 4, 'elit fermentum risus, at fringilla purus mauris a nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit,', 'images_1642076852829.jpg', 'Kids\'', '2022-02-14 11:28:23', 'new', 'Vulputate LLC', 0),
(232, 2, 'elit', 570, 4, 'Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent interdum ligula eu enim. Etiam imperdiet dictum magna. Ut tincidunt orci', 'images_1642076852829.jpg', 'Watches', '2022-02-14 11:28:23', 'new', 'Nibh Sit Incorporated', 0),
(233, 1, 'Curabitur', 23, 4, 'Fusce diam nunc, ullamcorper eu, euismod ac, fermentum vel, mauris. Integer sem elit, pharetra ut, pharetra sed, hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut', 'images_1642076852829.jpg', 'Kids\'', '2022-02-14 11:28:23', 'new', 'Diam Corporation', 0),
(234, 2, 'sit amet', 482, 9, 'faucibus orci luctus et ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed consequat auctor, nunc nulla vulputate dui, nec tempus mauris erat', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Mauris Vestibulum Neque Industries', 0),
(235, 2, 'pede ac', 568, 7, 'viverra. Donec tempus, lorem fringilla ornare placerat, orci lacus vestibulum lorem, sit amet ultricies sem magna nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur', 'images_1642076852829.jpg', 'Jewelry', '2022-02-14 11:28:23', 'new', 'At Ltd', 0),
(236, 3, 'Aenean egestas hendrerit', 418, 4, 'risus. Donec nibh enim,', 'images_1642076852829.jpg', 'Women\'s', '2022-02-14 11:28:23', 'new', 'At Pede Limited', 0),
(237, 2, 'faucibus orci', 978, 7, 'fermentum arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Phasellus ornare.', 'images_1642076852829.jpg', 'Women\'s', '2022-02-14 11:28:23', 'new', 'Lorem Auctor LLP', 0),
(238, 1, 'molestie tortor', 352, 4, 'tincidunt dui augue eu tellus. Phasellus elit pede, malesuada vel, venenatis vel, faucibus id, libero.', 'images_1642076852829.jpg', 'Scrubs', '2022-02-14 11:28:23', 'new', 'Sem Ut Dolor Corporation', 0),
(239, 2, 'neque. Morbi', 40, 7, 'auctor, nunc', 'images_1642076852829.jpg', 'Jewelry', '2022-02-14 11:28:23', 'new', 'A Odio Limited', 0),
(240, 2, 'pulvinar', 408, 1, 'non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices a, auctor non, feugiat nec, diam.', 'images_1642076852829.jpg', 'Uniforms', '2022-02-14 11:28:23', 'new', 'Dui Quis Accumsan Corporation', 0),
(241, 3, 'blandit. Nam', 333, 4, 'Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla tincidunt, neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus', 'images_1642076852829.jpg', 'Shoes', '2022-02-14 11:28:23', 'new', 'Sit Amet Dapibus Corporation', 0),
(242, 1, 'nec, cursus a,', 493, 2, 'quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam', 'images_1642076852829.jpg', 'Uniforms', '2022-02-14 11:28:23', 'new', 'Nec Ltd', 0),
(243, 2, 'enim, condimentum', 397, 3, 'sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et netus', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'At Institute', 0),
(244, 1, 'et', 833, 4, 'urna convallis erat, eget tincidunt dui augue eu tellus. Phasellus elit pede, malesuada vel, venenatis vel, faucibus id,', 'images_1642076852829.jpg', 'Women\'s', '2022-02-14 11:28:23', 'new', 'Donec Est Consulting', 0),
(245, 3, 'congue', 566, 6, 'natoque penatibus et magnis dis', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Dolor Incorporated', 0),
(246, 2, 'mauris sapien, cursus', 605, 4, 'In ornare sagittis felis. Donec tempor, est ac mattis semper, dui', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Enim Nunc Ut Incorporated', 0),
(247, 2, 'sed dui.', 72, 9, 'blandit congue. In scelerisque', 'images_1642076852829.jpg', 'Men\'s', '2022-02-14 11:28:23', 'new', 'Rutrum Eu Ultrices Associates', 0),
(248, 1, 'amet, faucibus', 496, 3, 'in, cursus et, eros.', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Leo Elementum Incorporated', 0),
(249, 2, 'et magnis dis', 512, 5, 'fringilla euismod enim. Etiam gravida molestie arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula.', 'images_1642076852829.jpg', 'Men\'s', '2022-02-14 11:28:23', 'new', 'Feugiat Sed Nec Incorporated', 0),
(250, 2, 'pellentesque,', 754, 1, 'quis turpis vitae purus gravida sagittis. Duis gravida. Praesent eu nulla at sem molestie sodales. Mauris blandit enim consequat purus. Maecenas libero est, congue a, aliquet vel,', 'images_1642076852829.jpg', 'Women\'s', '2022-02-14 11:28:23', 'new', 'Arcu Company', 0),
(251, 2, 'ac', 862, 5, 'Phasellus at augue id ante dictum cursus. Nunc', 'images_1642076852829.jpg', 'Jewelry', '2022-02-14 11:28:23', 'new', 'Magna Ltd', 0),
(252, 2, 'Etiam', 42, 6, 'arcu vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue turpis. In condimentum. Donec at arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Id Libero Donec Consulting', 0),
(253, 2, 'nascetur', 726, 1, 'aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede', 'images_1642076852829.jpg', 'Watches', '2022-02-14 11:28:23', 'new', 'Malesuada Id Company', 0),
(254, 2, 'Maecenas', 526, 10, 'ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie', 'images_1642076852829.jpg', 'Accessories', '2022-02-14 11:28:23', 'new', 'Cubilia Curae PC', 0),
(255, 2, 'a, aliquet', 730, 5, 'id, mollis nec, cursus a, enim. Suspendisse aliquet, sem ut cursus luctus, ipsum leo elementum sem, vitae aliquam eros turpis non enim. Mauris quis turpis vitae purus gravida sagittis. Duis gravida. Praesent eu', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'A Enim Suspendisse Industries', 0),
(256, 2, 'justo nec', 124, 9, 'ante blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci lacus vestibulum lorem, sit amet ultricies sem magna nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla', 'images_1642076852829.jpg', 'Teen', '2022-02-14 11:28:23', 'new', 'Dictum Magna Ut PC', 0),
(258, 3, 'Nam tempor', 583, 8, 'magna. Sed eu eros. Nam consequat dolor vitae dolor. Donec fringilla. Donec feugiat metus sit amet ante. Vivamus non lorem vitae odio sagittis semper. Nam tempor diam dictum sapien. Aenean massa. Integer vitae nibh. Donec est mauris, rhoncus id, mollis nec, cursus a, enim. Suspendisse aliquet, sem', 'images_1642076852829.jpg', 'Clothing', '2022-02-14 11:28:23', 'new', 'Nisi Cum Inc.', 0),
(259, 2, 'tortor. Nunc commodo', 222, 10, 'pede, ultrices a, auctor non, feugiat nec, diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed pede. Cum sociis natoque penatibus et magnis dis parturient', 'images_1642076852829.jpg', 'Uniforms', '2022-02-14 11:28:23', 'new', 'Sapien LLP', 0),
(260, 2, 'venenatis vel, faucibus', 930, 7, 'lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus. Etiam bibendum fermentum metus. Aenean sed pede nec ante blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci', 'images_1642076852829.jpg', 'Shoes', '2022-02-14 11:28:23', 'new', 'Id Incorporated', 0),
(281, 12, 'UEUR', 225, 885, 'FGJbc', 'images_1646660270844.jpg,', 'accessories', '2022-03-07 13:37:51', 'HHhv', 'JJk', 0),
(282, 12, 'rustdyiurty', 445, 423, 'ydftiuyyytueoep', 'images_1646719151038.jpg,', 'shoes', '2022-03-08 05:59:11', 'erstsd', 'dsfgfdsg', 0),
(283, 12, 'jlkk', 467, 65, 'qwertyuioplkjhgfdsazxcvbn', 'images_1647930375545.png,images_1647930375550.png,images_1647930375600.png,images_1647930375601.png,images_1647930375663.png,', 'accessories', '2022-03-22 06:26:15', 'hkjlk', 'gh', 0);

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `rateid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `ratescore` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`rateid`, `userid`, `productid`, `ratescore`) VALUES
(3, 2, 1, 5),
(5, 2, 2, 5),
(6, 1, 2, 1),
(9, 1, 3, 5),
(12, 12, 3, 5),
(13, 11, 2, 5),
(14, 11, 5, 5),
(20, 11, 8, 5),
(21, 11, 1, 4),
(22, 11, 3, 1),
(23, 11, 4, 4),
(24, 11, 14, 5),
(25, 11, 10, 5),
(26, 11, 6, 3),
(27, 11, 7, 5),
(28, 11, 52, 4),
(30, 1, 11, 1),
(46, 1, 13, 2),
(50, 1, 1, 3),
(51, 1, 5, 4),
(53, 11, 12, 5),
(58, 1, 4, 1),
(76, 1, 53, 1),
(79, 11, 54, 5),
(91, 1, 50, 3),
(94, 12, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `subscriptionid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `planid` int(11) NOT NULL,
  `subscription_start_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `subscription_end_timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `postleft` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`subscriptionid`, `userid`, `planid`, `subscription_start_timestamp`, `subscription_end_timestamp`, `postleft`, `status`) VALUES
(26, 2, 1, '2022-02-01 11:40:37', '2022-02-27 00:00:00', 100, 2),
(96, 11, 4, '2022-02-10 06:00:10', '2022-03-03 00:00:00', 98, 2),
(123, 12, 1, '2022-03-22 06:26:15', '2022-04-21 00:00:00', 9, 2);

-- --------------------------------------------------------

--
-- Table structure for table `trendingproduct`
--

CREATE TABLE `trendingproduct` (
  `trendingproductid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `phonenumber` int(12) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(100) NOT NULL,
  `profileimage` varchar(255) NOT NULL DEFAULT 'image_default.png',
  `coverimage` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `fullname`, `phonenumber`, `password`, `address`, `profileimage`, `coverimage`, `role`, `status`) VALUES
(1, 'abnezer', 923591146, '$2a$10$Xpytk.grI1O4DnB/JKeqyOM2ac9rI9gAb44RPoOziVQU7MDUXIRYu', 'addis abeba', 'profile_profilepic_1644236051070.jpg', 'profile_image_1644213289998.png', 'user', 0),
(2, 'abnet kebede', 912345678, '$2a$10$JI6d/klkIqy1V24UtNTiXuG8Z8tdQWLVKAYpjdb1nQkFcxyyIrfBC', 'adama', 'profile_profilepic_1641801976969.jpg', 'profile_image_1641801001480.jpg', 'user', 0),
(3, 'biruck', 923591149, '$2a$10$60eCGoCUwbPXfV5yaibwp.7iAxQB3gLigMMHY4p/Qg/Mw0t6Tau2y', 'addis abeba', 'image_default.png', '', 'user', 0),
(4, 'null null', 0, '$2a$10$Ez0/sizbwdwbvn39fwaoWeO22l/oqKP5AqDKad8r.y/Ee5xQfrx4K', 'Addis Ababa', 'image_default.png', '', 'user', 0),
(8, 'Biruk A', 921324354, '$2a$10$M9jUV.QMPhJbCM63pWzOGuB34.Fwqf7RbMCEv.aNG9peGqwSdQFSe', 'Addis Ababa', 'image_default.png', '', 'user', 0),
(9, 'wewer wrwr', 444, '$2a$10$2xeiQ4xWWysPjhMsqlZBCOT170SLDmuH3qB0AmXHTWQQJuv1g84g.', 'addis', 'image_default.png', '', 'user', 0),
(10, 'we ew', 123456789, '$2a$10$jj76OUdHTBSOro33jyG9ReL2.7ZAC7i627S0ADYHHDojNhZjr6zZ6', 'addis', 'image_default.png', '', 'user', 0),
(11, 'Beke', 912121212, '$2a$10$BcpuXiRVJEhF.MnfGIPeYubuz0KC7.5pq.yTWabkQU.jARLp9Y2W.', 'South America, Brazil', 'profile_profilepic_1645099069135.jpg', 'profile_image_1643610456929.jpg', 'user', 0),
(12, 'Aser', 913131313, '$2a$10$XgM/9zbCAOzrs1AiMuiM4ewzeqo8fpjzGDzzOZVcqR6f1M0BWWPGa', 'jemo', 'profile_profilepic_1647935347932.jpg', 'profile_image_1644241393446.jpg', 'user', 0),
(32, 'rica rica', 1233698745, '$2a$10$ozQrsApa3dsEmcp3zinkQu18k6zq82x7MMCcsOUMAnR0wCsFsylN2', 'er', 'image_default.png', '', 'user', 0),
(35, 'rica rica', 1223, '$2a$10$YV5ip3laY4ssoRveQPUUouEpWvn4rM7knxqLoX4Kev3FIO2ptzhum', 'er', 'image_default.png', '', 'user', 0),
(39, 'rica rica', 1234, '$2a$10$i4Vw4QCKFYBFYRjC026LRO63fcNyXGoZ.tMyI/amgKJ9vyqH7gWBG', 'er', 'image_default.png', '', 'user', 0),
(40, 'rica rica', 12345, '$2a$10$3SqBfRm48vMTSVF3C9ex9OrMUahmEsZyLVhBmWNVOfdBCulWxUfRO', 'er', 'image_default.png', '', 'user', 0),
(43, 'rica rica', 123456, '$2a$10$4Ta3XpMuBhKBaMrG0WYkmejrkaDiJmZgtlQ5RQJnaOqyfV0BEVVg2', 'er', 'image_default.png', '', 'user', 0),
(45, 'rica rica', 1234568, '$2a$10$tBkA3JSy00Gg20LqT/1S3utLVp4nqo4EzCf0O1/xy7RqEVKH6d.7y', 'er', 'image_default.png', '', 'user', 0),
(46, 'rica rica', 12345686, '$2a$10$NYXPYG6nIL0uu9KntCpLkOW.of0Z3ZkK3OpHhRXvoIw/6d3r72zxy', 'er', 'image_default.png', '', 'user', 0),
(47, 'rica rica', 123456861, '$2a$10$wnXX8QqYsxIeStKrPCLIgOdgK2hNiZA8HCXUOMS/G8PlOeSMoBt9y', 'er', 'image_default.png', '', 'user', 0),
(48, 'rica rica', 1234568612, '$2a$10$2b0S7vcOSR6TKEN4cPVt9eOk0q0InVQNtwJNu1uEDSKK1LnZ8GxHO', 'er', 'image_default.png', '', 'user', 0),
(51, 'rica rica', 2147483647, '$2a$10$odzH5CWjrtlmj9/.QI/6LuHpw9Sah2emKrSb65uEq42082ZbpQV96', 'er', 'image_default.png', '', 'user', 0),
(53, '12 34', 34, '$2a$10$fMTwYEsHnlyxh9Gs0tsNPO3MiV9q9B3PZjk5XGo8wlwz57/wUxynC', '34', 'image_default.png', '', 'user', 0),
(72, '90 90', 90, '$2a$10$StYg9DuveZZmbYfia91XbOqFFArndoN85wj/ZUIJnl0pq8V8YWbTq', '90', 'image_default.png', '', 'user', 0),
(75, 'First Last', 919191919, '$2a$10$KYS1U8P8oPwmm579svyXmexGUQPaevt8x1HUhS5ZSIbvXDxAV2iKu', 'Addis Ababa', 'image_default.png', '', 'user', 0),
(85, 'firstname last', 918181818, '$2a$10$f887jO7x/BxrspS1dew.BejNyq2FAa.aEKVMVNbPsRkK0HIWTK8iS', 'Addis Ababa', 'image_default.png', '', 'user', 0),
(89, 'firstname last', 910101010, '$2a$10$W./b5M9jzt5p04ZfliIyIenacS8jl3qCwfkEYsg290stRGBB8d9Mm', 'Addis Ababa', 'image_default.png', '', 'user', 0),
(91, 'admin', 909090909, '$2a$10$nEo/GCoFyXhCQpGqYOEPcOnAb33N/sE6e8jgWfYRqBOClCO/BiXdy', 'addis abeba', 'image_default.png', '', 'admin', 0),
(92, 'kalid  ousman', 911610563, '$2a$10$W2W/ohNdEKMDk5dZ0DlWqO/uC66xzY/OLSqaB1zFPOMLH7MrxCj2u', 'Addis Ababa', 'image_default.png', '', 'user', 0),
(93, 'tse g', 907070707, '$2a$10$cf21Y08/la6Xq/mlmm/vvO/zHhKb0rMrvLrQT.81RSwLSPYPokmNW', 'Addis Ababa', 'profile_profilepic_1644242495082.png', '', 'user', 0),
(95, 'Nati Samiiii', 911111111, '$2a$10$dYA5K3j2ww/djEeu7uwnru9D9YdHoCR5K/y0pBX/t1N0FRcpA3462', 'Addis Ababa', 'image_default.png', '', 'user', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `catagories`
--
ALTER TABLE `catagories`
  ADD PRIMARY KEY (`catagoryid`);

--
-- Indexes for table `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`conversationid`),
  ADD UNIQUE KEY `senderid` (`senderid`,`reciverid`),
  ADD UNIQUE KEY `senderid_2` (`senderid`,`reciverid`),
  ADD UNIQUE KEY `senderid_3` (`senderid`,`reciverid`),
  ADD UNIQUE KEY `senderid_4` (`senderid`,`reciverid`),
  ADD KEY `reciverid` (`reciverid`);

--
-- Indexes for table `feedlikes`
--
ALTER TABLE `feedlikes`
  ADD PRIMARY KEY (`likeid`),
  ADD UNIQUE KEY `feedid` (`feedid`,`userid`),
  ADD UNIQUE KEY `feedid_2` (`feedid`,`userid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `feeds`
--
ALTER TABLE `feeds`
  ADD PRIMARY KEY (`feedid`),
  ADD KEY `postedby` (`postedby`);

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`followid`),
  ADD UNIQUE KEY `follower_2` (`follower`,`following`),
  ADD UNIQUE KEY `follower_3` (`follower`,`following`),
  ADD KEY `follower` (`follower`),
  ADD KEY `following` (`following`);

--
-- Indexes for table `heroproducts`
--
ALTER TABLE `heroproducts`
  ADD PRIMARY KEY (`heroproductid`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`messageid`),
  ADD KEY `conversationid` (`conversationid`),
  ADD KEY `sender` (`sender`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notificationid`),
  ADD KEY `userid` (`touser`),
  ADD KEY `notifications_ibfk_2` (`sentfrom`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`planid`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productid`),
  ADD KEY `products_ibfk_1` (`postedby`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`rateid`),
  ADD UNIQUE KEY `userid` (`userid`,`productid`),
  ADD UNIQUE KEY `userid_2` (`userid`,`productid`),
  ADD KEY `productid` (`productid`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`subscriptionid`);

--
-- Indexes for table `trendingproduct`
--
ALTER TABLE `trendingproduct`
  ADD PRIMARY KEY (`trendingproductid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `phonenumber` (`phonenumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `catagories`
--
ALTER TABLE `catagories`
  MODIFY `catagoryid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `conversation`
--
ALTER TABLE `conversation`
  MODIFY `conversationid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `feedlikes`
--
ALTER TABLE `feedlikes`
  MODIFY `likeid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- AUTO_INCREMENT for table `feeds`
--
ALTER TABLE `feeds`
  MODIFY `feedid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `follow`
--
ALTER TABLE `follow`
  MODIFY `followid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `heroproducts`
--
ALTER TABLE `heroproducts`
  MODIFY `heroproductid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `messageid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=439;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notificationid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=320;

--
-- AUTO_INCREMENT for table `plan`
--
ALTER TABLE `plan`
  MODIFY `planid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=284;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `rateid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `subscriptionid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `trendingproduct`
--
ALTER TABLE `trendingproduct`
  MODIFY `trendingproductid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedlikes`
--
ALTER TABLE `feedlikes`
  ADD CONSTRAINT `feedlikes_ibfk_1` FOREIGN KEY (`feedid`) REFERENCES `feeds` (`feedid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `feedlikes_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `feeds`
--
ALTER TABLE `feeds`
  ADD CONSTRAINT `feeds_ibfk_1` FOREIGN KEY (`postedby`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follower`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`following`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`touser`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`sentfrom`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`postedby`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `products` (`productid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
