<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class BUserFixtures extends Fixture implements FixtureGroupInterface
{
    private $passwordHasher;
    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        
        for ($usr=1; $usr <= 20; $usr++) { 
            $user = new User();
            $user->setEmail($faker->email);
            $user->setRoles(["ROLE_USER"]);
            if ($usr <= 2) {
                $user->setRoles(["ROLE_ADMIN"]);
            }
            $user->setPassword(
                $this->passwordHasher->hashPassword($user, 'admin')
            );
            $user->setStatus(true);
            $user->setBanned(false);

            $manager->persist($user);
        }
        $manager->flush();
    }

    public static function getGroups(): array
    {
        return ['users'];
    }
}
