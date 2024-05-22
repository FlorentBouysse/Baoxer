<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\BoxerRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=BoxerRepository::class)
 */
class Boxer
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
     * @ORM\Column(type="integer")
     * @Groups({"boxers"})
     */
    private $health;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"boxers"})
     */
    private $energy;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"boxers"})
     */
    private $money;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"boxers"})
     */
    private $win;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"boxers"})
     */
    private $loose;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"boxers"})
     */
    private $levelExperience;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"boxers"})
     */
    private $strengthExperience;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"boxers"})
     */
    private $agilityExperience;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"boxers"})
     */
    private $staminaExperience;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"boxers"})
     */
    private $availableStatsPoints;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"boxers"})
     */
    private $npc;

    /**
     * @ORM\ManyToOne(targetEntity=Level::class, inversedBy="boxers")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"boxers"})
     */
    private $level;

    /**
     * @ORM\ManyToOne(targetEntity=Agility::class, inversedBy="boxers")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"boxers"})
     */
    private $agility;

    /**
     * @ORM\ManyToOne(targetEntity=Stamina::class, inversedBy="boxers")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"boxers"})
     */
    private $stamina;

    /**
     * @ORM\ManyToOne(targetEntity=Strength::class, inversedBy="boxers")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"boxers"})
     */
    private $strength;

    /**
     * @ORM\OneToOne(targetEntity=User::class, cascade={"persist", "remove"})
     * @Groups({"boxers"})
     */
    private $user;

    /**
     * @ORM\ManyToMany(targetEntity=Skill::class, inversedBy="boxers")
     * @Groups({"boxers"})
     * @Assert\Count(min = 2, max = 4,
     * minMessage= "Vous ne pouvez pas avoir moin de 2 compétences",
     * maxMessage = "Vous ne pouvez pas séléctionner plus de 4 compétences")
     */
    private $skills;

    /**
     * @ORM\OneToMany(targetEntity=Inventory::class, mappedBy="boxer", cascade={"remove"})
     * @Groups({"boxers"})
     */
    private $inventories;

    /**
     * @ORM\ManyToMany(targetEntity=Tournament::class, inversedBy="boxers")
     * @Groups({"boxers"})
     */
    private $tournament;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups({"boxers"})
     */
    private $username;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"boxers"})
     */
    private $currentEnergy;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"boxers"})
     */
    private $CurrentTraining;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"boxers"})
     */
    private $picture;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"boxers"})
     */
    private $trainingStart;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"boxers"})
     */
    private $trainingEnd;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"boxers"})
     */
    private $workStart;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"boxers"})
     */
    private $workEnd;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"boxers"})
     */
    private $sleepStart;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"boxers"})
     */
    private $sleepEnd;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"boxers"})
     */
    private $currentWork;

    public function __construct()
    {
        $this->skills = new ArrayCollection();
        $this->inventories = new ArrayCollection();
        $this->tournament = new ArrayCollection();

    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHealth(): ?int
    {
        return $this->health;
    }

    public function setHealth(int $health): self
    {
        $this->health = $health;

        return $this;
    }

    public function getEnergy(): ?int
    {
        return $this->energy;
    }

    public function setEnergy(int$energy): self
    {
        $this->energy = $energy;

        return $this;
    }

    public function getMoney(): ?int
    {
        return $this->money;
    }

    public function setMoney(?int $money): self
    {
        $this->money = $money;

        return $this;
    }

    public function getWin(): ?int
    {
        return $this->win;
    }

    public function setWin(?int $win): self
    {
        $this->win = $win;

        return $this;
    }

    public function getLoose(): ?int
    {
        return $this->loose;
    }

    public function setLoose(?int $loose): self
    {
        $this->loose = $loose;

        return $this;
    }

    public function getLevelExperience(): ?int
    {
        return $this->levelExperience;
    }

    public function setLevelExperience(?int $levelExperience): self
    {
        $this->levelExperience = $levelExperience;

        return $this;
    }

    public function getStrengthExperience(): ?int
    {
        return $this->strengthExperience;
    }

    public function setStrengthExperience(?int $strengthExperience): self
    {
        $this->strengthExperience = $strengthExperience;

        return $this;
    }

    public function getAgilityExperience(): ?int
    {
        return $this->agilityExperience;
    }

    public function setAgilityExperience(?int $agilityExperience): self
    {
        $this->agilityExperience = $agilityExperience;

        return $this;
    }

    public function getStaminaExperience(): ?int
    {
        return $this->staminaExperience;
    }

    public function setStaminaExperience(?int $staminaExperience): self
    {
        $this->staminaExperience = $staminaExperience;

        return $this;
    }

    public function getAvailableStatsPoints(): ?int
    {
        return $this->availableStatsPoints;
    }

    public function setAvailableStatsPoints(?int $availableStatsPoints): self
    {
        $this->availableStatsPoints = $availableStatsPoints;

        return $this;
    }

    public function isNpc(): ?bool
    {
        return $this->npc;
    }

    public function setNpc(bool $npc): self
    {
        $this->npc = $npc;

        return $this;
    }

    public function getLevel(): ?level
    {
        return $this->level;
    }

    public function setLevel(?Level $level): self
    {
        $this->level = $level;

        return $this;
    }

    public function getAgility(): ?Agility
    {
        return $this->agility;
    }

    public function setAgility(?Agility $agility): self
    {
        $this->agility = $agility;

        return $this;
    }

    public function getStamina(): ?Stamina
    {
        return $this->stamina;
    }

    public function setStamina(?Stamina $stamina): self
    {
        $this->stamina = $stamina;

        return $this;
    }

    public function getStrength(): ?Strength
    {
        return $this->strength;
    }

    public function setStrength(?Strength $strength): self
    {
        $this->strength = $strength;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Skill>
     */
    public function getSkills(): Collection
    {
        return $this->skills;
    }

    public function addSkill(Skill $skill): self
    {
        if (!$this->skills->contains($skill)) {
            $this->skills[] = $skill;
        }

        return $this;
    }

    public function removeSkill(Skill $skill): self
    {
        $this->skills->removeElement($skill);

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
            $inventory->setBoxer($this);
        }

        return $this;
    }

    public function removeInventory(Inventory $inventory): self
    {
        if ($this->inventories->removeElement($inventory)) {
            // set the owning side to null (unless already changed)
            if ($inventory->getBoxer() === $this) {
                $inventory->setBoxer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Tournament>
     */
    public function getTournament(): Collection
    {
        return $this->tournament;
    }

    public function addTournament(Tournament $tournament): self
    {
        if (!$this->tournament->contains($tournament)) {
            $this->tournament[] = $tournament;
        }

        return $this;
    }

    public function removeTournament(Tournament $tournament): self
    {
        $this->tournament->removeElement($tournament);

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getCurrentEnergy(): ?int
    {
        return $this->currentEnergy;
    }

    public function setCurrentEnergy(int $currentEnergy): self
    {
        $this->currentEnergy = $currentEnergy;

        return $this;
    }

    public function getCurrentTraining(): ?string
    {
        return $this->CurrentTraining;
    }

    public function setCurrentTraining(?string $CurrentTraining): self
    {
        $this->CurrentTraining = $CurrentTraining;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getTrainingStart(): ?string
    {
        return $this->trainingStart;
    }

    public function setTrainingStart(?string $trainingStart): self
    {
        $this->trainingStart = $trainingStart;

        return $this;
    }

    public function getTrainingEnd(): ?string
    {
        return $this->trainingEnd;
    }

    public function setTrainingEnd(?string $trainingEnd): self
    {
        $this->trainingEnd = $trainingEnd;

        return $this;
    }

    public function getWorkStart(): ?string
    {
        return $this->workStart;
    }

    public function setWorkStart(?string $workStart): self
    {
        $this->workStart = $workStart;

        return $this;
    }

    public function getWorkEnd(): ?string
    {
        return $this->workEnd;
    }

    public function setWorkEnd(?string $workEnd): self
    {
        $this->workEnd = $workEnd;

        return $this;
    }

    public function getSleepStart(): ?string
    {
        return $this->sleepStart;
    }

    public function setSleepStart(?string $sleepStart): self
    {
        $this->sleepStart = $sleepStart;

        return $this;
    }

    public function getSleepEnd(): ?string
    {
        return $this->sleepEnd;
    }

    public function setSleepEnd(?string $sleepEnd): self
    {
        $this->sleepEnd = $sleepEnd;

        return $this;
    }

    public function getCurrentWork(): ?string
    {
        return $this->currentWork;
    }

    public function setCurrentWork(?string $currentWork): self
    {
        $this->currentWork = $currentWork;

        return $this;
    }

}
