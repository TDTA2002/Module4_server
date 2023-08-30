import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from "typeorm"
import ProductEntity from "./product.entity"

@Entity()
class ProductPictures {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string


    @ManyToOne(() => ProductEntity, (product) => product.pictures)
    product!: ProductEntity

}

export default ProductPictures