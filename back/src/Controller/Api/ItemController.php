<?php

namespace App\Controller\Api;

use App\Entity\Item;
use App\Repository\AgilityRepository;
use App\Repository\ItemRepository;
use App\Repository\StaminaRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("api/item")
 */
class ItemController extends AbstractController
{
    /**
     * @Route("/", name="app_api_item_list", methods={"GET"})
     */
    public function list(ItemRepository $itemRepository): JsonResponse
    {
        $items = $itemRepository->findAll();
        return $this->json($items, Response::HTTP_OK, [], ["groups" => "items"]);
    }

    /**
     * @Route("/{id}", name="app_api_item_show", methods={"GET"})
     */
    public function show(Item $item): JsonResponse
    {
        return $this->json($item, Response::HTTP_OK, [], ["groups" => "items"]);
    }

    /**
     * @Route("/marketplace/{market}", name="app_api_item_bymarket", methods={"GET"})
     */
    public function ByMarket(ItemRepository $itemRepository, $market): JsonResponse
    {
        $items = $itemRepository->ByMarket($market);

        return $this->json($items, Response::HTTP_OK, [], ["groups" => "items"]);
    }
}
