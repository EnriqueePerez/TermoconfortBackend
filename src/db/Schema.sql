CREATE DATABASE IF NOT EXISTS Overheating;

CREATE TABLE IF NOT EXISTS stores (
    `CR` VARCHAR(6) PRIMARY KEY NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `ciudad` VARCHAR(20) NOT NULL,
);

CREATE TABLE IF NOT EXISTS users (
    `id_usuario` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL
);

--timestamp yyyy--mm--dd hh:mm:ss 

CREATE TABLE IF NOT EXISTS data (
    `registro_id` INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
    `hora_de_registro` TIME NOT NULL,
    `fecha_de_registro` DATE NOT NULL,
    `CR` VARCHAR(6) NOT NULL,
    `id_usuario` INT UNSIGNED NOT NULL,
    `unidad` VARCHAR(20) NOT NULL,
    `refrigerante` enum('R22', 'R404a') NOT NULL,
    `presion_arranque` DOUBLE(7, 3) NOT NULL,
    `presion_paro` DOUBLE(7, 3) NOT NULL,
    `presion_succion` DOUBLE(7, 3) NOT NULL,
    `resistencia_pt1000` DOUBLE(8, 3) NOT NULL,
    `temp_tubo` DOUBLE(6, 2) NOT NULL,
    `temp_saturacion` DOUBLE(6, 2) NOT NULL,
    `temp_sobrecalentamiento` DOUBLE(6, 2) NOT NULL,
    `aprobado` TINYINT(1) NOT NULL,
    `comentarios` TEXT  
);

DELIMITER $$

CREATE PROCEDURE validatingdataSecondary(
    IN comentarios TEXT,
    IN aprobado TINYINT(1),
    IN presion_arranque DOUBLE(7,3),
    IN presion_paro DOUBLE(7,3),
    IN presion_succion DOUBLE(7,3),
    IN resistencia_pt1000 DOUBLE(8,3),
    IN temp_saturacion DOUBLE(6,2),
    IN temp_tubo DOUBLE(6,2),
    IN temp_sobrecalentamiento DOUBLE(6,2),
    IN equipo VARCHAR(20),
    IN refrigerante ENUM('R22','R404a'),
    IN crCode VARCHAR(6),
    IN id_usuario INT(10),
    IN hora TIME,
    IN fecha DATE
)
BEGIN
	DECLARE repeated INT DEFAULT 0;
    DECLARE mes INT DEFAULT MONTH(fecha);
    DECLARE ano INT DEFAULT YEAR(fecha);

    SELECT COUNT(*) INTO repeated
    FROM `dataSecondary` WHERE MONTH(`fecha_de_registro`) = mes AND YEAR(`fecha_de_registro`) = ano AND `CR` = crCode AND `unidad` = equipo;


    IF repeated >= 1 THEN
        SELECT repeated;
    ELSE
        INSERT INTO `dataSecondary` (
            hora_de_registro,
            fecha_de_registro,
            CR,
            id_usuario,
            unidad,
            refrigerante,
            presion_arranque,
            presion_paro,
            presion_succion,
            resistencia_pt1000,
            temp_tubo,
            temp_saturacion,
            temp_sobrecalentamiento,
            aprobado,
            comentarios
        )
        VALUES (
            hora,
            fecha,
            crCode,
            id_usuario,
            equipo,
            refrigerante,
            presion_arranque,
            presion_paro,
            presion_succion,
            resistencia_pt1000,
            temp_tubo,
            temp_saturacion,
            temp_sobrecalentamiento,
            aprobado,
            comentarios
        );
    END IF;
END $$

DELIMITER ;