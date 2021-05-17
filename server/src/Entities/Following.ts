import {
  Entity,
  BaseEntity,
  ManyToOne,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Post } from "./Post";
import { Field, Int, ObjectType } from "type-graphql";

// m to m
// many users can follow many users
// user <-> user
// user -> join table <- user
// user -> following <- user

@ObjectType()
@Entity("following")
export class Following extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int")
  value: number;

  @Field(() => String)
  @Column()
  username!: string;

  // @Field(() => String)
  // @Column()
  // avatar!: string;

  @Field(() => Int)
  @PrimaryColumn()
  followingId!: number;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.following)
  follower: Users;

  @Field(() => Int)
  @PrimaryColumn()
  followerId!: number;
  
  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.follower)
  following: Users;
}
