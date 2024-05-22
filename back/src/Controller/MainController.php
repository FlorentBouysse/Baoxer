<?php

namespace App\Controller;

use App\Repository\BoxerRepository;
use App\Repository\ItemRepository;
use App\Repository\UserRepository;
use App\Repository\SkillRepository;
use App\Repository\TournamentRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MainController extends AbstractController
{
    /**
     * @Route("/back", name="app_main")
     */
    public function index(BoxerRepository $boxerRepository, TournamentRepository $tournamentRepository,SkillRepository $skillRepository, UserRepository $userRepository, ItemRepository $itemRepository): Response
    {
        return $this->render('main/index.html.twig', [
            'home' => 'MainController',
            'users' => $userRepository->findAll(),
            'items' => $itemRepository->findAll(),
            'skills' => $skillRepository->findAll(),
            'boxers' => $boxerRepository->findAll(),
            'tournaments' => $tournamentRepository->findAll(),
        ]);
    }
}
