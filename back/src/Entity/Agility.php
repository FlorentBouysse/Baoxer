<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\AgilityRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=AgilityRepository::class)
 */
class Agility
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"boxers"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"boxers"})
     */
    private $requiredPoint;

    /**
     * @ORM\OneToMany(targetEntity=Boxer::class, mappedBy="agility")
     */
    private $boxers;

    public function __construct()
    {
        $this->boxers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRequiredPoint(): ?int
    {
        return $this->requiredPoint;
    }

    public function setRequiredPoint(int $requiredPoint): self
    {
        $this->requiredPoint = $requiredPoint;

        return $this;
    }

    /**
     * @return Collection<int, Boxer>
     */
    public function getBoxers(): Collection
    {
        return $this->boxers;
    }

    public function addBoxer(Boxer $boxer): self
    {
        if (!$this->boxers->contains($boxer)) {
            $this->boxers[] = $boxer;
            $boxer->setAgility($this);
        }

        return $this;
    }

    public function removeBoxer(Boxer $boxer): self
    {
        if ($this->boxers->removeElement($boxer)) {
            // set the owning side to null (unless already changed)
            if ($boxer->getAgility() === $this) {
                $boxer->setAgility(null);
            }
        }

        return $this;
    }
}
