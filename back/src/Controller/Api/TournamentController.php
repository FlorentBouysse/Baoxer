<?php

namespace App\Controller\Api;

use App\Entity\Tournament;
use App\Repository\TournamentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("api/tournament")
 */
class TournamentController extends AbstractController
{
    /**
     * @Route("/", name="app_api_tournament_list", methods={"GET"})
     */
    public function list(TournamentRepository $tournamentRepository): JsonResponse    
    {
        $tournaments = $tournamentRepository->findAll();
        return $this->json($tournaments, Response::HTTP_OK);
        // In case if we need : [],["groups"=>"tournaments"] for the serialization
    }

    /**
     * @Route("/{id}", name="app_api_tournament_show", methods={"GET"})
     */
    public function show(Tournament $tournament): JsonResponse    
    {
        return $this->json($tournament, Response::HTTP_OK);
        // In case if we need : [],["groups"=>"tournaments"] for the serialization
    }
}
