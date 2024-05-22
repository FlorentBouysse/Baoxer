<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231216081802 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE agility (id INT AUTO_INCREMENT NOT NULL, required_point INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE boxer (id INT AUTO_INCREMENT NOT NULL, level_id INT NOT NULL, agility_id INT NOT NULL, stamina_id INT NOT NULL, strength_id INT NOT NULL, user_id INT DEFAULT NULL, health INT NOT NULL, energy INT NOT NULL, money INT DEFAULT NULL, win INT DEFAULT NULL, loose INT DEFAULT NULL, level_experience INT DEFAULT NULL, strength_experience INT DEFAULT NULL, agility_experience INT DEFAULT NULL, stamina_experience INT DEFAULT NULL, available_stats_points INT DEFAULT NULL, npc TINYINT(1) NOT NULL, username VARCHAR(128) NOT NULL, current_energy INT DEFAULT NULL, current_training VARCHAR(255) DEFAULT NULL, picture VARCHAR(255) DEFAULT NULL, training_start VARCHAR(100) DEFAULT NULL, training_end VARCHAR(100) DEFAULT NULL, work_start VARCHAR(100) DEFAULT NULL, work_end VARCHAR(100) DEFAULT NULL, sleep_start VARCHAR(100) DEFAULT NULL, sleep_end VARCHAR(100) DEFAULT NULL, current_work VARCHAR(255) DEFAULT NULL, INDEX IDX_BAF6827F5FB14BA7 (level_id), INDEX IDX_BAF6827FCA819DFD (agility_id), INDEX IDX_BAF6827FB6F852CE (stamina_id), INDEX IDX_BAF6827F100368EB (strength_id), UNIQUE INDEX UNIQ_BAF6827FA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE boxer_skill (boxer_id INT NOT NULL, skill_id INT NOT NULL, INDEX IDX_8E9366B064874707 (boxer_id), INDEX IDX_8E9366B05585C142 (skill_id), PRIMARY KEY(boxer_id, skill_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE boxer_tournament (boxer_id INT NOT NULL, tournament_id INT NOT NULL, INDEX IDX_F3E447D764874707 (boxer_id), INDEX IDX_F3E447D733D1A3E7 (tournament_id), PRIMARY KEY(boxer_id, tournament_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE inventory (id INT AUTO_INCREMENT NOT NULL, boxer_id INT NOT NULL, item_id INT NOT NULL, quantity INT NOT NULL, INDEX IDX_B12D4A3664874707 (boxer_id), INDEX IDX_B12D4A36126F525E (item_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE item (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(128) NOT NULL, marketplace VARCHAR(128) NOT NULL, description VARCHAR(255) NOT NULL, price INT NOT NULL, effect VARCHAR(255) NOT NULL, icon VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE level (id INT AUTO_INCREMENT NOT NULL, required_point INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skill (id INT AUTO_INCREMENT NOT NULL, level_required INT NOT NULL, name VARCHAR(125) NOT NULL, damage INT DEFAULT NULL, energy_cost INT DEFAULT NULL, description VARCHAR(125) NOT NULL, effect VARCHAR(125) DEFAULT NULL, icon VARCHAR(255) NOT NULL, type VARCHAR(125) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stamina (id INT AUTO_INCREMENT NOT NULL, required_point INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE strength (id INT AUTO_INCREMENT NOT NULL, required_point INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tournament (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(64) NOT NULL, money_prize INT NOT NULL, level INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, status TINYINT(1) DEFAULT NULL, banned TINYINT(1) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE boxer ADD CONSTRAINT FK_BAF6827F5FB14BA7 FOREIGN KEY (level_id) REFERENCES level (id)');
        $this->addSql('ALTER TABLE boxer ADD CONSTRAINT FK_BAF6827FCA819DFD FOREIGN KEY (agility_id) REFERENCES agility (id)');
        $this->addSql('ALTER TABLE boxer ADD CONSTRAINT FK_BAF6827FB6F852CE FOREIGN KEY (stamina_id) REFERENCES stamina (id)');
        $this->addSql('ALTER TABLE boxer ADD CONSTRAINT FK_BAF6827F100368EB FOREIGN KEY (strength_id) REFERENCES strength (id)');
        $this->addSql('ALTER TABLE boxer ADD CONSTRAINT FK_BAF6827FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE boxer_skill ADD CONSTRAINT FK_8E9366B064874707 FOREIGN KEY (boxer_id) REFERENCES boxer (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE boxer_skill ADD CONSTRAINT FK_8E9366B05585C142 FOREIGN KEY (skill_id) REFERENCES skill (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE boxer_tournament ADD CONSTRAINT FK_F3E447D764874707 FOREIGN KEY (boxer_id) REFERENCES boxer (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE boxer_tournament ADD CONSTRAINT FK_F3E447D733D1A3E7 FOREIGN KEY (tournament_id) REFERENCES tournament (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE inventory ADD CONSTRAINT FK_B12D4A3664874707 FOREIGN KEY (boxer_id) REFERENCES boxer (id)');
        $this->addSql('ALTER TABLE inventory ADD CONSTRAINT FK_B12D4A36126F525E FOREIGN KEY (item_id) REFERENCES item (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE boxer DROP FOREIGN KEY FK_BAF6827F5FB14BA7');
        $this->addSql('ALTER TABLE boxer DROP FOREIGN KEY FK_BAF6827FCA819DFD');
        $this->addSql('ALTER TABLE boxer DROP FOREIGN KEY FK_BAF6827FB6F852CE');
        $this->addSql('ALTER TABLE boxer DROP FOREIGN KEY FK_BAF6827F100368EB');
        $this->addSql('ALTER TABLE boxer DROP FOREIGN KEY FK_BAF6827FA76ED395');
        $this->addSql('ALTER TABLE boxer_skill DROP FOREIGN KEY FK_8E9366B064874707');
        $this->addSql('ALTER TABLE boxer_skill DROP FOREIGN KEY FK_8E9366B05585C142');
        $this->addSql('ALTER TABLE boxer_tournament DROP FOREIGN KEY FK_F3E447D764874707');
        $this->addSql('ALTER TABLE boxer_tournament DROP FOREIGN KEY FK_F3E447D733D1A3E7');
        $this->addSql('ALTER TABLE inventory DROP FOREIGN KEY FK_B12D4A3664874707');
        $this->addSql('ALTER TABLE inventory DROP FOREIGN KEY FK_B12D4A36126F525E');
        $this->addSql('DROP TABLE agility');
        $this->addSql('DROP TABLE boxer');
        $this->addSql('DROP TABLE boxer_skill');
        $this->addSql('DROP TABLE boxer_tournament');
        $this->addSql('DROP TABLE inventory');
        $this->addSql('DROP TABLE item');
        $this->addSql('DROP TABLE level');
        $this->addSql('DROP TABLE skill');
        $this->addSql('DROP TABLE stamina');
        $this->addSql('DROP TABLE strength');
        $this->addSql('DROP TABLE tournament');
        $this->addSql('DROP TABLE user');
    }
}
