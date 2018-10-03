-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 03, 2018 at 09:22 AM
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `queries`
--
ALTER TABLE `queries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `taskUpdate`
--
ALTER TABLE `taskUpdate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
