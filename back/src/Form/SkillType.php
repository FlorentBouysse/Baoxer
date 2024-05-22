<?php

namespace App\Form;

use App\Entity\Skill;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SkillType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('levelRequired', IntegerType::class, [
                'label' => 'Niveau requis',
                'required' => true,
                'attr' => [
                    // Not possible negatif varaible
                    'min' => 0,
                    'max' => 50
                ],
                'help' => 'Entre 0 et 50'
            ])
            ->add('name', TextType::class, [
                'label' => 'Nom',
                'required' => true
            ])
            ->add('damage', IntegerType::class, [
                'label' => 'Point de dommage infligé',
                'attr' => [
                    // Not possible negatif varaible
                    'min' => 0,
                    'max' => 50
                ],
                // message under the input for help user
                'help' => 'Entre 0 et 50'
            ])
            ->add('energyCost', IntegerType::class, [
                'label' => 'Coût en énergie',
                'attr' => [
                    // Not possible negatif varaible
                    'min' => 0,
                    'max' => 50
                ],
                'help' => 'Entre 0 et 50'
            ])
            ->add('description', TextType::class, [
                'label' => 'Description',
                'required' => true
            ])
            ->add('effect', TextType::class, [
                'label' => 'Effet'
            ])
            ->add('icon', TextType::class, [
                'label' => 'Icone'
            ])
            ->add('type', ChoiceType::class, [
                'label' => 'Type',
                'choices' => [
                    // Choice one type only
                    'Coup simple' => 'Coup simple',
                    'Coup lourd' => 'Coup lourd',
                    'Parer' => 'Parer',
                    'Spécial' => 'Special'
                ]
            ])
            ->add('save', SubmitType::class, [
                'label' => 'Valider', 
                'attr' => [
                    // add class for style button
                    'class' => 'btn-success btn-sm'
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Skill::class,
        ]);
    }
}
