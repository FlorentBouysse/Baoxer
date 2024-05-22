<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\BoxerRepository;
use App\Repository\UserRepository;
use App\Service\MyMailer;
use Doctrine\Persistence\ManagerRegistry;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Constraints\Json;
use Symfony\Component\Security\Core\User\UserInterface;

/**
     * @Route("/api/user")
     */
class UserController extends AbstractController
{
    /**
     * @Route("/", name="app_api_user_list")
     */
    public function list(UserRepository $userRepository): JsonResponse
    {
        $users = $userRepository->findAll();
        return $this->json($users, Response::HTTP_OK,[],["groups" => "users"]);
        // In case we need for the serialization : ,[],["groups" => "users"]
    }

    /**
     * @Route("/{id}", name="app_api_user_show", methods={"GET"})
     */
    public function show(User $user): JsonResponse
    {
        return $this->json($user, Response::HTTP_OK,[],["groups" => "users"]);
    }

    /**
     * @Route("/create", name="app_api_user_create", methods={"POST"})
     */
    public function create(ManagerRegistry $doctrine,
                        Request $request, 
                        UserRepository $userRepository, 
                        UserPasswordHasherInterface $passwordHasher, 
                        MyMailer $myMailer, 
                        JWTTokenManagerInterface $jWTTokenManagerInterface): JsonResponse
    {
        // link with ORM Symfony
        $entityManager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);
        $user = new User();
        
        // Get user data and check if empty or not
        $userData = [$data["email"], $data["password"]];
        if(!isset($userData))
            return new Response("User n'existe pas ou est null", 400);

        // Set data in object, persist data and flush data
        $user->setEmail($userData[0]);
        $user->setRoles(["ROLE_USER"]);
        $user->setPassword($userData[1]);
        $user->setStatus(true);
        $user->setBanned(0);
        
        // Send a confirmation mail for the registration
        // Hash the password and create the token for user
        $myMailer->sendConfirmationEmail($user->getEmail(), $user->getUserIdentifier());
        $plaintextPassword = $user->getPassword();
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);
        $userRepository->add($user, true);

        $entityManager->persist($user);
        $entityManager->flush();
        $token = $jWTTokenManagerInterface->create($user);
        return new JsonResponse("User ajouté dans la base de donnée avec un e-mail de confirmation envoyé et une génération de token", 201, ['token' => $token]);
    }
        

    /**
     * @Route("/update/{id}", name="app_api_user_update", methods={"PUT"})
     */
    public function update(UserRepository $userRepository, ManagerRegistry $doctrine, Request $request, User $user): Response
    {
        $entityManager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);
        $userObject = $userRepository->find($user);
        if(!isset($data))
            return new Response("User n'existe pas ou est null", 400);

     // Set data in object, persist data and flush data
        $userObject->setStatus($data["status"]);
        $entityManager->flush();
        return new Response("User modifié dans la base de donnée", 201);
    }

    /**
     * @Route("/delete/{id}", name="app_api_users_delete", methods={"DELETE"})
     */
    public function delete($id, UserRepository $userRepository)
    {
        $user = $userRepository->find($id);
        $userRepository->remove($user, true);
        return new Response("User supprimé de la base de donnée", 200);
    }

    /**
     * @Route("/email/{email}", name="app_api_item_byemail", methods={"GET"})
     * Get user id and his boxer via the id user
     */
    public function ByEmail(UserRepository $userRepository,
                        BoxerRepository $boxerRepository, 
                        $email): JsonResponse
    {
        $email = $userRepository->ByEmail($email);
        $boxer = $boxerRepository->ByUser($email['id']);
        $data = [$email, $boxer];

        return $this->json($data, Response::HTTP_OK);
    }
}
