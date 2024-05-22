<?php

namespace App\Entity;

use App\Repository\ItemRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ItemRepository::class)
 */
class Item
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"inventory"})
     * @Groups({"items"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups({"inventory"})
     * @Groups({"items"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups({"items"})
     */
    private $marketplace;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"inventory"})
     * @Groups({"items"})
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"items"})
     */
    private $price;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"inventory"})
     * @Groups({"items"})
     */
    private $effect;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"inventory"})
     * @Groups({"items"})
     */
    private $icon;

    /**
     * @ORM\OneToMany(targetEntity=Inventory::class, mappedBy="item")
     * @Groups({"items"})
     */
    private $inventories;


    public function __construct()
    {
        $this->inventories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getMarketplace(): ?string
    {
        return $this->marketplace;
    }

    public function setMarketplace(string $marketplace): self
    {
        $this->marketplace = $marketplace;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getEffect(): ?string
    {
        return $this->effect;
    }

    public function setEffect(string $effect): self
    {
        $this->effect = $effect;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(string $icon): self
    {
        $this->icon = $icon;

        return $this;
    }
    /**
     * @return Collection<int, Inventory>
     */
    public function getInventories(): Collection
    {
        return $this->inventories;
    }

    public function addInventory(Inventory $inventory): self
    {
        if (!$this->inventories->contains($inventory)) {
            $this->inventories[] = $inventory;
            $inventory->setItem($this);
        }

        return $this;
    }

    public function removeInventory(Inventory $inventory): self
    {
        if ($this->inventories->removeElement($inventory)) {
            // set the owning side to null (unless already changed)
            if ($inventory->getItem() === $this) {
                $inventory->setItem(null);
            }
        }

        return $this;
    }
}
