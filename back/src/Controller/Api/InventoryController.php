<?php

namespace App\Controller\Api;

use App\Entity\Inventory;
use App\Repository\BoxerRepository;
use App\Repository\InventoryRepository;
use App\Repository\ItemRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/inventory")
 */
class InventoryController extends AbstractController
{
    /**
     * @Route("/", name="app_api_inventory_list", methods={"GET"})
     */
    public function list(InventoryRepository $inventoryRepository): Response
    {
        $inventories = $inventoryRepository->findAll();
        return $this->json($inventories, Response::HTTP_OK, [], ["groups" => "inventory"]);
    }

    /**
     * @Route("/{id}", name="app_api_inventory_show", methods={"GET"})
     */
    public function show(Inventory $inventory): Response
    {
        return $this->json($inventory, Response::HTTP_OK, [], ["groups" => "inventory"]);
    }

    /**
     * @Route("/create", name="app_api_inventory_create", methods={"POST"})
     */
    public function create(ManagerRegistry $doctrine, 
                        Request $request, 
                        BoxerRepository $boxerRepository, 
                        ItemRepository $itemRepository): Response
    {
        // link with ORM Symfony
        $entityManager = $doctrine->getManager();
        // Recupe donné en json et le convertie pour pouvoir le lire
        $data = json_decode($request->getContent(), true);

        //Create object inventory
        $inventory = new Inventory();

        // Get boxer id, itentityManager id and quantity. check if empty or not
        $boxerData = $boxerRepository->find($data["boxer"]);
        $itemData = $itemRepository->find($data["item"]);
        $quantityData = $data["quantity"];
        if(!isset($boxerData) && !isset($itemData) && !isset($quantityData)){
            return new Response("Boxer n'existe pas ou est null", 400);
        }

        // Set data in object, persist data and flush data
        $inventory->setBoxer($boxerData);
        $inventory->setItem($itemData);
        $inventory->setQuantity($quantityData);

        $entityManager->persist($inventory);
        $entityManager->flush();
        return new Response("Objet ajouté dans l'inventaire", 201);
    }

    /**
     * @Route("/update/{id}", name="app_api_inventory_update", methods={"POST"})
     */
    public function update(ManagerRegistry $doctrine, 
                        Request $request,
                        InventoryRepository $inventoryRepository, 
                        BoxerRepository $boxerRepository, 
                        ItemRepository $itemRepository,
                        $id): Response
    {
        // link with ORM Symfony
        $em = $doctrine->getManager();
        // Recupe donné en json et le convertie pour pouvoir le lire
        $data = json_decode($request->getContent(), true);

        //Create object inventory
        $inventory = $inventoryRepository->find($id);

        // Get boxer id, item id and quantity. check if empty or not
        $boxerData = $boxerRepository->find($data["boxer"]);
        $itemData = $itemRepository->find($data["item"]);
        $quantityData = $data["quantity"];
        if(!isset($boxerData) && !isset($itemData) && !isset($quantityData)){
            return new Response("Boxer n'existe pas ou est null", 400);
        }

        // Set data in object, persist data and flush data
        $inventory->setBoxer($boxerData);
        $inventory->setItem($itemData);
        $inventory->setQuantity($quantityData);

        $em->flush();
        return new Response("Objet modifié dans l'inventaire", 201);
    }

    /**
     * @Route("/delete/{id}", name="app_api_inventory_delete", methods={"POST"})
     */
    public function delete($id, InventoryRepository $inventoryRepository)
    {
        $inventory = $inventoryRepository->find($id);
        $inventoryRepository->remove($inventory, true);
        return new Response("Objet supprimé dans l'inventaire", 202);
    }

    /**
     * @Route("/boxer/{id}", name="app_api_inventory_delete", methods={"GET"})
     */
    public function ByBoxer($id, InventoryRepository $inventoryRepository)
    {
        $inventory = $inventoryRepository->ByBoxer($id);
        return $this->json($inventory, Response::HTTP_OK, [], ["groups" => "inventory"]);
    }
}
