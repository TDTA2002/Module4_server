import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm"

@Entity()
class Users {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column({
        default: 1
    })
    age!: number

    @Column({
        nullable: true
    })
    avatar!: number


}

export default Users