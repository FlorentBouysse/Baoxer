<?php

namespace App\Form;

use App\Entity\Item;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ItemType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Nom',
                'required' => true
            ])
            ->add('marketplace', TextType::class, [
                'label' => 'Boutique disponibilité',
                'required' => true
            ])
            ->add('description', TextType::class, [
                'label' => 'Description',
                'required' => true
            ])
            ->add('price', IntegerType::class, [
                'label' => 'Prix',
                'required' => true,
                'attr' => [
                    // Not possible negatif varaible
                    'min' => 0,
                    'max' => 10000
                                ],
            ])
            ->add('effect', TextType::class, [
                'label' => 'Effet',
                'required' => true
            ])
            ->add('icon', TextType::class, [
                'label' => 'Icone',
                'required' => true
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
            'data_class' => Item::class,
        ]);
    }
}
