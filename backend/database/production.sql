-- phpMyAdmin SQL Dump
-- version 4.0.10.12
-- http://www.phpmyadmin.net
--
-- Servidor: 127.11.39.2:3306
-- Tempo de Geração: 12/04/2016 às 12:42
-- Versão do servidor: 5.5.45
-- Versão do PHP: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de dados: `production`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamento`
--

CREATE TABLE IF NOT EXISTS `agendamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_agendamento` date NOT NULL,
  `data_vencimento` date DEFAULT NULL,
  `hora_agendamento` varchar(5) NOT NULL,
  `tecnico_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `endereco_id` int(11) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `tipo_agendamento` int(11) NOT NULL,
  `periodo` int(11) DEFAULT NULL,
  `cliente` varchar(80) NOT NULL,
  `statusagendamento` int(11) NOT NULL,
  `cpf` varchar(45) DEFAULT NULL,
  `plano` varchar(45) DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `senha` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`tecnico_id`),
  KEY `user_idx` (`user_id`),
  KEY `endereco_idx` (`endereco_id`),
  KEY `tecnico_idx` (`tecnico_id`),
  KEY `tipo_agendamento_idx` (`tipo_agendamento`),
  KEY `periodo_idx` (`periodo`),
  KEY `statusagendamento_idx` (`statusagendamento`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=71 ;

--
-- Fazendo dump de dados para tabela `agendamento`
--

INSERT INTO `agendamento` (`id`, `data_agendamento`, `data_vencimento`, `hora_agendamento`, `tecnico_id`, `user_id`, `endereco_id`, `descricao`, `tipo_agendamento`, `periodo`, `cliente`, `statusagendamento`, `cpf`, `plano`, `telefone`, `usuario`, `senha`) VALUES
(4, '2016-03-28', '2016-03-27', '15', 22, 20, 4, '.', 2, 2, 'Gustavo', 4, '108.545.326-09', '5MB', '(31) 9999-9888', 'gustavo', '108'),
(7, '2016-03-28', '2016-03-27', '16', 22, 20, 7, '.', 2, 2, 'Rangel Fernando Gonçalves', 4, '074.842.956-55', '5MB', '(31) 7311-7394', 'rangelfernando', '074'),
(8, '2016-03-27', '2016-03-27', '10', 22, 20, 8, '.', 2, 1, 'Riclei Gomes Da Costa', 4, '000.000.000-00', '5MB', '(31) 9444-3319', 'ricleigomes', '000'),
(9, '2016-03-29', '2016-03-27', '9', 22, 20, 9, 'Cliente indicação de Pablo Passos.\nRonaldo que enviou pro Thiago, porem não tem todos os dados, favor ligar pra central. Thiago e Ronaldo ciente.', 2, 2, 'Simone Pereira Campos Rodrigues', 4, '000.000.000-00', '5 mb', '(31) 8592-3673', 'simonepereira', '024'),
(12, '2016-03-29', '2016-03-28', '15', 22, 20, 12, '.', 2, 2, 'Delvia Ferreira Drumon', 4, '643.238.546-68', '3MB', '(31) 9979-0602', 'delvia5', '643'),
(14, '2016-03-29', '2016-03-28', '13', 22, 20, 14, '.', 2, 2, 'Maria De Lourdes Ramalho', 4, '044.247.316-35', '5MB', '(31) 9706-2528', 'mariadelourdes', '044'),
(15, '2016-03-29', '2016-03-28', '14', 22, 20, 15, 'Não tem cobertura de caixa', 2, 2, 'Ramon Marcio de Miranda', 5, '041.212.816-08', '7MB', '(31) 9963-5077', 'ramonmarcio', '041'),
(16, '2016-03-29', '2016-03-28', '17', 22, 20, 16, 'Não atende devido a não ter caixa', 2, 2, 'Afonso da Silva Teixeira', 5, '471.022.256-87', '5MB', '(31) 9974-1972', 'afonsodasilva', '471'),
(17, '2016-03-29', '2016-03-28', '17', 22, 22, 17, 'Instalada com sucesso', 2, 2, 'KEILA CRISTIANE RAMOS', 4, '065.528.966-62', '7MB', '(31) 3594-0012', 'KEILARAMOS', '065'),
(19, '2016-03-30', '2016-03-29', '10', 22, 20, 19, '.', 2, 1, 'CLAUCIENE TORQUATO ROCHA', 4, '033.838.896-61', '5MB', '(31) 9864-3570', 'CLAUCIENETORQUATO', '033'),
(20, '2016-03-30', '2016-03-29', '11', 22, 20, 20, '.', 2, 1, 'CRISTINA ANTONIA DA SIVA', 4, '054.140.016-93', '3MB', '(31) 9844-4566', 'cristinaantonia', '054'),
(21, '2016-03-30', '2016-03-29', '9', 22, 20, 21, 'o nome correto do cliente é evangelista e nao avangelista', 2, 1, 'Adriano Avangelista Timoteo', 4, '766.806.306-49', '5MB', '(31) 7571-7840', 'adrianoavangelista', '766'),
(25, '2016-03-30', '2016-03-29', '14', 22, 21, 25, '.', 2, 2, 'CLAUDIO DA SILVA ARAUJO', 4, '810.745.576-20', '5MB', '(31) 8514-2575', 'claudiodasilva', '810'),
(26, '2016-03-30', '2016-03-29', '16', 22, 21, 26, '.', 2, 2, 'Leandro Lelis Do Santos', 4, '106.998.297-05', '5MB', '(31) 9370-1057', 'leandrolelis', '106'),
(28, '2016-03-31', '2016-03-29', '10', 22, 21, 28, '96631089 senha wifi', 2, 2, 'RODNER LORENÇO DOS SANTOS', 4, '058.675.826-71', '5MB', '(31) 3397-6051', 'rodnerlorenco', '058'),
(29, '2016-03-30', '2016-03-29', '18', 22, 21, 29, 'Encima da padaria,\nTrocar o usuario do cliente pois nao esta logando', 2, 2, 'Elizangela Andrade Gomes', 4, '035.895.226-50', '10MB', '(31) 9945-9086', 'elizangela8', '035'),
(30, '2016-04-07', '2016-05-10', '9', 22, 21, 30, '', 2, 1, 'Marcela Mendonça Engracio Couto', 4, '075.435.136-09', '7MB', '(31) 8566-6415', 'marcelamendonca', '075'),
(31, '2016-03-31', '2016-03-30', '15', 22, 21, 31, '.', 2, 2, 'LARISSA ROCHA DE PAULA', 4, '128.170.706-66', '7MB', '(31) 3369-7045', 'larissa2', '128'),
(32, '2016-04-01', '2016-05-10', '9', 22, 20, 35, 'roteador do cliente', 2, 1, 'Claudineia Gonçalves Vicente', 4, '051.790.546-99', '5 mb', '(31) 8842-7585', 'claudineiagoncalves', '051'),
(33, '2016-04-01', '2016-05-05', '15', 22, 20, 36, '', 2, 2, 'Aline Neves de Assis', 4, '092.816.796-80', '5 mb', '(31) 9750-4515', 'alineneves', '092'),
(35, '2016-04-04', '2016-04-10', '15', 22, 21, 38, 'Instalação sera feita na Barão de Cocais 98 Do lado da igreja Deus e Amor', 2, 1, 'Maicon Daniel Dos Santos', 4, '095.025.736-25', '5MB', '(31) 9324-9858', 'maicondaniel', '095'),
(38, '2016-04-05', '2016-05-10', '14', 22, 20, 41, '', 2, 2, 'Manoel Fernandes Dias', 4, '277.576.687-00', '5 mb', '(31) 3591-2455', 'manoelfernandes', '277'),
(39, '2016-04-05', '2016-05-18', '16', 22, 20, 42, '', 2, 2, 'Marcone Araujo de Oliveira', 4, '118.881.176-21', '5mb', '(31) 9137-4379', 'marconearaujo', '118'),
(40, '2016-04-05', '2016-04-25', '9', 22, 21, 43, 'ficou faltando informar o bloco.. ate as 9 eu ligo pra informar!', 2, 1, 'ANA MARIA NEVES DOS SANTOS', 4, '100.386.816-92', '10MB', '(31) 9975-2812', 'marianeves', '100'),
(41, '2016-04-05', '2016-05-10', '11', 22, 21, 44, '.', 2, 1, 'RAIMUNDO LUNATO LORENÇO', 4, '026.701.626-30', '10MB', '(31) 3597-8678', 'RAIMUNDOLUNATO', '026'),
(42, '2016-04-07', '2016-05-15', '15', 22, 21, 45, 'bloco 04', 2, 2, 'LUIZ PAULO DUART', 4, '098.203.006-14', '5MB', '998176095', 'luizpaulo', '098'),
(43, '2016-04-06', '2016-05-10', '10', 22, 21, 46, '.', 2, 1, 'HIAGO AUGUSTO CORREIA ARAUJO', 4, '096.534.456-85', '5MB', '(31) 9436-5801', 'hiagoaugusto', '096'),
(44, '2016-04-06', '2016-05-10', '9', 22, 21, 47, '.', 2, 1, 'ANA DALVA GOMES DA ROCHA', 4, '033.383.606-57', '5', '(31) 3597-6519', 'anadalva', '033'),
(45, '2016-04-06', '2016-05-05', '13', 22, 21, 48, '..', 2, 2, 'ROSILENE ALVES CARDOSO', 5, '048.378.586-51', '5MB', '(31) 3597-6674', 'rosilenealves', '048'),
(46, '2016-04-06', '2016-05-15', '11', 22, 21, 49, '...', 2, 1, 'ANTONIO FRANCISCO SIRQUEIRA', 4, '681.834.106-34', '5MB', '(31) 8873-6497', 'antoniofrancisco', '681'),
(47, '2016-04-06', '2016-05-25', '16', 22, 21, 50, '...', 2, 2, 'Alex Nunes De Souza', 4, '052.078.966-01', '5MB', '(31) 8663-1208', 'alexnunes', '052'),
(48, '2016-04-06', '2016-05-10', '14', 22, 20, 51, '', 2, 2, 'Renderson Castelo Dura', 4, '109.575.307-06', '5mb', '(31) 8918-0743', 'rendersondura', '109'),
(49, '2016-04-06', '2016-05-10', '15', 22, 21, 52, '...', 2, 2, 'DEUSDETE FRANCISCO DOS SANTOS', 4, '913.945.706-00', '5MB', '(31) 9333-5818', 'deusdetefrancisco', '913'),
(50, '2016-04-07', '2016-04-06', '17', 22, 21, 53, 'CONDOMINIO BETIM LIFE 01', 2, 2, 'LEANDRO ANDRADE DO NASCIMENTO', 4, '097.101.536-84', '10MB', '(31) 973106739', 'leandroandrade', '097'),
(51, '2016-04-07', '2016-05-10', '10', 22, 20, 54, '', 2, 1, 'Kellen Estevão Machado', 4, '059.531.716-25', '7MB', '(31) 8673-1640', 'kellenestevao', '059'),
(52, '2016-04-07', '2016-05-05', '14', 22, 21, 55, 'AO LADO DO QUARTEL DO CAPELINHA', 2, 2, 'ARIVALDO FREITAS SOARES', 4, '142.855.386-01', '5MB', '(31) 8021-1368', 'arivaldofreitas', '142'),
(53, '2016-04-08', '2016-05-10', '15', 22, 21, 56, '..', 2, 2, 'LUCAS MONTEIRO SIRQUEIRA', 4, '015.135.376-01', '5MB', '(31) 7311-2613', 'lucasmonteiro', '015'),
(54, '2016-04-07', '2016-05-10', '11', 22, 20, 57, '', 2, 1, 'Nelson Lourenço da Silva', 4, '685.538.976-72', '5mb', '(31) 3591-8497', 'nelsonsilva', '685'),
(55, '2016-04-07', '2016-04-30', '18', 22, 20, 58, 'já é cliente. efetuar a troca de endereço', 2, 2, 'Claudia Gomes dos Santos', 4, '032.504.246-25', '5mb', '(31) 8596-5448', 'claudia', '032'),
(56, '2016-04-08', '2016-05-10', '16', 22, 20, 59, '', 2, 2, 'Bruno da Silva Souza', 4, '082.453.156-64', '7MB', '(31) 9974-0874', 'brunosilva', '082'),
(57, '2016-04-08', '2016-05-10', '14', 22, 21, 60, '.', 2, 2, 'TULIO ASSUNÇAO LEAL SILVA', 4, '015.514.796-05', '10MB', '(31) 8709-6504', 'tulioassuncao', '015'),
(58, '2016-04-08', '2016-05-10', '11', 22, 20, 61, 'Antiga rua 8', 2, 1, 'Lucinea de Jesus dos Santos', 4, '090.497.876-14', '5mb', '(31) 7344-9377', 'lucineasantos', '090'),
(59, '2016-04-08', '2016-05-10', '9', 22, 21, 62, '.', 2, 1, 'POLYANA OLIVEIRA GANDRA', 4, '090.546.506-26', '10MB', '(31) 9362-2589', 'polyanaa', '090'),
(60, '2016-04-08', '2016-05-25', '18', 22, 20, 63, 'favor criar cadastro, nao foi criado pois nao sei se é da rede conjunta ou do ronaldo.', 2, 2, 'Kelle Cristina Alves de Aquino', 4, '114.280.816-57', '5mb', '(31) 3043-1421', 'kellecristina', '114'),
(61, '2016-04-11', '2016-05-20', '18', 22, 20, 64, '', 2, 2, 'Welington da Silva Laia', 4, '086.575.026-23', '7MB', '(31) 9273-4648', 'welingtonsilva', '086'),
(63, '2016-04-12', '2016-05-10', '13', 22, 21, 66, '..', 2, 2, 'MAURA APARICIDA FOSTINO', 1, '080.292.036-59', '5MB', '(31) 9627-6590', 'mauraaparecida', '080'),
(64, '2016-04-12', '2016-05-15', '9', 22, 20, 67, 'Antiga rua 7', 2, 1, 'Lucinei Aurelio Araujo dos Santos', 1, '905.595.766-68', '10 MB', '(31) 8595-1614', 'lucineiaurelio', '905'),
(65, '2016-04-11', '2016-05-15', '14', 22, 21, 68, '.', 2, 2, 'Raquel Rosa Vilela', 4, '107.595.176-30', '5MB', '(31) 3592-2067', 'raquelrosa', '107'),
(66, '2016-04-12', '2016-05-15', '17', 22, 21, 69, '.', 2, 2, 'MARIZETE DE OLIVEIRA', 1, '024.753.126-02', '5MB', '(31) 3591-9073', 'marizeteoliveira', '024'),
(67, '2016-04-11', '2016-05-15', '15', 22, 20, 70, '', 2, 2, 'Claudiney Ramos de Souza', 4, '072.467.756-92', '5mb', '(31) 9137-6204', 'claudineyramos', '072'),
(68, '2016-04-12', '2016-05-15', '10', 22, 21, 71, '.', 2, 1, 'FABIO EMILIO CALDEIRA DE FREITAS', 1, '089.363.466-28', '5MB', '(31) 8625-2775', 'fabioemilio', '089'),
(69, '2016-04-12', '2016-05-10', '11', 22, 21, 72, '..', 2, 1, 'AUGUSTO DE OLIVEIRA COSTA', 1, '132.332.816-50', '5MB', '(31) 3053-5147', 'augustooliveira', '132'),
(70, '2016-04-12', '2016-04-15', '14', 22, 20, 73, '', 2, 2, 'Divanei Caldeira de Oliveira', 1, '380.558.148-30', '5mb', '(31) 9488-9928', 'divanei', '380');

-- --------------------------------------------------------

--
-- Estrutura para tabela `auth`
--

CREATE TABLE IF NOT EXISTS `auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `registro` datetime NOT NULL,
  `profile_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `profile_idx` (`profile_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=42 ;

--
-- Fazendo dump de dados para tabela `auth`
--

INSERT INTO `auth` (`id`, `email`, `password`, `registro`, `profile_id`) VALUES
(29, 'admin@speedlink.com.br', 'rG1Y43SeGhAYrCt/5BA2/g==', '2016-03-21 22:13:53', 1),
(36, 'Sheyla@link.com', '4x1XSmZPCdE3XvJjuQZ9ZA==', '2016-03-24 20:19:14', 2),
(37, 'admin@link.com', 'ndA3BS+02kZds3pE9q/nqA==', '2016-03-24 20:20:10', 1),
(38, 'leonardo@link.com', '4x1XSmZPCdE3XvJjuQZ9ZA==', '2016-03-24 20:22:54', 3),
(39, 'ronaldson@link.com', '4x1XSmZPCdE3XvJjuQZ9ZA==', '2016-03-24 20:24:09', 3),
(40, 'flavia@link.com', '4x1XSmZPCdE3XvJjuQZ9ZA==', '2016-04-02 12:05:26', 2),
(41, 'thiago@link.com', '4x1XSmZPCdE3XvJjuQZ9ZA==', '2016-04-02 12:06:13', 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `endereco`
--

CREATE TABLE IF NOT EXISTS `endereco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logradouro` varchar(80) DEFAULT NULL,
  `cep` varchar(45) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(20) DEFAULT NULL,
  `bairro` varchar(45) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='				' AUTO_INCREMENT=74 ;

--
-- Fazendo dump de dados para tabela `endereco`
--

INSERT INTO `endereco` (`id`, `logradouro`, `cep`, `numero`, `complemento`, `bairro`, `cidade`, `estado`) VALUES
(3, 'Avenida São Caetano', '32677815', '645', '', 'São Caetano', 'Betim', 'MG'),
(4, 'Avenida São Caetano', '32677815', '645', '', 'São Caetano', 'Betim', 'MG'),
(5, 'Rua Jovaci Gomes', '32677346', '195', '', 'Imbiruçu', 'Betim', 'MG'),
(6, 'Rua Jovaci Gomes', '32677346', '195', '', 'Imbiruçu', 'Betim', 'MG'),
(7, 'Rua Jovaci Gomes', '32677346', '195', '', 'Imbiruçu', 'Betim', 'MG'),
(8, 'Rua Jovaci Gomes', '32677346', '124', '', 'Imbiruçu', 'Betim', 'MG'),
(9, 'Rua Argentina', '32678-324', '59', 'casa', 'Capelinha', 'Betim', 'MG'),
(12, 'Rua Cinco', '32678148', '336', 'Betim', 'Granja Verde', 'Betim', 'MG'),
(14, 'Rua Campina Grande', '32678424', '179', '', 'Capelinha', 'Betim', 'MG'),
(15, 'Rua Pernambuco', '32678036', '709', '', 'Vila Universal', 'Betim', 'MG'),
(16, 'Rua Pernambuco', '32678024', '510', '', 'Vila Universal', 'Betim', 'MG'),
(17, 'Rua Sete', '32678168', '21', 'A', 'Granja Verde', 'Betim', 'MG'),
(19, 'Rua Rio de Janeiro', '32678026', '291', '', 'Vila Universal', 'Betim', 'MG'),
(20, 'Rua Dois', '32678136', '473', 'A', 'Granja Verde', 'Betim', 'MG'),
(21, 'Rua Goiânia', '32678298', '105', '', 'Capelinha', 'Betim', 'MG'),
(25, 'Rua Goiânia', '32678298', '33', '', 'Capelinha', 'Betim', 'MG'),
(26, 'Rua Rio Manso', '32678472', '21', '', 'Capelinha', 'Betim', 'MG'),
(28, 'Avenida Nova York', '32678368', '567', '', 'Capelinha', 'Betim', 'MG'),
(29, 'Rua Sete', '32678168', '65', 'B', 'Granja Verde', 'Betim', 'MG'),
(30, 'Rua Carolina', '32677644', '175', 'AP202', 'São Caetano', 'Betim', 'MG'),
(31, 'Rua Dois', '32678136', '119', 'B', 'Granja Verde', 'Betim', 'MG'),
(34, 'Rua Chapecó', '30411153', '3434234432', '3434534543', 'Prado', 'Belo Horizonte', 'MG'),
(35, 'Rua Itamarati', '32677530', '315', 'casa', 'São Caetano', 'Betim', 'MG'),
(36, 'Rua Vista Alegre', '32677224', '43', 'casa', 'Imbiruçu', 'Betim', 'MG'),
(38, 'Rua Ceará', '32678278', '683', '', 'Capelinha', 'Betim', 'MG'),
(41, 'Rua Basílio Pereira da Silva', '32677268', '214', 'casa', 'Imbiruçu', 'Betim', 'MG'),
(42, 'Rua Raimundo Martins', '32677330', '183', 'casa', 'Imbiruçu', 'Betim', 'MG'),
(43, 'Rua Cascais', '32655602', '49', 'BL-8 APTO 403 .CONDO', 'São João', 'Betim', 'MG'),
(44, 'Avenida Nova York', '32678368', '600', '', 'Capelinha', 'Betim', 'MG'),
(45, 'Rua SANTA RITA DURAO 101', '32678030', '102  bloco', 'CONDOMINIO GUAJAJARA', 'AMARANTES', 'Betim', 'MG'),
(46, 'Rua Goiás', '32678018', '711', '', 'Vila Universal', 'Betim', 'MG'),
(47, 'Rua Crucilândia', '32678436', '137', '', 'Capelinha', 'Betim', 'MG'),
(48, 'Rua Janaúba', '32678280', '16', '', 'Capelinha', 'Betim', 'MG'),
(49, 'Rua Minas Gerais', '32678020', '438', '', 'Vila Universal', 'Betim', 'MG'),
(50, 'Rua Santa Catarina', '32678022', '232', '', 'Vila Universal', 'Betim', 'MG'),
(51, 'Rua Rondônia', '32677830', '48', 'casa', 'São Caetano', 'Betim', 'MG'),
(52, 'Rua Campina Grande', '32678424', '35', '', 'Capelinha', 'Betim', 'MG'),
(53, 'Avenida Nova York', '32677164', '60', 'BLOCO 04 APTO 303', 'Capelinha', 'Betim', 'MG'),
(54, 'Rua Jovaci Gomes', '32677346', '138', 'casa', 'Imbiruçu', 'Betim', 'MG'),
(55, 'Rua Vinte e Sete', '32678255', '39', '', 'Capelinha', 'Betim', 'MG'),
(56, 'Rua Santa Catarina', '32678022', '192', '', 'Vila Universal', 'Betim', 'MG'),
(57, 'Pedro Silva', '32682-490', '122', 'casa', 'Imbirucu', 'Betim', 'MG'),
(58, 'Rua Igarapé', '32677550', '141', 'casa', 'São Caetano', 'Betim', 'MG'),
(59, 'Avenida São Caetano', '32677815', '35', 'casa', 'São Caetano', 'Betim', 'MG'),
(60, 'Rua Gil Diniz Júnior', '32678376', '342', '', 'Capelinha', 'Betim', 'MG'),
(61, 'Rua Francelina Cândida de Jesus', '32677270', '255', 'casa', 'Imbiruçu', 'Betim', 'MG'),
(62, 'Rua A', '32678150', '420', 'B', 'Granja Verde', 'Betim', 'MG'),
(63, 'Rua Rio Grande do Sul', '32678028', '126', 'casa', 'Vila Universal', 'Betim', 'MG'),
(64, 'Rua Carolina', '32677644', '175', 'apto 102', 'São Caetano', 'Betim', 'MG'),
(66, 'Rua Cascais', '32655602', 'BLOCO 10 A', '49', 'São João', 'Betim', 'MG'),
(67, 'Rua Carlos Gomes Brandão', '32677214', '101', 'casa A', 'Imbiruçu', 'Betim', 'MG'),
(68, 'Rua Pouso Alegre', '32678438', '77', '', 'Capelinha', 'Betim', 'MG'),
(69, 'Rua Vinte e Cinco', '32678262', '45', '', 'Capelinha', 'Betim', 'MG'),
(70, 'Rua Gilberto Cristiano Dias', '32677260', '200', 'casa', 'Imbiruçu', 'Betim', 'MG'),
(71, 'Rua Crucilândia', '32678436', '138', '', 'Capelinha', 'Betim', 'MG'),
(72, 'Rua Pernambuco', '32678024', '382', '', 'Vila Universal', 'Betim', 'MG'),
(73, 'Rua Juncal-1', '32677765', '23', 'casa', 'São Caetano', 'Betim', 'MG');

-- --------------------------------------------------------

--
-- Estrutura para tabela `periodo`
--

CREATE TABLE IF NOT EXISTS `periodo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='		' AUTO_INCREMENT=3 ;

--
-- Fazendo dump de dados para tabela `periodo`
--

INSERT INTO `periodo` (`id`, `descricao`) VALUES
(1, 'Manhã'),
(2, 'Tarde');

-- --------------------------------------------------------

--
-- Estrutura para tabela `profile`
--

CREATE TABLE IF NOT EXISTS `profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `description_UNIQUE` (`description`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Fazendo dump de dados para tabela `profile`
--

INSERT INTO `profile` (`id`, `description`) VALUES
(1, 'Administrador'),
(2, 'Atendente'),
(3, 'Técnico');

-- --------------------------------------------------------

--
-- Estrutura para tabela `statusagendamento`
--

CREATE TABLE IF NOT EXISTS `statusagendamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  `editavel` char(1) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Fazendo dump de dados para tabela `statusagendamento`
--

INSERT INTO `statusagendamento` (`id`, `descricao`, `editavel`) VALUES
(1, 'Agendada', '1'),
(2, 'Reagendada', '1'),
(3, 'Em Execução', '1'),
(4, 'Pronta', '0'),
(5, 'Cancelada', '0');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipoagendamento`
--

CREATE TABLE IF NOT EXISTS `tipoagendamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Fazendo dump de dados para tabela `tipoagendamento`
--

INSERT INTO `tipoagendamento` (`id`, `descricao`) VALUES
(1, 'Manutenção'),
(2, 'Instalação');

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `auth_id` int(11) NOT NULL,
  `telefone` varchar(45) NOT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `auth_idx` (`auth_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='				' AUTO_INCREMENT=26 ;

--
-- Fazendo dump de dados para tabela `user`
--

INSERT INTO `user` (`id`, `nome`, `auth_id`, `telefone`, `cidade`) VALUES
(13, 'ADMIN', 29, '(31) 1111-1111', 'Belo Horizonte'),
(20, 'Sheyla', 36, '(31) 8712-2310', 'Betim'),
(21, 'admin', 37, '(31) 7572-1043', 'Betim'),
(22, 'Leonardo', 38, '(31) 9254-4197', 'BETIM'),
(23, 'Ronaldson', 39, '(31) 9138-7550', 'BETIM'),
(24, 'flavia', 40, '(31) 9395-7707', 'Betim'),
(25, 'Thiago', 41, '(31) 7572-1043', 'Betim');

--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `agendamento`
--
ALTER TABLE `agendamento`
  ADD CONSTRAINT `endereco` FOREIGN KEY (`endereco_id`) REFERENCES `endereco` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `periodo` FOREIGN KEY (`periodo`) REFERENCES `periodo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `statusagendamento` FOREIGN KEY (`statusagendamento`) REFERENCES `statusagendamento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tecnico` FOREIGN KEY (`tecnico_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tipo_agendamento` FOREIGN KEY (`tipo_agendamento`) REFERENCES `tipoagendamento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `auth`
--
ALTER TABLE `auth`
  ADD CONSTRAINT `profile` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `auth` FOREIGN KEY (`auth_id`) REFERENCES `auth` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
