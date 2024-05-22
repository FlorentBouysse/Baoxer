<?php

namespace App\Entity;

use App\Repository\InventoryRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=InventoryRepository::class)
 */
class Inventory
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"boxers"})
     * @Groups({"inventory"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Boxer::class, inversedBy="inventories")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"inventory"})
     */
    private $boxer;

    /**
     * @ORM\ManyToOne(targetEntity=Item::class, inversedBy="inventories")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"boxers"})
     * @Groups({"inventory"})
     * @Groups({"item"})
     */
    private $item;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"boxers"})
     * @Groups({"inventory"})
     */
    private $quantity;

    public function getId(): ?int
    {
        return $this->id;
    }
  
    public function getBoxer(): ?Boxer
    {
        return $this->boxer;
    }

    public function setBoxer(?Boxer $boxer): self
    {
        $this->boxer = $boxer;

        return $this;
    }

    public function getItem(): ?Item
    {
        return $this->item;
    }

    public function setItem(?Item $item): self
    {
        $this->item = $item;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }
}
