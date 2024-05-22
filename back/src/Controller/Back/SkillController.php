<?php

namespace App\Controller\Back;

use App\Entity\Skill;
use App\Form\SkillType;
use App\Repository\SkillRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("back/competences")
 */
class SkillController extends AbstractController
{
    /**
     * @Route("/", name="app_skill")
     * Method get all skills in bdd and displaying
     */
    public function list(SkillRepository $skillRepository): Response
    {
        $skills = $skillRepository->findAll();
        return $this->render('back/skill/index.html.twig', [
            'skills' => $skills,
        ]);
    }

    /**
     * @Route("/ajouter", name="app_skill_create")
     * Method wich create new skill in bdd
     */
    public function create(SkillRepository $skillRepository, Request $request): Response
    {
        $skill = new Skill();

        // Create form using SkillType
        $form = $this->createForm(SkillType::class, $skill);
        $form->handleRequest($request);

        // Check if form is valid and submit
        if( $form->isSubmitted() && $form->isValid() ) {
            // Use method add in skillRepository for send in bdd the datas and redirects to skill list view
            $skillRepository->add($skill, true);
            return $this->redirectToRoute("app_skill");
        }
        // If not submitted and not valid, return view with the form
        return $this->renderForm('back/skill/create.html.twig', [
            'form' => $form,
        ]);
    }

    /**
     * @Route("/modifier/{id}", name="app_skill_update")
     * Method wich update skill in bdd
     */
    public function update(SkillRepository $skillRepository, Skill $skill, Request $request): Response
    {
        // same that method create
        $form = $this->createForm(SkillType::class, $skill);
        $form->handleRequest($request);

        if( $form->isSubmitted() && $form->isValid() ) {
            $skillRepository->add($skill, true);
            return $this->redirectToRoute("app_skill");
        }
        
        // Return also the skill for get datas in the input form
        return $this->renderForm('back/skill/edit.html.twig', [
            'form' => $form,
            'skill' => $skill
        ]);
    }

    /**
     * @Route("/supprimer/{id}", name="app_skill_delete")
     * Method wich delete skill in bdd
     */
    public function delete(SkillRepository $skillRepository, Skill $skill): Response
    {
        $skillRepository->remove($skill, true);
        return $this->redirectToRoute('app_skill');
    }
}
