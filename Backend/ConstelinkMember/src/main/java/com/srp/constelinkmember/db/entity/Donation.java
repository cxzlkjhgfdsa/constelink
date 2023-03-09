package com.srp.constelinkmember.db.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "donation")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donation_id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @NotNull
    @Column(name = "fundraising_id", nullable = false)
    private Long fundraisingId;

    @NotNull
    @Column(name = "donation_price", nullable = false)
    private int donationPrice;

    @NotNull
    @Column(name = "donation_time", nullable = false)
    private LocalDateTime donationTime;

    @Size(max = 255)
    @Column(name = "donation_transaction_hash")
    private String donationTransactionHash;

}