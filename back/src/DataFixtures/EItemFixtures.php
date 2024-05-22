<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Item;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;

class EItemFixtures extends Fixture implements FixtureGroupInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        for ($itm=0; $itm < 20; $itm++) { 
            $item = new Item();
            $item->setMarketplace($faker->word);
            $item->setName($faker->name);
            $item->setPrice($faker->numberBetween(10, 100));
            $item->setDescription($faker->text);
            $item->setEffect($faker->text);
            $item->setIcon($faker->imageUrl);
            $manager->persist($item);
        }

        $manager->flush();
    }

    public static function getGroups(): array
    {
        return ['items'];
    }
}
