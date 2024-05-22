<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    /**
     * @Route("/connexion", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils, UserRepository $userRepository): Response
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();
        
       // Récupérer une instance de l'entité User qui se connecte en le stockant dans une variable
       $user = $this->getUser();

       if ($user === $userRepository->findAll()){
            dd($user);
       }

        return $this->render('security/login.html.twig', [
        'last_username' => $lastUsername,
        'error' => $error]);

    }

    /**
     * @Route("/deconnexion", name="app_logout")
     */
    public function logout(): void
    {
        
    }
}
