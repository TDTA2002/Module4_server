import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm"
import ProductPicturesEntity from "./productPicture.entity"

@Entity()
class Products {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        unique: true
    })
    name!: string


    @OneToMany(() => ProductPicturesEntity, (pictures) => pictures.product)
    pictures!: ProductPicturesEntity[]

}

export default Products