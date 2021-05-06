import { Entity, BaseEntity, ManyToOne, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";
import { Post } from "./Post";
import { Field, Int, ObjectType } from "type-graphql";

// m to m
// many users can like many posts
// user <-> posts
// user -> join table <- posts
// user -> likedPost <- posts

@ObjectType()
@Entity("liked_posts")
export class LikedPost extends BaseEntity {
  @Column("int")
  value: number;

  @Field(() => Int)
  @PrimaryColumn()
  userId: number;
  
  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.likes)
  user: Users;

  @Field(() => Int)
  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: "CASCADE",
  })
  post: Post;
}