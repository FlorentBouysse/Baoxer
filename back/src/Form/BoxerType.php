<?php

namespace App\Form;

use App\Entity\Boxer;
use App\Entity\Level;
use App\Entity\Skill;
use App\Entity\Agility;
use App\Entity\Stamina;
use App\Entity\Strength;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;


class BoxerType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('health', IntegerType::class, [
                'label' => 'Point de santé',
                'required' => true,
                'attr' => [
                    'placeholder' => '100'
                ],
            ])
            ->add('energy', IntegerType::class, [
                'label' => 'Point d\'énergie',
                'required' => true ,
                'attr' => [
                    'placeholder' => '100'
                ],
            ])
            ->add('money', IntegerType::class, [
                'label' => 'Baoxing coin', 
            ])
            ->add('win', IntegerType::class, [
                'label' => 'Combat gagné', 
            ])
            ->add('loose', IntegerType::class, [
                'label' => 'Combat perdu', 
            ])
            ->add('levelExperience', IntegerType::class, [
                'label' => 'Point d\'expérience : Niveau', 
            ])
            ->add('strengthExperience', IntegerType::class, [
                'label' => 'Point d\'expérience : Force', 
            ])
            ->add('agilityExperience', IntegerType::class, [
                'label' => 'Point d\'expérience : Agilité', 
            ])
            ->add('staminaExperience', IntegerType::class, [
                'label' => 'Point d\'expérience : Endurance', 
            ])
            ->add('availableStatsPoints', IntegerType::class, [
                'label' => 'Point de compétence disponible', 
            ])
            ->add('npc', ChoiceType::class, [
                'label' => 'Personnage non joueur',
                'choices' => [
                    'Oui' => true,
                    'Non' => false,
                ],
                'expanded' => false,
                'multiple' => false,
                'required' => true
            ])
            ->add('picture', TextType::class, [
                'label' => 'Image'
            ])
            ->add('username', TextType::class, [
                'label' => 'Pseudo / Nom du npc'
            ])
            ->add('level', EntityType::class, [
                'class' => Level::class,
                'choice_label' => 'id',
                'multiple' => false,
                'expanded' => false,
                'label' => 'Niveau du boxeur'
            ])
            ->add('agility', EntityType::class, [
                'class' => Agility::class,
                'choice_label' => 'id',
                'multiple' => false,
                'expanded' => false,
                'label' => 'Niveau d\'agiliter',
                'empty_data' => ''
            ])
            ->add('stamina', EntityType::class, [
                'class' => Stamina::class,
                'choice_label' => 'id',
                'multiple' => false,
                'expanded' => false,
                'label' => 'Niveau d\'endurance'
            ])
            ->add('strength', EntityType::class, [
                'class' => Strength::class,
                'choice_label' => 'id',
                'multiple' => false,
                'expanded' => false,
                'label' => 'Niveau de force'
            ])
            ->add('skills', EntityType::class, [
                'class' => Skill::class,
                'choice_label' => 'name',
                'multiple' => true,
                'expanded' => true,
                'label' => 'Compétences du personnage',
                'help' => '4 Maximum',
                'attr' => [
                    'max' => 4
                ]
            ])
            ->add('save', SubmitType::class, [
                'label' => 'Valider',
                'attr' => [
                    'class' => 'btn-success btn-sm'
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Boxer::class,
        ]);
    }
}
