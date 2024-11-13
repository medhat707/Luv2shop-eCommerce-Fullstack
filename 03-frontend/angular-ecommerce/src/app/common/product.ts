export class Product {

    /*
    These fields should match to the backend fields on the server side 
    NOT TO THE DB COLUMNS
    @Column(name="unit_price")
	private BigDecimal unitprice;
    */
    constructor(
                public id?: number,
                public sku?: string,
                public name?: string,
                public description?: string,
                public unitprice?: number,
                public imageUrl?: string,
                public active?: boolean,
                public unitsInStocks?: number,
                public dataCreated?: Date,
                public lastUpdated?: Date

    ){}
}
