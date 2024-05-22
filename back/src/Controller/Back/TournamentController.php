<?php

namespace App\Controller\Back;

use App\Entity\Tournament;
use App\Form\TournamentType;
use App\Repository\TournamentRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

 /**
     * @Route("/back/tournois")
     */
class TournamentController extends AbstractController
{
    /**
     * @Route("/", name="app_tournament_index")
     * Display the tournaments liste
     */
    public function index(TournamentRepository $tournamentRepository): Response
    {
        return $this->render('back/tournament/index.html.twig', [
            'tournaments' => $tournamentRepository->findAll(),
        ]);
    }

    /**
     * @Route("/ajouter", name="app_tournament_create")
     * Create the tournament
     */
    public function create(TournamentRepository $tournamentRepository, Request $request): Response
    {
        $tournament = new Tournament();

        // Create form using tournamentType
        $form = $this->createForm(TournamentType::class, $tournament);
        $form->handleRequest($request);

        // Check if form is valid and submit
        if( $form->isSubmitted() && $form->isValid() ) {
            // Use method add in tournamentRepository for send in bdd the datas and redirects to tournament list view
            $tournamentRepository->add($tournament, true);
            return $this->redirectToRoute("app_tournament_index");
        }
        // If not submitted and not valid, return view with the form
        return $this->renderForm('back/tournament/create.html.twig', [
            'form' => $form,
            'tournament' => $tournament
        ]);
    }

    /**
     * @Route("/modifier/{id}", name="app_tournament_update")
     * Method wich update tournament in bdd
     */
    public function update(TournamentRepository $tournamentRepository, tournament $tournament, Request $request): Response
    {
        // same that method create
        $form = $this->createForm(TournamentType::class, $tournament);
        $form->handleRequest($request);

        if( $form->isSubmitted() && $form->isValid() ) {
            $tournamentRepository->add($tournament, true);
            return $this->redirectToRoute("app_tournament_index");
        }
        
        // Return also the tournament for get datas in the input form
        return $this->renderForm('back/tournament/edit.html.twig', [
            'form' => $form,
            'tournament' => $tournament
        ]);
    }

    /**
     * @Route("/supprimer/{id}", name="app_tournament_delete")
     * Method wich delete tournament in bdd
     */
    public function delete(tournamentRepository $tournamentRepository, tournament $tournament): Response
    {
        $tournamentRepository->remove($tournament, true);
        return $this->redirectToRoute('app_tournament_index');
    }
}
