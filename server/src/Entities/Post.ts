import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LikedPost } from "./LikedPost";
import { Comment } from "./Comment"
import { Users } from "./Users";

@ObjectType()
@Entity("posts")
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column()
  userId!: number;

  @Field(() => String)
  @Column()
  userName!: string;

  @Field(() => String)
  @Column()
  firstName!: string;

  @Field(() => String)
  @Column()
  lastName!: string;

  @Field(() => String)
  @Column()
  content!: string;

  @Field(() => Date)
  @Column()
  datePublished!: Date;

  @Field()
  @Column({ type: "int", default: 0 })
  points!: number;

  @Field()
  @Column({ type: "int", default: 0 })
  commentsCount!: number;

  @Field(() => Int, { nullable: true })
  voteStatus: number | null; // 1 or -1 or null

  @OneToMany(() => LikedPost, (like) => like.post, {
    cascade: true
  })
  @Field(() => [LikedPost])
  likes: LikedPost[];

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true
  })
  @Field(() => [Comment])
  comments: [Comment];

  @ManyToOne(() => Users, user => user.posts, {
    onDelete: 'CASCADE',
})
  @Field(() => Users)
  user: Users;
}
