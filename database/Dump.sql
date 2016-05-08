DROP DATABASE IF EXISTS WHOISNEXT;
CREATE DATABASE WHOISNEXT;

USE WHOISNEXT;

DROP TABLE IF EXISTS ADMIN;
CREATE TABLE ADMIN
	(admin_username VARCHAR(30) NOT NULL,
	 password VARCHAR(50) NOT NULL,
	 PRIMARY KEY (admin_username)
	);

DROP TABLE IF EXISTS FACULTY;
CREATE TABLE FACULTY
	(emp_num INT(9) NOT NULL,
	 username VARCHAR(30) NOT NULL UNIQUE,
	 name VARCHAR(50) NOT NULL,
	 password VARCHAR(50) NOT NULL,
	 email VARCHAR(50) NOT NULL,
	 is_validated BOOLEAN DEFAULT FALSE,
	 current_theme INT(2) NOT NULL DEFAULT 0,
	 PRIMARY KEY (emp_num)
	);

DROP TABLE IF EXISTS CLASS;
CREATE TABLE CLASS
	(class_id INT AUTO_INCREMENT,
	 course_code VARCHAR(10) NOT NULL,
	 course_title VARCHAR(256) NOT NULL,
	 class_section VARCHAR(10) NOT NULL,
	 section_number VARCHAR(5),
	 emp_num INT(9) NOT NULL,
	 PRIMARY KEY (class_id),
	 FOREIGN KEY(emp_num) REFERENCES FACULTY(emp_num) ON DELETE CASCADE ON UPDATE CASCADE
	);

DROP TABLE IF EXISTS STUDENT;
CREATE TABLE STUDENT
	(student_number VARCHAR(10) NOT NULL,
     emp_num INT(9) NOT NULL,
	 first_name VARCHAR(50) NOT NULL,
	 middle_name VARCHAR(50),
	 last_name VARCHAR(50) NOT NULL,
	 college VARCHAR(50) NOT NULL,
	 course VARCHAR(50) NOT NULL,
	 gender VARCHAR(1) NOT NULL,
	 picture VARCHAR(100) DEFAULT '../../icon/dp.png',
	 birthday DATE,
     FOREIGN KEY(emp_num) REFERENCES FACULTY(emp_num) ON DELETE CASCADE ON UPDATE CASCADE,
	 PRIMARY KEY (student_number, emp_num)
	);

DROP TABLE IF EXISTS CLASS_STUDENT;
CREATE TABLE CLASS_STUDENT
	(class_id INT,
	 student_number VARCHAR(10) NOT NULL,
     emp_num INT(9) NOT NULL,
 	 no_of_times_called INT DEFAULT 0,
     PRIMARY KEY (class_id, student_number),
 	 FOREIGN KEY (class_id) REFERENCES CLASS(class_id)  ON DELETE CASCADE ON UPDATE CASCADE,
     FOREIGN KEY(emp_num) REFERENCES FACULTY(emp_num) ON DELETE CASCADE ON UPDATE CASCADE,
     FOREIGN KEY (student_number) REFERENCES STUDENT(student_number)  ON DELETE CASCADE ON UPDATE CASCADE
	);

DROP TABLE IF EXISTS LOG;
CREATE TABLE LOG
	(log_number INT AUTO_INCREMENT,
	 log_date TIMESTAMP DEFAULT NOW(),
     ip_address VARCHAR(24) NOT NULL,
	 username VARCHAR(30) NOT NULL,
	 method VARCHAR(12) NOT NULL,
	 url VARCHAR(64) NOT NULL,
	 message VARCHAR(256) NOT NULL,
	 status VARCHAR(12) NOT NULL,
	 PRIMARY KEY (log_number)
	);

DROP TABLE IF EXISTS SAVEPOINT;
CREATE TABLE SAVEPOINT
	(save_id INT AUTO_INCREMENT,
	 save_name VARCHAR(50) NOT NULL,
	 save_date TIMESTAMP DEFAULT NOW(),
	 emp_num INT(9) NOT NULL,
	 class_id INT,
	 FOREIGN KEY (class_id) REFERENCES CLASS(class_id) ON DELETE CASCADE ON UPDATE CASCADE,
	 FOREIGN KEY (emp_num) REFERENCES FACULTY(emp_num) ON DELETE CASCADE ON UPDATE CASCADE,	
	 PRIMARY KEY (save_id)
	);

DROP TABLE IF EXISTS SAVE_STUDENT;
CREATE TABLE SAVE_STUDENT
	(save_id INT NOT NULL,
	 student_number VARCHAR(10) NOT NULL,
	 FOREIGN KEY (save_id) REFERENCES SAVEPOINT(save_id) ON DELETE CASCADE ON UPDATE CASCADE,
	 FOREIGN KEY (student_number) REFERENCES CLASS_STUDENT(student_number) ON DELETE CASCADE ON UPDATE CASCADE,
	 PRIMARY KEY (save_id, student_number)
	);

INSERT INTO ADMIN VALUES ("WhoIsNext", PASSWORD("ab-1l"));

INSERT INTO FACULTY VALUES (128128128, "rncrecario", "Reginald Recario", PASSWORD("madamada128"), "rncrecario@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (131131131, "laniedanila", "Lanie Danila", PASSWORD("assembly131"), "laniedanila@gmail.com",  TRUE, 0);
INSERT INTO FACULTY VALUES (220202020, "rjgobrero", "Jason Obrero", PASSWORD("rjgocmsc2"), "rjgobrero@gmail.com",  TRUE, 0);
INSERT INTO FACULTY VALUES (222222222, "rvbulalacao", "Rommel Bulalacao", PASSWORD("terrorcs22"), "rvbulalacao@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (565656565, "jrramirez", "Ramir Ramirez", PASSWORD("mirramir123"), "jrramirez@gmail.com",  TRUE, 0);
INSERT INTO FACULTY VALUES (111111111, "donnadrio", "Donnalyn Drio", PASSWORD("driodonna1234"), "donnadrio@gmail.com",TRUE, 0);
INSERT INTO FACULTY VALUES (123123123, "betelderobles", "Betel de Robles", PASSWORD("btldrblscmsc"), "betelderobles@gmail.com",  TRUE, 0);
INSERT INTO FACULTY VALUES (125125125, "jencinas", "Joman Encinas", PASSWORD("jencinascmsc"), "jencinas@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (202020202, "mmanalang", "Martee Manalang", PASSWORD("murteecmsc"), "mmanalang@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (132132132, "ivyaguila", "Ivy Aguila", PASSWORD("poisonivycmsc"), "ivyaguila@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (100100100, "kepbuplb", "Kristine Bautista", PASSWORD("kepbuplbcmsc"), "kepbautista@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (575757575, "maryaaguirre", "Marya Aguirre", PASSWORD("maamaryacmsc"), "maryaaguirre@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (130130130, "kjaen", "Kendall Jaen", PASSWORD("kendollcmsc"), "kjaen@gmail.com", TRUE, 0);
/* RECENTLY ADDED */
INSERT INTO FACULTY VALUES (212121212, "mftandoc", "Mark Froilan Tandoc", PASSWORD("sirfroicmsc"), "froitandoc@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (161161161, "jcplaras", "James Carlo Plaras", PASSWORD("sirjamescmsc"), "jamesplaras@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (170170170, "cnmperalta", "Caroline Natalie Peralta", PASSWORD("keiggwp170"), "cnmperalta@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (171717171, "kltan", "Katherine Loren Tan", PASSWORD("kathggwp170"), "kltan@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (124124124, "kbppelaez", "Kristine Bernadette Pelaez", PASSWORD("madamggwp170"), "kbppelaez@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (129129129, "tjmonserrat", "Toni Jan Keith Monserrat", PASSWORD("tjhotdog129"), "tjmonserratj@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (141141141, "jsamaniego", "Jamie Samaniego", PASSWORD("jamieggwp141"), "jsamaniego@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (150150150, "klrlactuan", "Kristoffer Lei Lactuan", PASSWORD("sirleics150"), "klrlactuan@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (165165165, "kjhmagno", "Katrina Joy Magno", PASSWORD("magnoicecream"), "kjhmagno@gmail.com", TRUE, 0);
INSERT INTO FACULTY VALUES (180180180, "jpabico", "Jaderick Pabico", PASSWORD("pabicolatik"), "jpabico@gmail.com", TRUE, 0);

INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 2", "Introduction to the Internet", "B", null, 202020202);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 2", "Introduction to the Internet", "B", "3L", 220202020);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 11", "Introduction to Computer Science", "UV", null, 123123123);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 11", "Introduction to Computer Science", "UV", "3L", 111111111);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "X", null, 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "Y", null, 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "X", "4L", 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "X", "3L", 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 22", "Object-Oriented Programming", "Y", "2L", 222222222);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 57", "Discrete Mathematical Structure in Computer Science", "ST", "3L", 575757575);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", null, 131131131);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", "5L", 130130130);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", null, 131131131);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", "5L", 130130130);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 130", "Logic Design and Digital Computer Circuits", "C", "4L", 131131131);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "S", "1L", 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "C", null, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "S", null, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "AB", "1L", 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "AB", "2L", 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "AB", "3L", 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 128", "Introduction to Software Engineering", "CD", "4L", 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 132", "Computer Architecture", "ST", "3L", 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 132", "Computer Architecture", "T", null, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 132", "Computer Architecture", "T", "4L", 132132132);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 125", "Operating Systems", "ST", null, 125125125);
/* RECENTLY ADDED */
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 21", "Fundamentals of Programming", "UV", null, 212121212);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 21", "Fundamentals of Programming", "UV", "2L", 212121212);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 21", "Fundamentals of Programming", "UV", "5L", 161161161);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 100", "Web Programming", "Z", null, 202020202);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 100", "Web Programming", "AB", null, 202020202);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 123", "Data Structures", "CD", null, 565656565);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 123", "Data Structures", "CD", "6L", 565656565);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 123", "Data Structures", "CD", "1L", 123123123);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 123", "Data Structures", "CD", "4L", 123123123);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 124", "Design and Implementation of Programming Languages", "T", null, 170170170);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 124", "Design and Implementation of Programming Languages", "T", "2L", 170170170);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 124", "Design and Implementation of Programming Languages", "T", "4L", 171717171);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 124", "Design and Implementation of Programming Languages", "T", "6L", 124124124);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 127", "File Processing and Database Systems", "S", null, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 127", "File Processing and Database Systems", "S", "4L", 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 129", "Principles of Compiler Design", "C", null, 129129129);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 129", "Principles of Compiler Design", "C", "1L", 129129129);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 131", "Computer Organization and Machine Level Programming", "C", null, 131131131);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 131", "Computer Organization and Machine Level Programming", "C", "6L", 131131131);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 131", "Computer Organization and Machine Level Programming", "C", "7L", 130130130);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 137", "Data Communications and Networking", "A", null, 129129129);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 137", "Data Communications and Networking", "A", "1L", 129129129);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 137", "Data Communications and Networking", "A", "2L", 129129129);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 141", "Automata and Language Theory", "D", null, 141141141);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 141", "Automata and Language Theory", "G", null, 141141141);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 141", "Automata and Language Theory", "D", "1L", 161161161);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 141", "Automata and Language Theory", "G", "2L", 212121212);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 142", "Design and Analysis of Algorithms", "EF", null, 565656565);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 142", "Design and Analysis of Algorithms", "EF", "2L", 170170170);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 142", "Design and Analysis of Algorithms", "EF", "8L", 220202020);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 150", "Scientific Computations in Computer Science", "G", null, 150150150);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 150", "Scientific Computations in Computer Science", "G", "5L", 150150150);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 150", "Scientific Computations in Computer Science", "G", "7L", 220202020);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 161", "Interactive Computer Graphics", "UV", null, 161161161);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 161", "Interactive Computer Graphics", "UV", "1L", 161161161);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 161", "Interactive Computer Graphics", "UV", "2L", 161161161);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 161", "Interactive Computer Graphics", "UV", "3L", 161161161);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 165", "Digital Image Processing", "H", null, 165165165);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 165", "Digital Image Processing", "H", "3L", 150150150);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 165", "Digital Image Processing", "W", null, 165165165);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 170", "Introduction to Artificial Intelligence", "U", null, 170170170);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 170", "Introduction to Artificial Intelligence", "U", "1L", 124124124);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 170", "Introduction to Artificial Intelligence", "U", "2L", 171717171);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 170", "Introduction to Artificial Intelligence", "U", "3L", 170170170);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 172", "Robot Modelling", "Z", null, 180180180);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 172", "Robot Modelling", "Z", "1L", 180180180);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 180", "Introduction to Parallel Computing", "YZ", null, 180180180);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 190", "Special Problem", "AB", null, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 190", "Special Problem", "EF", null, 131131131);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 190", "Special Problem", "Z", null, 170170170);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 191", "Special Topic", "B", null, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 191", "Special Topic", "H", null, 129129129);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 199", "Undergraduate Seminar", "A", null, 150150150);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 200", "Undergraduate Thesis", "AB", null, 128128128);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 200", "Undergraduate Thesis", "EF", null, 131131131);
INSERT INTO CLASS (course_code, course_title, class_section, section_number, emp_num) VALUES ("CMSC 200", "Undergraduate Thesis", "Z", null, 170170170);

INSERT INTO STUDENT VALUES ('2013-08197', 128128128, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 128128128, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 128128128, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 128128128, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 128128128, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 128128128, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 128128128, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 128128128, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 128128128, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 128128128, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 128128128, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 128128128, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 128128128, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 128128128, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 128128128, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 128128128, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 128128128, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 128128128, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 128128128, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 128128128, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 128128128, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 128128128, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 128128128, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 131131131, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 131131131, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 131131131, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 131131131, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 131131131, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 131131131, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 131131131, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 131131131, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 131131131, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 131131131, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 131131131, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 131131131, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 131131131, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 131131131, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 131131131, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 131131131, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 131131131, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 131131131, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 131131131, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 131131131, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 131131131, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 131131131, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 131131131, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 220202020, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 220202020, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 220202020, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 220202020, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 220202020, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 220202020, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 220202020, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 220202020, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 220202020, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 220202020, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 220202020, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 220202020, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 220202020, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 220202020, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 220202020, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 220202020, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 220202020, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 220202020, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 220202020, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 220202020, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 220202020, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 220202020, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 220202020, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 222222222, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 222222222, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 222222222, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 222222222, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 222222222, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 222222222, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 222222222, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 222222222, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 222222222, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 222222222, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 222222222, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 222222222, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 222222222, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 222222222, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 222222222, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 222222222, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 222222222, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 222222222, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 222222222, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 222222222, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 222222222, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 222222222, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 222222222, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 565656565, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 565656565, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 565656565, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 565656565, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 565656565, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 565656565, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 565656565, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 565656565, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 565656565, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 565656565, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 565656565, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 565656565, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 565656565, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 565656565, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 565656565, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 565656565, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 565656565, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 565656565, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 565656565, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 565656565, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 565656565, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 565656565, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 565656565, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 111111111, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 111111111, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 111111111, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 111111111, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 111111111, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 111111111, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 111111111, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 111111111, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 111111111, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 111111111, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 111111111, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 111111111, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 111111111, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 111111111, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 111111111, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 111111111, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 111111111, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 111111111, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 111111111, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 111111111, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 111111111, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 111111111, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 111111111, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 123123123, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 123123123, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 123123123, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 123123123, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 123123123, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 123123123, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 123123123, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 123123123, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 123123123, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 123123123, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 123123123, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 123123123, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 123123123, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 123123123, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 123123123, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 123123123, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 123123123, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 123123123, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 123123123, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 123123123, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 123123123, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 123123123, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 123123123, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 125125125, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 125125125, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 125125125, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 125125125, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 125125125, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 125125125, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 125125125, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 125125125, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 125125125, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 125125125, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 125125125, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 125125125, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 125125125, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 125125125, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 125125125, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 125125125, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 125125125, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 125125125, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 125125125, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 125125125, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 125125125, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 125125125, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 125125125, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 202020202, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 202020202, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 202020202, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 202020202, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 202020202, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 202020202, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 202020202, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 202020202, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 202020202, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 202020202, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 202020202, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 202020202, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 202020202, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 202020202, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 202020202, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 202020202, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 202020202, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 202020202, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 202020202, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 202020202, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 202020202, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 202020202, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 202020202, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 132132132, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 132132132, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 132132132, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 132132132, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 132132132, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 132132132, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 132132132, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 132132132, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 132132132, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 132132132, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 132132132, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 132132132, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 132132132, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 132132132, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 132132132, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 132132132, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 132132132, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 132132132, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 132132132, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 132132132, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 132132132, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 132132132, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 132132132, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 100100100, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 100100100, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 100100100, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 100100100, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 100100100, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 100100100, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 100100100, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 100100100, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 100100100, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 100100100, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 100100100, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 100100100, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 100100100, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 100100100, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 100100100, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 100100100, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 100100100, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 100100100, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 100100100, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 100100100, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 100100100, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 100100100, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 100100100, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 575757575, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 575757575, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 575757575, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 575757575, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 575757575, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 575757575, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 575757575, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 575757575, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 575757575, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 575757575, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 575757575, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 575757575, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 575757575, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 575757575, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 575757575, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 575757575, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 575757575, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 575757575, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 575757575, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 575757575, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 575757575, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 575757575, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 575757575, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 130130130, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 130130130, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 130130130, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 130130130, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 130130130, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 130130130, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 130130130, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 130130130, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 130130130, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 130130130, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 130130130, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 130130130, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 130130130, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 130130130, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 130130130, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 130130130, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 130130130, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 130130130, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 130130130, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 130130130, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 130130130, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 130130130, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 130130130, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
/* RECENTLY ADDED */
INSERT INTO STUDENT VALUES ('2013-08197', 212121212, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 212121212, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 212121212, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 212121212, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 212121212, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 212121212, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 212121212, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 212121212, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 212121212, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 212121212, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 212121212, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 212121212, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 212121212, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 212121212, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 212121212, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 212121212, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 212121212, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 212121212, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 212121212, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 212121212, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 212121212, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 212121212, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 212121212, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 161161161, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 161161161, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 161161161, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 161161161, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 161161161, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 161161161, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 161161161, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 161161161, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 161161161, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 161161161, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 161161161, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 161161161, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 161161161, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 161161161, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 161161161, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 161161161, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 161161161, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 161161161, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 161161161, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 161161161, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 161161161, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 161161161, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 161161161, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 170170170, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 170170170, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 170170170, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 170170170, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 170170170, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 170170170, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 170170170, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 170170170, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 170170170, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 170170170, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 170170170, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 170170170, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 170170170, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 170170170, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 170170170, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 170170170, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 170170170, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 170170170, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 170170170, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 170170170, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 170170170, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 170170170, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 170170170, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 171717171, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 171717171, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 171717171, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 171717171, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 171717171, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 171717171, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 171717171, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 171717171, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 171717171, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 171717171, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 171717171, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 171717171, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 171717171, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 171717171, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 171717171, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 171717171, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 171717171, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 171717171, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 171717171, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 171717171, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 171717171, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 171717171, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 171717171, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 124124124, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 124124124, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 124124124, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 124124124, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 124124124, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 124124124, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 124124124, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 124124124, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 124124124, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 124124124, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 124124124, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 124124124, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 124124124, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 124124124, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 124124124, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 124124124, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 124124124, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 124124124, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 124124124, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 124124124, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 124124124, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 124124124, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 124124124, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 129129129, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 129129129, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 129129129, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 129129129, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 129129129, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 129129129, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 129129129, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 129129129, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 129129129, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 129129129, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 129129129, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 129129129, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 129129129, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 129129129, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 129129129, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 129129129, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 129129129, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 129129129, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 129129129, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 129129129, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 129129129, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 129129129, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 129129129, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 141141141, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 141141141, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 141141141, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 141141141, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 141141141, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 141141141, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 141141141, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 141141141, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 141141141, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 141141141, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 141141141, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 141141141, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 141141141, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 141141141, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 141141141, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 141141141, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 141141141, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 141141141, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 141141141, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 141141141, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 141141141, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 141141141, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 141141141, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 150150150, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 150150150, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 150150150, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 150150150, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 150150150, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 150150150, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 150150150, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 150150150, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 150150150, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 150150150, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 150150150, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 150150150, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 150150150, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 150150150, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 150150150, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 150150150, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 150150150, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 150150150, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 150150150, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 150150150, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 150150150, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 150150150, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 150150150, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 165165165, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 165165165, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 165165165, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 165165165, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 165165165, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 165165165, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 165165165, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 165165165, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 165165165, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 165165165, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 165165165, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 165165165, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 165165165, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 165165165, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 165165165, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 165165165, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 165165165, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 165165165, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 165165165, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 165165165, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 165165165, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 165165165, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 165165165, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO STUDENT VALUES ('2013-08197', 180180180, "Adriell Dane", "Cabela", "de Guzman", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-29', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-08210', 180180180, "Jan Charles", "Maghirang", "Adono", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-07115', 180180180, "Gio Joshua", "T", "Peralta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-09-11', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00001', 180180180, "Joseph Tuan", "Cosico", "Truong", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-07-12', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00002', 180180180, "Carmina", "Romulo", "Barbaza", "CEM", "BSAECO", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-01', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00003', 180180180, "Alyssa", "Hernandez", "Albajera", "CEAT", "BSChE", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00004', 180180180, "Adriel", "Umali", "Palomar", "CEAT", "BSCE", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-15', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00005', 180180180, "Paolo", "Courtney", "Roces", "CA", "BSFT", "M", '../../icon/dp.png', STR_TO_DATE('1997-04-28', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00006', 180180180, "Marrick", "Malolos", "Mutya", "CEM", "BSAECO", "M", '../../icon/dp.png', STR_TO_DATE('1997-03-26', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00007', 180180180, "Camille", "Hernandez", "Belda", "CAS", "BACA", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00008', 180180180, "Alyanna Pauline", "C", "Bascao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1995-12-24', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2012-00003', 180180180, "Nicole", "A", "Martir", "CHE", "BSN", "F", '../../icon/dp.png', STR_TO_DATE('1996-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00032', 180180180, "Arriane", "A", "Jimena", "CFNR", "BSF", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-08', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2014-00009', 180180180, "Lara", "C", "Esguerra", "CDC", "BSDC", "F", '../../icon/dp.png', STR_TO_DATE('1998-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00010', 180180180, "Perico Dan", "B", "Dionisio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00011', 180180180, "Dana", "D", "Magpusao", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00012', 180180180, "Aron", "Z", "Vibar", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00013', 180180180, "Mon", "G", "Frias", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00014', 180180180, "Arthjoseph", "L", "Sabino", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00015', 180180180, "Reynaldo", "F", "Bayeta", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00016', 180180180, "Aleli", "Sonza", "Legaspi", "CAS", "BSCS", "F", '../../icon/dp.png', STR_TO_DATE('1997-01-02', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00017', 180180180, "Maru", "Sanchez", "Baul", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-03', '%Y-%m-%d'));
INSERT INTO STUDENT VALUES ('2013-00018', 180180180, "Miles", "V", "Basnilio", "CAS", "BSCS", "M", '../../icon/dp.png', STR_TO_DATE('1997-02-04', '%Y-%m-%d'));

INSERT INTO `LOG` VALUES (1,'2016-04-12 06:05:26','127.0.0.1','rncrecario','POST','/api/login','Successfully logged in.','SUCCESS'),(2,'2016-04-12 06:05:41','127.0.0.1','rncrecario','POST','/api/logout','Successfully logged out.','SUCCESS'),(3,'2016-04-12 06:06:29','127.0.0.1','<GUEST>','POST','/api/logout','No one is logged in.','FAILED'),(4,'2016-04-12 06:06:30','127.0.0.1','<GUEST>','POST','/api/logout','No one is logged in.','FAILED'),(5,'2016-04-12 06:12:03','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(6,'2016-04-12 06:24:12','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(7,'2016-04-12 06:28:59','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(8,'2016-04-12 06:30:17','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(9,'2016-04-12 06:35:12','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(10,'2016-04-12 06:36:52','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(11,'2016-04-12 06:36:54','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(12,'2016-04-12 06:36:57','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(13,'2016-04-12 06:37:00','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(14,'2016-04-12 06:37:03','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(15,'2016-04-12 06:37:42','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(16,'2016-04-12 06:38:24','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(17,'2016-04-12 06:40:01','127.0.0.1','WhoIsNext','POST','/api/login','Someone is already logged in.','FAILED'),(18,'2016-04-12 06:40:05','127.0.0.1','WhoIsNext','POST','/api/login','Someone is already logged in.','FAILED'),(19,'2016-04-12 06:40:32','127.0.0.1','<GUEST>','POST','/api/login','Incorrect Password!','FAILED'),(20,'2016-04-12 06:40:40','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS'),(21,'2016-04-12 06:42:33','127.0.0.1','WhoIsNext','POST','/api/login','Successfully logged in.','SUCCESS');
INSERT INTO `SAVEPOINT` VALUES (1,'Quidditch','2016-05-07 12:45:12',202020202,1),(2,'Hunger Games','2016-05-07 12:45:30',202020202,1),(3,'Tong-its','2016-05-07 12:45:52',202020202,1);
INSERT INTO `CLASS_STUDENT` VALUES (1,'2013-00008',202020202,1),(1,'2013-00010',202020202,2),(1,'2013-00011',202020202,2),(1,'2013-00012',202020202,2),(1,'2013-00013',202020202,1),(1,'2013-00014',202020202,1),(1,'2013-00015',202020202,3),(1,'2013-00016',202020202,3),(1,'2013-07115',202020202,1),(1,'2013-08197',202020202,2),(1,'2013-08210',202020202,2),(2,'2013-00012',220202020,0),(2,'2013-00013',220202020,0),(2,'2013-00014',220202020,0),(2,'2013-00015',220202020,0),(2,'2013-00016',220202020,0),(3,'2013-00012',123123123,0),(3,'2013-00013',123123123,0),(3,'2013-00014',123123123,0),(3,'2013-00015',123123123,0),(3,'2013-00016',123123123,0),(4,'2013-00016',111111111,0),(4,'2013-00017',111111111,0),(4,'2013-08197',111111111,0),(5,'2013-00014',222222222,0),(5,'2013-00015',222222222,0),(5,'2013-00016',222222222,0),(5,'2013-07115',222222222,0),(5,'2013-08197',222222222,0),(5,'2013-08210',222222222,0),(6,'2013-00014',222222222,0),(6,'2013-00015',222222222,0),(6,'2013-00016',222222222,0),(6,'2013-00017',222222222,0),(6,'2013-07115',222222222,0),(6,'2013-08197',222222222,0),(6,'2013-08210',222222222,0),(7,'2013-00015',222222222,0),(7,'2013-00016',222222222,0),(8,'2013-00012',222222222,0),(8,'2013-00013',222222222,0),(9,'2013-00014',222222222,0),(9,'2013-00015',222222222,0),(10,'2013-00016',575757575,0);
INSERT INTO `SAVE_STUDENT` VALUES (1,'2013-00008'),(1,'2013-00010'),(2,'2013-00010'),(1,'2013-00011'),(2,'2013-00011'),(1,'2013-00012'),(3,'2013-00012'),(1,'2013-00013'),(1,'2013-00014'),(1,'2013-00015'),(2,'2013-00015'),(3,'2013-00015'),(1,'2013-00016'),(2,'2013-00016'),(3,'2013-00016'),(2,'2013-07115'),(1,'2013-08197'),(2,'2013-08197'),(1,'2013-08210'),(2,'2013-08210');
