import { Entity, BaseEntity, ManyToOne, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";
import { Post } from "./Post";
import { Field, Int, ObjectType } from "type-graphql";

// m to m
// many users can message many users
// user <-> user
// user -> join table <- user
// user -> message <- user

@ObjectType()
@Entity("messages")
export class Message extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  content!: string;

  @Field(() => Date)
  @Column()
  dateSent!: Date;

  @Field(() => Int)
  @PrimaryColumn()
  fromId: number;
  
  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.from)
  from: Users;

  @Field(() => Int)
  @PrimaryColumn()
  toId: number;
  
  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.to)
  to: Users;
}