<?php

namespace App\Repository;

use App\Entity\Boxer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Boxer>
 *
 * @method Boxer|null find($id, $lockMode = null, $lockVersion = null)
 * @method Boxer|null findOneBy(array $criteria, array $orderBy = null)
 * @method Boxer[]    findAll()
 * @method Boxer[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BoxerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Boxer::class);
    }

    public function add(Boxer $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Boxer $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Get boxer with user id
     */
    public function ByUser($userId)
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT * FROM boxer WHERE user_id = "'.$userId.'"';
        $resultSet = $conn->executeQuery($sql);
        return $resultSet->fetchAssociative();
    }

    /**
     * Get boxer npc only
     */
    public function getAllNpc()
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT * FROM boxer WHERE npc = 1';
        $resultSet = $conn->executeQuery($sql);
        return $resultSet->fetchAllAssociative();
    }
    
//    /**
//     * @return Boxer[] Returns an array of Boxer objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('b.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Boxer
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
