package aptrue.backend.Apartment.Repository;

import aptrue.backend.Apartment.Entity.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApartmentRepository extends JpaRepository<Apartment,Integer> {
    Optional<Apartment> findByAptId (Integer aptId);
}
