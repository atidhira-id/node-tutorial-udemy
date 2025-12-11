-- THIS FILE IS JUST A REMINDER OF HOW THE DATABASE LOOKS LIKE

`id` INT UNSIGNED NOT NULL PRIMARY KEY UNIQUE_KEY AUTO_INCREMENT,
`title` VARCHAR(255) NOT NULL,
`price` DOUBLE NOT NULL,
`description` TEXT NOT NULL,
`image_url` VARCHAR(255) NOT NULL




INSERT INTO `section10db`.`products` (`title`, `price`, `description`, `image_url`) VALUES ('B2 Plane', '5000', 'The best plane for war today', 'https://upload.wikimedia.org/wikipedia/commons/7/77/RAF_F-35B_integration_flying_training_with_USAF_B-2_30092019_-_4.jpg');
INSERT INTO `section10db`.`products` (`title`, `price`, `description`, `image_url`) VALUES ('A book', '20.99', 'It is just a book', 'https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=');
