-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 03, 2018 at 06:26 AM
-- Server version: 5.7.21
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `erp`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text,
  `is_active` varchar(10) NOT NULL DEFAULT 'true',
  `profile_pic` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `is_active`, `profile_pic`) VALUES
(1, 'Admin', 'admin@admin.com', 'admin@admin', 'true', '');

-- --------------------------------------------------------

--
-- Table structure for table `dailyUpdate`
--

CREATE TABLE `dailyUpdate` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(255) NOT NULL,
  `morning_session` varchar(255) DEFAULT NULL,
  `evening_session` varchar(255) DEFAULT NULL,
  `in_time` varchar(20) DEFAULT NULL,
  `out_time` varchar(20) DEFAULT NULL,
  `total_hours` varchar(20) DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Not Verified',
  `date_created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dailyUpdate`
--

INSERT INTO `dailyUpdate` (`id`, `employee_id`, `morning_session`, `evening_session`, `in_time`, `out_time`, `total_hours`, `status`, `date_created`) VALUES
(1, '6', 'Absent', 'Absent', '-', '-', '0', 'Not Verified', '2018-09-29 05:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_pic` text,
  `designation` varchar(255) DEFAULT NULL,
  `is_active` varchar(10) NOT NULL DEFAULT 'true',
  `salary` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `first_name`, `last_name`, `email`, `password`, `profile_pic`, `designation`, `is_active`, `salary`, `date_created`) VALUES
(6, 'EMP', '1', 'emp1@gmail.com', 'emp1', '', 'Project Manager', 'true', '10000', '2018-09-29 16:50:38'),
(7, 'EMP', '2', 'emp2@gmail.com                                                                   ', 'emp2', '', 'Developer (IOS)', 'false', '55000', '2018-09-29 16:57:43'),
(8, 'EMP', '3', 'emp3@gmail.com', 'emp3', '', 'Developer (Android)', 'true', '5000', '2018-09-29 16:58:06'),
(9, 'EMP', '4', 'emp4@gmail.com', 'emp4', '', 'Backend Developer', 'true', '12000', '2018-09-29 16:59:16'),
(11, 'EMP', '6', 'emp6@gmail.com', 'emp6', '', 'HR', 'true', '6000', '2018-09-29 17:00:24'),
(12, 'EMP', '7', 'emp7@gmail.com', 'emp7', '', 'Bidder', 'true', '9000', '2018-09-29 17:00:49');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `project_id` int(11) NOT NULL,
  `employee_id` varchar(255) DEFAULT NULL,
  `responsible_person` varchar(255) DEFAULT NULL,
  `project_manager` varchar(255) DEFAULT NULL,
  `project_name` varchar(255) DEFAULT NULL,
  `project_description` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'In Progress',
  `date_created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `employee_id`, `responsible_person`, `project_manager`, `project_name`, `project_description`, `status`, `date_created`) VALUES
(3, '7', '7', '10', 'Project 1 Edited', 'Project Description Edited', 'In Progress', '2018-09-29 17:24:50'),
(4, '8,9', '11', '8', 'Project 123', 'project Description', 'In Progress', '2018-10-01 16:26:29');

-- --------------------------------------------------------

--
-- Table structure for table `queries`
--

CREATE TABLE `queries` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(255) DEFAULT NULL,
  `management_id` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `reply` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'open',
  `date_created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `task_name` varchar(255) DEFAULT NULL,
  `task_description` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'in-progress',
  `project_id` varchar(255) DEFAULT NULL,
  `others` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task_name`, `task_description`, `status`, `project_id`, `others`, `date_created`) VALUES
(5, 'Task 1', 'Task 2', 'in-progress', '3', '', '2018-09-29 18:04:01');

-- --------------------------------------------------------

--
-- Table structure for table `taskUpdate`
--

CREATE TABLE `taskUpdate` (
  `id` int(11) NOT NULL,
  `project_id` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `taskUpdate`
--

INSERT INTO `taskUpdate` (`id`, `project_id`, `description`, `date_created`) VALUES
(1, '3', 'First daily Update', '2018-09-29 18:03:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dailyUpdate`
--
ALTER TABLE `dailyUpdate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`);

--
-- Indexes for table `queries`
--
ALTER TABLE `queries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taskUpdate`
--
ALTER TABLE `taskUpdate`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dailyUpdate`
--
ALTER TABLE `dailyUpdate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `queries`
--
ALTER TABLE `queries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `taskUpdate`
--
ALTER TABLE `taskUpdate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
