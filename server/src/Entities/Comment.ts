import { Entity, BaseEntity, ManyToOne, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";
import { Post } from "./Post";
import { Field, Int, ObjectType } from "type-graphql";

// m to m
// many users can comment on many posts
// user <-> posts
// user -> join table <- posts
// user -> comments <- posts

@ObjectType()
@Entity("comments")
export class Comment extends BaseEntity {
  @Field(() => String)
  @Column()
  comment: string;

  @Field(() => String)
  @Column()
  datePublished!: string;

  @Field(() => Int)
  @PrimaryColumn()
  userId: number;
  
  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.comments)
  user: Users;

  @Field(() => Int)
  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: "CASCADE",
  })
  post: Post;
}