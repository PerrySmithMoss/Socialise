import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";
import { Users } from "./Users";

@ObjectType()
@Entity("profile")
export class Profile extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String || null, {nullable: true})
  @Column({nullable: true})
  bio: string;

  @Field(() => String || null, {nullable: true})
  @Column({nullable: true})
  location: string;

  @Field(() => String || null, {nullable: true})
  @Column({nullable: true})
  website: string;

  @Field(() => String || null, {nullable: true})
  @Column({nullable: true, default: `${process.env.SERVER_URL}/images/default-avatar.jpg`})
  avatar: string;

  // @Field(() => Int)
  // @Column()
  // userId: number;

  @OneToOne(() => Users, user => user.profile, {
    onDelete: 'CASCADE',
})
  @Field(() => Users)
  user: Users;
}
