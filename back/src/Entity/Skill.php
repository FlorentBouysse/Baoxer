<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\SkillRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=SkillRepository::class)
 */
class Skill
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"boxers"})
     * @Groups({"skills"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"boxers"})
     * @Groups({"skills"})
     */
    private $levelRequired;

    /**
     * @ORM\Column(type="string", length=125)
     * @Groups({"boxers"})
     * @Groups({"skills"})
     */
    private $name;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"boxers"})
     * @Groups({"skills"})
     */
    private $damage;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"boxers"})
     * @Groups({"skills"})
     */
    private $energyCost;

    /**
     * @ORM\Column(type="string", length=125)
     * @Groups({"boxers"})
     * @Groups({"skills"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=125, nullable=true)
     * @Groups({"boxers"})
     * @Groups({"skills"})
     */
    private $effect;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"boxers"})
     * @Groups({"skills"})
     */
    private $icon;

    /**
     * @ORM\Column(type="string", length=125)
     * @Groups({"boxers"})
     * @Groups({"skills"})
     */
    private $type;

    /**
     * @ORM\ManyToMany(targetEntity=Boxer::class, mappedBy="skills")
     * @Groups({"skills"})
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

    public function getLevelRequired(): ?int
    {
        return $this->levelRequired;
    }

    public function setLevelRequired(int $levelRequired): self
    {
        $this->levelRequired = $levelRequired;

        return $this;
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

    public function getDamage(): ?int
    {
        return $this->damage;
    }

    public function setDamage(?int $damage): self
    {
        $this->damage = $damage;

        return $this;
    }

    public function getEnergyCost(): ?int
    {
        return $this->energyCost;
    }

    public function setEnergyCost(?int $energyCost): self
    {
        $this->energyCost = $energyCost;

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

    public function getEffect(): ?string
    {
        return $this->effect;
    }

    public function setEffect(?string $effect): self
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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

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
            $boxer->addSkill($this);
        }

        return $this;
    }

    public function removeBoxer(Boxer $boxer): self
    {
        if ($this->boxers->removeElement($boxer)) {
            $boxer->removeSkill($this);
        }

        return $this;
    }
}
