<?php

namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class MyMailer
{

    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendEmail(string $to, string $subject, string $content): void
    {
        $email = (new Email())
            ->from('jcedric.e1@gmail.com')
            ->to($to)
            ->subject($subject)
            ->html($content);

        $this->mailer->send($email);
    }

    public function sendConfirmationEmail(string $to, string $username): void
    {
        $subject = 'Confirmation d\'inscription';
        $content = 'Bonjour ' . $username . ', votre inscription à bien été prise en compte.';
        

        $email = (new Email())
            ->from('jcedric.e1@gmail.com')
            ->to($to)
            ->subject($subject)
            ->html($content);

        $this->mailer->send($email);
    }
}