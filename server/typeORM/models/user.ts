import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["email", "username"])
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "username" })
  username!: string;

  @Column({ name: "email" })
  email?: string;

  @Column()
  password!: string;
}
