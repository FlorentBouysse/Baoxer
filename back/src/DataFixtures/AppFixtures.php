<?php

namespace App\DataFixtures;

use App\Entity\Item;
use App\Entity\User;
use App\Entity\Boxer;
use App\Entity\Level;
use App\Entity\Skill;
use App\Entity\Agility;
use App\Entity\Stamina;
use App\Entity\Strength;
use App\Entity\Tournament;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture implements FixtureGroupInterface
{
    private $passwordHasher;
    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    
    public function load(ObjectManager $manager): void
    {
        // $faker = Factory::create('fr_FR');
        $pointAgility = 200;
        $pointLevel = 200;
        $pointStamina = 200;
        $pointStrength = 200;

        for ($i=1; $i < 50; $i++) { 
            $agility = new Agility();
            $agility->setRequiredPoint($pointAgility);
            $pointAgility = round((($pointAgility * 15) / 100) + $pointAgility);
            $manager->persist($agility);

            $level = new Level();
            $level->setRequiredPoint($pointLevel);
            $pointLevel = round((($pointLevel * 15) / 100) + $pointLevel);
            $manager->persist($level);

            $stamina = new Stamina();
            $stamina->setRequiredPoint($pointStamina);
            $pointStamina = round((($pointStamina * 15) / 100) + $pointStamina);
            $manager->persist($stamina);

            $strength = new Strength();
            $strength->setRequiredPoint($pointStrength);
            $pointStrength = round((($pointStrength * 15) / 100) + $pointStrength);
            $manager->persist($strength);

        }

        $faker = Factory::create('fr_FR');

        for ($itm=1; $itm < 20; $itm++) { 
            $item = new Item();
            $item->setMarketplace($faker->word);
            $item->setName($faker->name);
            $item->setPrice($faker->numberBetween(10, 100));
            $item->setDescription($faker->text);
            $item->setEffect($faker->text);
            $item->setIcon($faker->imageUrl);
            $manager->persist($item);
        }

        for ($usr=0; $usr <= 12; $usr++) { 
            $user = new User();
            $user->setEmail($faker->email);
            $user->setRoles(["ROLE_USER"]);
            $user->setPassword(
                $this->passwordHasher->hashPassword($user, 'admin')
            );
            $user->setStatus(true);
            $user->setBanned(false);

            $manager->persist($user);
        }

        for ($tnt=1; $tnt <=10 ; $tnt++) { 
            $tournament = new Tournament();
            $tournament->setName($faker->name);
            $tournament->setMoneyPrize($faker->numberBetween(1, 500));
            $tournament->setLevel($tnt);
            
            $manager->persist($tournament);
        }

        for ($ski=1; $ski <=27; $ski++) { 
            $skill = new Skill();
            $skill->setLevelRequired($faker->numberBetween(1, 10 ));
            $skill->setName($faker->name);
            $skill->setDamage($faker->numberBetween(10, 150));
            $skill->setEnergyCost($faker->numberBetween(10, 150));
            $skill->setDescription($faker->sentence);
            $skill->setEffect($faker->sentence);
            $skill->setIcon('skill-'.$ski.'.png');
            $skill->setType($faker->name);
            $manager->persist($skill);
        }
        $manager->flush();
    }

    public static function getGroups(): array
    {
        return ['stats'];
    }
}
