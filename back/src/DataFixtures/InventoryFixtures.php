<?php

namespace App\DataFixtures;

use App\Entity\Item;
use App\Entity\Boxer;
use App\Entity\Inventory;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;

class InventoryFixtures extends Fixture implements FixtureGroupInterface
{
    public function load(ObjectManager $manager): void
    {
        $inventory = new Inventory();

        $boxerRepo = $manager->getRepository(Boxer::class);
        $itemRepo = $manager->getRepository(Item::class);   

        // for ($ivnt=0; $ivnt <= 20; $ivnt++) {
        //     $inventory = new Inventory();
        //     $inventory->setItem($itemRepo->find($ivnt));
        //     $inventory->setBoxer($boxerRepo->find($ivnt));
        //     $inventory->setQuantity(random_int(0,20));
        //     $manager->persist($inventory);
        // }

        $manager->flush();
    }

    public static function getGroups(): array
    {
        return ["inventories"];
    }
}
