<?php

namespace App\Controller\Back;

use App\Entity\Item;
use App\Form\ItemType;
use App\Repository\ItemRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * @Route("/back/items")
 */
class ItemController extends AbstractController
{
    /**
     * @Route("/", name="app_item_list")
     * Method for displaying all items
     */
    public function list(ItemRepository $itemRepository): Response
    {
        $items = $itemRepository->findAll();
        return $this->render('back/item/index.html.twig', [
            'items' => $items,
        ]);
    }

    /**
     * @Route("/ajouter", name="app_item_create")
     * Method wich create new item in bdd
     */
    public function create(ItemRepository $itemRepository, Request $request): Response
    {
        $item = new Item();

        // Create form using ItemType
        $form = $this->createForm(ItemType::class, $item);
        $form->handleRequest($request);

        // Check if form is valid and submit
        if( $form->isSubmitted() && $form->isValid() ) {
            // Use method add in itemRepository for send in bdd the datas and redirects to item list view
            $itemRepository->add($item, true);
            return $this->redirectToRoute("app_item_list");
        }
        // If not submitted and not valid, return view with the form
        return $this->renderForm('back/item/create.html.twig', [
            'form' => $form,
        ]);
    }

    /**
     * @Route("/modifier/{id}", name="app_item_update")
     * Method wich update item in bdd
     */
    public function update(ItemRepository $itemRepository, Item $item, Request $request): Response
    {
        // same that method create
        $form = $this->createForm(ItemType::class, $item);
        $form->handleRequest($request);
        if( $form->isSubmitted() && $form->isValid() ) {
            $itemRepository->add($item, true);
            return $this->redirectToRoute("app_item_list");
        }

        // Return also the item for get datas in the input form
        return $this->renderForm('back/item/edit.html.twig', [
            'form' => $form,
            'item' => $item
        ]);
    }

    /**
     * @Route("/supprimer/{id}", name="app_item_delete")
     * Method wich delete item in bdd
     */
    public function delete(ItemRepository $itemRepository, Item $item): Response
    {
        $itemRepository->remove($item, true);
        return $this->redirectToRoute('app_item_list');
    }
}
