<?php

namespace App\Controller\Back;


use App\Entity\Boxer;
use App\Form\BoxerType;
use App\Repository\BoxerRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
     * @Route("/back/boxeur")
     */
class BoxerController extends AbstractController
{
    /**
     * @Route("/", name="app_boxer_index")
     */
    public function index(BoxerRepository $boxerRepository): Response
    {
        return $this->render('back/boxer/index.html.twig', [
            'boxers' => $boxerRepository->findAll(),
        ]);
    }

    /**
     * @Route("/ajouter", name="app_boxer_create")
     */
    public function create(BoxerRepository $boxerRepository, Request $request): Response
    {
        $boxer = new Boxer();

        // Create form using boxerType
        $form = $this->createForm(BoxerType::class, $boxer);
        $form->handleRequest($request);

        // Check if form is valid and submit
        if( $form->isSubmitted() && $form->isValid() ) {
            // Use method add in boxerRepository for send in bdd the datas and redirects to boxer list view
            $boxerRepository->add($boxer, true);
            return $this->redirectToRoute("app_boxer_index");
        }
        // If not submitted and not valid, return view with the form
        return $this->renderForm('back/boxer/create.html.twig', [
            'form' => $form,
        ]);
    }

    /**
     * @Route("/modifier/{id}", name="app_boxer_update")
     * Method wich update boxer in bdd
     */
    public function update(BoxerRepository $boxerRepository, boxer $boxer, Request $request): Response
    {
        // same that method create
        $form = $this->createForm(BoxerType::class, $boxer);
        $form->handleRequest($request);

        if( $form->isSubmitted() && $form->isValid() ) {
            $boxerRepository->add($boxer, true);
            return $this->redirectToRoute("app_boxer_index");
        }
        
        // Return also the boxer for get datas in the input form
        return $this->renderForm('back/boxer/edit.html.twig', [
            'form' => $form,
            'boxer' => $boxer
        ]);
    }

    /**
     * @Route("/supprimer/{id}", name="app_boxer_delete")
     * Method wich delete boxer in bdd
     */
    public function delete(BoxerRepository $boxerRepository,Boxer $boxer): Response
    {
        $boxerRepository->remove($boxer, true);
        return $this->redirectToRoute('app_boxer_index');
    }
}
