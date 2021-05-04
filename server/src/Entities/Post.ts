import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@ObjectType()
@Entity("posts")
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  postID!: number;

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

  @Field(() => Int)
  @Column("int", { default: 0 })
  likes!: number;

  @ManyToOne(() => Users, user => user.posts, {
    onDelete: 'CASCADE',
})
  @Field(() => Users)
  user: Users;
}
