<?php

namespace App\Controller\Api;

use App\Entity\Boxer;
use App\Entity\User;
use App\Repository\AgilityRepository;
use App\Repository\BoxerRepository;
use App\Repository\LevelRepository;
use App\Repository\SkillRepository;
use App\Repository\StaminaRepository;
use App\Repository\StrengthRepository;
use App\Repository\TournamentRepository;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("api/boxer")
 */
class BoxerController extends AbstractController
{
    /**
     * @Route("/", name="app_api_boxer_list", methods={"GET"})
     */
    public function list(BoxerRepository $boxerRepository, AgilityRepository $agilityRepository): JsonResponse    
    {
        $boxers = $boxerRepository->findAll();
        return $this->json($boxers, Response::HTTP_OK,[],["groups" => "boxers"]);
    }

    /**
     * @Route("/show/{id}", name="app_api_boxer_show", methods={"GET"})
     */
    public function show(Boxer $boxer): JsonResponse    
    {
        return $this->json($boxer, Response::HTTP_OK,[],["groups" => "boxers"]);
    }

    /**
     * @Route("/create", name="app_api_boxer_create", methods={"POST"})
     */
    public function create(ManagerRegistry $doctrine,
                        Request $request,
                        LevelRepository $level,
                        AgilityRepository $agility,
                        StrengthRepository $strength,
                        StaminaRepository $stamina,
                        UserRepository $user,
                        SkillRepository $skill)
    {
        $entityManager = $doctrine->getManager();
        //Get data and convert in php language
        $data = json_decode($request->getContent(), true);

        // Get data via the repository in parameters for to link the table 
        $userId = $user->find($data["user"]);
        $levelId = $level->find($data["level"]);
        $agilityId = $agility->find($data["agility"]);
        $strengthId = $strength->find($data["strength"]);
        $staminaId = $stamina->find($data["stamina"]);
        
        // If npc, get skills, no need for player boxer
        if($data["npc"] === 1) {
            $skillId = $skill->find($data["skill"]);
        }
        
        // Check if user id exist, return error if false
        if(!isset($userId)){
            return new Response("Ce boxeur n'existe pas ou est null", 400);
        }

        //Instancing Boxer and config parameters by default
        $boxer = new Boxer();
        $boxer->setLevel($levelId);
        $boxer->setLevelExperience(0);
        $boxer->setAgility($agilityId);
        $boxer->setAgilityExperience(0);
        $boxer->setStrength($strengthId);
        $boxer->setStrengthExperience(0);
        $boxer->setStamina($staminaId);
        $boxer->setStaminaExperience(0);
        $boxer->setUsername($data["username"]);
        $boxer->setPicture($data["picture"]);
        $boxer->setHealth(100);
        $boxer->setEnergy(100);
        $boxer->setCurrentEnergy(100);
        $boxer->setMoney(500);
        $boxer->setAvailableStatsPoints(0);
        $boxer->setUser($userId);
        $boxer->setNpc(false);
        
        // If npc, add skills, no need for player boxer
        if($data["npc"] === 1) {
            $boxer->addSkill($skillId);
        }
        
        $entityManager->persist($boxer);
        $entityManager->flush();
        return new Response("Objet ajouté dans a base de données", 201);
    }

    /**
     * @Route("/update/{id}", name="app_api_boxer_update", methods={"PUT"})
     */
    public function update(ManagerRegistry $doctrine,
                        Request $request,
                        LevelRepository $level,
                        AgilityRepository $agility,
                        StrengthRepository $strength,
                        StaminaRepository $stamina,
                        BoxerRepository $boxerRepository,
                        $id)
    {
        $entityManager = $doctrine->getManager();
        //Get data and convert in php language. Get user with him id and check if exist
        $data = json_decode($request->getContent(), true);
        
        if(!isset($userId) && !isset($level) && !isset($levelExperience) && !isset($agility) && !isset($agilityExperience) && !isset($strength) && !isset($strengthExperience) && !isset($stamina) && !isset($staminaExperience) && !isset($health) && !isset($energy) && !isset($money) && !isset($availableStatsPoints)){
            return new Response("Ce Boxeur n'existe pas ou est null", 400);
        }
        
        //Instancing Boxer and config parameters, the conditions is here for add one or more information
        $boxer = $boxerRepository->find($id);
        if(isset($data["level"])){
            $boxer->setLevel($level->find($data["level"]));
        }
        if(isset($data["levelExperience"])){
            $boxer->setLevelExperience($data["levelExperience"]);
        }
        if(isset($data["agility"])){
            $boxer->setAgility($agility->find($data["agility"]));
        }
        if(isset($data["agilityExperience"])){
            $boxer->setAgilityExperience($data["agilityExperience"]);
        }
        if(isset($data["strength"])){
            $boxer->setStrength($strength->find($data["strength"]));
        }
        if(isset($data["strengthExperience"])){
            $boxer->setStrengthExperience($data["strengthExperience"]);
        }
        if(isset($data["stamina"])){
           $boxer->setStamina($stamina->find($data["stamina"])); 
        }
        if(isset($data["staminaExperience"])){
           $boxer->setStaminaExperience($data["staminaExperience"]); 
        }
        if(isset($data["currentEnergy"])){
            $boxer->setCurrentEnergy($data["currentEnergy"]);
        }
        if(isset($data["money"])){
            $boxer->setMoney($data["money"]);
        }
        if(isset($data["availableStatsPoints"])){
            $boxer->setAvailableStatsPoints($data["availableStatsPoints"]);
        }
        if(isset($data["trainingStart"])){
            $boxer->setTrainingStart($data["trainingStart"]);
        }
        if(isset($data["trainingEnd"])){
            $boxer->setTrainingEnd($data["trainingEnd"]);
        }
        if(isset($data["workStart"])){
            $boxer->setWorkStart($data["workStart"]);
        }
        if(isset($data["CurrentTraining"])){
            $boxer->setCurrentTraining($data["CurrentTraining"]);
        }
        if(isset($data["workEnd"])){
            $boxer->setWorkEnd($data["workEnd"]);
        }
        if(isset($data["sleepStart"])){
            $boxer->setSleepStart($data['sleepStart']);
        }
        if(isset($data["sleepEnd"])){
            $boxer->setSleepEnd($data["sleepEnd"]);
        }
        if(isset($data["win"])){
            $boxer->setWin($data["win"]);
        }if(isset($data["loose"])){
            $boxer->setLoose($data["loose"]);
        }
        if(isset($data["picture"])){
            $boxer->setPicture($data["picture"]);
        }

        $entityManager->persist($boxer);
        $entityManager->flush();
        return new Response("Objet Modifier en Base de données", 201);
    }

    /**
     * @Route("/update/{id}/addskill", name="app_api_boxer_update_skill", methods={"PUT"})
     */
    public function addSkill(ManagerRegistry $doctrine, Boxer $boxer, SkillRepository $skill, Request $request)
    {
        $entityManager = $doctrine->getManager();
        //Get data and convert in php language. Get user with him id and check if exist
        $data = json_decode($request->getContent(), true);
        $skillId = $skill->find($data["skill"]);
        $boxer->addSkill($skillId);

        $entityManager->persist($boxer);
        $entityManager->flush();
        return new Response("Compétences Ajouter au Boxeur en Base de données", 201);
    }

    /**
     * @Route("/update/{id}/addtournament", name="app_api_boxer_update_tournament", methods={"PUT"})
     */
    public function addTournament(ManagerRegistry $doctrine, Boxer $boxer, TournamentRepository $tournament, Request $request)
    {
        $entityManager = $doctrine->getManager();
        //Get data and convert in php language. Get user with him id and check if exist
        $data = json_decode($request->getContent(), true);
        $tournamentId = $tournament->find($data["tournament"]);
        $boxer->addTournament($tournamentId);

        $entityManager->persist($boxer);
        $entityManager->flush();
        return new Response("Tournoi remporter et Ajouter au Boxeur en Base de données", 201);
    }

    /**
     * @Route("/delete/{id}", name="app_api_boxer_delete", methods={"DELETE"})
     */
    public function delete($id, BoxerRepository $boxerRepository)
    {
        $boxer = $boxerRepository->find($id);
        $boxerRepository->remove($boxer, true);
        return new Response("Objet supprimé de la base de données", 202);
    }

    /**
     * @Route("/userId/{userId}", name="app_api_boxer_byuserid", methods={"GET"})
     */
    public function ByUserId(BoxerRepository $boxerRepository, $userId): JsonResponse
    {
        $boxer = $boxerRepository->ByUser($userId);
        return $this->json($boxer, Response::HTTP_OK);
    }

    /**
     * @Route("/npc", name="app_api_boxer_findallnpc", methods={"GET"})
     * Get all npc
     */
    public function findAllNpc(BoxerRepository $boxerRepository): JsonResponse
    {
        $boxers = $boxerRepository->getAllNpc();
        return $this->json($boxers, Response::HTTP_OK);
    }

}