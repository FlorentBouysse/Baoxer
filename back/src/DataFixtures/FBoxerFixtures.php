<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Boxer;
use App\Entity\Level;
use App\Entity\Agility;
use App\Entity\Stamina;
use App\Entity\Strength;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;

class FBoxerFixtures extends Fixture implements FixtureGroupInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $levelRepo = $manager->getRepository(Level::class);
        $agilityRepo = $manager->getRepository(Agility::class);
        $strengthRepo = $manager->getRepository(Strength::class);
        $staminaRepo = $manager->getRepository(Stamina::class);
        $userRepo = $manager->getRepository(User::class);

        // php bin/console doctrine:fixtures:load --fixtures=src/DataFixtures/BoxerFixtures.php


        for ($box=1; $box <= 15; $box++) { 
            $boxer = new Boxer();
            $boxer->setLevel($levelRepo->find($box));
            $boxer->setLevelExperience(random_int(0, 100));
            $boxer->setAgility($agilityRepo->find($box));
            $boxer->setAgilityExperience(random_int(0, 100));
            $boxer->setStrength($strengthRepo->find($box));
            $boxer->setStrengthExperience(random_int(0, 100));
            $boxer->setStamina($staminaRepo->find($box));
            $boxer->setStaminaExperience(random_int(0, 100));
            $boxer->setHealth(100);
            $boxer->setEnergy(100);
            $boxer->setMoney(500);
            $boxer->setAvailableStatsPoints(3);
            $boxer->setPicture('character-'.$box.'.png');
            $boxer->setUser($userRepo->find($box));
            $boxer->setNpc(random_int(0, 1));
            $boxer->setUsername($faker->userName);
            $boxer->setCurrentEnergy(100);
            $manager->persist($boxer);

            // si le boxeur est un NPC mettre les valeur suivante en null
            if ($boxer->isNpc()){
                $boxer->setCurrentEnergy(0);
                $boxer->setAvailableStatsPoints(0);
                $boxer->setMoney(0);
                $boxer->setStaminaExperience(0);
                $boxer->setStrengthExperience(0);
                $boxer->setAgilityExperience(0);
                $boxer->setLevelExperience(0);
                $boxer->setUser(null);
            }
        }

        $manager->flush();
    }

    public static function getGroups(): array
    {
        return ['boxers'];
    }


}
