package aptrue.backend.Clip.Entity;

import aptrue.backend.Admin.Entity.Admin;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "clipRQ")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class ClipRQ {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clipRQ_id")
    private int clipRQId;

    @Column(name = "images")
    private List<String> images;

    @NotNull
    @Column(name = "sections")
    private List<String> sections;

    @NotNull
    @Column(name = "address")
    private String address;

    @NotNull
    @Column(name = "phone")
    private String phone;

    @NotNull
    @Column(name = "createdAt", columnDefinition = "timestamp")
    private LocalDateTime createdAt;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "status")
    private String status;

    @NotNull
    @Column(name = "password")
    private String password;

    @NotNull
    @Column(name = "photoStatus")
    private boolean photoStatus;

    @NotNull
    @Column(name = "startDate", columnDefinition = "timestamp")
    private LocalDateTime startDate;

    @NotNull
    @Column(name = "endDate", columnDefinition = "timestamp")
    private LocalDateTime endDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @Column(name = "clipList")
    private List<String> clipList;

    @Column(name = "clipCreatedAt")
    private LocalDateTime clipCreatedAt;

}
