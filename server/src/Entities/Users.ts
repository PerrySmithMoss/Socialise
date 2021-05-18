import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Post } from "./Post";
import { Profile } from "./Profile";
import { LikedPost } from "./LikedPost";
import { Comment } from "./Comment"
import { Message } from "./Message"
import { Following } from "./Following"
import { RetweetPost } from "./RetweetPost"

@ObjectType()
@Entity("users")
export class Users extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  firstName!: string;

  @Field(() => String)
  @Column()
  lastName!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column()
  password!: string;

  @Field(() => Int)
  @Column("int", { default: 0 })
  tokenVersion!: number;

  @Field(() => Int)
  @Column("int", { default: 0 })
  followersCount!: number;

  @Field(() => Int)
  @Column("int", { default: 0 })
  followingCount!: number;

  @Field(() => Date)
  @Column({ nullable: true })
  dateRegistered!: Date;

  @Field(() => Int)
  @Column({ nullable: true })
  profileId: number;

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  @Field(() => [Post])
  posts: Post[];

  @OneToMany(() => LikedPost, (like) => like.user)
  likes: LikedPost[];

  @OneToMany(() => RetweetPost, (retweet) => retweet.user)
  retweets: LikedPost[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Message, (message) => message.from)
  from: Message[];

  @OneToMany(() => Message, (message) => message.to)
  to: Message[];

  @OneToMany(() => Following, (following) => following.following, {
    cascade: true
  })
  @JoinColumn()
  @Field(() => [Following])
  follower: Following[];

  @OneToMany(() => Following, (following) => following.follower, {
    cascade: true
  })
  @JoinColumn()
  @Field(() => [Following])
  following: Following[];

  @OneToOne(() => Profile, {
    cascade: true,
  })
  @JoinColumn()
  @Field(() => Profile)
  profile: Profile;
}
