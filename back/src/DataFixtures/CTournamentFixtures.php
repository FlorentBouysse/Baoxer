<?php

namespace App\DataFixtures;

use App\Entity\Tournament;
use Faker\Factory;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;

class CTournamentFixtures extends Fixture implements FixtureGroupInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        for ($tnt=0; $tnt <=10 ; $tnt++) { 
            $tournament = new Tournament();
            $tournament->setName($faker->name);
            $tournament->setMoneyPrize($faker->numberBetween(1, 500));
            $tournament->setLevel($tnt);
            
            $manager->persist($tournament);
        }

        $manager->flush();
    }

    public static function getGroups(): array
    {
        return ['tournaments'];
    }
}
