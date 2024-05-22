<?php

namespace App\Form;

use App\Entity\User;
use Doctrine\DBAL\Types\DateType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;



class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class, [
                'label' => 'E-mail',
                'attr' => [
                    "placeholder" => "Mon@email.com"
                ],
                'constraints' => [ new Email(),],
                'required' => true
            ]) 
            ->add('roles', ChoiceType::class, [
                'multiple' => true,
                'expanded' => true,
                'choices' => [
                    'Admin' => 'ROLE_ADMIN',
                    'Bannis' => 'ROLE_BANNED',
                    'Player' => 'ROLE_USER'
                ]
            ])
            ->add('status', ChoiceType::class, [
                'label' => 'Statut',
                'choices' => [
                    'hors ligne' => 0,
                    'En ligne' => 1
                ]
            ])
            ->add('banned', ChoiceType::class, [
                'label' => 'Bannis',
                'choices' => [
                    'Non' => 0,
                    'Bannis' => 1
                ]
                ]);
            if($options['custom_option'] !== "update"){
                $builder->add('password', RepeatedType::class,[
                    "type" => PasswordType::class,
                    'invalid_message' => 'Les mots de passes doivent être identique',
                    'first_options'  => ['label' => 'Mot de passe'],
                    'second_options' => ['label' => 'Répetez le mot de passe'],
                ]);
            }
                $builder->add('save', SubmitType::class, [
                'label' => 'Valider',
                'attr' => [
                    'class' => 'btn-success btn-sm'
                ]
                ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'custom_option' => "default"
        ]);
    }

}