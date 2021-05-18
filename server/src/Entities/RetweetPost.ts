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
// many users can retweet many posts
// user <-> posts
// user -> join table <- posts
// user -> RetweetPost <- posts

@ObjectType()
@Entity("retweets")
export class RetweetPost extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int")
  value: number;

  @Field(() => Int)
  @PrimaryColumn()
  userId: number;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.retweets)
  user: Users;

  @Field(() => Int)
  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.retweets, {
    onDelete: "CASCADE",
  })
  post: Post;
}
