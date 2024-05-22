<?php

namespace App\DataFixtures;

use App\Entity\Skill;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Faker\Factory;

class DSkillFixtures extends Fixture implements FixtureGroupInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        for ($ski=0; $ski <=10; $ski++) { 
            $skill = new Skill();
            $skill->setLevelRequired($faker->numberBetween(1, 10 ));
            $skill->setName($faker->name);
            $skill->setDamage($faker->numberBetween(10, 150));
            $skill->setEnergyCost($faker->numberBetween(10, 150));
            $skill->setDescription($faker->sentence);
            $skill->setEffect($faker->sentence);
            $skill->setIcon($faker->imageUrl);
            $skill->setType($faker->name);
            $manager->persist($skill);
        }

        $manager->flush();
    }

    public static function getGroups(): array
    {
        return ['skills'];
    }
}
