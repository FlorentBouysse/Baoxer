<?php

namespace App\Controller\Api;

use App\Entity\Skill;
use App\Repository\SkillRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/skill")
 */
class SkillController extends AbstractController
{
    /**
     * @Route("/", name="app_api_skill_list", methods={"GET"})
     */
    public function list(SkillRepository $skillRepository): JsonResponse
    {
        $skills = $skillRepository->findAll();
        return $this->json($skills, Response::HTTP_OK,[], ['groups' => 'skills']);
    }

    /**
     * @Route("/{id}", name="app_api_skill_show", methods={"GET"})
     */
    public function show(Skill $skill): JsonResponse
    {
        return $this->json($skill, Response::HTTP_OK, [], ["groups" => "skills"]);
    }
}
