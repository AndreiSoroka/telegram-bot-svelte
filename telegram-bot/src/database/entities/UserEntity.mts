import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryColumn({ type: "varchar" })
  telegramID!: string;

  @Column({ type: "varchar" })
  firstName!: string;

  @CreateDateColumn({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;
}
